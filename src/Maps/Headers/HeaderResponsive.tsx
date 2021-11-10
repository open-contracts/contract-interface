import React, {FC, ReactElement} from 'react';
import {MediaResponsive} from "../../Sytems";
import {HeaderDesktop, HeaderMobile} from ".";
import { ReadyT } from '../../Components/Ready';

export type HeaderResponsiveProps = {
    wallet : ReadyT
}

export const HeaderResponsive : FC<HeaderResponsiveProps>  = ({
    wallet
}) =>{

    return (

       <MediaResponsive>
           <MediaResponsive.Desktop>
                <HeaderDesktop wallet={wallet}/>
           </MediaResponsive.Desktop>
           <MediaResponsive.Laptop>
                <HeaderDesktop wallet={wallet}/>
           </MediaResponsive.Laptop>
           <MediaResponsive.Tablet>
                <HeaderMobile wallet={wallet}/>
           </MediaResponsive.Tablet>
           <MediaResponsive.Mobile>
                <HeaderMobile wallet={wallet}/>
           </MediaResponsive.Mobile>
       </MediaResponsive>

    )

}