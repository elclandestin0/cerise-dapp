pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

// hardhat
import "hardhat/console.sol";

// OpenZeppelin contracts
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract CherryToadz is Ownable, ERC721 {
    using Strings for uint256;

    // reveal
    bool public reveal = true;

    // Honorary members
    address public gremplin = 0x4298e663517593284Ad4FE199b21815BD48a9969;
    address public infernalToast = 0x7132C9f36abE62EAb74CdfDd08C154c9AE45691B;
    address public faorkh = 0xc5F59709974262c4AFacc5386287820bDBC7eB3A;
    address public moti = 0x8Bd8795CbeED15F8D5074f493C53b39C11Ed37B2;
    address public cerise = 0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17;

    // merkle root
    bytes32 immutable public root;

    // first tokenID
    uint256 public tokenId = 1;

    // Optional mapping for token URIs
    mapping(address => bool) public didMint;
    mapping(uint256 => string) private _tokenURIs;

    // contract URIs
    string private _contractURI = "ipfs://QmXSFC9Q47qhRQYiRDehc13RkErra6oWw9kZFFVe9EQQfS";
    string private _ipfsFolder = "ipfs://QmZpm9YF7HT7oqnbPPfdCDaRfdTHhFL6vD8SXzy4zYfYNo/";
    string private _baseURIextended = "ipfs://QmRHCfBzjeLBiB9CoUeRsn3FRAokqZSgH53qtZ52upDSki";

    constructor(bytes32 merkleRoot) ERC721("CherryToadz", "CTz") {
        root = merkleRoot;
    }

    // we set base URI and the overridden `_baseURI()` returns it
    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }

    // for opensea standards
    function contractURI() public view returns (string memory)
    {
        return _contractURI;
    }

    function popCherry(bytes32[] calldata proof) payable public 
    {
        require(didMint[msg.sender] == false, "Cannot mint more than once!");
        require(_verify(_leaf(msg.sender), proof), "Invalid merkle proof");
        require(msg.value == 0.08 ether, "Not enough funds!");
        if (msg.sender == infernalToast) {
            _pop(infernalToast, 22);
        } else if (msg.sender == gremplin) {
            _pop(gremplin, 21);
        } else if (msg.sender == cerise) {
            _pop(cerise, 25);
        } else {
            _pop(msg.sender, tokenId);
        }
        didMint[msg.sender] = true;
    }
    

    // the overridden _baseURI from ERC721
    function _baseURI() internal view virtual override returns (string memory) {
        return _ipfsFolder;
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

    function _pop(address _to, uint256 _tokenId) internal 
    {
            _mint(_to, _tokenId);
    }


    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual
    {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

}
