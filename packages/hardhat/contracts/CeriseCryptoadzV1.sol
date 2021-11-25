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
    address public faorkh = 0xc5f59709974262c4afacc5386287820bdbc7eb3a;
    address public moti = 0x8bd8795cbeed15f8d5074f493c53b39c11ed37b2;
    bytes32 immutable public root;
    uint256 public tokenId = 1;
    mapping(address => bool) public didMint;
    // modifiers
    
    modifier onlyMintOnce() {
        require(didMint[msg.sender] == true, "Cannot mint more than once!");
        _;
    }

    constructor(bytes32 merkleRoot) ERC721("CeriseToadz", "CTz") {
        root = merkleRoot;
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

    function popCherry(bytes32[] calldata proof) onlyMintOnce public
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
