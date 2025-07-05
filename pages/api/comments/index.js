import { connectToDatabase } from '@/lib/mongodb';
import Comment from '@/models/comment.model';
import Post from '@/models/post.model';
import mongoose from 'mongoose';
import { withRateLimit } from '@/lib/middleware/rateLimit';
import { withAuth } from '@/lib/middleware/auth';
import { withRedisRateLimit } from '@/lib/middleware/rateLimitRedis';
import { withCsrf } from '@/lib/middleware/csrf';

async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    if (!req.session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    await connectToDatabase();

    const { content, postId, parentId } = req.body;
    const authorId = req.session.user.id;

    if (!content || !postId) {
        return res.status(400).json({ message: 'Content and postId are required.' });
    }

    const dbSession = await mongoose.startSession();
    dbSession.startTransaction();

    try {
        const newComment = new Comment({
            content,
            postId,
            authorId,
            parentId: parentId || null,
        });

        const savedComment = await newComment.save({ session: dbSession });


        await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } }, { session: dbSession });
        
        await dbSession.commitTransaction();

        return res.status(201).json({ message: 'Comment created', data: savedComment });

    } catch (error) {
        await dbSession.abortTransaction();
        console.error('Comment creation failed:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        dbSession.endSession();
    }
}

export default withRedisRateLimit(withCsrf(withAuth(handler)));
