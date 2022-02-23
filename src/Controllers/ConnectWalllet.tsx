import React, {FC, ReactElement, useState} from 'react';
import {useOpenContractContext} from "../Models";
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
import { useReducer } from 'react';

export type ConnectWallletProps = {}

export const ConnectWalllet : FC<ConnectWallletProps>  = () =>{

    const {openContract, dispatch} = useOpenContractContext();

    const [warning, setWarning] = useState<React.ReactNode|string>("");
    const action = async ()=>{
        if(!openContract) setWarning(<ReactMarkdown plugins={[remarkGfm]}>
            We're sorry. We've failed to load your Open Contract
        </ReactMarkdown>);
        else {
            const [err, result] =  await to(openContract.connectWallet());
            if(err){
                console.log(err);
                setWarning(<ReactMarkdown plugins={[remarkGfm]}>
                    {err.message}
                </ReactMarkdown>);
            }
            else {
                setWarning(undefined);
                dispatch((state)=>{
                    return {
                        ...state,
                        notify : state.notify + 1
                    }
                })
            }
        }
    }

    const [signer, setSigner] = useState<string|undefined>(undefined);
    useEffect(()=>{
        if(openContract && openContract.walletConnected && !signer){
            openContract.signer.getAddress()
            .then((add)=>{
                setSigner(add)
            });
        }
    }, [openContract && openContract.walletConnected]);

    const [hover, setHover] = useState(false);

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
                    Addresses&ensp;<FileText size={12} color={Colors.Maintheme}/>
                    <br/>
                    {signer && <><span>You: </span><a style={{
                        color : "#99aacc"
                    }} href={openContract.explorerUrl(signer)}>{signer}</a></>}
                    <br/>
                    <><span>Contract: </span><a style={{
                        color : "#99aacc"
                    }} href={openContract.explorerUrl(openContract.contract.address)}>{openContract.contract.address}</a></>
                </div>
            </GrowOnEventAchamaenid>
        </ThroughGlassAgathocles>
        : <div><PredicateButton
        id="#connect-wallet"
        disabled={warning === undefined}
        action={action}
        Warning={warning}
        primaryColor={Colors.Maintheme} secondaryColor={"white"}>
        Connect Wallet&ensp;<Wallet/>
    </PredicateButton></div>

    )

}