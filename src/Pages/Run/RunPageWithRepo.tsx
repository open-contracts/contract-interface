import React, {FC, ReactElement} from 'react';
import { RunBenchDesktop } from '../../Benches';
import { DappI } from '../../Items';
import { OpenContractReducer } from '../../Types';

export type RunPageWithRepoProps = {
    dapp : DappI,
    setDapp : OpenContractReducer,
    grid : boolean,
    setGrid : (grid : boolean)=>void,
    which : string,
    setWhich : (which : string)=>void
}

export const RunPageWithRepo : FC<RunPageWithRepoProps>  = ({
    dapp,
    setDapp,
    grid,
    setGrid,
    which,
    setWhich
}) =>{

    return (<RunBenchDesktop 
        grid={grid}
        setGrid={setGrid}
        which={which}
        setWhich={setWhich}
        dapp={dapp} setDapp={setDapp}/>)

}