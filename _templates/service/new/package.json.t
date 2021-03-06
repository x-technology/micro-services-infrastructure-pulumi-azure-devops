---
to: packages/services/grpc/<%= name %>/package.json
---
{
  "private": true,
  "name": "@grpc/<%= name %>",
  "version": "1.0.0",
  "author": "<%= author %>",
  "description": "",
  "license": "MIT",
  "engines": {
    "node": ">= 10.13 <=16"
  },
  "scripts": {
    "start": "TS_NODE_FILES=true nodemon index.ts",
    "build": "TS_NODE_FILES=true tsc -p tsconfig.release.json",
    "lint": "eslint -c ../../../../.eslintrc ./src",
    "test": "jest --coverage"
  },
  "dependencies": {
    "@babel/runtime": "^7.6.3",
    "@common/go-grpc": "^1.0.0",
    "esm": "^3.2.25",
    "fast-xml-parser": "^4.0.1",
    "node-fetch": "2",
    "nodemon": "^1.19.4",
    "regenerator-runtime": "^0.13.3",
    "tslib": "~1.10.0"
  },
  "devDependencies": {
    "@babel/core": "^7.6.4",
    "@babel/plugin-transform-runtime": "^7.6.2",
    "@babel/preset-env": "^7.6.3",
    "@babel/preset-typescript": "^7.6.0",
    "@babel/register": "^7.6.2",
    "@types/jest": "^24.0.18",
    "@types/node": "^17.0.12",
    "babel-jest": "^24.9.0",
    "dotenv": "^8.2.0",
    "jest": "^24.9.0",
    "npm-run-all": "^4.1.5",
    "onchange": "^6.1.0",
    "prettier": "~1.18.2",
    "rimraf": "^3.0.0",
    "ts-jest": "^24.0.0",
    "ts-node": "^10.0.0",
    "tsutils": "~3.17.0",
    "typescript": "^4.3.4"
  }
}

