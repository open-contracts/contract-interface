import React, {Children, FC, ReactElement} from 'react';

export type ThroughGlassAgathoclesProps = {
    glass ? : boolean,
    style ? : React.CSSProperties,
    glassOpacity ? : React.CSSProperties["opacity"]
}

export const ThroughGlassAgathocles : FC<ThroughGlassAgathoclesProps>  = ({
    glass = false,
    glassOpacity = ".95",
    style,
    children
}) =>{

    return (

        <div 
            style={{
                opacity : glass ? glassOpacity : "1.0",
                ...style
            }}>
                {children}
        </div>

    )

}