import React, {FC, ReactElement, createContext, useReducer, useEffect, useContext} from 'react';
import { ReadyT } from '../../Components/Ready/AristophanesReady';


export interface DependencyContextI {
    DependencysLoading : boolean,
    DependencysValidating : boolean,
    DependencysLoaded : boolean,
    Dependencys : {
        crt : ReadyT,
        wallet : ReadyT,
        enclave : ReadyT
    },
    dispatch : (fn : (state : DependencyContextI)=>DependencyContextI)=>void
}

const DefaultDependencyContext : DependencyContextI = {
    DependencysLoading : false,
    DependencysValidating : false,
    DependencysLoaded : false,
    Dependencys : {
        crt : "not ready",
        wallet : "not ready",
        enclave : "not ready"
    },
    dispatch : ()=>{}
}


export const DependencyContext = createContext(DefaultDependencyContext);

export const DependencyReducer = (
    state : DependencyContextI, 
    action : (state : DependencyContextI)=>DependencyContextI
)=>{
    return action(state);
}

export type DependencyProviderProps = {
}

export const DependencyProvider : FC<DependencyProviderProps>  = ({
    children
}) =>{

    const [state, dispatch] = useReducer(DependencyReducer, DefaultDependencyContext);

    useEffect(()=>{

        if(!state.DependencysLoaded && !state.DependencysLoading && !state.DependencysValidating){

            dispatch(()=>{
                return {
                    ...state,
                    dispatch : dispatch,
                    DependencysValidating : true,
                }
            })

        }

    })

    useEffect(()=>{

        if(!state.DependencysLoaded && !state.DependencysLoading && state.DependencysValidating && state.dispatch){

            dispatch(()=>{
                return {
                    ...state,
                    DependencysValidating : false,
                    DependencysLoaded : true
                }
            })


        } 
    })

    return (

        <DependencyContext.Provider value={state}>
                {children}
        </DependencyContext.Provider>

    )

}




export const useDependencyStore = () : DependencyContextI=>{

    const context = useContext(DependencyContext);

    if(!context){
        throw new Error("useDependencys must be called within a DependencyProvider.");
    }

    return context;

}