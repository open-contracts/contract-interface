import React, {FC, ReactElement} from 'react';
import { DappOutputI } from '../DappPutType';
import {DefaultHeader} from "../Standards/DefaultHeader";
import {ArrowReturnRight} from "react-bootstrap-icons";
import { Colors, DesktopSizes } from '../../../Theme';

export type DappOutputHeaderProps = {
    dappOutput : DappOutputI
}

export const DappOutputHeader : FC<DappOutputHeaderProps>  = ({
    dappOutput
}) =>{

    return (

        <DefaultHeader dappPut={dappOutput} style={{
            color : Colors.Maintheme,
            paddingBottom : DesktopSizes.Padding.standard
        }}>
            <DefaultHeader.Pre>
                <ArrowReturnRight size={18}/>
            </DefaultHeader.Pre>
        </DefaultHeader>

    )

}