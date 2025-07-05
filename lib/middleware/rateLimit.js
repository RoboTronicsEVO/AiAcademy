const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60;

const ipStore = new Map();

export function withRateLimit(handler, max = MAX_REQUESTS, windowMs = WINDOW_MS) {
  return async (req, res) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    const now = Date.now();
    const entry = ipStore.get(ip) || { count: 0, start: now };
    if (now - entry.start > windowMs) {
      entry.count = 1;
      entry.start = now;
    } else {
      entry.count += 1;
    }
    ipStore.set(ip, entry);
    if (entry.count > max) {
      res.status(429).json({ message: 'Too many requests, please try again later.' });
      return;
    }
    return handler(req, res);
  };
}