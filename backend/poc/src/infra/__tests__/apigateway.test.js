const { readCA, apiGatewayConnector } = require("../apigateway");

describe("Api Gateway", () => {
  describe("read CA Cert", () => {
    it("should not be empty", () => {
      const ca = readCA();
      console.log(ca);
      expect(ca).toBeDefined();
    });
  });
});
