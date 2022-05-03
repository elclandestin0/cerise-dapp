//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// OpenZeppelin contracts
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

error MintTimeNotPublic();

contract CherryToadz is Ownable, ERC721 {
    using Strings for uint256;

    bool public reveal;

    // Honorary members
    address public gremplin = 0x4298e663517593284Ad4FE199b21815BD48a9969;
    address public infernalToast = 0x7132C9f36abE62EAb74CdfDd08C154c9AE45691B;
    address public farokh = 0xc5F59709974262c4AFacc5386287820bDBC7eB3A;
    address public moti = 0x8Bd8795CbeED15F8D5074f493C53b39C11Ed37B2;
    address public cerise = 0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17;
    address public cozomo = 0xCe90a7949bb78892F159F428D0dC23a8E3584d75;

    // to payout to
    address public save_the_children =
        0xF84a7177E59F4A07799E36043b749E8D0c57AF11;
    address public we_are_studios = 0xCBAb6505F1521029278c2382c1De3B46102cB1B6;
    uint256 public honorary_mint_time;
    uint256 public toadz_mint_sale_begin_time;

    // merkle root
    bytes32 public immutable root;

    // first tokenID
    uint256 public tokenId = 7;

    // Optional mapping for token URIs
    mapping(address => uint256) public mintAmount;
    mapping(address => bool) public didMint;
    mapping(address => bool) public didBurn;
    mapping(address => uint256) public tokenOwned;
    mapping(uint256 => address) public whoBurnt;
    mapping(uint256 => string) private _tokenURIs;

    // contract URIs
    string private _contractURI =
        "ipfs://QmRqerzgDbidKwNW8h24PQRfKbtqSns3FSwLWSWnLtkrnP";
    string private _ipfsFolder =
        "ipfs://QmYwVKLXJ5ASfMmWh3Xjvom78Qxky5NbUuYViRx5DhcY6v/";
    string private _preReveal =
        "ipfs://QmPgd4bG2oPGC6KRtZqZYWx3oWQk3A6GvxJi5iFfXxNiRN/";

    constructor(bytes32 merkleRoot) ERC721("CherryToadz", "CTz") {
        root = merkleRoot;
    }

    // for opensea standards
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    // payout
    function pay() public payable onlyOwner {
        payable(save_the_children).transfer((address(this).balance * 50) / 100);
        payable(we_are_studios).transfer((address(this).balance * 50) / 100);
    }

    function popCherry(bytes32[] calldata proof) public payable {
        require(tokenId < 22, "Max amount of tokens reached!");
        require(_verify(_leaf(msg.sender), proof), "You don't own a toad!");
        require(msg.value == 0.2 ether, "Not enough funds!");
        require(mintAmount[msg.sender] < 4, "You can only mint four items!");
        _pop(infernalToast, 5);
        if (honorary_mint_time != 0 && block.timestamp > honorary_mint_time) {
            if (
                msg.sender == gremplin &&
                !didMint[gremplin] &&
                honorary_mint_time != 0
            ) {
                _pop(gremplin, 1);
            } else if (msg.sender == cozomo && !didMint[cozomo]) {
                _pop(cozomo, 3);
            } else if (msg.sender == moti && !didMint[moti]) {
                _pop(moti, 2);
            } else if (msg.sender == farokh && !didMint[farokh]) {
                _pop(farokh, 4);
            } else if (msg.sender == cerise && !didMint[cerise]) {
                _pop(cerise, 6);
            }
        } else if (
            toadz_mint_sale_begin_time != 0 &&
            block.timestamp > toadz_mint_sale_begin_time
        ) {
            _pop(msg.sender, tokenId++);
        } else {
            revert MintTimeNotPublic();
        }
    }

    function setToadzMintTime(uint256 timestamp) public onlyOwner {
        toadz_mint_sale_begin_time = timestamp;
    }

    function setHonoraryMintTime(uint256 timestamp) public onlyOwner {
        honorary_mint_time = timestamp;
    }

    function burn(uint256 id) public {
        require(
            ownerOf(id) == msg.sender,
            "Only the owner of the token can burn"
        );
        require(didBurn[msg.sender] == false, "You can't burn a burnt token!");
        _burn(id);
        didBurn[msg.sender] = true;
    }

    // only the owner can change the baseURI
    function revealTokens() public onlyOwner {
        reveal = true;
    }

    function isPublicSale() external view returns (bool) {
        return block.timestamp > toadz_mint_sale_begin_time;
    }

    // the overridden _baseURI from ERC721
    function _baseURI() internal view virtual override returns (string memory) {
        if (reveal == false) {
            return _preReveal;
        } else {
            return _ipfsFolder;
        }
    }

    function _leaf(address account) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(account));
    }

    function _verify(bytes32 leaf, bytes32[] memory proof)
        internal
        view
        returns (bool)
    {
        bool value = MerkleProof.verify(proof, root, leaf);
        return value;
    }

    function _pop(address _to, uint256 _tokenId) internal {
        // mint and declare that the user has minted
        _mint(_to, _tokenId);
        didMint[msg.sender] = true;

        // count how many tokens our user has minted
        uint256 amountMinted = mintAmount[msg.sender] + 1;
        mintAmount[msg.sender] = amountMinted;
        tokenOwned[msg.sender] = _tokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual override {
        delete tokenOwned[_from];
        tokenOwned[_to] = _tokenId;
    }
}
