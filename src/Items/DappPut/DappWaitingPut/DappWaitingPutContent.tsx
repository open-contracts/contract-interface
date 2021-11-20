import React, {FC, ReactElement, useState} from 'react';
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

    console.log(dappWaitingPut.duration);

    const [duration, setDuration] = useState(dappWaitingPut.duration);

    return (

        <div>
            <ProgressBarAlan duration={duration}/>
        </div>

    )

}