import React, {FC, ReactElement} from 'react';
import { useParams } from 'react-router';

export type RunDappProps = {}

export const RunDapp : FC<RunDappProps>  = () =>{


    const {
        owner,
        repo
    } = useParams();

    window.location.href = `https://open-contracts.github.io?github_user=${encodeURI(owner||"")}&github_repo=${encodeURI(repo||"")}`; 

    return (

        <>
        

        </>

    )

}