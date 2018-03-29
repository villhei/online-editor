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
  rootDir: '.',
  moduleNameMapper: {
    '^actions(.*)$': '<rootDir>/src/actions/$1',
    '^constants(.*)$': '<rootDir>/src/constants/$1',
    '^containers(.*)$': '<rootDir>/src/containers/$1',
    '^components(.*)$': '<rootDir>/src/components/$1',
    '^service(.*)$': '<rootDir>/src/service/$1',
    '^reducers(.*)$': '<rootDir>/src/reducers/$1',
    mocks: 'mocks'
  }
}
