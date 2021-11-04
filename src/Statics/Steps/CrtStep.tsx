import React, {FC, ReactElement} from 'react';
import { ReadyT } from '../../Components/Ready/AristophanesReady';
import {Step} from "../../Components/Walkthrough";
import {Key} from "react-bootstrap-icons";
import { Colors } from '../../Theme';

export type CrtStepProps = {
    ready ? : ReadyT,
    done ? (success : boolean) : void
}

export const CrtStep : FC<CrtStepProps>  = ({
    ready,
    done
}) =>{

    return (

        <Step
        done={done}
        ready={ready}
        >
            <Step.Title>
                Step 2: Checking Root CA
            </Step.Title>
            <Step.Info>
                You must have installed our Root CA to use this application.
            </Step.Info>
            <Step.Content>
                <Key size={60} color={Colors.primaryTextColor}/>
            </Step.Content>
        </Step>

    )

}