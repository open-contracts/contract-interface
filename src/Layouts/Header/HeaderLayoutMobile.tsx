import React, {FC, ReactElement} from 'react';
import { generateNamedMember, getComponentMembers } from 'rgfm';

const Members = ["Brand", "Nav", "Account"] as const;

export type HeaderLayoutMobileProps = {}

const HeaderLayoutMobile : FC<HeaderLayoutMobileProps> & {
    Brand : FC,
    Nav : FC,
    Account : FC
} = ({
    children
}) =>{

    const {
        Brand,
        Nav,
        Account
    } = getComponentMembers(Members, children);

    return (

        <div style={{
            height : "100%",
            width : "100%",
            display : "grid",
            gridTemplateColumns : "1fr",
            justifyContent : "center",
            justifyItems : "center"
        }}>
            <div style={{
                height : "100%",
                width : "100%"
            }}>
                {Brand}
            </div>
            <div style={{
                height : "100%",
                width : "100%"
            }}>
                {Nav}
            </div>
        </div>

    )

}

HeaderLayoutMobile.Brand = generateNamedMember('Brand');
HeaderLayoutMobile.Nav = generateNamedMember("Nav");
HeaderLayoutMobile.Account = generateNamedMember("Account");

export {HeaderLayoutMobile};