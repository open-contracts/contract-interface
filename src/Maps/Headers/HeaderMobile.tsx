import React, {FC, ReactElement} from 'react';
import { LogoB } from '../../Glitter';
import {HeaderLayoutMobile} from "../../Layouts";
import { ArchimedesNav } from '../../Components/Navs';
import { AbleAccountToggle } from '../../Components/AccountToggles';
import { PersonFill } from 'react-bootstrap-icons';
import { Colors, DesktopSizes } from '../../Theme';
import { useColorStore } from '../../Theme/ColorProvider';
import { useNavigate } from 'react-router-dom';
import { ReadyT } from '../../Components/Ready';
import { ConnectionStatus } from '../ConnectionStatus';

export const HOME = "EXPLORE"
export const HOME_PATH = "/"
export const ABOUT = "ABOUT";
export const ABOUT_PATH = "/about"
export const DOCS = "DOCS";
export const DOCS_PATH = "https://open-contracts.readthedocs.io"

export type HeaderMobileProps = {
    wallet : ReadyT
}

export const HeaderMobile : FC<HeaderMobileProps>  = ({
    wallet
}) =>{
    const navigate = useNavigate();
    const goHome = ()=>{
        navigate(HOME_PATH);
    }
    const goAbout = ()=>{
        navigate(ABOUT_PATH);
    }
    const goDocs = ()=>{
        window.location.href = DOCS_PATH;
    }
    const handleSelect = (item : string)=>{

        if(item === ABOUT) {
            goAbout();
        } else if(item === DOCS){
            goDocs();
        } else {
            goHome();
        }

    }
    const handleLogo  = ()=>{
        handleSelect("HOME")
    }
    return (

        <HeaderLayoutMobile>
            <HeaderLayoutMobile.Brand>
                <div 
                    onClick={handleLogo}
                    style={{
                    cursor : "pointer",
                    height : "100%",
                    display : "grid",
                    alignItems : "center",
                    alignContent : 'center',
                    justifyItems : "center",
                    justifyContent : "center",
                }}>
                    <LogoB size={"50px"} />
                </div>
            </HeaderLayoutMobile.Brand>
            <HeaderLayoutMobile.Nav>
                <ConnectionStatus
                stack
                style={{
                    fontSize : "12px",
                    margin : "0 auto",
                    width : "150px",
                    justifyContent : "center",
                    justifyItems : "center",
                    padding : DesktopSizes.Padding.standard
                }} wallet={wallet}/>
            </HeaderLayoutMobile.Nav>
        </HeaderLayoutMobile>

    )

}