import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export function withRedisRateLimit(handler, { window = 60, max = 100 } = {}) {
  return async (req, res) => {
    try {
      const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
      const key = `rate:${ip}`;
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, window);
      }
      if (count > max) {
        res.status(429).json({ message: 'Too many requests, please try again later.' });
        return;
      }
    } catch (err) {
      console.error('Rate limit middleware error:', err);
      // Fail-open on Redis errors
    }
    return handler(req, res);
  };
}