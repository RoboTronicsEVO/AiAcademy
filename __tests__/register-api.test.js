/* eslint-disable */
const { buildRequest, setupCommonMocks } = require('../test/helpers.js');

setupCommonMocks();

describe('Register API', () => {
  let request;
  beforeAll(async () => {
    jest.mock('@/models/user.model', () => ({
      default: { findOne: jest.fn().mockResolvedValue(null), prototype:{}, save: jest.fn().mockResolvedValue({ _id:'u1'}) },
    }));
    const mod = await import('../pages/api/auth/register.js');
    const handler = mod.default || mod;
    request = buildRequest(handler);
  });

  it('400 missing fields', async () => {
    await request.post('/api/auth/register').send({ email:'e@e.com'}).expect(400);
  });

  it('201 success', async () => {
    await request.post('/api/auth/register').send({ name:'Name', email:'e@e.com', password:'pw'}).expect(201);
  });

  it('429 after limit', async () => {
    await request.post('/api/auth/register').send({ name:'Name', email:'2@e.com', password:'pw'});
    await request.post('/api/auth/register').send({ name:'Name', email:'3@e.com', password:'pw'});
    await request.post('/api/auth/register').send({ name:'Name', email:'4@e.com', password:'pw'}).expect(429);
  });
});