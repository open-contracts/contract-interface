import React, {FC, ReactElement} from 'react';

export type GrowOnEventAchamaenidProps = {
    grow ? : boolean,
    style? : React.CSSProperties
}

export const GrowOnEventAchamaenid : FC<GrowOnEventAchamaenidProps>  = ({
    grow = false,
    style,
    children
}) =>{

    return (

        <div 
        className={grow ? "grow" : "anti-grow"}
        style={{
            ...style
        }}>
            {children}
        </div>

    )

}