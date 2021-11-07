import React, {FC, ReactElement} from 'react';
import { DappInputI, DappPutI , DappErrputI, DappDescputI, DappInteractputI, DappOutputI, DappOracleputI} from '../DappPutType';
import {DappInput} from "../DappInput";
import {DappOutput} from "../DappOutput";
import { DappDescput } from '../DappDescput';
import {DappInteractput} from "../DappInteractput";
import {DappErrput} from "../DappErrput";
import {DappOracleput} from "../DappOracleput";

export type DappPutProps = {
    put : DappPutI,
    index : number,
    setPut ? : (put : DappPutI, index : number)=>void
}

export const DappPut : FC<DappPutProps>  = ({
    put,
    index,
    setPut
}) =>{

    const handleSetPut = (put : DappPutI)=>{

        setPut && setPut(put, index);

    }

    switch(put.putType){

        case ("input") :{

            return (
                <DappInput  dappInput={put as DappInputI} setInput={handleSetPut}/>
            )

        }

        case ("output") :{

            return (
                <DappOutput  dappOutput={put as DappOutputI}/>
            )

        }

        case ("error") : {

            return (
                <DappErrput dappErrput={put as DappErrputI}/>
            )

        }

        case ("interactive") : {

            return (
                <DappInteractput dappInteractput={put as DappInteractputI}/>
            )

        }

        case ("oracle") : {
            
            return (
                <DappOracleput dappOracleput={put as DappOracleputI}/>
            )

        }

        default : {
            return (
                <DappDescput dappDescput={put as DappDescputI}/>
            )
        }

    }

}