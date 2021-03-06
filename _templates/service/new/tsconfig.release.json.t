---
to: packages/services/grpc/<%= name %>/tsconfig.release.json
---
{
  "extends": "../../../../tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "build",
    "module": "commonjs",
    "removeComments": true
  },
  "include": [
    "src/**/*",
    "@types/**/*"
  ]
}
