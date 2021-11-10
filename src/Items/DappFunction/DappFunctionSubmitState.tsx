import React, {FC, ReactElement, useState, useEffect, useReducer} from 'react';
import { AthenaButton } from '../../Components/Buttons';
import { Colors } from '../../Theme';
import { lightenStandard, darkenStandard } from '../DappPut/Methods';

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


export type DappFunctionSubmitStateProps = {
    contractFunction : OpenContractFunctionI,
    call : ()=>Promise<any>,
    loadOracleData : ()=>Promise<{[key : string] : string}>,
    setFunc ? : (func : OpenContractFunctionI)=>void
}

export const DappFunctionSubmitState : FC<DappFunctionSubmitStateProps>  = ({
    contractFunction,
    call,
    loadOracleData,
    setFunc
}) =>{

    const map = contractFunction.oracleData||{};
    const [oracleStates, setOracleStates] = useReducer<
        (state : {[key : string] : string}, data : {[key : string] : string})=>{[key : string] : string}
    >(
        (state, data)=>{
            return {
                ...state,
                ...data
            }
        },
        (contractFunction.oracleData||{})as unknown as {[key : string] : string}
    );
    const [oracleLoad, setOracleLoad] = useState(false);
    const _loadOracleData = async ()=>{
        setOracleLoad(true);
        return await loadOracleData();
    }
    const resolved = allPromisesResolved(oracleStates);
    const count = countPromisesResolved(oracleStates);
    useEffect(()=>{
        Object.keys(map).map((key)=>{
            if((map[key] as Promise<String>).then){
                (map[key] as Promise<String>).then((data)=>{
                    setOracleStates({
                        [key] : data
                    } as {[key : string]: string})
                }).catch(()=>{
                    contractFunction.oraclePromiseReject && 
                    contractFunction.oraclePromiseReject(); 
                })
            }
        })
    }, [contractFunction.oraclePromiseResolve])
    useEffect(()=>{
        if(resolved
            && oracleStates  
            && contractFunction.oraclePromiseResolve
        ){
            setFunc && setFunc({
                ...contractFunction,
                oracleData : oracleStates,
                oraclePromiseReject : undefined,
                oraclePromiseResolve : undefined
            })
            contractFunction.oraclePromiseResolve(
                oracleStates as {[key : string] : string}
            );
        }
    })

    console.log(contractFunction.requiresOracle && !resolved);

    return (

        <div style={{
            display : "flex",
            justifyContent : "right",
            justifyItems : "right",
            fontSize : "18px"
        }}>
            {contractFunction.requiresOracle && <AthenaButton
                action={_loadOracleData as unknown as any}
                style={{
                    fontSize : "18px"
                }}
                primaryColor={darkenStandard(Colors.cyan)}
                secondaryColor={"cyan"}>
                {
                    !oracleLoad ? 
                    <>
                        Load oracle data
                    </>
                    : <>
                        Load{resolved ? "ed" : "ing"} oracle data {count}/{Object.keys(oracleStates).length}     
                    </>
                }
            </AthenaButton>}
            &emsp;
            <AthenaButton
                style={{
                    fontSize : "18px"
                }}
                action={call}
                disabled={contractFunction.requiresOracle && (contractFunction.oracleData === undefined || !resolved)}
                primaryColor={Colors.forestEdge}
                secondaryColor={Colors.greenCeramic}
            >
                Call function
            </AthenaButton>
        </div>

    )

}