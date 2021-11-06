import React, {FC, ReactElement} from 'react';

export type PhantomBoxProps = {
    style ? : React.CSSProperties,
    left ? : boolean
}

export const PhantomBox : FC<PhantomBoxProps>  = ({
    children,
    style,
    left
}) =>{

    console.log(left);

    return (

        <div style={{
            height : "100%",
            background : `linear-gradient(${left ? "to left" : "to right"}, #FFFFFF00, #FFFFFF05, #FFFFFF10, #FFFFFF30)`,
            ...style
        }}>
            {children}
        </div>

    )

}