import React, {FC, ReactElement, useEffect, useState} from 'react';
import {ApolloRunDappMainItemMobile} from "./ApolloRunDappMainItemMobile";
import {ApolloRunDappMainItemDesktop} from "./ApolloRunDappMainItemDesktop";
import { useErrorContext } from '../../../Error/ErrorProvider';
import { ApolloRunDappMainItemActions } from './ApolloRunDappMainItemActions';
import { MediaResponsive } from '../../../Sytems';
import { DappI, getDappName,  getDappContract } from '../Dapp';
import { OpenContractReducer } from '../../../Types';

export type ApolloRunDappMainItemProps = {
    dappItem : DappI,
    style? : React.CSSProperties,
    updateDapp : OpenContractReducer,
    grid : boolean,
    setGrid : (grid : boolean)=>void,
    which : string,
    setWhich : (which : string)=>void
}

export const ApolloRunDappMainItem : FC<ApolloRunDappMainItemProps>  = (props) =>{

    return (

       <MediaResponsive>
           <MediaResponsive.Desktop>
                <ApolloRunDappMainItemDesktop 
                grid={props.grid}
                setGrid={props.setGrid}
                which={props.which}
                setWhich={props.setWhich}
                style={props.style}
                dappItem={props.dappItem}
                updateDapp={props.updateDapp}
             />
           </MediaResponsive.Desktop>
           <MediaResponsive.Laptop>
                <ApolloRunDappMainItemDesktop 
                    grid={props.grid}
                    setGrid={props.setGrid}
                    which={props.which}
                    setWhich={props.setWhich}
                    style={props.style}
                    dappItem={props.dappItem}
                    updateDapp={props.updateDapp}
                />
           </MediaResponsive.Laptop>
           <MediaResponsive.Tablet>
                <ApolloRunDappMainItemMobile
                    grid={props.grid}
                    setGrid={props.setGrid}
                    which={props.which}
                    setWhich={props.setWhich}
                    style={props.style}
                    dappItem={props.dappItem}
                    updateDapp={props.updateDapp}
                />
           </MediaResponsive.Tablet>
           <MediaResponsive.Mobile>
                <ApolloRunDappMainItemMobile
                    grid={props.grid}
                    setGrid={props.setGrid}
                    which={props.which}
                    setWhich={props.setWhich}
                    style={props.style}
                    dappItem={props.dappItem}
                    updateDapp={props.updateDapp}
                    />
           </MediaResponsive.Mobile>
       </MediaResponsive>

    )

}