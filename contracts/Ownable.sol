//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Ownable {
    address public owner;

    modifier onlyOwner() {
        // Requiere que en msg.sender (variable global para ver quién 
        // envía la transacción) esté el owner del contrato
        require(msg.sender == owner, "No es el owner");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner; 
    }

}