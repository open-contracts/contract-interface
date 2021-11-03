import React, {FC, ReactElement} from 'react';
import { DappI } from '../Dapp';
import {ApolloDappFunction} from "./ApolloDappFunction";

export type ApolloDappFunctionsProps = {
    dapp : DappI
}

export const ApolloDappFunctions : FC<ApolloDappFunctionsProps>  = ({
    dapp
}) =>{

    const funcs = dapp.functions ? dapp.functions.map((func)=>{
        return (
            <>
                <ApolloDappFunction dapp={dapp} func={func}/>&emsp;
            </>
        )
    }) : <></>

    return (

        <>
            {funcs}
        </>

    )

}