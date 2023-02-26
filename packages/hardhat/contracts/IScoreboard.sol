//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "hardhat/console.sol";

interface IScoreboard {
    function countMint(address minter) external;

    function countBurn(address burner) external;

    function amountMinted(address minter) external view returns (uint256);

    function amountBurnt(address burner) external view returns (uint256);
}
