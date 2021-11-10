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
            display : "flex",
            flexDirection : "column",
            margin : "0 auto",
            width : "80vw",
        }}>
            <div>
                {Header}
            </div>
            <div>
                {Content}
            </div>
        </div>

    )

}

MainLayoutMobile.Header = generateNamedMember('Header');
MainLayoutMobile.Content = generateNamedMember("Content");
MainLayoutMobile.Footer = generateNamedMember("Footer");

export {MainLayoutMobile}