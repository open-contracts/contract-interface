import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { CollectionFill } from 'react-bootstrap-icons';
import { DappI } from '../Dapp';
import {ApolloDappFunction} from "./ApolloRunDappFunction";
import {LeftRightScrollAdorno} from "../../../Components/Scroll/LeftRightScroll";

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
            <>
                <ApolloDappFunction 
                    onClick={onFunctionClick}
                    selected={func.name === which} 
                    dapp={dapp} 
                    func={func}/>&emsp;
            </>
        )
    }) : <></>

    return (

        <div style={{
            display : "flex",
            alignContent : "center",
            alignItems : "center",
            width : "100%",
        }}>
            <CollectionFill size={18}/>
            &emsp;|&emsp;
            <LeftRightScrollAdorno style={{
                flexGrow : 1
            }}>
                {funcs}
            </LeftRightScrollAdorno>
        </div>

    )

}