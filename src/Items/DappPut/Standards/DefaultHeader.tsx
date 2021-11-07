import React, {FC, ReactElement} from 'react';
import { Colors } from '../../../Theme';
import { DappPutI } from '../DappPutType';
import { generateNamedMember, getComponentMembers } from 'rgfm';

const Members = ["Pre", "Post"];

export type DefaultHeaderProps = {
    dappPut : DappPutI,
    style ? : React.CSSProperties
}

const DefaultHeader : FC<DefaultHeaderProps> & {
    Pre : FC,
    Post : FC
}  = ({
    dappPut,
    children,
    style
}) =>{

    const {
        Pre,
        Post
    } = getComponentMembers(Members, children);

    return (

        <div>
            <div style={{
                display :"flex",
                alignContent : "center",
                alignItems : "center",
                fontSize : "18px",
                color : Colors.primaryTextColor,
                ...style
            }}><b>{Pre}&emsp;</b>{dappPut.name}{Post}<br/></div>
            <p style={{
                color : Colors.secondaryTextColor
            }}>
            {dappPut.description}
            </p>
        </div>

    )

}

DefaultHeader.Pre = generateNamedMember("Pre");
DefaultHeader.Post = generateNamedMember("Post");

export {DefaultHeader}