import React, {FC, ReactElement, useState} from 'react';
import { DappI } from '../../Items';
import { ApolloRunDappMainItem } from '../../Items/Dapp/ApolloDapp/ApolloRunDappMainItem';

export type RunBenchDesktopProps = {
    dapp ? : DappI
}

export const RunBenchDesktop : FC<RunBenchDesktopProps>  = ({
    dapp
}) =>{

    return (

        <>{dapp  ? 
            <ApolloRunDappMainItem dappItem={dapp}/>
            : "No dapp"
        }</>

    )

}