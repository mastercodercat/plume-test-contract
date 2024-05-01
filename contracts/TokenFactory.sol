// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PlumeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenFactory {
    mapping(address => address[]) public deployedTokens;

    event TokenCreated(address tokenAddress, string tokenType);

    function createERC20(string memory _name, string memory _symbol, uint8 _decimals) public {
        PlumeERC20 token = new PlumeERC20(_name, _symbol, _decimals);
        deployedTokens[msg.sender].push(address(token));
        emit TokenCreated(address(token), "PlumeERC20");
    }

    function createERC721(string memory _name, string memory _symbol) public {
        ERC721 token = new ERC721(_name, _symbol);
        deployedTokens[msg.sender].push(address(token));
        emit TokenCreated(address(token), "ERC721");
    }

    function listTokensByAddress(address _address) public view returns (address[] memory) {
        return deployedTokens[_address];
    }
}
