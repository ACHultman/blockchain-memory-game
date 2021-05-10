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

  describe("token dist", async () => {
    let result;

    it("mints token", async () => {
      const actualTokenURI = "https://www.test-token-uri.com/test-nft";
      await token.mint(accounts[0], actualTokenURI);
      result = await token.totalSupply();
      assert.equal(result.toString(), "1", "total supply is correct");

      result = await token.balanceOf(accounts[0]);
      assert.equal(result.toString(), "1", "balance is correct");

      result = await token.ownerOf("1");
      assert.equal(
        result.toString(),
        accounts[0].toString(),
        "owner is correct"
      );
      result = await token.tokenOfOwnerByIndex(accounts[0], 0);

      let balanceOf = await token.balanceOf(accounts[0]);
      let tokenIds = [];
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.tokenOfOwnerByIndex(accounts[0], i);
        tokenIds.push(id.toString());
      }
      let expected = ["1"];
      assert.equal(
        tokenIds.toString(),
        expected.toString(),
        "tokenIds are correct"
      );

      let resultTokenURI = await token.tokenURI("1");
      assert.equal(resultTokenURI, actualTokenURI);
    });
  });
});
