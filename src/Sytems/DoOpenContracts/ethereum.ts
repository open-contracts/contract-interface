import Web3 from "web3";

export const web3 = new Web3(Web3.givenProvider);
export const ethereum = web3.eth;
export type EthI = typeof ethereum;