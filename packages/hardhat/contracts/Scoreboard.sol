//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "hardhat/console.sol";
import "./IScoreboard.sol";

contract Scoreboard is IScoreboard {
    mapping(address => uint256) private _mintAmount;
    mapping(address => uint256) private _burntAmount;

    event MintCounted();

    function countMint(address minter) external override {
        _mintAmount[minter]++;
        emit MintCounted();
    }

    function countBurn(address burner) external override {
        _burntAmount[burner] += 1;
    }

    function amountMinted(address minter)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _mintAmount[minter];
    }

    function amountBurnt(address burner)
        public
        view
        override
        returns (uint256)
    {
        return _burntAmount[burner];
    }
}
