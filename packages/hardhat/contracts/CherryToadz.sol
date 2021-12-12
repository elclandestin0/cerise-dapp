pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

// hardhat
import "hardhat/console.sol";

// OpenZeppelin contracts
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract CherryToadz is Ownable, ERC721URIStorage {
    address public gremplin = 0x4298e663517593284Ad4FE199b21815BD48a9969;
    address public infernalToast = 0x7132C9f36abE62EAb74CdfDd08C154c9AE45691B;
    address public faorkh = 0xc5F59709974262c4AFacc5386287820bDBC7eB3A;
    address public moti = 0x8Bd8795CbeED15F8D5074f493C53b39C11Ed37B2;
    bytes32 immutable public root;
    uint256 public tokenId = 1;
    mapping(address => bool) public didMint;
    string private _contractURI = "ipfs://QmXSFC9Q47qhRQYiRDehc13RkErra6oWw9kZFFVe9EQQfS";
    // string private baseURI = "ipfs://QmTytkTWUK7ULDhzza8zshmWx9ekwtLxrAqdkpUYm56LBs";

    constructor(bytes32 merkleRoot) ERC721("CherryToadz", "CTz") {
        root = merkleRoot;
        // setBaseURI(baseURI);
    }
    

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        _setTokenURI(tokenId, _tokenURI);
    }

    function contractURI() public view returns (string memory)
    {
        return _contractURI;
    }

    // //Set Base URI
    // function setBaseURI(string memory _baseURI) 
    //     external 
    //     onlyOwner 
    // {
    //     _setBaseURI(_baseURI);
    // }
    
    function _leaf(address account) internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(account));
    }

    function _verify(bytes32 leaf, bytes32[] memory proof) internal view returns (bool)
    {
        bool value = MerkleProof.verify(proof, root, leaf);
        return value;
    }

    function popCherry(bytes32[] calldata proof) payable public 
    {
        require(didMint[msg.sender] == false, "Cannot mint more than once!");
        require(_verify(_leaf(msg.sender), proof), "Invalid merkle proof");
        require(msg.value == 0.08 ether, "Not enough funds!");
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
