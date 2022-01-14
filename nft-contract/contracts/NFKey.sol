// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./libs/Base64.sol";

contract NFKey is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 maxSupply = 10000;

    event NewNFKeyMinted(address sender, uint256 tokenId);

    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: sans-serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    constructor() ERC721("NFKey", "NFK") {}

    function mintNFKey() public {
        uint256 newItemId = _tokenIds.current();
        require(newItemId < maxSupply, "Max supply has been reached");

        string memory svgText = string(
            abi.encodePacked("NFKey #", Strings.toString(newItemId + 1))
        );

        string memory finalSvg = string(
            abi.encodePacked(baseSvg, svgText, "</text></svg>")
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        svgText,
                        '", "description": "An NFT that grants you access to exclusive resources", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
        emit NewNFKeyMinted(msg.sender, newItemId);
    }

    function getNftsByAddress(address walletAddress)
        external
        view
        returns (uint256[] memory)
    {
        uint256 nfKeysCount = balanceOf(walletAddress);

        uint256[] memory nfKeys = new uint256[](nfKeysCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (ownerOf(i) == walletAddress) {
                nfKeys[currentIndex] = i;
                currentIndex++;
            }
        }
        return nfKeys;
    }
}
