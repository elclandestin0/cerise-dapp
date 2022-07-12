// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// OZ contracts import
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DifferentKindaDigitz is Ownable, ERC721 {
    address public nateHusser;
    string public phoneBooth =
        "ipfs://QmYdT8J3x3Hx7eQE2t9TqtUEKYUfG3XGwVYhZej8Rya8qr/";
    string private _contractURI =
        "ipfs://QmYdT8J3x3Hx7eQE2t9TqtUEKYUfG3XGwVYhZej8Rya8qr";
    bool public mintOnce = false;
    uint256 public tokenId = 1;

    modifier onlyNateHusser() {
        require(msg.sender == nateHusser, "Only Nate Husser can mint!");
        _;
    }

    constructor(address _nateHusser) ERC721("DifferentKindaDigitz", "DKD") {
        nateHusser = _nateHusser;
    }

    function dialIn() external onlyNateHusser {
        require(mintOnce == false, "You can only mint once!");
        _mint(msg.sender, tokenId);
        mintOnce = true;
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    // the overridden _baseURI from ERC721
    function _baseURI() internal view virtual override returns (string memory) {
        return phoneBooth;
    }
}
