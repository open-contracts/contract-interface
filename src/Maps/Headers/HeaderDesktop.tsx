import React, {FC, ReactElement} from 'react';
import { LogoB } from '../../Glitter';
import {HeaderLayoutDesktop} from "../../Layouts";
import { ArchimedesNav } from '../../Components/Navs';
import { AbleAccountToggle } from '../../Components/AccountToggles';
import { PersonFill } from 'react-bootstrap-icons';
import { Colors } from '../../Theme';
import { useColorStore } from '../../Theme/ColorProvider';
import { useHistory } from 'react-router';

export const HOME = "EXPLORE"
export const HOME_PATH = "/"
export const ABOUT = "ABOUT";
export const ABOUT_PATH = "/about"
export const DOCS = "DOCS";
export const DOCS_PATH = "https://open-contracts.readthedocs.io";

export type HeaderDesktopProps = {
    selected : string
}

export const HeaderDesktop : FC<HeaderDesktopProps>  = ({
    selected
}) =>{

    const Colors = useColorStore();

    const history = useHistory();

    const goHome = ()=>{
        history.push(HOME_PATH);
    }

    const goAbout = ()=>{
        history.push(ABOUT_PATH);
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

        <HeaderLayoutDesktop>
            <HeaderLayoutDesktop.Brand>
                <div 
                    onClick={handleLogo}
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
                    width : "100%",
                    alignItems : "center",
                    alignContent : 'center',
                    justifyItems : "right",
                    justifyContent : "right",
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
            </HeaderLayoutDesktop.Nav>
            <HeaderLayoutDesktop.Account>
                <div style={{
                    height : "100%",
                    width : "100%",
                    display : "grid",
                    alignItems : "center",
                    alignContent : "center",
                    justifyContent : "right",
                    justifyItems : "right"
                }}>
                    <AbleAccountToggle>
                        <AbleAccountToggle.ToggleIcon>
                            <PersonFill size="100%" color={Colors.colors.Maintheme}/>
                        </AbleAccountToggle.ToggleIcon>
                    </AbleAccountToggle>
                </div>
            </HeaderLayoutDesktop.Account>
        </HeaderLayoutDesktop>

    )

}