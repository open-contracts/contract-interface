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

    const navigate = useNavigate();

    return (

        <div style={{
            display : "flex"
        }}>
            <AthenaButton 
                onClick={()=>{
                    navigate(dappInteractput.value)
                }}
                primaryColor={darkenStandard(Colors.lilac)}
                secondaryColor={lightenStandard(Colors.deepPurple)}>
                    Launch interactive session
                </AthenaButton>
                &emsp;
                <AthenaButton
                    primaryColor={darkenStandard(Colors.failedRed)}
                    secondaryColor={lightenStandard(Colors.deepPurple)}
                >
                    Reject interactive session
                </AthenaButton>
        </div>

    )

}