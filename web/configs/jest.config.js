module.exports = {
  bail: 3,
  testEnvironment: "node",
  verbose: true,
  rootDir: "..",
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.mdx$": "@storybook/addon-docs/jest-transform-mdx",
  },
  transformIgnorePatterns: ["/node_modules/"],
  testRegex: "/tests/.*\\.(ts|tsx)$",
  moduleDirectories: ["node_modules"],
  globals: {
    DEVELOPMENT: false,
    FAKE_SERVER: false,
    "ts-jest": {
      tsConfig: "./tsconfig.jest.json",
    },
  },
}
