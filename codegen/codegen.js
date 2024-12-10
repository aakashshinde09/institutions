const { generateApi } = require('swagger-typescript-api');
const path = require("path");
const fs = require("fs");

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
  name: "api.ts",
  singleHttpClient: true,
  httpClientType: 'axios',
  modular: true,
  extractRequestBody: true,
  extractRequestParams: true,
  extractResponseBody: true,
  extractResponseError: true,
  generateResponses: true,
  generateUnionEnums: true,
  patch: true,
  generateClient: true,
  moduleNameIndex: 1,

  // set to `false` to prevent the tool from writing to disk
  input: path.resolve(process.cwd(), './api/openapi.json'),
  output: path.resolve(process.cwd(),"./api"),
})
