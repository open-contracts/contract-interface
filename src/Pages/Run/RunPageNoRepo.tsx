import React, {FC, ReactElement, useState} from 'react';
import { StepStatusT } from '../../Statics/Steps/Steps';
import { TextInputApollo } from '../../Components/TextInput';
import { useNavigate } from 'react-router-dom';
import { AthenaButton } from '../../Components/Buttons';
import { Colors } from '../../Theme';
import { parseGitUrl } from '../../Items';
import { DappI } from '../../Items';
import { OpenContractReducer } from '../../Types';

export type RunPageNoRepoProps = {
    setDapp : OpenContractReducer,
}


export const RunPageNoRepo : FC<RunPageNoRepoProps>  = ({
    setDapp
}) =>{

    const navigate = useNavigate();
    const [text, setText] = useState("");

    const handleSubmit = ()=>{

        const {
            owner,
            repo,
            branch
        } = parseGitUrl(text);

        setDapp(()=>({
            __isDapp__ : true,
            gitUrl : `https://github.com/${owner}/${repo}/${branch}`,
            id : `${owner}/${repo}/${branch||"main"}`,
            owner : owner || "",
            repo : repo || "", 
            branch : branch || "main",
            // loaded : false
        }));

        navigate(`/${owner}/${repo}/${branch||"main"}`);
        window.location.reload();
    }

    const handleEnter = (text : string)=>{
        const {
            owner,
            repo,
            branch
        } = parseGitUrl(text);

        setDapp(()=>({
            __isDapp__ : true,
            gitUrl : `https://github.com/${owner}/${repo}/${branch}`,
            id : `${owner}/${repo}/${branch||"main"}`,
            owner : owner || "",
            repo : repo || "", 
            branch : branch || "main",
            // loaded : false
        }));

        navigate(`/${owner}/${repo}/${branch||"main"}`);
        window.location.reload();
    }

    return (
        <div style={{
            display : "flex",
            alignContent : "center",
            alignItems : "center"
        }}>
            <TextInputApollo 
            onSubmit={handleEnter}
            placeholder={"Enter repo"}
            onTextInput={setText}/>&emsp;<AthenaButton 
            onClick={handleSubmit}
            primaryColor={Colors.Maintheme} secondaryColor={Colors.primaryTextColor}>
                Submit
            </AthenaButton>
        </div>

    )

}
