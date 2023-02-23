//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "hardhat/console.sol";

interface IScoreboard {
    function countMint() external;

    function countBurn() external;

    function amountMinted() external view returns (uint256);

    function amountBurnt() external view returns (uint256);
}
