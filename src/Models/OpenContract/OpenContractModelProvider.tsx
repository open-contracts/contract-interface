import React, {FC, ReactElement} from 'react';
import { createContext } from 'react';
import { useContext, useReducer } from 'react';

export type OpenContractContext = {
    notify : number,
    openContract ? : IOpenContract,
    dispatch : React.Dispatch<(state: OpenContractContext) => OpenContractContext>
}

/**
 * By default the domain name should be root
 * and the views should be empty.
 */
export const DefaultOpenContractContext : OpenContractContext = {
    openContract : undefined,
    notify : 0,
    dispatch : ()=>{}
}

export const OpenContractCtx = createContext(DefaultOpenContractContext);

/**
 * Reduces the state of a domain with a setter function.
 * @param state is the state of the domain before the reductino.
 * @param set is a function that sets the state of the domain.
 * @returns the new state of the domain.
 */
export const domainReducer = (state : OpenContractContext, set : (state : OpenContractContext)=>OpenContractContext)=>set(state);

export type OpenContractContextProps = {

}

/**
 * Provides access to OpenContractContext. Handles view fetching for OpenContractContext.
 * @param param0 
 * @returns 
 */
export const OpenContractContextProvider : FC<OpenContractContextProps>  = ({children}) =>{

    const [state, dispatch] = useReducer(
        domainReducer,
        DefaultOpenContractContext
    );

    const _dispatch = (set : (contract : OpenContractContext)=>OpenContractContext)=>{
        console.log("Setting!");
        set(state)
        dispatch(set);
    }

    return (

        <OpenContractCtx.Provider value={{
            ...state,
            dispatch : dispatch
        }}>
            {children}
        </OpenContractCtx.Provider>

    )

}

/**
 * Gives read-only access to domain context.
 * @returns the current domain context.
 */
export const useOpenContractContext = () : Readonly<OpenContractContext> =>{
    const context = useContext(OpenContractCtx);
    if(!context) throw new Error("useOpenContractContext must be called from within a context provider.");
    return context;
}