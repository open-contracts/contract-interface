import React, {FC, ReactElement} from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors, DesktopSizes } from '../../../Theme';
import { Coin, Github, InfoCircle, PatchCheckFill, PatchPlus } from 'react-bootstrap-icons';
import { PlayFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { DappI, parseGitUrl } from '../Dapp';
import { ethers, providers } from 'ethers';

export type ApolloRunDappMainItemMobileActionsProps = {
    gitUrl : string,
    dapp : DappI
}

export const ApolloRunDappMainItemMobileActions : FC<ApolloRunDappMainItemMobileActionsProps>  = ({
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
            <p style={{
                textAlign : "left"
            }}>
                <InfoCircle size={22}/>&emsp;If this is your first time here, you may need to&nbsp;<a href="" style={{
                    color : "#99aacc"
                }}>get some OPN</a>&nbsp;and&nbsp;<a href="" style={{
                    color : "#99aacc"
                }}>grant access to the Open Contracts hub</a>.
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
                style={{
                    width : "100%",
                }}
                primaryColor={Colors.Maintheme} secondaryColor={Colors.primaryTextColor}>
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
                        width : "100%"
                    }}
                    action={getTokens}
                    primaryColor={Colors.Maintheme} secondaryColor={Colors.primaryTextColor}>
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
                    style={{
                        width : "100%"
                    }}
                    primaryColor={Colors.Maintheme} secondaryColor={Colors.primaryTextColor}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center",
                        justifyContent : "center",
                        fontSize : "22px"
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