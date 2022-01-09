import React, {FC, ReactElement} from 'react';
import { StepStatusT } from '../../Statics/Steps/Steps';
import { RunPageWithRepo } from './RunPageWithRepo';
import { RunPageNoRepo } from './RunPageNoRepo';
import { DappI } from '../../Items';
import {OpenContractReducer} from "../../Types";

export type ReadyToRunProps = {
    dapp : DappI,
    setDapp : OpenContractReducer,
    grid : boolean,
    setGrid : (grid : boolean)=>void,
    which : string,
    setWhich : (which : string)=>void
}

export const ReadyToRun : FC<ReadyToRunProps>  = ({
    dapp,
    setDapp,
    grid,
    setGrid,
    which,
    setWhich
}) =>{    

    return (dapp.owner.length && dapp.repo.length) ?
    (<RunPageWithRepo 
        grid={grid}
        setGrid={setGrid}
        which={which}
        setWhich={setWhich}
        dapp={dapp} setDapp={setDapp}/>) :
    (<RunPageNoRepo setDapp={setDapp}/>)

}