import React, {FC, ReactElement} from 'react';
import { AristophanesReady, ReadyT } from '../../Components/Ready/AristophanesReady/AristophanesReady';

export type ConnectionStatusProps = {
    crt ? : ReadyT,
    wallet ? : ReadyT,
    enclave ? : ReadyT
}

export const ConnectionStatus : FC<ConnectionStatusProps>  = ({
    crt,
    wallet,
    enclave
}) =>{

    return (

        <div style={{
            display : "flex",
            height : "100%",
            alignContent : "center",
            alignItems : "center",
            justifyItems : "right",
            justifyContent : "right",
            textAlign : "left"
        }}>
            <AristophanesReady label={"Wallet"} ready={wallet} />
            &emsp;
            &emsp;
            <AristophanesReady label={"Root CA"} ready={crt} />
            &emsp;
            &emsp;
            <AristophanesReady label={"Enclave"} ready={enclave}/>
        </div>

    )

}