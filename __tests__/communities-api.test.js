const http = require('http');
const supertest = require('supertest');
const handler = require('../pages/api/communities/index.js').default || require('../pages/api/communities/index.js');

jest.mock('@/lib/mongodb', () => ({ connectToDatabase: jest.fn().mockResolvedValue(true) }));

jest.mock('@/models/community.model', () => ({
  find: jest.fn().mockResolvedValue([]),
}));

jest.mock('@/lib/middleware/auth', () => ({ withAuth: h => h }));
jest.mock('@/lib/middleware/rateLimitRedis', () => ({ withRedisRateLimit: h => h }));

const server = http.createServer((req, res) => handler(req, res));

describe('Communities API', () => {
  it('GET returns 200 with data', async () => {
    await supertest(server).get('/api/communities').expect(200);
  });

  it('POST requires auth', async () => {
    await supertest(server).post('/api/communities').send({}).expect(401);
  });
});