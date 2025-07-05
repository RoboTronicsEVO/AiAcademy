const TOKEN = process.env.CSRF_SECRET || 'testtoken';

export function withCsrf(handler) {
  return async (req, res) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return handler(req, res);
    }
    const headerToken = req.headers['x-csrf-token'];
    if (headerToken !== TOKEN) {
      return res.status(403).json({ message: 'Invalid CSRF token' });
    }
    return handler(req, res);
  };
}