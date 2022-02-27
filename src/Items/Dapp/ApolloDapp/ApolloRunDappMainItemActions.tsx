import React, {FC, ReactElement} from 'react';
import { AthenaButton, PredicateButton } from '../../../Components/Buttons';
import { Colors, DesktopSizes } from '../../../Theme';
import { Coin, Github, InfoCircle, PatchCheckFill, PatchPlus, ExclamationTriangle } from 'react-bootstrap-icons';
import { PlayFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { DappI, parseGitUrl } from '../Dapp';
import { ethers, providers } from 'ethers';
import { useOpenContractContext } from '../../../Models/OpenContract/OpenContractModelProvider';

export type ApolloRunDappMainItemActionsProps = {
    gitUrl : string,
    dapp : DappI
}

export const ApolloRunDappMainItemActions : FC<ApolloRunDappMainItemActionsProps>  = ({
    gitUrl,
    dapp
}) =>{

    const {openContract} = useOpenContractContext();

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

    const Warning = <div>You need to <a>connect your wallet.</a></div>;

    return (

        <div style={{
        }}>
            <p style={{
                textAlign : "left",
                color : "#c60000"
            }}>
                <ExclamationTriangle size={18}/>&emsp;Open Contracts is still in its beta phase. In particular, there may be bugs in our code which break the security of our oracle protocol. As long as we're in beta, the contracts allow us to upgrade the oracle protocol at our own discretion. Proceed at your own risk. 
            </p>
            <p style={{
                textAlign : "left"
            }}>
                <InfoCircle size={18}/>&emsp;If this is your first time here, you may need to&nbsp;<a 
                href="#" 
                onClick={(e)=>{
                    e.preventDefault();
                    getTokens()
                }}>get some OPN</a>&nbsp;and&nbsp;<a 
                href="#" 
                onClick={(e)=>{
                    e.preventDefault();
                    approveHub();
                }}>grant access to the Open Contracts hub</a>.
            </p>
            <br/>
            <div style={{
            display : "flex",
                alignContent : "center",
                alignItems : "center",
            }}>
                <AthenaButton 
                style={{
                    border : "none",
                }}
                onClick={handleGitHub}
                primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        See on GitHub&emsp;<Github/>
                    </div>
                </AthenaButton>
                &emsp;
                <PredicateButton
                    disabled={!(openContract && openContract.walletConnected)}
                    Warning={Warning}
                    style={{
                        border : "none",
                    }}
                    action={getTokens}
                    primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        Get OPN&emsp;<Coin/>
                    </div>
                </PredicateButton>
                &emsp;
                <PredicateButton
                    disabled={!(openContract && openContract.walletConnected)}
                    Warning={Warning}
                    style={{
                        border : "none",
                    }}
                    action={approveHub}
                    primaryColor={Colors.Maintheme} secondaryColor={"white"}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        Grant Hub Access&emsp;<PatchCheckFill/>
                    </div>
                </PredicateButton>
                &emsp;
            </div>
            <br/>
        </div>

    )

}
