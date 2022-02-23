import React, {FC, ReactElement} from 'react';
import { AristophanesReady, AristophanesReadyStack, ReadyT } from '../../Components/Ready/AristophanesReady';
import {ethers} from "ethers";
import { useState } from 'react';
import { useEffect } from 'react';
import { Colors } from '../../Theme';
import { useOpenContractContext } from '../../Models';

export type ConnectionStatusProps = {
    style ? : React.CSSProperties,
    stack ? : boolean
}

export const ConnectionStatus : FC<ConnectionStatusProps>  = ({
    style,
    stack
}) =>{

    const {openContract} = useOpenContractContext();

    const [address, setAddress] = useState<string|undefined>(undefined);

    const _ready = openContract && openContract.walletConnected ? "ready" : "not ready";

    useEffect(()=>{

        if(_ready){
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();
            !address && signer.getAddress().then((address)=>{
                setAddress(address);
            })
        }

    }, [_ready])

    return (

        <>
           {stack ?
            (<AristophanesReadyStack 
                style={{
                    ...style
                }}
                right label={"Metamask"} ready={_ready} expressions={{
                ready : address
            }} />) :
            (<AristophanesReady 
                style={{
                    ...style
                }}
                right label={"Metamask"} ready={_ready} expressions={{
                ready : address
            }} />)
           }   
        </>

    )

}