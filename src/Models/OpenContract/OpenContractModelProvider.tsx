import React, {FC, ReactElement} from 'react';
import { createContext } from 'react';
import { useContext, useReducer } from 'react';

export type OpenContractContext = {
    openContract ? : IOpenContract,
    dispatch : React.Dispatch<(state: OpenContractContext) => OpenContractContext>
}

/**
 * By default the domain name should be root
 * and the views should be empty.
 */
export const DefaultOpenContractContext : OpenContractContext = {
    openContract : undefined,
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
    openContract ? : IOpenContract
}

/**
 * Provides access to OpenContractContext. Handles view fetching for OpenContractContext.
 * @param param0 
 * @returns 
 */
export const OpenContractContextProvider : FC<OpenContractContextProps>  = ({openContract, children}) =>{

    const [state, dispatch] = useReducer(
        domainReducer,
        DefaultOpenContractContext
    );

    return (

        <OpenContractCtx.Provider value={{
            ...state,
            openContract : openContract,
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