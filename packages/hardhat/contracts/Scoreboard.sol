//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Scoreboard {
    mapping(address => uint256) private _mintAmount;
    mapping(address => uint256) private _burntAmount;

    function _countMint() internal {
        _mintAmount[msg.sender] += 1;
    }

    function _countBurn() internal {
        _burntAmount[msg.sender] += 1;
    }

    function amountMinted(address minter) public view returns (uint256) {
        return _mintAmount[minter];
    }

    function amountBurnt(address minter) public view returns (uint256) {
        return _burntAmount[minter];
    }
}
