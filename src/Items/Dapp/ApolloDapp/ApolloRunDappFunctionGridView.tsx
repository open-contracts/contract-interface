import React, {FC, ReactElement} from 'react';
import { DappI } from '../Dapp';
import { ApolloDappFunctions } from './ApolloRunDappFunctions';


export type ApolloRunDappFunctionGridViewProps = {
    which ? : string,
    dapp : DappI,
    setWhich ? : (which : string)=>void
}

export const ApolloRunDappFunctionGridView : FC<ApolloRunDappFunctionGridViewProps>  = ({
    which,
    setWhich,
    dapp
}) =>{

    return (

        <ApolloDappFunctions which={which} setWhich={setWhich} dapp={dapp} />

    )

}