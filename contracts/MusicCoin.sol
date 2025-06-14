// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "hardhat/console.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MusicCoin is ERC20, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("MusicCoin", "MC")
        Ownable(initialOwner)
        ERC20Permit("MusicCoin")
    {}

    /// Nur der Owner darf Tokens vergeben
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /// Käufer zahlt an den Owner
    function payToOwner(address from, uint256 amount) public {
        address shopOwner = owner();
        require(
            allowance(from, msg.sender) >= amount,
            "Not enough allowance"
        );
        require(
            balanceOf(from) >= amount,
            "Not enough balance"
        );
        _transfer(from, shopOwner, amount);
    }
}
