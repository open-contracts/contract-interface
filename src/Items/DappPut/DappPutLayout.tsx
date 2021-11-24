import React, {FC, ReactElement} from 'react';
import {generateNamedMember, getComponentMembers} from "rgfm";
import { Colors, DesktopSizes, Shadows } from '../../Theme';

const Members = ["Content", "Header"];

export type DappPutInputProps = {
    style ? : React.CSSProperties,
    end ? : boolean
}

const DappPutLayout : FC<DappPutInputProps> & {
    Header : FC,
    Content : FC
} = ({
    style,
    end,
    children
}) =>{

    const {
        Header,
        Content
    } = getComponentMembers(Members, children);

    

    return (

        <div style={{
            textAlign : "left",
            overflowWrap : "anywhere",
            padding : "20px",
            borderRadius : DesktopSizes.BorderRadius.standard,
            borderCollapse : "collapse",
            border : "none",
            boxShadow : Shadows.defaultShadow,
            ...style,
        }}>
            <div style={{
                fontSize : "24px",
            }}>
                {Header}
            </div>
            <div style={{
                fontSize : "18px"
            }}>
                {Content}
            </div>
        </div>

    )

}

DappPutLayout.Header = generateNamedMember("Header");
DappPutLayout.Content = generateNamedMember("Content")

export {DappPutLayout};