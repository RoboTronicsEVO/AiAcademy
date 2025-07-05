/* eslint-disable */
const bcrypt = require('bcryptjs');
const { authOptions } = require('../pages/api/auth/[...nextauth].js');

describe('NextAuth Credentials authorize', () => {
  it('returns user when email & password correct', async () => {
    const plain = 'pass123';
    const hashed = await bcrypt.hash(plain, 10);

    jest.mock('@/models/user.model', () => ({
      default: { findOne: jest.fn().mockResolvedValue({ _id: 'u1', name: 'User', email: 'e@e.com', password: hashed }) },
    }));

    const provider = authOptions.providers[0];
    const user = await provider.authorize({ email: 'e@e.com', password: 'pass123' });
    expect(user).toBeTruthy();
    expect(user.email).toBe('e@e.com');
  });

  it('returns null on invalid password', async () => {
    const hashedWrong = await bcrypt.hash('other', 10);
    jest.mock('@/models/user.model', () => ({
      default: { findOne: jest.fn().mockResolvedValue({ _id: 'u1', name: 'User', email: 'e@e.com', password: hashedWrong }) },
    }));
    const provider = authOptions.providers[0];
    const user = await provider.authorize({ email: 'e@e.com', password: 'wrong' });
    expect(user).toBeNull();
  });
});