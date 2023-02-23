//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// OpenZeppelin contracts
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./Scoreboard.sol";

contract CeriseDayOnez is Ownable, ERC1155, Scoreboard {
    using EnumerableSet for EnumerableSet.UintSet;
    using Strings for uint256;

    // cerise tokens
    mapping(uint256 => bool) private _didShip;
    mapping(uint256 => string) private _tokenURIs;

    uint256 public constant TUQUE = 0;
    uint256 public constant SOCKZ = 1;
    uint256 public constant TEE = 2;
    uint256 public constant HOODIE = 3;
    uint256 public constant PANTZ = 4;
    uint256 public constant JACKET = 5;

    uint256 public sockzAmount = 25;
    uint256 public tuqueAmount = 15;
    uint256 public teeAmount = 10;
    uint256 public hoodieAmount = 5;
    uint256 public pantzAmount = 2;
    uint256 public jacketAmount = 1;

    // contract URIs
    string private _contractURI =
        "ipfs://QmRqerzgDbidKwNW8h24PQRfKbtqSns3FSwLWSWnLtkrnP";
    string private _ipfsFolder =
        "ipfs://QmYwVKLXJ5ASfMmWh3Xjvom78Qxky5NbUuYViRx5DhcY6v/";
    string private _preReveal =
        "ipfs://QmPgd4bG2oPGC6KRtZqZYWx3oWQk3A6GvxJi5iFfXxNiRN/";

    constructor() ERC1155("") {}

    function mintCeriseToken() public {
        if (amountMinted() == 1 && sockzAmount > 0) {
            _mint(msg.sender, TUQUE, 1, "");
            sockzAmount--;
        } else if (amountMinted() == 5 && tuqueAmount > 0) {
            _mint(msg.sender, SOCKZ, 1, "");
            tuqueAmount--;
        } else if (amountMinted() == 25 && teeAmount > 0) {
            _mint(msg.sender, TEE, 1, "");
            teeAmount--;
        } else if (amountMinted() == 50 && hoodieAmount > 0) {
            _mint(msg.sender, HOODIE, 1, "");
            hoodieAmount--;
        } else if (amountMinted() == 75 && pantzAmount > 0) {
            _mint(msg.sender, PANTZ, 1, "");
            pantzAmount--;
        } else if (amountMinted() == 100 && jacketAmount > 0) {
            _mint(msg.sender, JACKET, 1, "");
            jacketAmount--;
        }
    }
}
