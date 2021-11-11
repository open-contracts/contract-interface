import React, {FC, ReactElement, createContext, useReducer, useEffect, useContext} from 'react';
import { Colors } from './Colors';


export interface ColorContextI {
    colors : typeof Colors,
    dispatch : (fn : (state : ColorContextI)=>ColorContextI)=>void
}

const DefaultColorContext : ColorContextI = {
    colors : Colors,
    dispatch : ()=>{}
}


export const ColorContext = createContext(DefaultColorContext);

export const ColorReducer = (
    state : ColorContextI, 
    action : (state : ColorContextI)=>ColorContextI
)=>{
    return action(state);
}

export type ColorProviderProps = typeof Colors

export const ColorProvider : FC<ColorProviderProps>  = (props) =>{

    const {
        children,
        ...colors
    } = props;

    const [state, dispatch] = useReducer(ColorReducer, DefaultColorContext);

    return (

        <ColorContext.Provider value={{
            ...state,
            colors : colors
        }}>
                {props.children}
        </ColorContext.Provider>

    )

}




export const useColorStore = () : ColorContextI=>{

    const context = useContext(ColorContext);

    if(!context){
        throw new Error("useColors must be called within a ColorProvider.");
    }

    return context;

}