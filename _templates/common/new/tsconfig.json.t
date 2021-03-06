---
to: packages/common/<%= name %>/tsconfig.json
---
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "declaration": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false
  },
  "include": [
    "src/**/*"
  ]
}
