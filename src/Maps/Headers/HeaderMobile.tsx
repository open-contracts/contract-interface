import React, {FC, ReactElement} from 'react';
import { LogoB } from '../../Glitter';
import {HeaderLayoutMobile} from "../../Layouts";
import { ArchimedesNav } from '../../Components/Navs';
import { AbleAccountToggle } from '../../Components/AccountToggles';
import { PersonFill } from 'react-bootstrap-icons';
import { Colors } from '../../Theme';
import { useColorStore } from '../../Theme/ColorProvider';
import { useNavigate } from 'react-router-dom';

export const HOME = "EXPLORE"
export const HOME_PATH = "/"
export const ABOUT = "ABOUT";
export const ABOUT_PATH = "/about"
export const DOCS = "DOCS";
export const DOCS_PATH = "https://open-contracts.readthedocs.io"

export type HeaderMobileProps = {
    selected : string
}

export const HeaderMobile : FC<HeaderMobileProps>  = ({
    selected
}) =>{

    const Colors = useColorStore();

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
                <div style={{
                    height : "100%",
                    width : "100%",
                    alignItems : "center",
                    alignContent : 'center',
                    justifyItems : "center",
                    justifyContent : "center",
                    display : "grid"
                }}>
                    <ArchimedesNav nodeStyle={{
                        fontSize : "20px"
                    }}
                    initSelected={selected}
                    onSelect={handleSelect}
                    itemNames={[
                        HOME, ABOUT, DOCS
                    ]} />
                </div>
            </HeaderLayoutMobile.Nav>
        </HeaderLayoutMobile>

    )

}