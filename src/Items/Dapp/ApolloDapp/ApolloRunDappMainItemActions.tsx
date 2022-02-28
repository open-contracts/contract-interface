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
            await (dapp.contract as any).getOPN('10000')
        }
    }

    const approveHub = async ()=>{
        if(dapp.contract){
            await (dapp.contract as any).approveOPN('50000')
        }
    }

    const Warning = <div>You need to <a>connect your wallet.</a></div>;

    return (

        <div style={{
        }}>
            <p style={{
                textAlign : "left",
                color : "#dbac3e"
            }}>
                <ExclamationTriangle size={18}/>&emsp;Open Contracts is still in its 'beta' phase.
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
                    getTokens()
                }}>get some OPN</a>&nbsp;(currently roughly 100 OPN, around 4 USD per transaction), and&nbsp;<a 
                href="#" 
                onClick={(e)=>{
                    e.preventDefault();
                    approveHub();
                }}>grant the protocol access to your OPN</a>.
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
