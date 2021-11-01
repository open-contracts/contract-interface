import React, {FC, ReactElement} from 'react';
import {ReadyT} from "../../Components/Ready/AristophanesReady";
import { CrtStep } from './CrtStep';
import {WalletStep} from "./WalletStep";
import {EnclaveStep} from "./EnclaveStep";

export const AllSteps = ["crt", "wallet", "enclave"];

export type StepsProps = {
    done ? : (which : string, success : boolean)=>void
    status ? : {[key in typeof AllSteps[number]] : ReadyT},
    which ? : typeof AllSteps[number],
}

export const Steps : FC<StepsProps>  = ({
    done,
    status = {
        crt : "not ready",
        wallet : "not ready",
        enclave : "not ready"
    },
    which  = "crt"
}) =>{

    const handleDone = (success : boolean)=>{
        done && done(which, success);
    }

    if(which === "crt"){

        return (
            <CrtStep ready={status[which]} done={handleDone}/>
        )

    }

    if(which === "wallet"){
        return (
            <WalletStep ready={status[which]} done={handleDone}/>
        )
    }

    if(which === "enclave"){
        return (
            <EnclaveStep ready={status[which]} done={handleDone}/>
        )
    }

    return (

        <>Step not found.</>

    )

}