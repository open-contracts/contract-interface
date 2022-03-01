import React, {FC, MutableRefObject, ReactElement, useState} from 'react';
import {useConnectWalletContext, useOpenContractContext} from "../Models";
import { PredicateButton } from '../Components/Buttons/PredicateButton';
import { Colors } from '../Theme';
import {to} from "await-to-js";
import {Wallet} from "react-bootstrap-icons";
import { useEffect } from 'react';
import { ThroughGlassAgathocles } from '../Glitter/Animations/ThroughGlass/ThroughGlassAgathocles';
import { GrowOnEventAchamaenid } from '../Glitter/Animations';
import { FileText } from 'react-bootstrap-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';
import {motion} from "framer-motion";
import { Overlay, Tooltip } from 'react-bootstrap';
import {generate} from "shortid";

export type ConnectWallletProps = {}

export const ConnectWalllet : FC<ConnectWallletProps>  = () =>{

    const {dispatch : dispatchWalletContext, warning, buttonRef} = useConnectWalletContext();
    const ref = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        dispatchWalletContext((state)=>{
            return {
                ...state,
                buttonRef : ref as MutableRefObject<HTMLDivElement>
            }
        })
    }, [ref]);

    const {openContract, dispatch} = useOpenContractContext();

    const [fail, setFail] = useState(false);
    const [force, setForce] = useState(false);
    const action = async ()=>{
        if(!openContract) dispatchWalletContext((state)=>{
            return {
                ...state,
                warning : <ReactMarkdown plugins={[remarkGfm]}>
                We're sorry. We've failed to load your Open Contract
            </ReactMarkdown>
            }
        });
        else {
            const [err, result] =  await to(openContract.connectWallet());
            if(err){
                dispatchWalletContext((state)=>{
                    return {
                        ...state,
                        warning : <><ReactMarkdown plugins={[remarkGfm]}>
                        {`${err.message}`}
                    </ReactMarkdown><ReactMarkdown plugins={[remarkGfm]}>
                        {` `}
                    </ReactMarkdown></>
                    }
                });
                setFail(true);
                setForce(true);
            } else {
                dispatchWalletContext((state)=>{
                    return {
                        ...state,
                        warning : undefined
                    }
                });
                dispatch((state)=>{
                    return {
                        ...state,
                        notify : state.notify + 1
                    }
                });
                setFail(false);
                setForce(false)
            }
        }
    }

    const [signer, setSigner] = useState<string|undefined>(undefined);
    useEffect(()=>{
        if(openContract && openContract.walletConnected && !signer){
            openContract.signer.getAddress()
            .then((add)=>{
                dispatchWalletContext((state)=>{
                    return {
                        ...state,
                        warning : undefined
                    }
                });
                setSigner(add);
                setFail(false);
                setForce(false)
            }).catch(()=>{
                dispatchWalletContext((state)=>{
                    return {
                        ...state,
                        warning : "You may need to manually open your MetaMask wallet to connect it."
                    }
                });
                dispatch((context)=>{
                    return {
                        ...context,
                        ...(context.openContract) && {
                            openContract : {
                                ...context.openContract,
                                walletConnected : false
                            }
                        }
                    }
                });
                setFail(true);
                setForce(true);
            });
        }
    }, [openContract && openContract.walletConnected]);

    const [hover, setHover] = useState(false);

    const tiny = useMediaQuery({
        query : '(max-width:300px)'
    });
    const medium = useMediaQuery({
        query : '(max-width:600px)'
    });

    return (

        openContract && openContract.walletConnected ?
        <ThroughGlassAgathocles>
            <GrowOnEventAchamaenid grow={hover}>
                <div 
                onMouseOver={()=>setHover(true)}
                onMouseOut={()=>setHover(false)}
                style={{
                    fontSize : "12px",

                }}>
                    {openContract.network[0].toUpperCase() + openContract.network.slice(1)} Addresses&ensp;<FileText size={12} color={Colors.Maintheme}/>
                    <br/>
                    {signer && <><span>You: </span><a href={openContract.explorerUrl(signer)}>
                        {tiny ? signer.slice(0, 3) + "..." 
                        : medium ? signer.slice(0, 16) + "..." 
                        : signer}
                    </a></>}
                    <br/>
                    <><span>Contract: </span><a href={openContract.explorerUrl(openContract.contract.address)}>
                        {tiny ? openContract.contract.address.slice(0, 3) + "..." 
                        : medium ? openContract.contract.address.slice(0, 16) + "..." 
                        : openContract.contract.address}
                    </a></>
                </div>
            </GrowOnEventAchamaenid>
        </ThroughGlassAgathocles>
        : <>
            <motion.div
            transition={{ duration : .4 }}
            animate={warning !== undefined && {
                x : [0, 4, -4, 4, -4, 4, -4, 0]
            }}><div style={{
                padding : "10px"
            }} ref={ref}><PredicateButton
            id="#connect-wallet"
            force={force}
            allow={true}
            disabled={fail}
            action={action}
            Warning={warning}
            primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                <div style={{
                    display : "flex",
                    alignContent : "center",
                    alignItems : "center"
                }}>
                    Connect Wallet&ensp;<Wallet/>
                </div>
        </PredicateButton></div></motion.div>
        <Overlay target={ref.current} show={warning!==undefined} placement="left">
                {(innerProps)=>(
                    <Tooltip id={generate()} {...innerProps}>
                        {warning}
                    </Tooltip>
                )}
            </Overlay>
        </>

    )

}
