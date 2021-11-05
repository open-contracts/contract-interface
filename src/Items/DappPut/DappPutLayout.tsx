import React, {FC, ReactElement} from 'react';
import {generateNamedMember, getComponentMembers} from "rgfm";
import { DesktopSizes } from '../../Theme';

const Members = ["Content", "Header"];

export type DappPutInputProps = {
    style ? : React.CSSProperties,
}

const DappPutLayout : FC<DappPutInputProps> & {
    Header : FC,
    Content : FC
} = ({
    style,
    children
}) =>{

    const {
        Header,
        Content
    } = getComponentMembers(Members, children);

    return (

        <div style={{
            display : "grid",
            gridTemplateColumns : "1fr",
            gridTemplateRows : "3fr 2fr",
            textAlign : "left",
            paddingTop : DesktopSizes.Padding.standard,
            paddingBottom : DesktopSizes.Padding.standard,
            paddingLeft : DesktopSizes.Padding.whitespacePreferred,
            paddingRight : DesktopSizes.Padding.whitespacePreferred,
            borderRadius : DesktopSizes.BorderRadius.standard,
            ...style
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

DappPutLayout.Header = generateNamedMember("Header");
DappPutLayout.Content = generateNamedMember("Content")

export {DappPutLayout};