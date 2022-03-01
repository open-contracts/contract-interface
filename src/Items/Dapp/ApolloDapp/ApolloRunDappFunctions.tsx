import React, {FC, ReactElement} from 'react';
import { DappI } from '../Dapp';
import {ApolloDappFunction} from "./ApolloRunDappFunction";
import { DesktopSizes } from '../../../Theme';
import Masonry from "react-masonry-css";
import Skeleton from 'react-loading-skeleton';

export type ApolloDappFunctionsProps = {
    dapp : DappI,
    which ? : string,
    setWhich ? : (which : string)=>void
}

export const ApolloDappFunctions : FC<ApolloDappFunctionsProps>  = ({
    dapp,
    which,
    setWhich
}) =>{

    const onFunctionClick = (e : React.MouseEvent, name : string)=>{
        setWhich && setWhich(name);
    }

    const funcs = dapp.contract && dapp.contract ? dapp.contract.contractFunctions.map((func, index)=>{


        return (
            <div 
            key={func.name}
            style={{
                overflow : "visible",
                paddingRight : DesktopSizes.Padding.standard,
                paddingBottom : DesktopSizes.Padding.standard,
                width : "100%"
            }}>
                <ApolloDappFunction 
                    style={{
                        width : "100%",
                        height : "auto",
                        borderRadius : DesktopSizes.BorderRadius.standard
                    }}
                    onClick={onFunctionClick}
                    selected={func.name === which} 
                    dapp={dapp} 
                    func={func}/>
            </div>
        )
    }) : <></>

    return (

        <div style={{
            paddingLeft : DesktopSizes.Padding.standard,
            paddingTop : DesktopSizes.Padding.standard
        }}>
            {dapp.contract ? <Masonry 
                style={{
                    overflow : "visible"
                }}
                className={"masonry"}
                breakpointCols={3}>
                {funcs}
            </Masonry> : <Masonry 
                style={{
                    overflow : "visible"
                }}
                className={"masonry"}
                breakpointCols={3}>
              {Array(Math.floor(Math.random() * 7) + 5).fill(0).map(()=><div style={{
                     paddingRight : DesktopSizes.Padding.standard,
                     paddingBottom : DesktopSizes.Padding.standard,
                }}><Skeleton height={`${Math.floor(Math.random() * 150) + 50}px`} width="100%"/></div>)}
            </Masonry>}
        </div>

    )

}