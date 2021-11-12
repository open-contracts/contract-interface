import React, {FC, ReactElement} from 'react';
import { DappInputI, DappPutI , DappErrputI, DappDescputI, DappInteractputI, DappOutputI, DappOracleputI, DappResultputI, DappOracleInputI, DappCallputI} from '../DappPutType';
import {DappInput} from "../DappInput";
import {DappOutput} from "../DappOutput";
import { DappDescput } from '../DappDescput';
import {DappInteractput} from "../DappInteractput";
import {DappErrput} from "../DappErrput";
import {DappOracleput} from "../DappOracleput";
import { DappResultput } from '../DappResultput';
import {DappOracleInput} from "../DappOracleInput";
import { reduceContractFunctionI } from '../../DappFunction/StateMethods';
import { DappOracleCallput } from '../DappOracleCallput';

export type DappPutProps = {
    put : DappPutI,
    index : number,
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (reducer : reduceContractFunctionI)=>void
    end ? : boolean
}

export const DappPut : FC<DappPutProps>  = ({
    put,
    index,
    contractFunction,
    reduceContractFunction,
    end
}) =>{

    switch(put.putType){

        case ("input") :{

            return (
                <DappInput   
                dappInput={put as DappInputI} 
                contractFunction={contractFunction}
                reduceContractFunction={reduceContractFunction}/>
            )

        }

        case ("output") :{

            return (
                <DappOutput 
                dappOutput={put as DappOutputI} 
                contractFunction={contractFunction}
                reduceContractFunction={reduceContractFunction}/>
            )

        }

        case ("error") : {

            return (
                <DappErrput 
                dappErrput={put as DappErrputI}
                contractFunction={contractFunction}
                reduceContractFunction={reduceContractFunction}/>
            )

        }

        case ("callput") : {
            return (
                <DappOracleCallput
                    dappOracleCallput={put as DappCallputI}
                    contractFunction={contractFunction}
                    reduceContractFunction={reduceContractFunction}
                />
            )
        }

        case ("interactive") : {

            return (
                <DappInteractput 
                dappInteractput={put as DappInteractputI}
                contractFunction={contractFunction}
                reduceContractFunction={reduceContractFunction}/>
            )

        }

        case ("oracle") : {
            
            return (
                <DappOracleput 
                dappOracleput={put as DappOracleputI}
                contractFunction={contractFunction}
                reduceContractFunction={reduceContractFunction}/>
            )

        }

        case ("result") : {
            return (
                <DappResultput 
                dappResultput={put as DappResultputI}
                contractFunction={contractFunction}
                reduceContractFunction={reduceContractFunction}/>
            )
        }

        case ("oracle-input") : {
            return (
                <DappOracleInput 
                index={index}
                dappOracleInput={put as DappOracleInputI}
                contractFunction={contractFunction}
                reduceContractFunction={reduceContractFunction}/>
            )
        }

        default : {
            return (
                <DappDescput 
                dappDescput={put as DappDescputI}
                contractFunction={contractFunction}
                reduceContractFunction={reduceContractFunction}/>
            )
        }

    }

}