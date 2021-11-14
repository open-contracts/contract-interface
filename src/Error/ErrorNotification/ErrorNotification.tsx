import React, {FC, ReactElement} from 'react';
import { Colors } from '../../Theme';
import { CrashLogo } from './CrashLogo';

export type ErrorNotificationProps = {
    errorText? : string,
    style? : React.CSSProperties
}

export const ErrorNotification : FC<ErrorNotificationProps>  = ({
    errorText = "Sorry, our site encountered an error. Please try refreshing the page.", 
    style
}) =>{

    return (

        <div style={{
            display : "grid",
            gridTemplateRows : "5fr 1fr",
            width : "100%",
            ...style
        }}>
            <div style={{
                width : "100%",
                justifyContent : "center",
                alignContent : "center"
            }}>
                <CrashLogo style={{
                    width : "300px",
                    height : "300px",
                    margin : "auto",
                }}/>
                <h6>{errorText.toUpperCase()}</h6>
            </div>
        </div>

    )

}