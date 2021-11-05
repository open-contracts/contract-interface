import React, {FC, ReactElement} from 'react';
import {Form} from "react-bootstrap";
import { Colors } from '../../../Theme';
import { DappInputI } from '../DappPutType';
import Color from "color";
import {darkenStandard, lightenStandard} from "../Methods";

export type DappInputContentProps = {
    dappInput : DappInputI
}

export const DappInputContent : FC<DappInputContentProps>  = ({
    dappInput
}) =>{

    return (

        <div>
            <Form.Control type="text" placeholder={dappInput.prompt} style={{
                background : lightenStandard(Colors.forestGreen),
                color : Colors.primaryTextColor,
                border : `1px solid ${darkenStandard(Colors.forestEdge)}`
            }}/>
        </div>

    )

}