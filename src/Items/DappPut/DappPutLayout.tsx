import React, {FC, ReactElement} from 'react';
import {generateNamedMember, getComponentMembers} from "rgfm";
import { DesktopSizes } from '../../Theme';

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
            paddingTop : DesktopSizes.Padding.standard,
            paddingBottom : DesktopSizes.Padding.standard,
            paddingLeft : DesktopSizes.Padding.standard,
            paddingRight : DesktopSizes.Padding.standard,
            borderBottomRightRadius : end ? DesktopSizes.BorderRadius.standard : "0px",
            borderBottomLeftRadius : end ? DesktopSizes.BorderRadius.standard : "0px",
            borderTopRightRadius : "0px",
            borderTopLeftRadius : "0px",
            borderCollapse : "collapse",
            ...style,
            border : undefined,
            borderTop : style?.borderTop,
            borderRight : style?.borderRight || style?.border,
            borderLeft : style?.borderLeft || style?.border,
            borderBottom : style?.borderBottom || style?.border
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