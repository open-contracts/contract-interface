import { initEthereum } from "./ethereum"
import { OpenContractsInterface } from "./OpenContractsInterface";
import { allowHub, OpnHub, OpnToken} from "./opn";
import {ethers} from "ethers";
import {to} from "await-to-js";
import {connectToRegistry} from "./registry";

export const connectWallet = async () : Promise<{
    success : boolean,
    user? : ethers.providers.JsonRpcSigner
}>=>{

    const [error, provider] = await to(initEthereum());

    return {
        success : !error,
        user : provider ? provider.getSigner() : undefined
    }

}

export const checkRootCa = async () : Promise<boolean> =>{

    const ocInterface = await OpenContractsInterface();
    console.log(ocInterface);
    const provider = await initEthereum();
    const hub = OpnHub(
        ocInterface,
        "ropsten",
        provider
    );
    const token = OpnToken(
        ocInterface,
        "ropsten",
        provider,
    )
    
/*await allowHub(
        token,
        hub,
        3
    )*/
    
    const [error, ws] = await to(connectToRegistry(hub));

    return error ? false : true;

}

/*export const connectToEnclave = async () : Promise<{
    ws : WebSocket,
    success : boolean
}> =>{

}*/