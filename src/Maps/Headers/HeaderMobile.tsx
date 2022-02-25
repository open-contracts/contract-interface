import React, {FC, ReactElement} from 'react';
import { LogoB } from '../../Glitter';
import {HeaderLayoutMobile} from "../../Layouts";
import { useNavigate } from 'react-router-dom';
import { ReadyT } from '../../Components/Ready';
import { ConnectWalllet } from '../../Controllers/ConnectWalllet';
import { useMediaQuery } from 'react-responsive';

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
    };
    const goAbout = ()=>{
        navigate(ABOUT_PATH);
    };
    const goDocs = ()=>{
        window.location.href = DOCS_PATH;
    };
    const handleSelect = (item : string)=>{

        if(item === ABOUT) {
            goAbout();
        } else if(item === DOCS){
            goDocs();
        } else {
            goHome();
        }

    };
    const handleLogo  = ()=>{
        handleSelect("HOME")
    };

    const tiny = useMediaQuery({
        query : '(max-width:300px)'
    });

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
                    <LogoB label={!tiny}  size={"50px"} />
                </div>
            </HeaderLayoutMobile.Brand>
            <HeaderLayoutMobile.Nav>
                <div>
                    <ConnectWalllet/>
                </div>
            </HeaderLayoutMobile.Nav>
        </HeaderLayoutMobile>

    )

}