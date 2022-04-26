const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Ballot', function () {
  it("Should return the new greeting once it's changed", async function () {
    const Ballot = await ethers.getContractFactory('Ballot');
    const ballot = await Ballot.deploy();
    await ballot.deployed();

    const chair = await ballot.chairperson();

    const winner = await ballot.winnername();
    console.log(winner);
    console.log(chair);

    expect(await ballot.winnername()).to.equal('Oranges');
  });
});
