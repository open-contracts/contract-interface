import React, {FC, ReactElement} from 'react';
import { AristophanesReady, AristophanesReadyStack, ReadyT } from '../../Components/Ready/AristophanesReady';
import {ethers} from "ethers";
import { useState } from 'react';
import { useEffect } from 'react';
import { Colors } from '../../Theme';

export type ConnectionStatusProps = {
    wallet ? : ReadyT,
    style ? : React.CSSProperties,
    stack ? : boolean
}

export const ConnectionStatus : FC<ConnectionStatusProps>  = ({
    wallet,
    style,
    stack
}) =>{

    const [address, setAddress] = useState<string|undefined>(undefined);

    useEffect(()=>{

        if(wallet === "ready"){
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();
            !address && signer.getAddress().then((address)=>{
                setAddress(address);
            })
        }

    }, [wallet])

    return (

        <>
           {stack ?
            (<AristophanesReadyStack 
                style={{
                    ...style
                }}
                right label={"Metamask"} ready={wallet} expressions={{
                ready : address
            }} />) :
            (<AristophanesReady 
                style={{
                    ...style
                }}
                right label={"Metamask"} ready={wallet} expressions={{
                ready : address
            }} />)
           }   
        </>

    )

}