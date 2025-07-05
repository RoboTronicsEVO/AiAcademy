const http = require('http');
const supertest = require('supertest');

function buildRequest(handler) {
  const server = http.createServer((req, res) => handler(req, res));
  const request = supertest(server);
  // inject default csrf token for mutating requests
  const verbs = ['post','put','patch','delete'];
  verbs.forEach(v => {
    const orig = request[v].bind(request);
    request[v] = (...args) => orig(...args).set('x-csrf-token','testtoken');
  });
  return request;
}

function setupCommonMocks() {
  jest.mock('@/lib/mongodb', () => ({ connectToDatabase: jest.fn().mockResolvedValue(true) }));

  // provide fallback no-op rate limiter that allows 2 requests then 429
  jest.mock('@/lib/middleware/rateLimitRedis', () => {
    return {
      withRedisRateLimit: (h, { max = 2 } = {}) => {
        let count = 0;
        return (req, res) => {
          if (++count > max) return res.status(429).json({ message: 'Too many requests' });
          return h(req, res);
        };
      },
    };
  });

  const mockSession = {
    user: { id: 'user1', name: 'Mock User', email: 'mock@example.com' },
    expires: new Date(Date.now() + 60 * 1000).toISOString(),
  };

  jest.mock('@/lib/middleware/auth', () => {
    return {
      withAuth: h => (req, res) => {
        if (req.headers.authorization === 'mock') req.session = mockSession;
        return h(req, res);
      },
    };
  });
}

module.exports = { buildRequest, setupCommonMocks };