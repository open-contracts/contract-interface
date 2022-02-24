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
import {Card} from "react-bootstrap";
import Color from "color";
import {X} from "react-bootstrap-icons";

export type DappInteractputContentProps = {
    dappInteractput : DappInteractputI
}

export const DappInteractputContent : FC<DappInteractputContentProps>  = ({
    dappInteractput
}) =>{
    
    const [failedWindow, setFailedWindow] = useState<boolean>(false);
    const [modal, setModal] = useState(false);

    return (

        <div style={{
            display : "flex"
        }}>
            <AthenaButton 
                style={{
                    boxShadow : "none",
                    border : `1px solid ${Colors.lilac}`
                }}
                onClick={()=>{
                    setModal(true);
                    dappInteractput.xpraExit.then(()=>{
                        setModal(false);
                    })
                }}
                primaryColor={darkenStandard(Colors.lilac)}
                secondaryColor={"white"}>
                    Open interactive session
                </AthenaButton>
            {failedWindow && 
            <p>Failed to open a new window at <a 
            onClick={(e)=>{
                e.preventDefault();
                setModal(true);
            }}
            href={dappInteractput.sessionUrl}>{dappInteractput.sessionUrl}</a>
                Please enable popups and try again or click the link above.
            </p>}
            {modal && <Card 
            style={{
                position : "absolute",
                zIndex : 1000,
                width : "95vw",
                height : "95vh",
                left : "2.5vw",
                top : "2.5vh",
                padding : "10px",
                border : `1px solid ${Colors.lilac}` ,
                background : Color(Colors.lilac).lighten(.5).hex(),
            }}>
                <div 
                className="hover-invert-sm"
                style={{
                    marginLeft : "auto",
                }}></div>
                <iframe src={dappInteractput.sessionUrl} style={{
                    height : "100%",
                    width : "100%",
                    border : "none"
                }}/>
            </Card>}
        </div>

    )

}
