import React, {FC, ReactElement} from 'react';
import { Colors } from '../../../Theme';
import { DappOracleInputI } from '../DappPutType';
import {DefaultHeader} from "../Standards";

export type DappOracleInputHeaderProps = {
    style ? : React.CSSProperties
    dappOracleInput : DappOracleInputI,
}

export const DappOracleInputHeader : FC<DappOracleInputHeaderProps>  = ({
    dappOracleInput,
    style
}) =>{

    const _inputName = dappOracleInput.name.split(" ").map((val, index)=>{
        const lower = val.toLowerCase();
        return (lower.length && index > 0) ? `${lower[0].toUpperCase()}${lower.substr(1)}` : lower;
    }).join("");
    const inputName = _inputName.replace(/\s|\W/, "");
    const tempOracleInput = {
        ...dappOracleInput,
        name : inputName
    }

    return (

        <DefaultHeader dappPut={tempOracleInput} style={{
            color : Colors.babyBlue,
            ...style
        }}>
            <DefaultHeader.Pre>
                𝑥
            </DefaultHeader.Pre>
            <DefaultHeader.Post>
                &emsp;<i style={{
                    color : Colors.secondaryTextColor
                }}>oracleInput</i>
            </DefaultHeader.Post>
        </DefaultHeader>

    )

}