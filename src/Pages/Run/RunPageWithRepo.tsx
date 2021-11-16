import React, {FC, ReactElement} from 'react';
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderDesktop, HeaderResponsive } from '../../Maps/Headers';
import { HOME } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { MainLayoutMobile } from '../../Layouts';
import { StepStatusT } from '../../Statics/Steps/Steps';
import { RunBenchDesktop } from '../../Benches';
import { DappI } from '../../Items';

export type RunPageWithRepoProps = {
    dapp : DappI,
    setDapp : (dapp : DappI)=>void
    grid ? : boolean,
    setGrid ? : (grid : boolean)=>void,
    which ? : string,
    setWhich ? : (which : string)=>void
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