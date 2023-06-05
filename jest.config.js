/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
    "^@src(.*)$": "<rootDir>/src$1",
  },
  // transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  // modulePathIgnorePatterns: ["<rootDir>/dist/"],
};
