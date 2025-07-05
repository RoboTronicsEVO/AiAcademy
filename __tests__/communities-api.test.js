/* eslint-disable */
const { buildRequest, setupCommonMocks } = require('../test/helpers.js');

setupCommonMocks();

describe('Communities API', () => {
  let request;
  beforeAll(async () => {
    jest.mock('@/models/community.model', () => ({
      default: { find: jest.fn().mockResolvedValue([]), prototype:{}, save: jest.fn().mockResolvedValue({ _id:'c1'}) },
    }));
    jest.mock('@/models/membership.model', () => ({
      default: { save: jest.fn().mockResolvedValue({}) },
    }));
    const mod = await import('../pages/api/communities/index.js');
    const handler = mod.default || mod;
    request = buildRequest(handler);
  });

  it('GET public list returns 200', async () => {
    await request.get('/api/communities').expect(200);
  });

  it('POST requires auth', async () => {
    await request.post('/api/communities').send({}).expect(401);
  });

  it('POST succeeds when authed', async () => {
    await request
      .post('/api/communities')
      .set('Authorization', 'mock')
      .send({ name: 'T', category: 'Tech' })
      .expect(201);
  });
});