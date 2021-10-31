import React, {FC, ReactElement} from 'react';
import { Colors, DesktopSizes } from '../../Theme';
import {File} from "react-bootstrap-icons";
import { useColorStore } from '../../Theme/ColorProvider';

export type LogoAProps = {
    main? : string,
    post? : string,
    size? : React.CSSProperties["height"]
}

export const LogoA : FC<LogoAProps>  = ({
    main = "opencontracts.io",
    post,
    size = "30px",
}) =>{

    const Colors = useColorStore()


    return (

        <div style={{
            color : Colors.colors.primaryTextColor,
            fontSize : size,
            display : "grid",
            gridTemplateColumns : "auto 3fr",
            justifyContent : "center",
        }}>
            <div>
                <File size={size}/>
            </div>
            <div>
                &ensp;<span style={{
                    color : Colors.colors.primaryTextColor
                }}>{main}</span><span style={{
                    color: Colors.colors.tertiaryTextColor
                }}>{post}</span>
            </div>
        </div>
    )

}