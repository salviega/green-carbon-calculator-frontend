/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITCO2Token, ITCO2TokenInterface } from "../ITCO2Token";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "retire",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ITCO2Token__factory {
  static readonly abi = _abi;
  static createInterface(): ITCO2TokenInterface {
    return new utils.Interface(_abi) as ITCO2TokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITCO2Token {
    return new Contract(address, _abi, signerOrProvider) as ITCO2Token;
  }
}
