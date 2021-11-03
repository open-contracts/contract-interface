import React, {FC, ReactElement} from 'react';
import {DappI} from "../Dapp";
import {AthenaButton} from "../../../Components/Buttons/AthenaButton";
import {Colors} from "../../../Theme";
import { AbiI } from '../../../Sytems/DoOpenContracts/OpenContractInterface';

export type ApolloDappFunctionProps = {
    dapp : DappI,
    func : AbiI
}

export const ApolloDappFunction : FC<ApolloDappFunctionProps>  = ({
    dapp,
    func
}) =>{

    return (

        <div>
            <AthenaButton primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme}>
                <b>ƒ<sub>x</sub></b>&emsp;{func.name}
            </AthenaButton>
        </div>

    )

}