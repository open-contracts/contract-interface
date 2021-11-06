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