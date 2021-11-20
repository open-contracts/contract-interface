import React, {FC, ReactElement} from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors, DesktopSizes } from '../../../Theme';
import { Coin, Github, InfoCircle, PatchCheckFill, PatchPlus } from 'react-bootstrap-icons';
import { PlayFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { DappI, parseGitUrl } from '../Dapp';
import { ethers, providers } from 'ethers';

export type ApolloRunDappMainItemActionsProps = {
    gitUrl : string,
    dapp : DappI
}

export const ApolloRunDappMainItemActions : FC<ApolloRunDappMainItemActionsProps>  = ({
    gitUrl,
    dapp
}) =>{

    const handleGitHub = ()=>{
        window.open(`https://github.com/${dapp.owner}/${dapp.repo}/tree/${dapp.branch}`);
    }

    const getTokens = async ()=>{
        if(dapp.contract){
            await (dapp.contract as any).getOPN('3')
        }
    }

    const approveHub = async ()=>{
        if(dapp.contract){
            await (dapp.contract as any).approveOPN('3')
        }
    }

    return (

        <div style={{
        }}>
            <p style={{
                textAlign : "left"
            }}>
                <InfoCircle size={18}/>&emsp;If this is your first time here, you may need to&nbsp;<a 
                href="#" 
                onClick={(e)=>{
                    e.preventDefault();
                    getTokens()
                }}
                style={{
                    color : "#99aacc"
                }}>get some OPN</a>&nbsp;and&nbsp;<a 
                href="#" 
                onClick={(e)=>{
                    e.preventDefault();
                    approveHub();
                }}
                style={{
                    color : "#99aacc"
                }}>grant access to the Open Contracts hub</a>.
            </p>
            <br/>
            <div style={{
            display : "flex",
                alignContent : "center",
                alignItems : "center",
                overflow : "visible"
            }}>
                <AthenaButton 
                onClick={handleGitHub}
                primaryColor={Colors.Maintheme} secondaryColor={Colors.primaryTextColor}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        See on GitHub&emsp;<Github/>
                    </div>
                </AthenaButton>
                &emsp;
                <AthenaButton
                    action={getTokens}
                    primaryColor={Colors.Maintheme} secondaryColor={Colors.primaryTextColor}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        Get OPN&emsp;<Coin/>
                    </div>
                </AthenaButton>
                &emsp;
                <AthenaButton 
                    action={approveHub}
                    primaryColor={Colors.Maintheme} secondaryColor={Colors.primaryTextColor}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        Grant Hub Access&emsp;<PatchCheckFill/>
                    </div>
                </AthenaButton>
                &emsp;
            </div>
            <br/>
        </div>

    )

}