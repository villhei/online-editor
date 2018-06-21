module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: '../tsconfig.json',
      skipBabel: true
    }
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest/preprocessor.js'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|))\\.(jsx?|tsx?)$',
  testEnvironment: 'node',
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
    '^middleware(.*)$': '<rootDir/middleware/$1',
    '^service(.*)$': '<rootDir>/service/$1',
    '^reducers(.*)$': '<rootDir>/reducers/$1',
    '^library(.*)$': '<rootDir>/library/$1'
  },
  collectCoverage: false,
  setupFiles: [
    '<rootDir>/../test-setup.js'
  ],
  setupTestFrameworkScriptFile: '<rootDir>/../node_modules/jest-enzyme/lib/index.js'
}
