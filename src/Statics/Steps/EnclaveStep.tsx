import React, {FC, ReactElement, useEffect} from 'react';
import { ReadyT } from '../../Components/Ready/AristophanesReady';
import {Step} from "../../Components/Walkthrough";
import {Key} from "react-bootstrap-icons";
import { Colors } from '../../Theme';
import { CpuFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import { simulateNetworkRequest } from './simulateNetworkRequest';

export type EnclaveStepProps = {
    ready ? : ReadyT,
    done ? (success : boolean) : void
}

export const EnclaveStep : FC<EnclaveStepProps>  = ({
    ready,
    done 
}) =>{

    return (

        <Step ready={ready} done={done}>
            <Step.Title>
                Step 3: Connecting to an enclave
            </Step.Title>
            <Step.Info>
                Any oracles that require an enclave will be executed against the one we find for you.
            </Step.Info>
            <Step.Content>
                <CpuFill size={60} color={Colors.primaryTextColor}/>
            </Step.Content>
        </Step>

    )

}