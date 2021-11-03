import React, {FC, ReactElement} from 'react';
import { Colors, DesktopSizes } from '../../Theme';

export type TerminalAndresProps = {
    style ? : React.CSSProperties,
}

export const TerminalAndres : FC<TerminalAndresProps>  = ({
    children,
    style
}) =>{

    return (

       <div style={{
           background : "black",
           font : 'white',
           border : `1px solid ${Colors.primaryTextColor}`,
           borderRadius : DesktopSizes.BorderRadius.standard,
           ...style
       }}>
           {children}
       </div>

    )

}