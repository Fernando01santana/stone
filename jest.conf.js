var path = require('path')
module.exports = {
    rootDir:path.resolve(__dirname,'./'),
    verbose:true,
    preset:'ts-jest',
    testEnvironment:'node',
    collectCoverage:true,
    coverageDirectory:'./_devops/artigacts/reports',
    coverageReporters:['text','clover','lcov'],
    collectCoverageFrom:[
      './src/modules/customer/(controller/services)/*.{ts}',
      '!**/test/**/*.{ts}',
    ],
    testMatch: [
      '**/test/**/*.spec.ts'
    ],
    moduleDirectories: ['node_modules', '<rootDir>'],
    compilerOptions: {
      baseUrl: "./",
    },
    coverage:true,
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },

  };
  
