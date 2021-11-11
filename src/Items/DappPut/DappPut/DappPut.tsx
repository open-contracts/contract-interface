import React, {FC, ReactElement} from 'react';
import { DappInputI, DappPutI , DappErrputI, DappDescputI, DappInteractputI, DappOutputI, DappOracleputI, DappResultputI, DappOracleInputI} from '../DappPutType';
import {DappInput} from "../DappInput";
import {DappOutput} from "../DappOutput";
import { DappDescput } from '../DappDescput';
import {DappInteractput} from "../DappInteractput";
import {DappErrput} from "../DappErrput";
import {DappOracleput} from "../DappOracleput";
import { DappResultput } from '../DappResultput';
import {DappOracleInput} from "../DappOracleInput";

export type DappPutProps = {
    put : DappPutI,
    index : number,
    contractFunction : OpenContractFunctionI,
    setContractFunction ? : (contractFunction : OpenContractFunctionI)=>void
    end ? : boolean
}

export const DappPut : FC<DappPutProps>  = ({
    put,
    index,
    contractFunction,
    setContractFunction,
    end
}) =>{

    switch(put.putType){

        case ("input") :{

            return (
                <DappInput   
                dappInput={put as DappInputI} 
                contractFunction={contractFunction}
                setContractFunction={setContractFunction}/>
            )

        }

        case ("output") :{

            return (
                <DappOutput 
                dappOutput={put as DappOutputI} 
                contractFunction={contractFunction}
                setContractFunction={setContractFunction}/>
            )

        }

        case ("error") : {

            return (
                <DappErrput 
                dappErrput={put as DappErrputI}
                contractFunction={contractFunction}
                setContractFunction={setContractFunction}/>
            )

        }

        case ("interactive") : {

            return (
                <DappInteractput 
                dappInteractput={put as DappInteractputI}
                contractFunction={contractFunction}
                setContractFunction={setContractFunction}/>
            )

        }

        case ("oracle") : {
            
            return (
                <DappOracleput 
                dappOracleput={put as DappOracleputI}
                contractFunction={contractFunction}
                setContractFunction={setContractFunction}/>
            )

        }

        case ("result") : {
            return (
                <DappResultput 
                dappResultput={put as DappResultputI}
                contractFunction={contractFunction}
                setContractFunction={setContractFunction}/>
            )
        }

        case ("oracle-input") : {
            return (
                <DappOracleInput 
                index={index}
                dappOracleInput={put as DappOracleInputI}
                contractFunction={contractFunction}
                setContractFunction={setContractFunction}/>
            )
        }

        default : {
            return (
                <DappDescput 
                dappDescput={put as DappDescputI}
                contractFunction={contractFunction}
                setContractFunction={setContractFunction}/>
            )
        }

    }

}