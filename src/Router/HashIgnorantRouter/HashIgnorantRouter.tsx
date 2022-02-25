import React, {FC, ReactElement, useMemo} from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useContext, useReducer } from 'react';

export type HashIgnorantRouterContext = {
    hash : string,
    search : string,
    dispatch : React.Dispatch<(state: HashIgnorantRouterContext) => HashIgnorantRouterContext>
}

/**
 * By default the domain name should be root
 * and the views should be empty.
 */
export const DefaultHashIgnorantRouterContext : HashIgnorantRouterContext = {
    hash : "",
    search : "",
    dispatch : ()=>{}
}

export const HashIgnorantRouterCtx = createContext(DefaultHashIgnorantRouterContext);

/**
 * Reduces the state of a domain with a setter function.
 * @param state is the state of the domain before the reductino.
 * @param set is a function that sets the state of the domain.
 * @returns the new state of the domain.
 */
export const domainReducer = (state : HashIgnorantRouterContext, set : (state : HashIgnorantRouterContext)=>HashIgnorantRouterContext)=>set(state);

export type HashIgnorantRouterContextProps = {

}


/**
 * Provides access to HashIgnorantRouterContext. Handles view fetching for HashIgnorantRouterContext.
 * @param param0 
 * @returns 
 */
export const HashIgnorantRouterContextProvider : FC<HashIgnorantRouterContextProps>  = ({children}) =>{

    const [state, dispatch] = useReducer(
        domainReducer,
        DefaultHashIgnorantRouterContext
    );

    window.onhashchange = (e)=>{
        e.preventDefault();
        const split = window.location.hash.split("?");
        dispatch((state)=>{
            return {
                ...state,
                hash : split[0],
                search : split[1]
            }
        })
    }   

    return (

        useMemo(()=><HashIgnorantRouterCtx.Provider value={{
            ...state,
            dispatch
        }}>
            {children}
        </HashIgnorantRouterCtx.Provider>, [state.hash])

    )

}

/**
 * Gives read-only access to domain context.
 * @returns the current domain context.
 */
export const useHashIgnorantRouterContext = () : Readonly<HashIgnorantRouterContext> =>{
    const context = useContext(HashIgnorantRouterCtx);
    if(!context) throw new Error("useHashIgnorantRouterContext must be called from within a context provider.");
    return context;
}