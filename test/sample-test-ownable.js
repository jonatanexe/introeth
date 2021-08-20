const { expect } = require("chai");
const { ethers } = require("ethers");
const hre = require("hardhat");

describe("Ownable", function () {

  beforeEach(async function(){
    [this.martin, this.juana] = await hre.ethers.getSigners();
    this.Ownable = await hre.ethers.getContractFactory("Ownable");
    this.ownable = await this.Ownable.deploy(this.juana.address);
    await this.ownable.deployed();
  });

  it("Tenga owner correcto", async function () {

    const owner = await this.ownable.owner();
    expect(owner).to.equal(this.juana.address);

  });

  it("Sólo el owner pueda transferir ownership", async function () {
    await expect(this.ownable.transferOwnership(this.martin.address)).to.be.reverted;
  });

  it("Emita evento de OwnershipTransferred", async function () {
    await expect(this.ownable.connect(this.juana).transferOwnership(this.martin.address)).to.emit(this.ownable, 'OwnershipTransferred');
  });


  it("Emita evento de OwnershipTransferred con argumentos exactos", async function () {
    await expect(this.ownable.connect(this.juana).transferOwnership(this.martin.address)).to.emit(this.ownable, 'OwnershipTransferred')
    .withArgs(this.juana.address, this.martin.address);

  });
});

    // const Ownable = await ethers.getContractFactory("Ownable");
    // const ownable = await Ownable.deploy("Hello, world!");
    // await ownable.deployed();

    // expect(await ownable.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await ownable.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await ownable.greet()).to.equal("Hola, mundo!");