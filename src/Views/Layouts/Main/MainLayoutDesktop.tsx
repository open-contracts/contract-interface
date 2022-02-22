import React, {FC, ReactElement} from 'react';
import { DesktopSizes } from '../../Theme';
import { generateNamedMember, getComponentMembers } from 'rgfm';

const Members = ["Header", "Content", "Footer"]

export type MainLayoutDesktopProps = {}

const MainLayoutDesktop : FC<MainLayoutDesktopProps>  & {
    Header : FC,
    Content : FC, 
    Footer : FC
} = ({
    children
}) =>{

    const {
        Header,
        Content,
        Footer
    } = getComponentMembers(Members, children);

    

    return (

        <div style={{
            height : "auto",
            width : "100vw",
            display : "grid",
            justifyContent : "center",
            justifyItems : "center"
        }}>
            <div style={{
                width : DesktopSizes.Main.contentWidth,
                overflow : "visible"
            }}>
                <div style={{
                    height : "200px",
                    width : "100%"
                }}>
                    {Header}
                </div>
                <div style={{
                    height : "auto",
                    width : "100%",
                    // overflow : "auto",
                }}> 
                    {Content}
                </div>
            </div>
        </div>

    )

}

MainLayoutDesktop.Header = generateNamedMember("Header");
MainLayoutDesktop.Content = generateNamedMember("Content");
MainLayoutDesktop.Footer = generateNamedMember("Footer");

export {MainLayoutDesktop}