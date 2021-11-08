pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CeriseCryptoadzV1 is Ownable, ERC721 {
    address public gremplin = 0x4298e663517593284Ad4FE199b21815BD48a9969;
    address public infernalToast = 0x7132C9f36abE62EAb74CdfDd08C154c9AE45691B;
    // modifiers
    modifier onlyGremplin() {
        require(msg.sender == gremplin, "Only Gremplin can mint!");
        _;
    }

    modifier onlyInfernalToast() {
        require(msg.sender == infernalToast, "Only InfernalToast can mint!");
        _;
    }

    // Mints only for Gremplin
    function gremplinMint() external onlyGremplin {
        _mint(gremplin, 21);
    }

    // Mints only for Infernal toast
    function infernalToastMint() external onlyInfernalToast {
        _mint(infernalToast, 22);
    }

    constructor() ERC721("CeriseToadz", "CTz") {}
}
