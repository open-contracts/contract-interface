import React, {FC, ReactElement} from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors } from '../../../Theme';
import { Coin, Github, InfoCircle, PatchCheckFill, PatchPlus } from 'react-bootstrap-icons';
import { PlayFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { parseGitUrl } from '../Dapp';

export type ApolloDappMainItemActionsProps = {
    gitUrl : string
}

export const ApolloDappMainItemActions : FC<ApolloDappMainItemActionsProps>  = ({
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
    const handleRun = ()=>{
        window.location.href = `https://open-contracts.github.io?github_user=${encodeURI(owner||"")}&github_repo=${encodeURI(repo||"")}`
    }


    return (

        <>
            <div style={{
            display : "flex",
                alignContent : "center",
                alignItems : "center"
            }}>
                <AthenaButton primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme} onClick={handleGithub}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        See on GitHub&emsp;<Github/>
                    </div>
                </AthenaButton>
                &emsp;
                <AthenaButton primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme} onClick={handleGithub}>
                    <div style={{
                        display : "flex",
                        alignContent : "center",
                        alignItems : "center"
                    }}>
                        Get OPN&emsp;<Coin/>
                    </div>
                </AthenaButton>
                &emsp;
                <AthenaButton primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme} onClick={handleGithub}>
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
            <div style={{
                display : "flex",
                color : Colors.primaryTextColor,
                alignItems : "center"
            }}>
                &emsp;<InfoCircle/>&emsp;If this is your first time here, you may need to&nbsp;<a href="" style={{
                    color : "#ADD8E6"
                }}>get some OPN</a>&nbsp;and&nbsp;<a href="" style={{
                    color : "#ADD8E6"
                }}>grant access to the Open Contracts hub</a>.
            </div>
        </>

    )

}

export const ApolloDappMainMobileItemActions : FC<ApolloDappMainItemActionsProps>  = ({
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
    const handleRun = ()=>{
        window.location.href = `https://open-contracts.github.io?github_user=${encodeURI(owner||"")}&github_repo=${encodeURI(repo||"")}`
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
            }} primaryColor={Colors.primaryTextColor} secondaryColor="white" size="lg" onClick={handleRun}>
            <div style={{
                     width : "100%",
                     display : "flex",
                     alignContent : "center",
                     alignItems : "center",
                     justifyContent : "center"
                }}>
                    Run&emsp;<PlayFill/>
                </div>
            </AthenaButton>
        </div>

    )

}