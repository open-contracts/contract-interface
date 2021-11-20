import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { CollectionFill } from 'react-bootstrap-icons';
import { DappI } from '../Dapp';
import {ApolloDappFunction} from "./ApolloRunDappFunction";
import {LeftRightScrollAdorno} from "../../../Components/Scroll/LeftRightScroll";
import { DesktopSizes } from '../../../Theme';
import Masonry from "react-masonry-css";

export type ApolloDappFunctionsMobileProps = {
    dapp : DappI,
    which ? : string,
    setWhich ? : (which : string)=>void
}

export const ApolloDappFunctionsMobile : FC<ApolloDappFunctionsMobileProps>  = ({
    dapp,
    which,
    setWhich
}) =>{

    const onFunctionClick = (e : React.MouseEvent, name : string)=>{
        setWhich && setWhich(name);
    }


    const funcs = dapp.contract && dapp.contract ? dapp.contract.contractFunctions.map((func)=>{


        return (
            <div style={{
                padding : DesktopSizes.Padding.standard,
                overflow : "visible"
            }}>
                <ApolloDappFunction 
                    style={{
                        overflow : "visible",
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

        <>
            {funcs}
        </>

    )

}