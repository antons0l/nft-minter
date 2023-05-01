pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 public constant MAX_SUPPLY = 10;
    uint256 public constant PRICE = 0.01 ether;
    uint256 public nextTokenId = 1;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint() external payable {
        require(nextTokenId <= MAX_SUPPLY, "All tokens have been minted");
        require(msg.value == PRICE, "Ether value sent is not correct");

        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}

