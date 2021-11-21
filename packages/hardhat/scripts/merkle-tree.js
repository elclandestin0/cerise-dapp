const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");
const ownerz = require("../cryptoadz-ownerz-balances-snapshot.json");
const leaves = ownerz.map((owner) => SHA256(owner));

const merkleTree = new MerkleTree(leaves, SHA256);

console.log("finished creating merkle tree");
const root = merkleTree.getRoot().toString("hex");
const goodLeaf = SHA256("0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17");
const badLeaf = SHA256("0xCBAb6505F1521029278c2382c1De3B46102cB1B6");

const goodProof = merkleTree.getProof(goodLeaf);
const badProof = merkleTree.getProof(badLeaf);

console.log(merkleTree.verify(goodProof, goodLeaf, root));

console.log(merkleTree.verify(badProof, badLeaf, root));
