import React, {FC, ReactElement} from 'react';
import { generateNamedMember, getComponentMembers } from 'rgfm';
import { DesktopSizes } from '../../Theme';

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
            width : "100%",
            display : "grid",
            gridTemplateColumns : "1fr",
            gap : DesktopSizes.Padding.whitespacePreferred,
            paddingBottom : DesktopSizes.Padding.whitespacePreferred,
            paddingTop : DesktopSizes.Padding.whitespacePreferred
        }}>
            <div>
                {Brand}
            </div>
            <div style={{
                display : "flex",
                justifyContent : "center",
                justifyItems : "center"
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