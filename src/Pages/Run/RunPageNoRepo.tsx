import React, {FC, ReactElement, useState} from 'react';
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderDesktop, HeaderResponsive } from '../../Maps/Headers';
import { HOME } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { MainLayoutMobile } from '../../Layouts';
import { StepStatusT } from '../../Statics/Steps/Steps';
import { TextInputApollo } from '../../Components/TextInput';
import { useNavigate } from 'react-router-dom';
import { AthenaButton } from '../../Components/Buttons';
import { Colors } from '../../Theme';
import { parseGitUrl } from '../../Items';

export type RunPageNoRepoProps = {
    stepStatus : StepStatusT
}


export const RunPageNoRepo : FC<RunPageNoRepoProps>  = ({
    stepStatus
}) =>{

    const navigate = useNavigate();
    const [text, setText] = useState("");

    const handleSubmit = ()=>{

        const {
            owner,
            repo,
            branch
        } = parseGitUrl(text);

        navigate(`/${owner}/${repo}/${branch||"main"}`);

    }

    const handleEnter = (text : string)=>{
        const {
            owner,
            repo,
            branch
        } = parseGitUrl(text);

        navigate(`/${owner}/${repo}/${branch||"main"}`);

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