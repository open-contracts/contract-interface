import React, {FC, ReactElement, useState} from 'react';
import {AthenaButton} from "../../../Components/Buttons"
import {
    darkenStandard
} from "../Methods";
import {Colors} from "../../../Theme";
import {
    DappInteractputI
} from "../DappPutType";
import Color from "color";
import {X} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import { useOpenContractContext } from '../../../Models';

export type DappInteractputContentProps = {
    dappInteractput : DappInteractputI
}

export const DappInteractputContent : FC<DappInteractputContentProps>  = ({
    dappInteractput
}) =>{

    const {openContract} = useOpenContractContext();
    
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
                });
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
            }} href={dappInteractput.sessionUrl}>{dappInteractput.sessionUrl}</a>
                Please enable popups and try again or click the link above.
            </p>}
            {modal&&<div style={{
                    position : "fixed",
                    height : "100vh",
                    width : "100vw",
                    left : 0,
                    top : 0
                }}>
                <Modal
                show={modal}
                style={{
                    position : "relative",
                    height : "100vh",
                    width : "100vw",
                    left : 0,
                    top : 0
                }}>
                    <div style={{
                        position : "fixed",
                        zIndex : 1000,
                        width : "95vw",
                        height : "95vh",
                        left : "2.5vw",
                        top : "2.5vh",
                        padding : "10px",
                        border : `1px solid ${Colors.lilac}`,
                        borderRadius : "5px",
                        background : Color(Colors.lilac).lighten(.5).hex(),
                        display : "grid",
                        gridTemplateRows : "1fr 9fr"
                    }}>
                        <div style={{
                            display : "grid",
                            gridTemplateColumns : "9fr 1fr"
                        }}>
                            <div style={{
                                display : "flex",
                                alignItems : 'center',
                                alignContent : "center"
                            }}>
                                <span>{openContract && openContract.contractName}: {dappInteractput.contractFunction.name}</span>
                            </div>
                            <div 
                            style={{
                                display : 'flex',
                                flexDirection :"row-reverse",
                            }}>
                                <X 
                                className={"hover-invert-sm hover-salmon"}
                                onClick={()=>setModal(false)}
                                style={{
                                marginLeft : "auto",
                                }}/>
                            </div>
                        </div>
                            <iframe src={dappInteractput.sessionUrl} style={{
                                height : "100%",
                                width : "100%",
                                border : `1px solid ${Colors.Maintheme}`,
                                borderRadius : "5px"
                            }}/>
                        </div>
                </Modal>
            </div>}
        </div>

    )

}
