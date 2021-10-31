import React, {FC, ReactElement} from 'react';
import { StepStage } from './StepStage';
import { generateNamedMember, getComponentMembers } from 'rgfm';

import { Members } from './StepType';
import { Colors } from '../../../Theme';

export type StepPreProps = {
    next : ()=>void
}

const StepPre : FC<StepPreProps> & {
    
        Title : FC,
        Info : FC,
        Content : FC
    
}  = ({
    next,
    children
}) =>{

    const {
        Title,
        Info,
        Content
    } = getComponentMembers(Members, children);

    return (

        <StepStage next={next} duration={1000} startStyle={{
            Title : {

            },
            Info : {

            }, 
            Content : {

            },
            wrapper : {
                display : "grid",
                gridTemplateRows : "1fr",
                gridTemplateColumns : "1fr",
            }
        }}>
            <StepStage.Title>
                <h1 style={{
                    color : Colors.primaryTextColor
                }}>Dog</h1>
            </StepStage.Title>
        </StepStage>

    )

}

StepPre.Title = generateNamedMember("Title");
StepPre.Info = generateNamedMember("Info");
StepPre.Content = generateNamedMember("Content");


export {StepPre}

export const StepLoad : FC<StepPreProps>  = ({
    next,
    children
}) =>{

  

        const {
            Title,
            Info,
            Content
        } = getComponentMembers(Members, children);
    
        return (
    
            <StepStage next={next} duration={1000} startStyle={{
                Title : {
    
                },
                Info : {
    
                }, 
                Content : {
    
                },
                wrapper : {
                    display : "grid",
                    gridTemplateRows : "1fr",
                    gridTemplateColumns : "1fr",
                }
            }}>
                <StepStage.Title>
                    <h1 style={{
                        color : Colors.primaryTextColor
                    }}>Cat</h1>
                </StepStage.Title>
            </StepStage>

    )

}