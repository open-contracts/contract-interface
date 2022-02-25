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

export type ConnectWallletProps = {}

export const ConnectWalllet : FC<ConnectWallletProps>  = () =>{

    const {openContract, dispatch} = useOpenContractContext();

    const [warning, setWarning] = useState<React.ReactNode|string>("");
    const [fail, setFail] = useState(false);
    const [force, setForce] = useState(false);
    const action = async ()=>{
        if(!openContract) setWarning(<ReactMarkdown plugins={[remarkGfm]}>
            We're sorry. We've failed to load your Open Contract
        </ReactMarkdown>);
        else {
            const [err, result] =  await to(openContract.connectWallet());
            if(err){
                setWarning(<><ReactMarkdown plugins={[remarkGfm]}>
                    {`${err.message}`}
                </ReactMarkdown><ReactMarkdown plugins={[remarkGfm]}>
                    {`You may need to complete your wallet sign in.`}
                </ReactMarkdown></>);
                setFail(true);
                setForce(true);
            } else {
                setWarning("");
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
                setWarning(undefined);
                setSigner(add);
                setFail(false);
                setForce(false)
            }).catch(()=>{
                setWarning("Please complete your MetaMask login.");
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
                    {signer && <><span>You: </span><a href={openContract.explorerUrl(signer)}>{signer}</a></>}
                    <br/>
                    <><span>Contract: </span><a href={openContract.explorerUrl(openContract.contract.address)}>{openContract.contract.address}</a></>
                </div>
            </GrowOnEventAchamaenid>
        </ThroughGlassAgathocles>
        : <div><PredicateButton
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
    </PredicateButton></div>

    )

}