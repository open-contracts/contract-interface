import React, {FC, ReactElement} from 'react';
import {AthenaButton} from "../../../Components/Buttons"
import {
    lightenStandard,
    darkenStandard
} from "../Methods";
import {Colors} from "../../../Theme";
import {
    DappInteractputI
} from "../DappPutType";
import { useNavigate } from 'react-router-dom';

export type DappInteractputContentProps = {
    dappInteractput : DappInteractputI
}

export const DappInteractputContent : FC<DappInteractputContentProps>  = ({
    dappInteractput
}) =>{

    return (

        <div style={{
            display : "flex"
        }}>
            <AthenaButton 
                onClick={()=>{
                    window.open(dappInteractput.value)
                }}
                primaryColor={darkenStandard(Colors.lilac)}
                secondaryColor={"white"}>
                    Launch interactive session
                </AthenaButton>
        </div>

    )

}