module.exports = {
  testEnvironment: 'node',
  coverageReporters: [
    'json-summary',
    'lcov',
    'text',
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!jest.config.js',
    '!webpack.config.js',
    '!coverage/**/*',
    '!dist/**/*',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90,
    },
  },
  moduleDirectories: [
    'node_modules',
  ],
  testRegex: 'test/.*\\.test\\.(jsx?|tsx?)$',
  verbose: true,
};
