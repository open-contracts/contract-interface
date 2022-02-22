import React, {FC, ReactElement} from 'react';
import {AthenaButton} from "../../../Components/Buttons";
import {Colors} from "../../../Theme";
import { reduceContractFunctionI } from '../../DappFunction/StateMethods';
import { DappCallputI } from '../DappPutType';

export type DappOracleCallputProps = {
    dappOracleCallput : DappCallputI,
    contractFunction : OpenContractFunctionI,
    reduceContractFunction ? : (contractFunction : reduceContractFunctionI)=>void
}

export const DappOracleCallput : FC<DappOracleCallputProps>  = ({
    dappOracleCallput
}) =>{

    return (

        <div style={{
            display : "flex",
            justifyContent : "right",
            justifyItems : "right",
            width : "100%"
        }}>
            <AthenaButton 
                invert
                style={{
                    fontSize : "16px",
                    justifySelf : "right"
                }}
                action={dappOracleCallput.call}
                primaryColor={Colors.Maintheme}
                secondaryColor={"white"}
            >
                <span style={{
                    fontSize : "18px"
                }}>Call hub</span>
            </AthenaButton>
        </div>

    )

}