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

    console.log(dapp.functions);

    const [_which, _setWhich] = useState<string|undefined>(
        which ? which : dapp.functions ? dapp.functions[0].name : undefined
    )

    const onFunctionClick = (e : React.MouseEvent, name : string)=>{
        _setWhich(name);
    }

    useEffect(()=>{
        if(_which && (which !== _which)){
            setWhich && setWhich(_which);
        }
    })

    const funcs = dapp.functions ? dapp.functions.map((func)=>{

        return (
            <>
                <ApolloDappFunction 
                    onClick={onFunctionClick}
                    selected={func.name === _which} 
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