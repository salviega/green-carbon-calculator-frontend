// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/utils/Counters.sol';
import 'erc721b/contracts/extensions/ERC721BStaticTokenURI.sol';

interface ITCO2Faucet {
	function withdraw(address _erc20Address, uint256 _amount) external;
}

interface ITCO2Token {
	function retire(uint256 amount) external;
}

contract Footprint is ERC721BStaticTokenURI {
	/**
	 * Network: Mumbai
	 * name: TCO2Faucet
	 * Address: 0x996b39698CF96A70B7a7005B5d1924a66C5E8f0e
	 * name: TCO2Token
	 * Address: 0xa5831eb637dff307395b5183c86B04c69C518681
	 */

	/**
	 * Network: Alfajores
	 * name: TCO2Faucet
	 * Address: 0x0B8F280Df5ca109E702Ea27266aDb0705bfaCF01
	 * name: TCO2Token
	 * Address: 0xB297F730E741a822a426c737eCD0F7877A9a2c22
	 */

	using Counters for Counters.Counter;

	Counters.Counter public _tokenIdCounter;

	string public name;
	string public symbol;

	ITCO2Faucet TCO2FaucetExtense;
	ITCO2Token TCO2TokenExtense;

	mapping(address => uint256) public balances;
	mapping(address => uint256) public crowfunding;
	mapping(address => uint256) public charity;

	event Minted(address indexed _to, uint256 indexed _tokenId, string _uri);

	constructor(
		address _TCO2Faucet,
		address _TCO2Token,
		string memory _name,
		string memory _symbol
	) {
		name = _name;
		symbol = _symbol;
		TCO2FaucetExtense = ITCO2Faucet(_TCO2Faucet);
		TCO2TokenExtense = ITCO2Token(_TCO2Token);
	}

	receive() external payable {
		balances[msg.sender] += msg.value;
	}

	function withdraw() external {
		require(balances[msg.sender] > 0, "You don't have funds in the calculator");

		(bool response /*byte data*/, ) = msg.sender.call{
			value: balances[msg.sender]
		}('');
		require(response, 'Reverted transaction');

		balances[msg.sender] = 0;
	}

	function mintNetZeroCertificate(
		uint256 _CO2Emission,
		string memory _uri
	) external {
		uint256 startGas = gasleft();

		TCO2FaucetExtense.withdraw(address(TCO2TokenExtense), _CO2Emission);
		TCO2TokenExtense.retire(_CO2Emission);

		_tokenIdCounter.increment();
		uint256 tokenId = _tokenIdCounter.current();

		_safeMint(msg.sender, 1);
		_setTokenURI(tokenId, _uri);

		uint256 gasUsed = startGas - gasleft();
		uint256 gasCost = tx.gasprice * gasUsed;

		require(
			balances[msg.sender] >= gasCost,
			'Insufficient balance to cover gas cost'
		);

		crowfunding[msg.sender] += gasCost;
		balances[msg.sender] -= gasCost;

		emit Minted(msg.sender, tokenId, _uri);
	}

	function donate(uint256 _tokenId) public payable {
		uint256 crowfundingFunds = crowfunding[ownerOf(_tokenId)];
		uint256 charityFunds = charity[ownerOf(_tokenId)];

		require(crowfundingFunds > charityFunds, 'The donations are not open');

		uint256 funding = crowfundingFunds - charityFunds;
		require(msg.value <= funding, 'The collection is complete');

		charity[ownerOf(_tokenId)] += msg.value;
		balances[msg.sender] += msg.value;
	}

	function supportsInterface(
		bytes4 interfaceId
	) public view virtual override(ERC721B, IERC165) returns (bool) {
		return
			interfaceId == type(IERC721Metadata).interfaceId ||
			super.supportsInterface(interfaceId);
	}
}