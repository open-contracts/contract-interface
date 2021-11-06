import React, {FC, ReactElement} from 'react';
import { DappI } from '..';
import { AthenaButton } from '../../../Components/Buttons';
import { DesktopSizes } from '../../../Theme';
import { Colors } from '../../../Theme';
import {generate} from "shortid";
import { useColorStore } from '../../../Theme/ColorProvider';
import { ApolloBlockItemName } from '.';
import { BorderRight, Plus } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { DOCS_PATH } from '../../../Maps/Headers/HeaderDesktop';
import { GrowOnEventAchamaenid } from '../../../Glitter/Animations';
import { ThroughGlassAgathocles } from '../../../Glitter/Animations/ThroughGlass/ThroughGlassAgathocles';
import { useState } from 'react';
import { ApolloBlockItemImage } from '.';
import { AddNew } from '../../../Glitter/Icons';

export type AppolloNewDappBlockItemImageProps = {
    style? : React.CSSProperties,
    key? : React.Key
}

export const NewDappItemImage : FC<AppolloNewDappBlockItemImageProps>= ({
    style
})=>{

    const Colors = useColorStore()

    return (
        <div style={{
            overflow : "hidden",
            ...style,
            position : "relative",
            display : "grid"
        }}>
             <div style={{
                 position  : "absolute",
                 height : "100%",
                 width : "100%",
                 left : 0,
                 top : 0,
                 display : "grid",
                 alignContent : "center",
                 alignItems : "center",
                 justifyContent : "center",
                 justifyItems : "center"
             }}><AddNew style={{
                 opacity : .85,
                 borderRadius : DesktopSizes.BorderRadius.standard,
                 height : "80px",
                 width : "80px"
             }}/></div>
            <ApolloBlockItemImage uri={`${process.env.PUBLIC_URL}/create_your_own.jpg`} style={{
                 height : "100%",
                 width : "100%",
                 borderRadius : DesktopSizes.BorderRadius.standard
             }}/>
        </div>
    )
}

export type AppolloNewDappBlockItemProps = {
    style? : React.CSSProperties,
    key? : React.Key
}


export const AppolloNewDappBlockItem : FC<AppolloNewDappBlockItemProps>  = ({
    style
}) =>{

    const Colors = useColorStore()

    const navigate = useNavigate();

    const handleClick = ()=>{
        window.location.href = DOCS_PATH;
    }

    const [hovered, setHovered] = useState(false);

    const handleMouseOver = ()=>{
        setHovered(true);
    }

    const handleMouseOut = ()=>{
        setHovered(false);
    }

    return (


            <GrowOnEventAchamaenid grow={hovered} style={{
                borderRadius : DesktopSizes.BorderRadius.standard,
                height : "100%",
                width : "100%"
            }}>
                <ThroughGlassAgathocles glass={hovered} glassOpacity={.8} style={{
                    borderRadius : DesktopSizes.BorderRadius.standard,
                    height : "100%",
                    width : "100%"
                }}>
                    <div 
                    onClick={handleClick}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    key="new-dapp"
                    style={{
                        display : "grid",
                        alignContent : "center",
                        alignItems : "center",
                        width : "100%",
                        height : "300px",
                        cursor : "pointer",
                        gridTemplateRows : "3fr 1fr",
                        ...style,
                    }}>
                        <NewDappItemImage style={{
                            height : "100%",
                            width : "100%"
                        }}/>
                        <div style={{
                            height : "100%",
                            width : "100%",
                            display : "grid",
                            alignContent : "center",
                            alignItems : "center"
                        }}>
                            <ApolloBlockItemName name={"Create your own"}/>
                        </div>
                    </div>
                </ThroughGlassAgathocles>
            </GrowOnEventAchamaenid>

    )

}