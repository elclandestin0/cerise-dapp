//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// OpenZeppelin contracts
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./IScoreboard.sol";

error MintTimeNotPublic();
error NotAnHonoraryToad();

contract CherryToadz is Ownable, ERC721 {
    using EnumerableSet for EnumerableSet.UintSet;
    using Strings for uint256;

    bool public reveal;

    // Honorary members
    address public gremplin = 0x4298e663517593284Ad4FE199b21815BD48a9969;
    address public infernalToast = 0x7132C9f36abE62EAb74CdfDd08C154c9AE45691B;
    address public farokh = 0xc5F59709974262c4AFacc5386287820bDBC7eB3A;
    address public moti = 0x8Bd8795CbeED15F8D5074f493C53b39C11Ed37B2;
    address public cerise = 0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17;
    address public cozomo = 0xCe90a7949bb78892F159F428D0dC23a8E3584d75;

    // scoreboard
    IScoreboard internal _scoreboard;

    // to payout to
    address public save_the_children =
        0xF84a7177E59F4A07799E36043b749E8D0c57AF11;
    address public we_are_studios = 0xCBAb6505F1521029278c2382c1De3B46102cB1B6;
    uint256 public honorary_mint_time;
    uint256 public toadz_mint_sale_begin_time;

    // first tokenID
    uint256 public tokenId = 7;

    mapping(address => uint256) public mintAmount;
    mapping(address => bool) public didMint;
    mapping(address => bool) public didBurn;
    mapping(uint256 => address) public whoBurnt;
    mapping(uint256 => bool) public didShip;
    mapping(uint256 => string) private _tokenURIs;

    mapping(address => EnumerableSet.UintSet) internal _ownedTokens;
    mapping(address => EnumerableSet.UintSet) internal _burntTokens;
    // contract URIs
    string private _contractURI =
        "ipfs://QmRqerzgDbidKwNW8h24PQRfKbtqSns3FSwLWSWnLtkrnP";
    string private _ipfsFolder =
        "ipfs://QmYwVKLXJ5ASfMmWh3Xjvom78Qxky5NbUuYViRx5DhcY6v/";
    string private _preReveal =
        "ipfs://QmPgd4bG2oPGC6KRtZqZYWx3oWQk3A6GvxJi5iFfXxNiRN/";

    constructor(address _score) ERC721("CherryToadz", "CTz") {
        _scoreboard = IScoreboard(_score);
    }

    // for opensea standards
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function ownedTokens() public view returns (uint256[] memory) {
        return _ownedTokens[msg.sender].values();
    }

    function burntTokens() public view returns (uint256[] memory) {
        return _burntTokens[msg.sender].values();
    }

    // payout
    function pay() public payable onlyOwner {
        payable(save_the_children).transfer((address(this).balance * 50) / 100);
        payable(we_are_studios).transfer((address(this).balance * 50) / 100);
    }

    function popCherry() public payable {
        // require(tokenId < 22, "Max amount of tokens reached!");
        // require(msg.value == 0.1 ether, "Not enough funds!");
        // require(mintAmount[msg.sender] < 4, "You can only mint four items!");
        // if (msg.sender == infernalToast && !didMint[infernalToast]) {
        //     _pop(infernalToast, 5);
        // } else if (msg.sender == owner()) {
        //     _pop(cerise, 6);
        // } else if (
        //     honorary_mint_time != 0 && block.timestamp > honorary_mint_time
        // ) {
        //     if (msg.sender == gremplin && !didMint[gremplin]) {
        //         _pop(gremplin, 1);
        //     } else if (msg.sender == cozomo && !didMint[cozomo]) {
        //         _pop(cozomo, 3);
        //     } else if (msg.sender == moti && !didMint[moti]) {
        //         _pop(moti, 2);
        //     } else if (msg.sender == farokh && !didMint[farokh]) {
        //         _pop(farokh, 4);
        //     }
        //     revert NotAnHonoraryToad();
        // } else if (toadz_mint_sale_begin_time == 0) {
        //     revert MintTimeNotPublic();
        // } else {
        _pop(msg.sender, tokenId++);
        // }
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
        _scoreboard.countBurn();
        _burntTokens[msg.sender].add(id);
        _ownedTokens[msg.sender].remove(id);
        didBurn[msg.sender] = true;
    }

    // only the owner can change the baseURI
    function revealTokens() public onlyOwner {
        reveal = true;
    }

    function isPublicSale() external view returns (bool) {
        return block.timestamp > toadz_mint_sale_begin_time;
    }

    function canShip(
        uint256 _tokenId,
        bytes32 _hash,
        bytes memory _signature
    ) public view returns (bool) {
        return
            didBurn[msg.sender] && _burntTokens[msg.sender].contains(_tokenId);
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

    function _pop(address _to, uint256 _tokenId) internal {
        // mint and declare that the user has minted
        _mint(_to, _tokenId);
        didMint[_to] = true;

        // count how many tokens our user has minted
        uint256 amount = mintAmount[msg.sender] + 1;
        mintAmount[msg.sender] = amount;
        _scoreboard.countMint();
        // _ownedTokens[msg.sender].add(_tokenId);
    }

    function score() public view returns (uint256) {
        return _scoreboard.amountMinted();
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
        _ownedTokens[_from].remove(_tokenId);
        _ownedTokens[_to].add(_tokenId);
    }
}
