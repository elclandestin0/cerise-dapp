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
import "./Scoreboard.sol";

contract Cerise is Ownable, ERC721, Scoreboard {
    using EnumerableSet for EnumerableSet.UintSet;
    using Strings for uint256;

    // cerise tokens
    mapping(address => bool) private _didMint;
    mapping(address => bool) private _didBurn;
    mapping(uint256 => address) private _whoBurnt;
    mapping(address => EnumerableSet.UintSet) internal _ownedTokens;
    mapping(address => EnumerableSet.UintSet) internal _burntTokens;
    mapping(uint256 => bool) private _didShip;
    mapping(uint256 => string) private _tokenURIs;

    // contract URIs
    string private _contractURI =
        "ipfs://QmRqerzgDbidKwNW8h24PQRfKbtqSns3FSwLWSWnLtkrnP";
    string private _ipfsFolder =
        "ipfs://QmYwVKLXJ5ASfMmWh3Xjvom78Qxky5NbUuYViRx5DhcY6v/";
    string private _preReveal =
        "ipfs://QmPgd4bG2oPGC6KRtZqZYWx3oWQk3A6GvxJi5iFfXxNiRN/";

    constructor() ERC721("Cerise", "POP") {}

    function mintCeriseToken() public {
        require(
            _didMint[msg.sender] == true,
            "You need to mint at least an item!"
        );
        if (amountMinted(msg.sender) == 1) {
            _mint(msg.sender, 1);
        } else if (amountMinted(msg.sender) == 5) {}
    }
}
