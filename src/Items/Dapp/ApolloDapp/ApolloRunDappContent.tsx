import React, {FC, ReactElement, useState} from 'react';
import {generateNamedMember, getComponentMembers} from "rgfm";
import {AthenaButton} from "../../../Components/Buttons";
import {Colors} from "../../../Theme";
import {Grid3x3GapFill} from "react-bootstrap-icons";

const Members = ["Single", "Grid"]


export type ApolloRunDappContentProps = {
    grid ? : boolean,
    setGrid ? : (grid : boolean)=>void
}

const ApolloRunDappContent : FC<ApolloRunDappContentProps> & {
    Single : FC,
    Grid : FC
}  = ({
    children,
    grid,
    setGrid
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

    console.log(grid);

    return (

        <div>
            <div style={{
                display : "flex",
                alignContent : "center",
                alignItems : "center",
                borderBottom : `1px solid ${Colors.Maintheme}`,
                position : "relative"
            }}>
                <AthenaButton
                    onClick={handleGrid}
                    primaryColor={Colors.Maintheme}
                    secondaryColor={Colors.quartenaryTextColor}
                    style={{
                        zIndex : 100,
                        position : "relative",
                        top : grid ? "1px" : 0,
                        borderBottomRightRadius : "0px",
                        borderBottomLeftRadius : "0px",
                        borderTop : grid ? `1px solid ${Colors.Maintheme}` : "none",
                        borderLeft : grid ? `1px solid ${Colors.Maintheme}` : "none",
                        borderBottom : grid ? `1px solid ${Colors.quartenaryTextColor}` : "none",
                        borderRight : grid ? `1px solid ${Colors.Maintheme}` : "none"
                    }}
                >
                    <Grid3x3GapFill/>
                </AthenaButton>
                <AthenaButton
                    onClick={handleSingle}
                    primaryColor={Colors.Maintheme}
                    secondaryColor={Colors.quartenaryTextColor}
                    style={{
                        zIndex : 100,
                        position : "relative",
                        top : !grid ? "1px" : 0,
                        borderBottomRightRadius : "0px",
                        borderBottomLeftRadius : "0px",
                        borderTop : !grid ? `1px solid ${Colors.Maintheme}` : "none",
                        borderLeft : !grid ? `1px solid ${Colors.Maintheme}` : "none",
                        borderBottom : !grid ? `1px solid ${Colors.quartenaryTextColor}` : "none",
                        borderRight : !grid ? `1px solid ${Colors.Maintheme}` : "none"
                    }}
                >
                    <b>ƒ<sub>x</sub></b>
                </AthenaButton>
            </div>
            <div style={{
                background : Colors.quartenaryTextColor
            }}>
                {grid ? Grid : Single}
            </div>
        </div>

    )

}

ApolloRunDappContent.Grid = generateNamedMember("Grid");
ApolloRunDappContent.Single = generateNamedMember("Single");

export {ApolloRunDappContent}