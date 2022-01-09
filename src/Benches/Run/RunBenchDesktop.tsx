import React, {FC, ReactElement, useState} from 'react';
import { DappI } from '../../Items';
import { ApolloRunDappMainItem } from '../../Items/Dapp/ApolloDapp/ApolloRunDappMainItem';
import { OpenContractReducer } from '../../Types';

export type RunBenchDesktopProps = {
    dapp  : DappI,
    setDapp : OpenContractReducer,
    grid : boolean,
    setGrid : (grid : boolean)=>void,
    which : string,
    setWhich : (which : string)=>void
}

export const RunBenchDesktop : FC<RunBenchDesktopProps>  = ({
    dapp, 
    setDapp,
    grid,
    setGrid,
    which,
    setWhich
}) =>{

    return (
            <ApolloRunDappMainItem 
            grid={grid}
            setGrid={setGrid}
            which={which}
            setWhich={setWhich}
            dappItem={dapp} updateDapp={setDapp} />
       
    )

}