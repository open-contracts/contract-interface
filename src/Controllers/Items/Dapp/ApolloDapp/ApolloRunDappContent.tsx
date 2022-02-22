import React, {FC, ReactElement, useState} from 'react';
import {generateNamedMember, getComponentMembers} from "rgfm";
import {AthenaButton} from "../../../Components/Buttons";
import {Colors, DesktopSizes, Shadows} from "../../../Theme";
import {Grid3x3GapFill} from "react-bootstrap-icons";

const Members = ["Single", "Grid"]


export type ApolloRunDappContentProps = {
    grid ? : boolean,
    setGrid ? : (grid : boolean)=>void
    which ? : string
}

const ApolloRunDappContent : FC<ApolloRunDappContentProps> & {
    Single : FC,
    Grid : FC
}  = ({
    children,
    grid,
    setGrid,
    which
}) =>{

    const {
        Single,
        Grid
    } = getComponentMembers(Members, children);

    const handleGrid = ()=>{
        setGrid && setGrid(true);
    }
    const handleSingle = ()=>{
        setGrid && setGrid(false);
    }

    

    return (

        <div 
        style={{
            display : "flex",
            flexDirection : "column",
            flexGrow : 1
        }}>
            <div style={{
                display : "flex",
                alignContent : "center",
                alignItems : "center",
                position : "relative",
                overflow  : "visible"
            }}>
                <AthenaButton
                    className="none"
                    onClick={handleGrid}
                    primaryColor={Colors.Maintheme}
                    secondaryColor={grid ? Colors.jonasGray : Colors.quartenaryTextColor}
                    style={{
                        boxShadow : "none",
                        height : "50px",
                        width : "60px",
                        zIndex : 1000,
                        position : "relative",
                        top : grid ? "1px" : 0,
                        borderBottomRightRadius : "0px",
                        borderBottomLeftRadius : "0px",
                        borderTop :  "none",
                        borderLeft : "none",
                        borderBottom : grid ? `1px solid ${Colors.jonasGray}` : "none",
                        borderRight :  "none"
                    }}
                >
                    <Grid3x3GapFill size={20}/>
                </AthenaButton>
                <AthenaButton
                    className="none"
                    onClick={handleSingle}
                    primaryColor={Colors.Maintheme}
                    secondaryColor={!grid ? Colors.jonasGray : Colors.quartenaryTextColor}
                    style={{
                        boxShadow : "none",
                        zIndex : 100,
                        position : "relative",
                        top : !grid ? "1px" : 0,
                        borderBottomRightRadius : "0px",
                        borderBottomLeftRadius : "0px",
                        borderTop :  "none",
                        borderLeft : "none",
                        borderBottom : !grid ? `1px solid ${Colors.jonasGray}` : "none",
                        borderRight :  "none",
                        fontSize : "24px"
                    }}
                >
                    <b>ƒ<sub>𝑥</sub></b>&ensp;{which}
                </AthenaButton>
            </div>
            <div style={{
                boxShadow : Shadows.defaultShadow,
                flexGrow : 1,
                zIndex : 0,
                background : Colors.jonasGray,
                borderTopRightRadius : DesktopSizes.BorderRadius.standard,
                borderBottomLeftRadius : DesktopSizes.BorderRadius.standard,
                borderBottomRightRadius : DesktopSizes.BorderRadius.standard
            }}>
                {grid ? Grid : Single}
            </div>
        </div>

    )

}

ApolloRunDappContent.Grid = generateNamedMember("Grid");
ApolloRunDappContent.Single = generateNamedMember("Single");

export {ApolloRunDappContent}