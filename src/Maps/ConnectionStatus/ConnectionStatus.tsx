import React, {FC, ReactElement} from 'react';
import { AristophanesReady, ReadyT } from '../../Components/Ready/AristophanesReady/AristophanesReady';
import {ethers} from "ethers";
import { useState } from 'react';
import { useEffect } from 'react';
import { Colors } from '../../Theme';

export type ConnectionStatusProps = {
    wallet ? : ReadyT,
}

export const ConnectionStatus : FC<ConnectionStatusProps>  = ({
    wallet,
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

        <div style={{
            display : "flex",
            height : "100%",
            alignContent : "center",
            alignItems : "center",
            justifyItems : "right",
            justifyContent : "right",
            textAlign : "right"
        }}>

            <AristophanesReady right label={"Metamask"} ready={wallet} expressions={{
                ready : address
            }} />
              
        </div>

    )

}