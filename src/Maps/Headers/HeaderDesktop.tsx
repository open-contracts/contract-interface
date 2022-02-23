import React, {FC, ReactElement} from 'react';
import { LogoB } from '../../Glitter';
import {HeaderLayoutDesktop} from "../../Layouts";
import { ArchimedesNav } from '../../Components/Navs';
import { AbleAccountToggle } from '../../Components/AccountToggles';
import { PersonFill } from 'react-bootstrap-icons';
import { Colors } from '../../Theme';
import { useColorStore } from '../../Theme/ColorProvider';
import { useNavigate } from 'react-router-dom';
import {ConnectionStatus} from "../ConnectionStatus";
import { ReadyT } from '../../Components/Ready/AristophanesReady/AristophanesReady';

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
                    <ConnectionStatus/>
                </div>
            </HeaderLayoutDesktop.Nav>
        </HeaderLayoutDesktop>

    )

}