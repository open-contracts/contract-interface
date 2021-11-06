import React, {FC, ReactElement, useState} from 'react';
import { DappI } from '../../Items';
import { ApolloDappMainItem } from '../../Items/Dapp/ApolloDapp/ApolloDappMainItem';

export type RunBenchDesktopProps = {
    dapp ? : DappI
}

export const RunBenchDesktop : FC<RunBenchDesktopProps>  = ({
    dapp
}) =>{

    return (

        <>{dapp  ? 
            <ApolloDappMainItem dappItem={dapp}/>
            : "No dapp"
        }</>

    )

}