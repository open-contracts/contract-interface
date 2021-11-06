import React, {FC, ReactElement} from 'react';
import { Colors } from '../../../Theme';
import { DappPutI } from '../DappPutType';
import { generateNamedMember, getComponentMembers } from 'rgfm';

const Members = ["Icon"];

export type DefaultHeaderProps = {
    dappPut : DappPutI
}

const DefaultHeader : FC<DefaultHeaderProps> & {
    Icon : FC,
}  = ({
    dappPut,
    children
}) =>{

    const {
        Icon
    } = getComponentMembers(Members, children);

    return (

        <div>
            <div style={{
                display :"flex",
                alignContent : "center",
                alignItems : "center",
                fontSize : "24px",
                color : Colors.primaryTextColor
            }}><b>{Icon}&emsp;</b>{dappPut.name}<br/></div>
            <p style={{
                color : Colors.secondaryTextColor
            }}>
            {dappPut.description}
            </p>
        </div>

    )

}

DefaultHeader.Icon = generateNamedMember("Icon");

export {DefaultHeader}