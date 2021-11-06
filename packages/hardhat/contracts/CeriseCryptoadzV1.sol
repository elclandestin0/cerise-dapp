pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract CeriseCryptoadzV1 is Ownable, IERC721 {
    address public gremplin = 0x4298e663517593284ad4fe199b21815bd48a9969;
    string public gremplinTokenURI = "";
    address public infernalToast = 0x7132c9f36abe62eab74cdfdd08c154c9ae45691b;
    string public infernalToastURI = "";

    string public name = "Cerise Cryptoadz V1";

    // modifiers
    modifier onlyGremplin() {
        require(msg.sender == gremplin, "Only Gremplin can mint!");
        _;
    }

    modifier onlyInfernalToast() {
        require(msg.sender == infernal, "Only InfernalToast can mint!");
        _;
    }

    // Mints only for Gremplin
    function gremplinMint() external onlyGremplin {
        _mint(gremplin, 21);
        _setTokenURI(21, gremplinTokenURI);
    }

    // Mints only for Infernal toast
    function infernalToastMint() external onlyInfernalToast {
        _mint(infernalToast, 22);
        _setTokenURI(22, infernalToastURI);
    }

    constructor() {
        // what should we do on deploy?
    }
}
