const DummyToken = artifacts.require("DummyToken");
const TetherToken = artifacts.require("TetherToken");
const StakingDapp = artifacts.require("StakingDapp");

module.exports = async function (deployer, network, accounts) {
    
    await deployer.deploy(TetherToken);
    const tetherToken = await TetherToken.deployed();

    await deployer.deploy(DummyToken);
    const dummyToken = await DummyToken.deployed();

    await deployer.deploy(StakingDapp, dummyToken.address, tetherToken.address);
    const stakingDapp = await StakingDapp.deployed();

    // Staking dApp will be the new owner of the full balance
    await dummyToken.transfer(stakingDapp.address, '1000000000000000000000000');

    // now we transfer 100 Tether to a user account
    await tetherToken.transfer(accounts[1], '100000000000000000000');
};
