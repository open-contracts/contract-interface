import React, {FC, ReactElement} from 'react';

export type AddNewProps = {
    style? : React.CSSProperties
}

export const AddNew : FC<AddNewProps>  = ({
    style
}) =>{

    return (

     
        <img src={`${process.env.PUBLIC_URL}/add_new.svg`} style={{
            height : "150px",
            width : "150px",
            ...style
        }}/>

    )

}