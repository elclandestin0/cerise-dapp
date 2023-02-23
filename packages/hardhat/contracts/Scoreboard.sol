//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "hardhat/console.sol";
import "./IScoreboard.sol";

contract Scoreboard is IScoreboard {
    mapping(address => uint256) private _mintAmount;
    mapping(address => uint256) private _burntAmount;

    event MintCounted();

    function countMint() external override {
        _mintAmount[msg.sender]++;
        console.log(_mintAmount[msg.sender]);
        emit MintCounted();
    }

    function countBurn() external override {
        _burntAmount[msg.sender] += 1;
    }

    function amountMinted() public view virtual override returns (uint256) {
        return _mintAmount[msg.sender];
    }

    function amountBurnt() public view override returns (uint256) {
        return _burntAmount[msg.sender];
    }
}
