// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TetherToken {
    string public name = "dummy Tether token";
    string public symbol = "Tether";

    // this is 1M in ETH units
    uint256 public totalSupply = 1000000000000000000000000;
    uint256 public decimal = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approve(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balance;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balance[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balance[msg.sender] >= _value, "Insufficient funds");
        balance[msg.sender] -= _value;
        balance[_to] += _value;
        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approve(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balance[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);

        balance[_from] -= _value;
        balance[_to] += _value;
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}
