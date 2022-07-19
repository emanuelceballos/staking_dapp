// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DummyToken.sol";
import "./TetherToken.sol";

contract StakingDapp {
    string public name = "Staking Dapp";
    address public owner;
    DummyToken public dummyToken;
    TetherToken public tetherToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DummyToken _dummyToken, TetherToken _tetherToken) {
        dummyToken = _dummyToken;
        tetherToken = _tetherToken;
        owner = msg.sender;
    }

    function stakeToken(uint256 _amount) public {
        require(_amount > 0, "amount cannot be zero");

        // address(this) used to reference StakingDapp.sol address
        tetherToken.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
            hasStaked[msg.sender] = true;
        }

        isStaking[msg.sender] = true;
    }

    /// @notice Returns all staking balance to the user
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];

        require(balance > 0, "staking balance is zero");

        tetherToken.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    function issueDummy() public {
        require(
            msg.sender == owner,
            "caller must be the owner of this function"
        );

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];

            if (balance > 0) {
                dummyToken.transfer(recipient, balance);
            }
        }
    }
}
