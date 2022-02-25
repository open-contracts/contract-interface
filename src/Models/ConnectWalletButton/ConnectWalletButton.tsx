import React, {FC, ReactElement, useRef} from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useContext, useReducer } from 'react';

export type ConnectWalletContext = {
    warning : React.ReactNode | string |undefined,
    buttonRef : React.MutableRefObject<HTMLDivElement> | null,
    dispatch : React.Dispatch<(state: ConnectWalletContext) => ConnectWalletContext>
}

/**
 * By default the connectWallet name should be root
 * and the views should be empty.
 */
export const DefaultConnectWalletContext : ConnectWalletContext = {
    warning : undefined,
    buttonRef : null,
    dispatch : ()=>{}
}

export const ConnectWalletCtx = createContext(DefaultConnectWalletContext);

/**
 * Reduces the state of a connectWallet with a setter function.
 * @param state is the state of the connectWallet before the reductino.
 * @param set is a function that sets the state of the connectWallet.
 * @returns the new state of the connectWallet.
 */
export const connectWalletReducer = (state : ConnectWalletContext, set : (state : ConnectWalletContext)=>ConnectWalletContext)=>set(state);

export type ConnectWalletContextProps = {

}

/**
 * Provides access to ConnectWalletContext. Handles view fetching for ConnectWalletContext.
 * @param param0 
 * @returns 
 */
export const ConnectWalletContextProvider : FC<ConnectWalletContextProps>  = ({children}) =>{

    const [state, dispatch] = useReducer(
        connectWalletReducer,
        DefaultConnectWalletContext
    );

    return (

        <ConnectWalletCtx.Provider value={{
            ...state,
            dispatch : dispatch
        }}>
            {children}
        </ConnectWalletCtx.Provider>

    )

}

/**
 * Gives read-only access to connectWallet context.
 * @returns the current connectWallet context.
 */
export const useConnectWalletContext = () : Readonly<ConnectWalletContext> =>{
    const context = useContext(ConnectWalletCtx);
    if(!context) throw new Error("useConnectWalletContext must be called from within a context provider.");
    return context;
}