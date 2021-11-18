import React, {FC, ReactElement, useState} from 'react';
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
    
    const [failedWindow, setFailedWindow] = useState<boolean>(false);

    return (

        <div style={{
            display : "flex"
        }}>
            <AthenaButton 
                onClick={()=>{
                    const newWindow = window.open(dappInteractput.value);
                    dappInteractput.xpraExit.then(()=>{
                        newWindow?.close();
                    })
                    if(!newWindow || newWindow.closed || newWindow.closed === undefined){
                        setFailedWindow(false);
                    }
                }}
                primaryColor={darkenStandard(Colors.lilac)}
                secondaryColor={"white"}>
                    Launch interactive session
                </AthenaButton>
            {failedWindow && 
            <p>Failed to open a new window at <a href={dappInteractput.sessionUrl}>{dappInteractput.sessionUrl}</a>
                Please enable popups and try again or click the link above.
            </p>}
        </div>

    )

}