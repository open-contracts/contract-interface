import React, {FC, ReactElement} from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors, DesktopSizes } from '../../../Theme';
import { Coin, Github, InfoCircle, PatchCheckFill, PatchPlus, ExclamationTriangle } from 'react-bootstrap-icons';
import { PlayFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { DappI, } from '../Dapp';
import { ethers, providers } from 'ethers';

export type ApolloRunDappMainItemMobileActionsProps = {
    gitUrl : string,
    dapp : DappI
}

export const ApolloRunDappMainItemMobileActions : FC<ApolloRunDappMainItemMobileActionsProps>  = ({
    gitUrl,
    dapp
}) =>{

    const handleGitHub = ()=>{
        window.open(`https://github.com/${dapp.owner}/${dapp.repo}/tree/${dapp.branch}`);
    }

    const getTokens = async ()=>{
        if(dapp.contract){
            await (dapp.contract as any).getOPN('10000')
        }
    }

    const approveHub = async ()=>{
        if(dapp.contract){
            await (dapp.contract as any).approveOPN('10000')
        }
    }


    return (

        <div style={{
        }}>
            <p style={{
                textAlign : "left",
                color : "#dbac3e"
            }}>
                <ExclamationTriangle size={18}/>&emsp;Open Contracts is still in its beta phase.
                As long as we're in beta, the contracts allow us to upgrade the protocol at our own discretion.
                And there may bugs in our code. Proceed at your own risk. 
            </p>
            <p style={{
                textAlign : "left"
            }}>
                <InfoCircle size={18}/>&emsp;To submit an oracle proof, you need to &nbsp;<a
                href="#" 
                onClick={(e)=>{
                    e.preventDefault();
                    getTokens();
                }}>get some OPN</a>&nbsp; (currently roughly 1000OPN, around 4USD per transaction), and&nbsp;<a
                href="#" 
                onClick={(e)=>{
                    e.preventDefault();
                    approveHub();
                }}>grant the protocol access to your OPN.</a>.
            </p>
            <br/>
            <div style={{
                display  : "grid",
                gridTemplateColumns : "1fr",
                alignContent : "center",
                alignItems : "center",
                gap : DesktopSizes.Padding.standard
            }}>
                <AthenaButton 
                onClick={handleGitHub}
                style={{
                    width : "100%",
                    border : "none"
                }}
                primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center",
                        justifyContent : "center",
                        fontSize : "22px"
                    }}>
                        See on GitHub&emsp;<Github/>
                    </div>
                </AthenaButton>
                <AthenaButton
                    style={{
                        width : "100%",
                        border : "none"
                    }}
                    action={getTokens}
                    primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center",
                        justifyContent : "center",
                        fontSize : "22px"
                    }}>
                        Get OPN&emsp;<Coin/>
                    </div>
                </AthenaButton>
                <AthenaButton 
                    action={approveHub}
                    style={{
                        width : "100%",
                        border : "none"
                    }}
                    primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center",
                        justifyContent : "center",
                        fontSize : "22px"
                    }}>
                        Approve OPN for Protocol&emsp;<PatchCheckFill/>
                    </div>
                </AthenaButton>
                &emsp;
            </div>
            <br/>
        </div>

    )

}
