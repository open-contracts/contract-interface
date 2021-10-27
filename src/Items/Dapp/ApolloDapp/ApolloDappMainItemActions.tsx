import React, {FC, ReactElement} from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors } from '../../../Theme';
import { Github } from 'react-bootstrap-icons';
import { PlayFill } from 'react-bootstrap-icons';
import { useHistory } from 'react-router';
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

    const history = useHistory();
    const handleGithub = ()=>{
        window.location.href = gitUrl;
    }
    const handleRun = ()=>{
        window.location.href = `https://open-contracts.github.io?github_user=${encodeURI(owner||"")}&github_repo=${encodeURI(repo||"")}`
    }


    return (

        <div style={{
            display : "flex",
            alignContent : "center",
            alignItems : "center"
        }}>
            <AthenaButton invert primaryColor={Colors.Maintheme} secondaryColor="white" onClick={handleGithub}>
                <div style={{
                    display : "flex",
                    alignContent : "center",
                    alignItems : "center"
                }}>
                    See on GitHub&emsp;<Github color="white"/>
                </div>
            </AthenaButton>
            &emsp;
            <AthenaButton primaryColor={Colors.Maintheme} secondaryColor="white" onClick={handleRun}>
            <div style={{
                    display : "flex",
                    alignContent : "center",
                    alignItems : "center"
                }}>
                    Run&emsp;<PlayFill/>
                </div>
            </AthenaButton>
        </div>

    )

}

export const ApolloDappMainMobileItemActions : FC<ApolloDappMainItemActionsProps>  = ({
    gitUrl
}) =>{

    const {
        owner,
        repo
    }  = parseGitUrl(gitUrl);

    const history = useHistory();
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
            }}invert primaryColor={Colors.Maintheme} secondaryColor="white" size="lg" onClick={handleGithub}>
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
            }} primaryColor={Colors.Maintheme} secondaryColor="white" size="lg" onClick={handleRun}>
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