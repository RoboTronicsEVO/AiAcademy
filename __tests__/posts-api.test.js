const http = require('http');
const supertest = require('supertest');
const handler = require('../pages/api/posts/index.js').default || require('../pages/api/posts/index.js');

// Mock dependencies
jest.mock('@/lib/mongodb', () => ({ connectToDatabase: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/middleware/auth', () => ({ withAuth: h => h }));
jest.mock('@/lib/middleware/rateLimitRedis', () => ({ withRedisRateLimit: h => h }));

const server = http.createServer((req, res) => handler(req, res));

describe('Posts API', () => {
  it('requires auth', async () => {
    await supertest(server).get('/api/posts').expect(401);
  });
});