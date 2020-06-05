const webpackConfig = require("../webpack.config");

describe("Webpack config", () => {
  it("should include db entities", () => {
    console.log(webpackConfig.entry);
    expect(webpackConfig.entry).toBeDefined();
  });
});
