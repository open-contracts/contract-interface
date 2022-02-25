import React, {FC, ReactElement} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Colors } from '../../Theme';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Skeleton from "react-loading-skeleton";

export type TermsProps = {}

export const Terms : FC<TermsProps>  = () =>{

    const [terms, setTerms] = useState<string|undefined>(undefined);
    useEffect(()=>{
        fetch("/Terms.md").then((data)=>{
            data.text().then((data)=>{
                setTerms(data);
            }).catch(()=>{})
        }).catch(()=>{});
    }, []);

    return (

        <div style={{
            width : "100vw",
            padding : "5%",
            display : 'grid',
            justifyContent : "center",
            justifyItems : "center",
            color : Colors.Maintheme
        }}>
            <div style={{
                textAlign : "left",
                width : "80%"
            }}>
                {terms ? <ReactMarkdown plugins={[remarkGfm]}>
                    {terms||""}
                </ReactMarkdown> : <Skeleton count={6}/>}
            </div>
        </div>

    )

}