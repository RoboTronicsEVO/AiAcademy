/* eslint-disable */
const { buildRequest, setupCommonMocks } = require('../test/helpers.js');

setupCommonMocks();

describe('Posts API', () => {
  let request;
  beforeAll(async () => {
    jest.mock('@/models/membership.model', () => ({
      default: { findOne: jest.fn().mockResolvedValue({}) },
    }));
    jest.mock('@/models/post.model', () => ({
      default: {
        find: jest.fn().mockResolvedValue([]),
      },
    }));
    const mod = await import('../pages/api/posts/index.js');
    const handler = mod.default || mod;
    request = buildRequest(handler);
  });

  it('returns 401 when unauthenticated', async () => {
    await request.get('/api/posts?communityId=c1').expect(401);
  });

  it('allows authenticated request', async () => {
    await request.get('/api/posts?communityId=c1').set('Authorization', 'mock').expect(200);
  });

  it('hits rate limit after 2 requests', async () => {
    const agent = request.set('Authorization', 'mock');
    await agent.get('/api/posts?communityId=c1');
    await agent.get('/api/posts?communityId=c1');
    await agent.get('/api/posts?communityId=c1').expect(429);
  });

  it('POST creates post', async () => {
    jest.mock('@/models/post.model', () => ({
      default: { find: jest.fn(), populate: jest.fn(), save: jest.fn().mockResolvedValue({ _id:'p1'}), prototype:{}, },
    }));
    jest.mock('@/models/membership.model', () => ({
      default: { findOne: jest.fn().mockResolvedValue({}) },
    }));
    await request
      .post('/api/posts')
      .set('Authorization','mock')
      .send({ title:'T', content:'C', communityId:'c1'})
      .expect(201);
  });

  it('400 missing fields', async () => {
    await request.post('/api/posts').set('Authorization','mock').send({ title:'T'}).expect(400);
  });

  it('403 when not member', async () => {
    jest.mock('@/models/membership.model', () => ({ default: { findOne: jest.fn().mockResolvedValue(null) } }));
    await request.get('/api/posts?communityId=c1').set('Authorization','mock').expect(403);
  });
});