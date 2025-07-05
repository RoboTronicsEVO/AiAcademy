import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/user.model';
import { withRedisRateLimit } from '@/lib/middleware/rateLimitRedis';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }
  try {
    await connectToDatabase();
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();
    return res.status(201).json({ message: 'Registered', data: { id: user._id } });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default withRedisRateLimit(handler);