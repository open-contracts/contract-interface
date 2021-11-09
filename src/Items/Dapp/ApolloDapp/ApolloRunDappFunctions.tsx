import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { CollectionFill } from 'react-bootstrap-icons';
import { DappI } from '../Dapp';
import {ApolloDappFunction} from "./ApolloRunDappFunction";
import {LeftRightScrollAdorno} from "../../../Components/Scroll/LeftRightScroll";
import { DesktopSizes } from '../../../Theme';

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


    const funcs = dapp.contract && dapp.contract ? dapp.contract.contractFunctions.map((func)=>{


        return (
            <div style={{
                padding : DesktopSizes.Padding.standard
            }}>
                <ApolloDappFunction 
                    style={{
                        width : "100%",
                        height : "0",
                        paddingBottom : "100%",
                        borderRadius : DesktopSizes.BorderRadius.standard
                    }}
                    onClick={onFunctionClick}
                    selected={func.name === which} 
                    dapp={dapp} 
                    func={func}/>&emsp;
            </div>
        )
    }) : <></>

    return (

        <div style={{
            alignContent : "center",
            alignItems : "center",
            width : "100%",
            display : "grid",
            gridTemplateColumns : "1fr 1fr 1fr"
        }}>
            {funcs}
        </div>

    )

}