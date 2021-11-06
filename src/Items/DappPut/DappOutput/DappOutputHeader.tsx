import React, {FC, ReactElement} from 'react';
import { DappOutputI } from '../DappPutType';
import {DefaultHeader} from "../Standards/DefaultHeader";
import {ArrowReturnRight} from "react-bootstrap-icons";

export type DappOutputHeaderProps = {
    dappOutput : DappOutputI
}

export const DappOutputHeader : FC<DappOutputHeaderProps>  = ({
    dappOutput
}) =>{

    return (

        <DefaultHeader dappPut={dappOutput}>
            <DefaultHeader.Icon>
                <ArrowReturnRight size={18}/>
            </DefaultHeader.Icon>
        </DefaultHeader>

    )

}