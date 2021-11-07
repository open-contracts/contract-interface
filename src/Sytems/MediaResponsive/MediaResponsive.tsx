import React, {Children, FC, ReactElement} from 'react';
import {generateNamedMember, getComponentMembers} from "rgfm";
import MediaQuery from "react-responsive";

const Members = ["Desktop", "Laptop", "Tablet", "Mobile"] as const;

export type MediaResponsiveProps = {}

/**
 * Uses media queries to control component display by media type.
 * @param param0 
 * @returns a ReactNode displaying the appropriate component view by media type.
 */
const MediaResponsive : FC<MediaResponsiveProps> & {
    Desktop : FC,
    Laptop : FC,
    Tablet : FC,
    Mobile : FC
} = ({
    children
}) =>{

    const {
        Desktop,
        Laptop,
        Tablet,
        Mobile
    } = getComponentMembers(Members, children);

    

    return (

        <>
            <MediaQuery minWidth={1200}>
                {Desktop}
            </MediaQuery>   
            <MediaQuery minWidth={992} maxWidth={1199}>
                {Laptop}
            </MediaQuery>
            <MediaQuery minWidth={768} maxWidth={991}>
                {Tablet}
            </MediaQuery>
            <MediaQuery maxWidth={767}>
                {Mobile}
            </MediaQuery>
        </>

    )

}

MediaResponsive.Desktop = generateNamedMember("Desktop");
MediaResponsive.Laptop = generateNamedMember("Laptop");
MediaResponsive.Tablet = generateNamedMember("Tablet");
MediaResponsive.Mobile = generateNamedMember("Mobile")

export { MediaResponsive };

