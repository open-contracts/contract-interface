import React, {FC, ReactElement} from 'react';
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderDesktop, HeaderResponsive } from '../../Maps/Headers';
import { HOME } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { MainLayoutMobile } from '../../Layouts';
import { StepStatusT } from '../../Statics/Steps/Steps';
import { RunBenchDesktop } from '../../Benches';
import { Params, useParams } from 'react-router-dom';
import { RunPageWithRepo } from './RunPageWithRepo';
import { RunPageNoRepo } from './RunPageNoRepo';
import { DappI } from '../../Items';

export type ReadyToRunProps = {
    stepStatus : StepStatusT,
    dapp : DappI,
    setDapp : (dapp : DappI)=>void,
    grid ? : boolean,
    setGrid ? : (grid : boolean)=>void,
    which ? : string,
    setWhich ? : (which : string)=>void
}

export const ReadyToRun : FC<ReadyToRunProps>  = ({
    stepStatus,
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
    (<RunPageNoRepo 
        dapp={dapp}
        setDapp={setDapp}
        stepStatus={stepStatus}/>)

}