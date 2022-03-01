import React, {FC, ReactElement} from 'react';
import { LogoB } from '../../Glitter';
import {HeaderLayoutDesktop} from "../../Layouts";
import { ReadyT } from '../../Components/Ready/AristophanesReady/AristophanesReady';
import { ConnectWalllet } from '../../Controllers/ConnectWalllet';

export const HOME = "EXPLORE"
export const HOME_PATH = "/"
export const ABOUT = "ABOUT";
export const ABOUT_PATH = "/about"
export const DOCS = "DOCS";
export const DOCS_PATH = "https://open-contracts.readthedocs.io";

export type HeaderDesktopProps = {
    wallet ? : ReadyT
}

export const HeaderDesktop : FC<HeaderDesktopProps>  = ({
    wallet,
}) =>{

    


    return (

        <HeaderLayoutDesktop>
            <HeaderLayoutDesktop.Brand>
                <div 
                    onClick={()=>window.location.href = "https://www.opencontracts.io"}
                    style={{
                    cursor : "pointer",
                    height : "100%",
                    display : "grid",
                    alignItems : "center",
                    alignContent : 'center',
                    justifyItems : "left",
                    justifyContent : "left",
                }}>
                    <LogoB size={"50px"} />
                </div>
            </HeaderLayoutDesktop.Brand>
            <HeaderLayoutDesktop.Nav>
                <div style={{
                    height : "100%",
                    display : "flex",
                    alignItems : 'center',
                    alignContent : "center",
                    flexDirection : "row-reverse",
                    textAlign : "right"
                }}>
                    <ConnectWalllet/>
                </div>
            </HeaderLayoutDesktop.Nav>
        </HeaderLayoutDesktop>

    )

}