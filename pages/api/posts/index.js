import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/models/post.model';
import Membership from '@/models/membership.model';
import { withRateLimit } from '@/lib/middleware/rateLimit';
import { withAuth } from '@/lib/middleware/auth';

async function handler(req, res) {
    await connectToDatabase();
    const userId = req.session.user.id;

    if (req.method === 'GET') {
        try {
            const { communityId } = req.query;
            if (!communityId) {
                return res.status(400).json({ message: 'Community ID is required.' });
            }

            const membership = await Membership.findOne({ userId, communityId });
            if (!membership) {
                 return res.status(403).json({ message: 'You are not a member of this community.' });
            }

            const posts = await Post.find({ communityId })
                .populate('authorId', 'name image')
                .sort({ createdAt: -1 })
                .limit(20);

            return res.status(200).json({ data: posts });
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    if (req.method === 'POST') {
        const { title, content, communityId, imageUrl, videoUrl } = req.body;

        if (!title || !content || !communityId) {
            return res.status(400).json({ message: 'Title, content, and communityId are required.' });
        }
        
        const membership = await Membership.findOne({ userId, communityId });
        if (!membership) {
            return res.status(403).json({ message: 'You must be a member to post in this community.' });
        }

        try {
            const newPost = new Post({
                title,
                content,
                communityId,
                authorId: userId,
                imageUrl,
                videoUrl,
            });

            const savedPost = await newPost.save();
            return res.status(201).json({ message: 'Post created', data: savedPost });

        } catch (error) {
            console.error('Post creation failed:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}

export default withRateLimit(withAuth(handler));
