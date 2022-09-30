var path = require('path')
module.exports = {
    rootDir:path.resolve(__dirname,'./'),
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    testEnvironment:'node',
    preset:'ts-jest',
    collectCoverageFrom:[
        './src/modules/customer/(controller/services)/*.{ts}',
        '!**/test/**/*.{ts}',
    ]
  };
  
