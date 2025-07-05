import Redis from 'ioredis';
import { withRateLimit } from './rateLimit.js';

let redis;
try {
  redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
} catch (err) {
  console.error('Failed to initialize Redis client, falling back to in-memory limiter:', err);
}

export function withRedisRateLimit(handler, { window = 60, max = 100 } = {}) {
  // If Redis unavailable at startup, just return memory limiter
  if (!redis) return withRateLimit(handler, max, window * 1000);

  return async (req, res) => {
    try {
      const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.socket.remoteAddress;
      const key = `rate:${ip}`;
      const result = await redis.multi().incr(key).expire(key, window).exec();
      const count = result?.[0]?.[1] ?? 0;
      if (count > max) {
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
      }
    } catch (err) {
      console.error('Redis rate limit failed, fallback to in-memory:', err);
      // fallback to memory limiter for this request
      return withRateLimit(handler, max, window * 1000)(req, res);
    }
    return handler(req, res);
  };
}