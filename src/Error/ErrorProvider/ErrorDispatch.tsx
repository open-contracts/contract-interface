import React, {FC, ReactElement} from 'react';
import { useEffect } from 'react';
import { useErrorContext } from './ErrorProvider';

export type ErrorDispatchProps = {
    error : Error
}

export const ErrorDispatch : FC<ErrorDispatchProps>  = ({
    error
}) =>{

    const {
        dispatch 
    } = useErrorContext();

    useEffect(()=>{
        dispatch((state)=>{
            return {
                ...state,
                error : error
            }
        })
    })

    return (

        <>
        

        </>

    )

}