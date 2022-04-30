// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// OZ contracts import
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TheFootInTheWall is Ownable, ERC721 {
    address public lawrenceBloom = address(0x0);
    string public footVault = "ipfs://QmNZhJ7HZ39oacz4enpHhhHtWcYhWDg8xmyxjmQVvH1FB4/";
    string private _contractURI = "ipfs://QmUYESMpAyYgTC2yeAvY8bQypvDF17qaTnKcvCmQomRGWw";
    bool public mintOnce = false;
    uint public tokenId = 1;

    modifier onlyLawrenceBloom() {
        require(msg.sender == lawrenceBloom, "Only Lawrence can mint!");
        _;
    }

    constructor(address _lawrenceBloom) ERC721("TheFootInTheWall", "theFOOT") {
        lawrenceBloom = _lawrenceBloom;
    }

    function diveTru() external onlyLawrenceBloom {
        require(mintOnce == false, "You can only mint once!");
        _mint(msg.sender, tokenId);
        mintOnce = true;
    }

    function contractURI() public view returns (string memory) {
        return _contractURI; 
    }

        // the overridden _baseURI from ERC721
    function _baseURI() internal view virtual override returns (string memory) {
        return footVault;
    }
}