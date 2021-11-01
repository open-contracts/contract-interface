import { ethers } from "ethers";

export interface OpnTokenI{
    gimmeSomeMoreOfDemCoins():Promise<void>
}

export const OpnToken = () : OpnTokenI=>{
    return new ethers.
}

/**
 * Gets more OPN tokens and adds them to user's wallet.
 */
export const getOpnTokens = async (opnToken : OpnTokenI)=>{
    await opnToken.gimmeSomeMoreOfDemCoins();
}

/**
 * 
 */