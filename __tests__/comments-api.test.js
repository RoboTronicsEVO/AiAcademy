/* eslint-disable */
const { buildRequest, setupCommonMocks } = require('../test/helpers.js');

setupCommonMocks();

describe('Comments API', () => {
  let request;
  beforeAll(async () => {
    jest.mock('@/models/comment.model', () => ({
      default: { prototype: {}, save: jest.fn().mockResolvedValue({ _id:'cm1'}) },
    }));
    jest.mock('@/models/post.model', () => ({
      default: { findByIdAndUpdate: jest.fn().mockResolvedValue({}) },
    }));

    const mod = await import('../pages/api/comments/index.js');
    const handler = mod.default || mod;
    request = buildRequest(handler);
  });

  it('401 when unauthenticated', async () => {
    await request.post('/api/comments').send({}).expect(401);
  });

  it('400 when missing parameters', async () => {
    await request.post('/api/comments').set('Authorization','mock').send({ content:'hi'}).expect(400);
  });

  it('201 on successful comment', async () => {
    await request.post('/api/comments').set('Authorization','mock').send({ content:'hi', postId:'p1'}).expect(201);
  });

  it('429 after rate limit', async () => {
    const agent = request.set('Authorization','mock');
    await agent.post('/api/comments').send({ content:'hi', postId:'p1'});
    await agent.post('/api/comments').send({ content:'hi', postId:'p1'});
    await agent.post('/api/comments').send({ content:'hi', postId:'p1'}).expect(429);
  });
});