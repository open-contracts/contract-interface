import { reject } from "q";
import ws, {MessageEvent} from "ws"
import { getRegistryIp, OpnHubI } from "./opn";

const get_enclave_ip = "get_enclave_ip";

export interface OpenRegistryReturnsI {
    MessageEvent : MessageEvent,
    ws : WebSocket
}

export interface EnclaveIpEventDataI {
    fname : typeof get_enclave_ip,
    ip : string
}

/**
 * Opens a socket connection with the Registry.
 * @param registryIp the Registry's Ip
 * @returns 
 */
export const openRegistrySocket = async (registryIp : string) : Promise<{
    event : Event,
    ws : WebSocket
}>=>{

    return new Promise((resolve, reject)=>{

        const ws = new WebSocket(`wss://${registryIp}:8080/`);

        ws.onopen = (event : Event)=>{

            resolve({
                event : event,
                ws : ws
            });
        }

        ws.onerror = (ee)=>{
            reject(ee);
        }

    })

}

export const connectToRegistry = async (
    hub : OpnHubI
) : Promise<WebSocket>=>{

    const registryIp = await getRegistryIp(hub);

    const {
        ws
    } = await openRegistrySocket(registryIp);

    return ws;

}

/**
 * Makes a request for the Registry attestation.
 * @param ws 
 * @returns 
 */
export const requestEnclaveIp = (ws : WebSocket)=>{

    return  ws.send(JSON.stringify({fname: 'get_Enclave_ip'}));

}

/**
 * Whether an MessageEvent is an Enclave ip.
 * @param MessageEvent 
 * @returns 
 */
export const isEnclaveIpEvent = (event : any) : event is globalThis.MessageEvent<EnclaveIpEventDataI>=>{

    return (event as any)["data"]["fname"] === "return_Enclave_ip";

}

export interface ReceiveEncalveAttestationReturnsI{
    MessageEvent : MessageEvent, 
    ws : WebSocket
}

/**
 * 
 * @param ws 
 * @returns 
 */
export const receiveEnclaveIp = (ws : WebSocket) : Promise<string>=>{

    return new Promise((resolve, request)=>{

        ws.onmessage = (event : globalThis.MessageEvent)=>{

            if(isEnclaveIpEvent(event)){
                resolve(event.data.ip);
            }

        }

        ws.onerror = (ee)=>{
            reject(ee);
        }

    })

}

/**
 * 
 * @param ws 
 * @returns
 */
export const getEnclaveIp = async (ws : WebSocket)=>{

    requestEnclaveIp(ws);
    return await receiveEnclaveIp(ws);

}