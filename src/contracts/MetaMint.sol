// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaMint is ERC721Enumerable, Ownable {
   using Strings for uint256; //convert signed int to string

   string baseURI;
   string public baseImage = ".webp";
   string public baseExtension = ".json";
   uint256 public cost = 0.001 ether;
   uint256 public maxSupply = 99;
   bool public paused = false;

   event Sale (
    uint256 id,
    address indexed buyer,
    uint256 cost,
    string indexed tokenURI,
    uint256 timestamp
   );

   struct SaleStruct {
    uint256 id;
    address buyer;
    uint256 cost;
    string imageURL;
    uint256 timestamp;
   }

   SaleStruct[] minted;

   constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
}

    function payToMint() public payable {
        uint256 supply = totalSupply();
        
        require(!paused, "NFTs under maintenance!");
        require(supply <= maxSupply, "Sorry, all NFTs have been minted!");
        require(msg.value > 0 ether, "Ether too low for minting!");

        if(msg.sender != owner()){
            require(msg.value >= cost, "Please top up ethers");
        }

        _safeMint(msg.sender, supply+1); //this function mints an NFT (Present inside ERC721.sol)

        minted.push(
            SaleStruct(
                supply+1,
                msg.sender,
                msg.value,
                toImage(supply+1),
                block.timestamp
            )
        );

        emit Sale(supply+1, msg.sender, msg.value, tokenURI(supply+1), block.timestamp);
    }

    //This function converts a token ID to an image
    function toImage(uint256 tokenId) internal view returns (string memory) {
       string memory currentBaseURI = _baseURI();
       return bytes(currentBaseURI).length > 0
           ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseImage))
           : "";
    }

    //This function converts a string to a tokenURI
    function tokenURI(uint256 tokenId)
        public view virtual override returns (string memory)
        {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
            : "";
    }

    //Display all NFTs
    function getAllNFTs() public view returns (SaleStruct[] memory) {
        return minted;
    }

    //Display a specific NFT
    function getAnNFTs(uint256 tokenId) public view returns (SaleStruct memory) {
        return minted[tokenId - 1];
    }

    function payTo(address to, uint256 amount) public onlyOwner {
        (bool success1, ) = payable(to).call{value: amount}("");
        require(success1);
    }

    //change the baseURI 
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    //Pause the contract in case we want to add some other NFTs to the collection
    function setPause(bool _state) public onlyOwner {
        paused = _state;
    }
    //Returns the baseURI
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }




}

