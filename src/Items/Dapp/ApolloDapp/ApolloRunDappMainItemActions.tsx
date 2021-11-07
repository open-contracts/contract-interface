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

    const getTokens = async ()=>{
        if(dapp.contract){

            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signerToken =  dapp.contract.OPNtoken.connect(provider.getSigner());
            await signerToken.gimmeSomeMoreOfDemCoins();
        }
    }

    return (

        <div style={{
        }}>
             <div style={{
                display : "flex",
                color : Colors.primaryTextColor,
                alignItems : "center"
            }}>
                <InfoCircle size={22}/>&emsp;If this is your first time here, you may need to&nbsp;<a href="" style={{
                    color : "#ADD8E6"
                }}>get some OPN</a>&nbsp;and&nbsp;<a href="" style={{
                    color : "#ADD8E6"
                }}>grant access to the Open Contracts hub</a>.
            </div>
            <br/>
            <div style={{
            display : "flex",
                alignContent : "center",
                alignItems : "center"
            }}>
                <AthenaButton primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme}>
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
                    primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme}>
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
                    primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme}>
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

export const ApolloRunDappMainMobileItemActions : FC<ApolloRunDappMainItemActionsProps>  = ({
    gitUrl
}) =>{

    const {
        owner,
        repo
    }  = parseGitUrl(gitUrl);

    const navigate = useNavigate();
    const handleGithub = ()=>{
        window.location.href = gitUrl;
    }


    return (

        <div style={{
            width : "100%",
            gap : "10%",
            alignContent : "center",
            alignItems : "center",
            justifyContent : "center",
            justifyItems : "center"
        }}>
            <AthenaButton style={{
                width : "100%"
            }}invert primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme} size="lg" onClick={handleGithub}>
                <div style={{
                    width : "100%",
                    display : "flex",
                    alignContent : "center",
                    alignItems : "center",
                    justifyContent : "center"
                }}>
                    See on GitHub&emsp;<Github color="white"/>
                </div>
            </AthenaButton>
            &emsp;
            <AthenaButton style={{
                width : "100%"
            }} primaryColor={Colors.primaryTextColor} secondaryColor="white" size="lg" >
            <div style={{
                     width : "100%",
                     display : "flex",
                     alignContent : "center",
                     alignItems : "center",
                     justifyContent : "center"
                }}>
                    Get OPN&emsp;<Coin/>
                </div>
            </AthenaButton>
        </div>

    )

}