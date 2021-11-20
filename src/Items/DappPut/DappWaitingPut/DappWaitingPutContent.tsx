import React, {FC, ReactElement} from 'react';
import {Form} from "react-bootstrap";
import { Colors } from '../../../Theme';
import { DappWaitingPutI } from '../DappPutType';
import Color from "color";
import {darkenStandard, lightenStandard} from "../Methods";
import {ProgressBarAlan} from "../../../Components/ProgressBar"
import {
    TextInputApollo
} from "../../../Components/TextInput"

export type DappWaitingPutContentProps = {
    dappWaitingPut : DappWaitingPutI,
    setInput ? : (input : DappWaitingPutI)=>void
}

export const DappWaitingPutContent : FC<DappWaitingPutContentProps>  = ({
    dappWaitingPut, 
    setInput
}) =>{

    return (

        <div>
            <ProgressBarAlan duration={dappWaitingPut.duration}/>
        </div>

    )

}