import React, {FC, ReactElement} from 'react';
import MonacoEditor,{ Monaco} from '@monaco-editor/react';
import {editor} from "monaco-editor";
import Skeleton from "react-loading-skeleton";
import { Colors, DesktopSizes } from '../../../Theme';
import { SizeDropdown } from '../../../Components/ContentBrowsing';
import { useRef } from 'react';
import { useState } from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { ArrowsAngleExpand, ArrowsExpand, Github, PlayFill, X } from 'react-bootstrap-icons';


export type ApolloDappMainItemSourceCodeProps = {
    style? : React.CSSProperties,
    code : string | undefined,
    handleDrop?: (dropped : boolean)=>void,
    handleMount?: (editor : any, monaco : Monaco)=>void
    isDropped : boolean,
    lang? : string,
    height? : number
}

export const ApolloDappMainItemSourceCode : FC<ApolloDappMainItemSourceCodeProps> = ({
    style, 
    code,
    handleDrop = ()=>{},
    handleMount = ()=>{},
    isDropped,
    lang,
    height
})=>{


    return (
        <div 
        onScroll={(data)=>{
            console.log(data);
        }}
        style={{
            background : "#1e1e1e",
            width : "100%",
            height : "auto"
        }}>
            <SizeDropdown 
            onDropped={handleDrop}
            isDropped={isDropped}
            dropStyle={{
                height : "60px",
                color : "cyan"
            }}
            style={{
                border : `1px solid ${Colors.primaryTextColor}`,
                borderRadius : DesktopSizes.BorderRadius.standard,
                paddingTop: DesktopSizes.Padding.standard
            }}>
                {!code && <Skeleton height="100%" width="100%"/>}
                {code &&
                    <MonacoEditor
                        theme={"vs-dark"}  
                        onMount={handleMount}
                        width="95%"
                        height={(height || 0) + 60}
                        language={lang}
                        value={code}
                        options={{
                            scrollBeyondLastLine : false,
                            scrollbar : {
                                alwaysConsumeMouseWheel : false,
                                vertical : "hidden",
                            },
                            readOnly : true,
                            minimap : {
                                enabled : false
                            }
                        }}/>}
            </SizeDropdown>
        </div>
    )

}

export type ApolloDappMainItemSourceProps = {
    style? : React.CSSProperties,
    contract : string | undefined,
    oracle : string | undefined
}

export const ApolloDappMainItemSource : FC<ApolloDappMainItemSourceProps>  = ({
    style,
    contract,
    oracle
}) =>{


    const [contractEditorHeight, setContractEditorHeight] = useState<number | undefined>(undefined);
    const [contractDropStatus, setContractDropStatus] = useState(false);
    const handleContractEditorDidMount = (editor : any, monaco : Monaco)=>{

        !contractEditorHeight && setContractEditorHeight(
            Math.max(
                (contract?.split("\n").length || 0) * 19,
                editor.getContentHeight()
            )
        );

    }
    const handleContractDrop = (dropped : boolean)=>{

        setContractDropStatus(dropped);
        !dropped && setOracleDropStatus(dropped);
    }

    const [oracleEditorHeight, setOracleEditorHeight] = useState<number | undefined>(undefined);
    const [oracleDropStatus, setOracleDropStatus] = useState(false);
    const handleOracleEditorDidMount = (editor : any, monaco : Monaco)=>{

        console.log( (oracle?.split("\n").length || 0) * 19)

        !oracleEditorHeight && setOracleEditorHeight(Math.max(
            (oracle?.split("\n").length || 0) * 19,
            editor.getContentHeight()
        ));

    }
    const handleOracleDrop = (dropped : boolean)=>{
        setOracleDropStatus(dropped);
        !dropped && setContractDropStatus(dropped);
    }

    const [modal, setModal] = useState<undefined | "contract" | "oracle">(undefined);
    const handleContractExpand = ()=>{
        setModal("contract");
    }
    const handleOracleExpand = ()=>{
        setModal("oracle");
    }
    const handleModalClose =()=>{
        setModal(undefined);
    }
    const [modalDropped, setModalDropped] = useState(false);
    const handleModalDropped = (dropped : boolean)=>{
        setModalDropped(dropped);
    }


    return (

        <div style={{
            ...style
        }}>
           
            <div style={{
                display : "grid",
                gridTemplateColumns : "1fr 1fr",
                gap : "5%",
                textAlign : "left",
                color : Colors.primaryTextColor,
            }}>
               <div>
                    <h6>contract.sol</h6>
                    <div style={{
                        position : "relative",
                        background : Colors.primaryTextColor
                    }}>
                        <ApolloDappMainItemSourceCode
                            code={contract}
                            lang={"sol"}
                            handleMount={handleContractEditorDidMount}
                            handleDrop={handleContractDrop}
                            isDropped={contractDropStatus || oracleDropStatus}
                            height={Math.max(contractEditorHeight||0, oracleEditorHeight||0)}
                        />
                        <div 
                        onClick={handleContractExpand}
                        style={{
                            display : "grid",
                            gridTemplateColumns : "1fr",
                            justifyContent : "center",
                            justifyItems : "center",
                            alignContent : "center",
                            alignItems : "center",
                            height : 24,
                            width : 24,
                            cursor : "pointer",
                            position : "absolute",
                            top : 0,
                            right : 0,
                            margin : 1,
                            color : "blue",
                            borderBottom: `1px solid ${Colors.Maintheme}`,
                            borderLeft: `1px solid ${Colors.Maintheme}`,
                            padding : "1px",
                            borderTopRightRadius: DesktopSizes.BorderRadius.standard,
                            borderBottomLeftRadius : DesktopSizes.BorderRadius.standard,
                            opacity : .7,
                            background : Colors.primaryTextColor
                        }}>
                            <ArrowsAngleExpand size={10}/>
                        </div>
                    </div>
               </div>
               <div>
                    <h6>oracle.py</h6>
                    <div style={{
                        position : "relative",
                    }}>
                        <ApolloDappMainItemSourceCode
                            code={oracle}
                            lang={"python"}
                            handleMount={handleOracleEditorDidMount}
                            handleDrop={handleOracleDrop}
                            isDropped={contractDropStatus || oracleDropStatus}
                            height={Math.max(contractEditorHeight||0, oracleEditorHeight||0)}
                        />
                        <div 
                        onClick={handleOracleExpand}
                        style={{
                            display : "grid",
                            gridTemplateColumns : "1fr",
                            justifyContent : "center",
                            justifyItems : "center",
                            alignContent : "center",
                            alignItems : "center",
                            height : 24,
                            width : 24,
                            cursor : "pointer",
                            position : "absolute",
                            top : 0,
                            right : 0,
                            margin : 1,
                            color : "blue",
                            borderBottom: `1px solid ${Colors.Maintheme}`,
                            borderLeft: `1px solid ${Colors.Maintheme}`,
                            padding : "1px",
                            borderTopRightRadius: DesktopSizes.BorderRadius.standard,
                            borderBottomLeftRadius : DesktopSizes.BorderRadius.standard,
                            opacity : .7,
                            background : Colors.primaryTextColor
                        }}>
                            <ArrowsAngleExpand size={10}/>
                        </div>
                    </div>
               </div>
            </div>
            {modal && 
                <div style={{
                    zIndex : 1000, 
                    background : `${Colors.Maintheme}77`,
                    position : "fixed",
                    height : "100vh",
                    width : "100vw",
                    padding : DesktopSizes.Padding.whitespacePreferred,
                    left : 0,
                    top : 0,
                    display : "grid",
                    justifyContent : "center",
                    justifyItems : "center",
                    alignContent : "center",
                    alignItems : "center",
                    overflowY : "scroll"
                }}>
                    <div style={{
                        width : "80vw",
                        height : "auto",
                        position : "relative",
                        opacity : 1.0
                    }}>
                        <div>
                            <h5 style={{
                                display : "flex",
                                padding : DesktopSizes.Padding.standard,
                                background : `${Colors.Maintheme}ff`,
                                border : `1px solid ${Colors.primaryTextColor}`,
                                borderRadius : DesktopSizes.BorderRadius.standard,
                                color : Colors.primaryTextColor,
                                textAlign : "left"
                            }}>{modal === "contract" ? "contract.sol" : "oracle.py"}
                                   <div 
                                        onClick={handleModalClose}
                                        style={{
                                            marginLeft: "auto",
                                            marginRight: 0,
                                            display : "grid",
                                            gridTemplateColumns : "1fr",
                                            justifyContent : "center",
                                            justifyItems : "center",
                                            alignContent : "center",
                                            alignItems : "center",
                                            height : 24,
                                            width : 24,
                                            cursor : "pointer",
                                            color : "salmon",
                                            borderBottom: `1px solid ${Colors.Maintheme}`,
                                            borderLeft: `1px solid ${Colors.Maintheme}`,
                                            padding : "1px",
                                            borderRadius: DesktopSizes.BorderRadius.standard,
                                            opacity : .7,
                                            background : Colors.primaryTextColor
                                        }}>
                                            <X size={12}/>
                                        </div>
                            </h5>
                            <div style={{
                                position : "relative",
                                background : "white",
                                borderRadius: DesktopSizes.BorderRadius.standard
                            }}>
                                <ApolloDappMainItemSourceCode
                                    code={modal === "contract" ? contract : oracle}
                                    lang={modal === "contract" ? "sol" : "python"}
                                    handleMount={handleContractEditorDidMount}
                                    handleDrop={handleModalDropped}
                                    isDropped={modalDropped}
                                    height={modal === "contract" ? contractEditorHeight : oracleEditorHeight}
                                />
                            </div>
                        </div>
                    </div>
                </div> 
            }
        </div>

    )

}


export const ApolloDappMainItemMobileSource : FC<ApolloDappMainItemSourceProps>  = ({
    style,
    contract,
    oracle
}) =>{


    const [contractEditorHeight, setContractEditorHeight] = useState<number | undefined>(undefined);
    const [contractDropStatus, setContractDropStatus] = useState(false);
    const handleContractEditorDidMount = (editor : any, monaco : Monaco)=>{

        !contractEditorHeight && setContractEditorHeight(
            Math.max(
                (contract?.split("\n").length || 0) * 19,
                editor.getContentHeight()
            )
        );

    }
    const handleContractDrop = (dropped : boolean)=>{

        setContractDropStatus(dropped);

    }

    const [oracleEditorHeight, setOracleEditorHeight] = useState<number | undefined>(undefined);
    const [oracleDropStatus, setOracleDropStatus] = useState(false);
    const handleOracleEditorDidMount = (editor : any, monaco : Monaco)=>{

        !oracleEditorHeight && setOracleEditorHeight(Math.max(
            (oracle?.split("\n").length || 0) * 19,
            editor.getContentHeight()
        ));

    }
    const handleOracleDrop = (dropped : boolean)=>{
        setOracleDropStatus(dropped);
    }


    return (

        <div style={{
            ...style,
            paddingBottom : DesktopSizes.Padding.whitespacePreferred ,
            textAlign : "left"
        }}>
               
            <h6>contract.sol</h6>
            <SizeDropdown 
            onDropped={handleContractDrop}
            isDropped={contractDropStatus}
            dropStyle={{
                height : "60px",
                color : "blue"
            }}
            style={{
                border : `1px solid ${Colors.Maintheme}`,
                borderRadius : DesktopSizes.BorderRadius.standard,
                padding : DesktopSizes.Padding.standard
            }}>
                {!contract && <Skeleton height="100%" width="100%"/>}
                {contract &&
                    <MonacoEditor
                        onMount={handleContractEditorDidMount}
                        width="95%"
                        height={(contractEditorHeight||0) + 60}
                        language="sol"
                        value={contract}
                        options={{
                            scrollBeyondLastLine : false,
                            scrollbar : {
                                vertical : "hidden",
                                handleMouseWheel : contractEditorHeight ? false : true,
                            },
                            readOnly : true,
                            minimap : {
                                enabled : false
                            }
                        }}/>}
            </SizeDropdown>
            <br/>
            <br/>
            <h6>oracle.py</h6>
            <SizeDropdown 
            onDropped={handleOracleDrop}
            isDropped={oracleDropStatus}
            dropStyle={{
                height : "60px",
                color : "blue"
            }}
            style={{
                border : `1px solid ${Colors.Maintheme}`,
                borderRadius : DesktopSizes.BorderRadius.standard,
                padding : DesktopSizes.Padding.standard
            }}>
                {!contract && <Skeleton height="100%" width="100%"/>}
                {contract &&
                    <MonacoEditor
                        onMount={handleOracleEditorDidMount}
                        width="95%"
                        height={(oracleEditorHeight || 0) + 60}
                        language="python"
                        value={oracle}
                        options={{
                            scrollBeyondLastLine : false,
                            scrollbar : {
                                vertical : "hidden",
                                handleMouseWheel : oracleEditorHeight ? false : true,
                            },
                            readOnly : true,
                            minimap : {
                                enabled : false
                            }
                        }}/>}
            </SizeDropdown>
        </div>

    )

}