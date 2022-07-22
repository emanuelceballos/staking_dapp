const StakingDapp = artifacts.require('StakingDapp');

/// This script could be run automatically (for example)
/// every 24 hs in order to issue tokens.

module.exports = async function (callback) {
    let stakingDapp = await StakingDapp.deployed();
    await stakingDapp.issueDummy();

    console.log('Dummy tokens issued');
    callback();
}