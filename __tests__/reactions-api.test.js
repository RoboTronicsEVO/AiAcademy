/* eslint-disable */
const { buildRequest, setupCommonMocks } = require('../test/helpers.js');

setupCommonMocks();

describe('Reactions API', () => {
  let request;
  beforeAll(async () => {
    jest.mock('@/models/reaction.model', () => ({
      default: { findOne: jest.fn().mockResolvedValue(null), prototype: {}, save: jest.fn().mockResolvedValue({ _id:'r1'}) },
    }));
    jest.mock('@/models/post.model', () => ({
      default: { findByIdAndUpdate: jest.fn().mockResolvedValue({}) },
    }));
    jest.mock('@/models/comment.model', () => ({
      default: { findByIdAndUpdate: jest.fn().mockResolvedValue({}) },
    }));

    const mod = await import('../pages/api/reactions/index.js');
    const handler = mod.default || mod;
    request = buildRequest(handler);
  });

  it('401 unauth', async () => {
    await request.post('/api/reactions').send({}).expect(401);
  });

  it('400 missing params', async () => {
    await request.post('/api/reactions').set('Authorization','mock').send({}).expect(400);
  });

  it('201 toggle reaction success', async () => {
    await request.post('/api/reactions').set('Authorization','mock').send({ targetId:'p1', targetModel:'Post'}).expect(201);
  });

  it('429 after limit', async () => {
    const agent=request.set('Authorization','mock');
    await agent.post('/api/reactions').send({ targetId:'p1', targetModel:'Post'});
    await agent.post('/api/reactions').send({ targetId:'p1', targetModel:'Post'});
    await agent.post('/api/reactions').send({ targetId:'p1', targetModel:'Post'}).expect(429);
  });
});