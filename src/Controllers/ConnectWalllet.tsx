import React, {FC, ReactElement, useState} from 'react';
import {useOpenContractContext} from "../Models";
import { PredicateButton } from '../Components/Buttons/PredicateButton';
import { Colors } from '../Theme';
import {to} from "await-to-js";
import {Wallet} from "react-bootstrap-icons";
import { useEffect } from 'react';

export type ConnectWallletProps = {}

export const ConnectWalllet : FC<ConnectWallletProps>  = () =>{

    const {openContract} = useOpenContractContext();

    const [warning, setWarning] = useState("");
    const action = async ()=>{
        if(!openContract) setWarning("We're sorry. We've failed to load your Open Contract");
        else {
            const [err, result] =  await to(openContract.connectWallet());
            if(err) setWarning(err.message);
            setWarning("Your wallet should be connected.");
        }
    }

    const [signer, setSigner] = useState<string|undefined>(undefined);
    useEffect(()=>{
        if(openContract && openContract.walletConnected){
            openContract.signer.getAddress()
            .then((add)=>{
                setSigner(add)
            });
        }
    }, [openContract])

    return (

        openContract && openContract.walletConnected ?
        <div style={{
            display : ""
        }}>
            <Wallet color={Colors.Maintheme}/>
            {signer && <p><span>Contract: </span><a href={signer}>{signer}</a></p>}
            <p><span>Contract: </span><a href={openContract.explortURL(openContract.contract.address)}>{openContract.contract.address}</a></p>
        </div>
        : <PredicateButton
            action={action}
            Warning={warning}
            primaryColor={Colors.Maintheme} secondaryColor={"white"}>
            Connect Wallet&ensp;<Wallet color={Colors.Maintheme}/>
        </PredicateButton>

    )

}