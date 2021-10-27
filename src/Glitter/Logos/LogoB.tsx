import React, {FC, ReactElement} from 'react';
import { Colors, DesktopSizes } from '../../Theme';
import {File} from "react-bootstrap-icons";
import { useColorStore } from '../../Theme/ColorProvider';

export type LogoBProps = {
    main? : string,
    post? : string,
    size? : React.CSSProperties["height"],
    fontSize ? : React.CSSProperties["height"],
    logoColor? : React.CSSProperties["color"],
    fontColor? : React.CSSProperties["color"]
}

export const LogoB : FC<LogoBProps>  = ({
    main = "OPEN",
    post = "CONTRACTS",
    size = "80px",
    fontSize = "24px",
    logoColor,
    fontColor
}) =>{

    const Colors = useColorStore();
    const _logoColor = logoColor || Colors.colors.Maintheme;
    const _fontColor = fontColor || Colors.colors.primaryTextColor;

    return (

        <div style={{
            display : "flex",
            alignContent : "center",
            alignItems : "center"
        }}>
            <div style={{
                height : size,
                width : size
            }}>
                <svg viewBox="0 0 1295 1296" xmlns="http://www.w3.org/2000/svg"
                overflow="hidden">
                    <defs>
                        <clipPath id="clip0">
                            <rect x="1308" y="55" width="1295" height="1296" />
                        </clipPath>
                    </defs>
                    <g clipPath="url(#clip0)" transform="translate(-1308 -55)">
                        <path
                            d="M2281.32 449.263 2551.39 449.263 2552.12 450.769C2584.88 528.295 2603 613.53 2603 703 2603 792.47 2584.88 877.705 2552.12 955.231L2550.93 957.704 2280.6 957.704 2298.15 934.214C2342.71 868.213 2368.72 788.647 2368.72 703 2368.72 617.353 2342.71 537.787 2298.15 471.786ZM1955.5 55C2156.65 55 2336.38 146.796 2455.14 290.812L2455.18 290.863 1983.28 290.863 1955.5 289.459C1727.28 289.459 1542.28 474.608 1542.28 703 1542.28 931.392 1727.28 1116.54 1955.5 1116.54L1964.14 1116.1 2454.31 1116.1 2413.35 1161.21C2296.18 1278.47 2134.3 1351 1955.5 1351 1597.9 1351 1308 1060.88 1308 703 1308 345.119 1597.9 55 1955.5 55Z"
                            fill={_logoColor} fillRule="evenodd" />
                    </g>
                </svg>
            </div>
            &emsp;
            <div style={{
                fontSize : fontSize,
                color : _fontColor,
                textAlign : "left",
                lineHeight : "1.3em"
            }}>
                {main}
                <br/>
                {post}
            </div>
        </div>
       
    )

}