// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Badge is ERC721URIStorage, Ownable {
    uint256 public tokenId;

    constructor() ERC721("Badge", "BDG") Ownable(msg.sender) {}

    function mint(address to, string memory tokenURI) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenId++;
    }
}