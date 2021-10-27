import React, {FC, ReactElement, createContext, useReducer, useEffect, useContext} from 'react';


export interface ItemContextI {
    itemsLoading : boolean,
    itemsValidating : boolean,
    itemsLoaded : boolean,
    items : {
        [key : string] : any
    },
    dispatch : (fn : (state : ItemContextI)=>ItemContextI)=>void
}

const DefaultItemContext : ItemContextI = {
    itemsLoading : false,
    itemsValidating : false,
    itemsLoaded : false,
    items : {},
    dispatch : ()=>{}
}


export const ItemContext = createContext(DefaultItemContext);

export const itemReducer = (
    state : ItemContextI, 
    action : (state : ItemContextI)=>ItemContextI
)=>{
    return action(state);
}

export type ItemProviderProps = {
    initialItems? : {
        [key : string] : any
    } 
}

export const ItemProvider : FC<ItemProviderProps>  = ({
    initialItems,
    children
}) =>{

    const [state, dispatch] = useReducer(itemReducer, DefaultItemContext);

    // initializing phase
    useEffect(()=>{

        if(!state.itemsLoaded && !state.itemsLoading && !state.itemsValidating){

            dispatch(()=>{
                return {
                    ...state,
                    dispatch : dispatch,
                    itemsValidating : true,
                    items : {
                        ...initialItems
                    }
                }
            })

        }

    })

    // validating phase
    useEffect(()=>{

        if(!state.itemsLoaded && !state.itemsLoading && state.itemsValidating && state.dispatch){

            dispatch(()=>{
                return {
                    ...state,
                    itemsValidating : false,
                    itemsLoaded : true
                }
            })


        } 
    })

    return (

        <ItemContext.Provider value={state}>
                {children}
        </ItemContext.Provider>

    )

}




export const useItemStore = () : ItemContextI=>{

    const context = useContext(ItemContext);

    if(!context){
        throw new Error("useItems must be called within a ItemProvider.");
    }

    return context;

}