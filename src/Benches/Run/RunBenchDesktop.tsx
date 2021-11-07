import React, {FC, ReactElement, useState} from 'react';
import { DappI } from '../../Items';
import { ApolloRunDappMainItem } from '../../Items/Dapp/ApolloDapp/ApolloRunDappMainItem';

export type RunBenchDesktopProps = {
    dapp ? : DappI
}

export const RunBenchDesktop : FC<RunBenchDesktopProps>  = ({
    dapp
}) =>{

    const [dappState, setDappState] = useState<DappI|undefined>(dapp);

    const handleUpdate = (dapp  : DappI)=>{

        
        setDappState(dapp);

    }


    return (

        <>{dappState  ? 
            <ApolloRunDappMainItem dappItem={dappState} updateDapp={handleUpdate} />
            : "No dapp"
        }</>

    )

}