import React, {FC, ReactElement, useReducer} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors, DesktopSizes } from '../../../Theme';
import { DappOracleputI } from '../DappPutType';
import { darkenStandard, lightenStandard } from '../Methods';
import {OracleLink} from "./OracleLink";
import { ReadyT } from '../../../Components/Ready';

const allPromisesResolved = (obj : any)=>{
    return Object.keys(obj).reduce((agg, key)=>{
        
        return agg && (typeof obj[key] === "string")
    }, true)
}

const countPromisesResolved = (obj : any)=>{
    return Object.keys(obj).reduce((agg, key)=>{
        return agg + ((typeof obj[key] === "string" ? 1 : 0) * 1)
    }, 0)
}

export type DappOracleputContentProps = {
    dappOracleput : DappOracleputI
}

export const DappOracleputContent : FC<DappOracleputContentProps>  = ({
    dappOracleput
}) =>{

    const map = dappOracleput.contractFunction.oracleData||{};
    const [oracleStatii, setOracleStatii] = useState<{[key : string] : ReadyT}>(
        Object.keys(map).reduce((agg, key)=>{
            return {
                ...agg,
                [key] : [typeof map[key] === "string"] ? "ready" :  "not ready"
            }
        }, {} as {[key : string] : ReadyT})
    )
    const [oracleStates, setOracleStates] = useReducer<
        (state : {[key : string] : string}, data : {[key : string] : string})=>{[key : string] : string}
    >(
        (state, data)=>{
            return {
                ...state,
                ...data
            }
        },
        (dappOracleput.contractFunction.oracleData||{})as unknown as {[key : string] : string}
    );
    useEffect(()=>{
        Object.keys(map).map((key)=>{
            if((map[key] as Promise<String>).then){
                (map[key] as Promise<String>).then((data)=>{
                    setOracleStatii({
                        ...oracleStatii,
                        [key] : "ready"
                    });
                    
                    setOracleStates({
                        [key] : data
                    } as {[key : string]: string})
                }).catch(()=>{
                    dappOracleput.contractFunction.oraclePromiseReject && 
                    dappOracleput.contractFunction.oraclePromiseReject();
                    setOracleStatii({
                        ...oracleStatii,
                        [key] : "not ready"
                    })      
                })
            }
        })
    }, [])

    const allResolved = allPromisesResolved(oracleStates);
    const resolveCount = countPromisesResolved(oracleStates);
    const links = Object.keys(oracleStatii).map((key)=>{
        return (
            <OracleLink link={key} ready={oracleStatii[key]}/>
        )
    })

    useEffect(()=>{
        
        if(allResolved
            && oracleStates  
            && dappOracleput.contractFunction.oraclePromiseResolve
        ){
           /* dappOracleput.setOracleData(
                oracleStates
            );*/
            dappOracleput.contractFunction.oraclePromiseResolve(
                oracleStates as {[key : string] : string}
            );
        }
    })


    return (

        <div style={{
            color : Colors.primaryTextColor
        }}>
           <div style={{
               border : `1px solid ${Colors.cyan}`,
               borderRadius : DesktopSizes.BorderRadius.standard,
               padding : DesktopSizes.Padding.standard,
               background : Colors.primaryTextColor,
               color : Colors.deepCyan
           }}>
                <h6>{allResolved ? "Finished" : "Awaiting..."} {resolveCount}/{Object.keys(dappOracleput.contractFunction.oracleData||{}).length}</h6>
                {links}
           </div>
        </div>

    )

}