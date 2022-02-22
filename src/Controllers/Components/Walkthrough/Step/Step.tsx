import React, {FC, ReactElement} from 'react';
import { StepContainer } from './StepContainer';
import { StepPre, } from './StepPre';
import { generateNamedMember, getComponentMembers } from 'rgfm';
import { Members } from './StepType';
import {StepPost} from "./StepPost";
import { ReadyT } from '../../Ready/AristophanesReady/AristophanesReady';


export type StepProps = {
    style ? : React.CSSProperties,
    ready ? : ReadyT,
    done ? : (success : boolean)=>void
}

const Step : FC<StepProps> & {
    
    Title : FC,
    Info : FC,
    Content : FC

}  = ({
    style,
    children,
    done,
    ready = "not ready"
}) =>{

    const {
        Title,
        Info,
        Content
    } = getComponentMembers(Members, children)

    return (

        <>{ready === "not ready" ? <StepPre>
            <StepPre.Title>
                {Title}
            </StepPre.Title>
            <StepPre.Info>
                {Info}
            </StepPre.Info>
            <StepPre.Content>
                {Content}
            </StepPre.Content>
        </StepPre> : ready === "ready" ? 
        <StepPost success={true} done={done}>
            <StepPost.Title>
                {Title}
            </StepPost.Title>
            <StepPost.Info>
                {Info}
            </StepPost.Info>
            <StepPost.Content>
                {Content}
            </StepPost.Content>
        </StepPost> : 
        <StepPost success={false} done={done}>
            <StepPost.Title>
                {Title}
            </StepPost.Title>
            <StepPost.Info>
                {Info}
            </StepPost.Info>
            <StepPost.Content>
                {Content}
            </StepPost.Content>
        </StepPost>
        }
        
        </>

    )

}

Step.Title = generateNamedMember("Title");
Step.Info = generateNamedMember("Info");
Step.Content = generateNamedMember("Content");

export {Step}