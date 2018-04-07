module.exports = {
  transform: {
    '^.+\\.tsx?$': './node_modules/ts-jest/preprocessor.js'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json'
  ],
  rootDir: './src',
  moduleNameMapper: {
    '^actions(.*)$': '<rootDir>/actions/$1',
    '^constants(.*)$': '<rootDir>/constants/$1',
    '^containers(.*)$': '<rootDir>/containers/$1',
    '^components(.*)$': '<rootDir>/components/$1',
    '^service(.*)$': '<rootDir>/service/$1',
    '^reducers(.*)$': '<rootDir>/reducers/$1',
    mocks: 'mocks'
  }
}
