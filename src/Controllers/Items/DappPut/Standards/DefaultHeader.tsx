import React, {FC, ReactElement} from 'react';
import { Colors, DesktopSizes } from '../../../Theme';
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

        <div style={{
            paddingBottom : DesktopSizes.Padding.standard
        }}>
            <div style={{
                display :"grid",
                gridTemplateColumns : "30px auto",
                alignContent : "center",
                alignItems : "center",
                fontSize : "20px",
                color : Colors.Maintheme,
                textAlign : "left",
                ...style
            }}>
                <div>
                    <b>{Pre}</b>
                </div>
                <div>
                    {dappPut.name}{Post}
                </div>
            </div>
            <div>
                {dappPut.description && <><br/>
                <p style={{
                    color : Colors.secondaryTextColor
                }}>
                {dappPut.description}
                </p></>}
            </div>
        </div>

    )

}

DefaultHeader.Pre = generateNamedMember("Pre");
DefaultHeader.Post = generateNamedMember("Post");

export {DefaultHeader}