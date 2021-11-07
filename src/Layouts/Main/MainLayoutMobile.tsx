import React, {FC, ReactElement} from 'react';
import { DesktopSizes } from '../../Theme';
import { generateNamedMember, getComponentMembers } from 'rgfm';

const Members = ["Header", "Content", "Footer"]

export type MainLayoutMobileProps = {}

const MainLayoutMobile : FC<MainLayoutMobileProps>  & {
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
            padding : DesktopSizes.Padding.whitespacePreferred,
            display : "grid",
            gridTemplateColumns: "1fr",
            justifyContent : "center",
            justifyItems : "center"
        }}>
            <div style={{
                width : "100%",
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
                    overflow : "visible"
                }}> 
                    {Content}
                </div>
            </div>
        </div>

    )

}

MainLayoutMobile.Header = generateNamedMember('Header');
MainLayoutMobile.Content = generateNamedMember("Content");
MainLayoutMobile.Footer = generateNamedMember("Footer");

export {MainLayoutMobile}