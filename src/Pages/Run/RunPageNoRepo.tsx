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
            repo
        } = parseGitUrl(text);

        navigate(`/${owner}/${repo}`);

    }

    return (

        <MediaResponsive>
            <MediaResponsive.Desktop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderDesktop crt={stepStatus.crt} enclave={stepStatus.enclave} wallet={stepStatus.wallet}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <div style={{
                            display : "flex",
                            alignContent : "center",
                            alignItems : "center"
                        }}>
                            <TextInputApollo 
                            placeholder={"Enter repo"}
                            onTextInput={setText}/>&emsp;<AthenaButton 
                            onClick={handleSubmit}
                            primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme}>
                                Submit
                            </AthenaButton>
                        </div>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Desktop>
            <MediaResponsive.Laptop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                    <div style={{
                            display : "flex",
                            alignContent : "center",
                            alignItems : "center"
                        }}>
                            <TextInputApollo 
                            placeholder={"Enter repo"}
                            onTextInput={setText}/>&emsp;<AthenaButton 
                            onClick={handleSubmit}
                            primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme}>
                                Submit
                            </AthenaButton>
                        </div>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Laptop>
            <MediaResponsive.Tablet>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                    <div style={{
                            display : "flex",
                            alignContent : "center",
                            alignItems : "center"
                        }}>
                            <TextInputApollo 
                            placeholder={"Enter repo"}
                            onTextInput={setText}/>&emsp;<AthenaButton 
                            onClick={handleSubmit}
                            primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme}>
                                Submit
                            </AthenaButton>
                        </div>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
            </MediaResponsive.Tablet>
            <MediaResponsive.Mobile>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                    <div style={{
                            display : "flex",
                            alignContent : "center",
                            alignItems : "center"
                        }}>
                            <TextInputApollo 
                            placeholder={"Enter repo"}
                            onTextInput={setText}/>&emsp;<AthenaButton 
                            onClick={handleSubmit}
                            primaryColor={Colors.primaryTextColor} secondaryColor={Colors.Maintheme}>
                                Submit
                            </AthenaButton>
                        </div>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
            </MediaResponsive.Mobile>
        </MediaResponsive>

    )

}