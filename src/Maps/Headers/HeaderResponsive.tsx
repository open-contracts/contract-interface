import React, {FC, ReactElement} from 'react';
import {MediaResponsive} from "../../Sytems";
import {HeaderDesktop, HeaderMobile} from ".";

export type HeaderResponsiveProps = {
    selected : string
}

export const HeaderResponsive : FC<HeaderResponsiveProps>  = ({
    selected
}) =>{

    return (

       <MediaResponsive>
           <MediaResponsive.Desktop>
                <HeaderDesktop/>
           </MediaResponsive.Desktop>
           <MediaResponsive.Laptop>
                <HeaderDesktop/>
           </MediaResponsive.Laptop>
           <MediaResponsive.Tablet>
                <HeaderMobile selected={selected}/>
           </MediaResponsive.Tablet>
           <MediaResponsive.Mobile>
                <HeaderMobile selected={selected}/>
           </MediaResponsive.Mobile>
       </MediaResponsive>

    )

}