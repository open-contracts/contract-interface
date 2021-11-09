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
    setPut ? : (put : DappPutI, index : number)=>void,
    end ? : boolean
}

export const DappPut : FC<DappPutProps>  = ({
    put,
    index,
    setPut,
    end
}) =>{

    const handleSetPut = (put : DappPutI)=>{

        setPut && setPut(put, index);

    }

    switch(put.putType){

        case ("input") :{

            return (
                <DappInput   dappInput={put as DappInputI} setInput={handleSetPut}/>
            )

        }

        case ("output") :{

            return (
                <DappOutput end={end} dappOutput={put as DappOutputI}/>
            )

        }

        case ("error") : {

            return (
                <DappErrput end={end} dappErrput={put as DappErrputI}/>
            )

        }

        case ("interactive") : {

            return (
                <DappInteractput end={end} dappInteractput={put as DappInteractputI}/>
            )

        }

        case ("oracle") : {
            
            return (
                <DappOracleput end={end} dappOracleput={put as DappOracleputI}/>
            )

        }

        default : {
            return (
                <DappDescput dappDescput={put as DappDescputI}/>
            )
        }

    }

}