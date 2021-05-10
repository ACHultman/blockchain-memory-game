const { assert } = require("chai");

const MemoryToken = artifacts.require("./MemoryToken.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Memory Token", (accounts) => {
  let token;

  before(async () => {
    token = await MemoryToken.deployed();
  });

  describe("deployment", async () => {
    it("deploys with valid address", async () => {
      token = await MemoryToken.deployed();
      const address = token.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
    it("deplyos with name", async () => {
      const name = await token.name();
      assert.equal(name, "Memory Token");
    });
    it("deplyos with symbol", async () => {
      const symbol = await token.symbol();
      assert.equal(symbol, "MEMORY");
    });
  });
});
