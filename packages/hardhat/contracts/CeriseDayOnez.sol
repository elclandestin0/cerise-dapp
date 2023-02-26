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
import "./IScoreboard.sol";

contract CeriseDayOnez is Ownable, ERC1155 {
    using EnumerableSet for EnumerableSet.UintSet;
    using Strings for uint256;

    IScoreboard internal _scoreboard;

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

    constructor(address _score) ERC1155("") {
        _scoreboard = IScoreboard(_score);
    }

    function mintSockz() public {
        console.log(_scoreboard.amountMinted(msg.sender));
        require(
            _scoreboard.amountMinted(msg.sender) >= 1,
            "Not enough points!"
        );
        require(sockzAmount > 0, "Out of sockz!");
        _mint(msg.sender, SOCKZ, 1, "");
        sockzAmount--;
    }

    function mintTuque() public {
        require(
            _scoreboard.amountMinted(msg.sender) >= 5,
            "Not enough points!"
        );
        require(tuqueAmount > 0, "Out of tuques!");
        _mint(msg.sender, TUQUE, 1, "");
        tuqueAmount--;
    }

    function mintTee() public {
        require(
            _scoreboard.amountMinted(msg.sender) >= 25,
            "Not enough points!"
        );
        require(teeAmount > 0, "Out of tees!");
        _mint(msg.sender, TEE, 1, "");
        tuqueAmount--;
    }

    function mintHoodie() public {
        require(
            _scoreboard.amountMinted(msg.sender) >= 50,
            "Not enough points!"
        );
        require(hoodieAmount > 0, "Out of hoodies!");
        _mint(msg.sender, HOODIE, 1, "");
        hoodieAmount--;
    }

    function mintPantz() public {
        require(
            _scoreboard.amountMinted(msg.sender) >= 75,
            "Not enough points!"
        );
        require(pantzAmount > 0, "Out of pantz!");
        _mint(msg.sender, PANTZ, 1, "");
        pantzAmount--;
    }

    function mintJacket() public {
        require(
            _scoreboard.amountMinted(msg.sender) >= 100,
            "Not enough points!"
        );
        require(jacketAmount > 0, "Out of jackets!");
        _mint(msg.sender, JACKET, 1, "");
        jacketAmount--;
    }
}
