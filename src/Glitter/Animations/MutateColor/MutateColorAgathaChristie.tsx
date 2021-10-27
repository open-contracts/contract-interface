import React, {FC, ReactElement, useState, useEffect} from 'react';
import { generateNamedMember, getComponentMembers } from 'rgfm';

export type MutateColorAgathaChristieProps = {
    style? : React.CSSProperties,
    speed ? : number,
    initFilter : string,
    transitionFilter : (last : string)=>string
}

const MutateColorAgathaChristie : FC<MutateColorAgathaChristieProps> & {
    Overlay : FC,
    Content : FC
}  = ({
    style,
    children,
    speed = 80,
    initFilter,
    transitionFilter
}) =>{


    const [filter, setFilter] = useState(initFilter);
    const [transitionOpacityTimeout, setTransitionOpacityTimeout]= useState<undefined | NodeJS.Timeout>(undefined)


    useEffect(()=>{

        console.log(filter);

        if(!transitionOpacityTimeout){

            const timeout =  setTimeout(()=>{
                
            
                setFilter(
                    transitionFilter(filter)
                );
                setTransitionOpacityTimeout(undefined);
        
            }, speed)
    
            setTransitionOpacityTimeout(timeout)

        }

        return ()=>{
           // const run = transitionOpacityTimeout ? clearTimeout(transitionOpacityTimeout) : undefined;
        }


    })

    return (

        <div style={{
            ...style,
            transition : "all .2s ease-in-out",
            position : "relative",
            filter : filter
        }}>
            {children}
        </div>

    )

}

MutateColorAgathaChristie.Overlay = generateNamedMember("Overlay");
MutateColorAgathaChristie.Content = generateNamedMember("Content");

export {MutateColorAgathaChristie}