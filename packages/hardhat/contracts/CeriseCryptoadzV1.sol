pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract CeriseCryptoadzV1 {
    // event SetPurpose(address sender, string purpose);
    address public gremplin = 0x4298e663517593284ad4fe199b21815bd48a9969;
    address public infernaltoast = 0x7132c9f36abe62eab74cdfdd08c154c9ae45691b;
    string public name = "Cerise Cryptoadz V1";

    // modifiers
    modifier onlyGremplin() {
        require(msg.sender == gremplin, "Only Gremplin can mint!");
        _;
    }

    modifier onlyInfernal() {
        require(msg.sender == infernal, "Only Infernal can mint!");
        _;
    }

    constructor() {
        // what should we do on deploy?
    }
}
