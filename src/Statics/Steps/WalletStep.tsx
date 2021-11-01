import React, {FC, ReactElement} from 'react';
import { ReadyT } from '../../Components/Ready/AristophanesReady';
import {Step} from "../../Components/Walkthrough";
import {Key} from "react-bootstrap-icons";
import { Colors } from '../../Theme';

export type WalletStepProps = {
    ready ? : ReadyT,
    done ? (success : boolean) : void
}

export const WalletStep : FC<WalletStepProps>  = ({
    ready,
    done
}) =>{

    return (

        <Step
        done={done}
        ready={ready}>
            <Step.Title>
                Step 2: Connecting to MetaMask
            </Step.Title>
            <Step.Info>
                We need to connect to your MetaMask to run the application.
            </Step.Info>
            <Step.Content>
                <img 
                    width={60}
                    src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"}/>
            </Step.Content>
        </Step>

    )

}