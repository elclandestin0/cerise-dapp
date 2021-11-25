pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

// hardhat
import "hardhat/console.sol";

// OpenZeppelin contracts
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
contract CeriseCryptoadzV1 is Ownable, ERC721 {
    address public gremplin = 0x4298e663517593284Ad4FE199b21815BD48a9969;
    address public infernalToast = 0x7132C9f36abE62EAb74CdfDd08C154c9AE45691B;
    address public faorkh = 0xc5F59709974262c4AFacc5386287820bDBC7eB3A;
    address public moti = 0x8Bd8795CbeED15F8D5074f493C53b39C11Ed37B2;
    bytes32 immutable public root;
    uint256 public tokenId = 1;
    mapping(address => bool) public didMint;
    // modifiers
    
    modifier onlyMintOnce() {
        require(didMint[msg.sender] == true, "Cannot mint more than once!");
        _;
    }

    constructor(bytes32 merkleRoot, string baseURI) ERC721("CeriseToadz", "CTz") {
        root = merkleRoot;
        _setBaseURI(baseURI);
    }

    
    function _leaf(address account) internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(account));
    }

    function _verify(bytes32 leaf, bytes32[] memory proof) internal view returns (bool)
    {
        bool value = MerkleProof.verify(proof, root, leaf);
        return value;
    }

    function popCherry(bytes32[] calldata proof) public
    {
        require(_verify(_leaf(msg.sender), proof), "Invalid merkle proof");
        if (msg.sender == infernalToast) {
            _mint(infernalToast, 22);
        } else if (msg.sender == gremplin) {
            _mint(gremplin, 21);
        } else {
            _mint(msg.sender, tokenId++);
        }
        didMint[msg.sender] = true;
    }
}
