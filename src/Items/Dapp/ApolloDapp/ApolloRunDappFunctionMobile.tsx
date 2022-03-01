import React, {FC, ReactElement} from 'react';
import { DappI } from '../Dapp';
import {ApolloDappFunction} from "./ApolloRunDappFunction";
import { DesktopSizes } from '../../../Theme';

export type ApolloDappFunctionMobilesProps = {
    dapp : DappI,
    which ? : string,
    setWhich ? : (which : string)=>void
}

export const ApolloDappFunctionMobiles : FC<ApolloDappFunctionMobilesProps>  = ({
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
                padding : DesktopSizes.Padding.whitespacePreferred,
                overflow : "visible"
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
        <>
        {funcs}
        </>
    )

}