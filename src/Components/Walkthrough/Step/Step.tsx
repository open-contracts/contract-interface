import React, {FC, ReactElement} from 'react';
import { StepContainer } from './StepContainer';
import { StepLoad, StepPre, } from './StepPre';

export type StepProps = {
    style ? : React.CSSProperties
}

export const Step : FC<StepProps>  = ({
    style
}) =>{

    return (

        <StepContainer
        style={{
            height : "60vh",
            display : "grid",
            alignContent : "center",
            alignItems : "center",
            justifyContent : "center",
            justifyItems : "center",
            ...style
        }}
            stages={[
                StepPre,
                StepLoad
            ]}
        />

    )

}