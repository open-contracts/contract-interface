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
            textAlign : "left",
            overflowWrap : "anywhere",
            paddingTop : DesktopSizes.Padding.whitespacePreferred,
            paddingBottom : DesktopSizes.Padding.whitespacePreferred,
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