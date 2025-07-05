module.exports = {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};