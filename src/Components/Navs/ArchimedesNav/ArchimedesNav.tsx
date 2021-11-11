import React, {Children, FC, ReactElement} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ArchimedesNavNode } from './ArchimedesNavNode';
import { generateNamedMember, getComponentMembers } from 'rgfm';

const Members = ["Separator"];

export type ArchimedesNavProps = {
    itemNames : string[],
    onSelect ?: (item : string)=>void,
    initSelected? : string,
    preventDefault? : boolean,
    nodeStyle? : React.CSSProperties
}

const ArchimedesNav : FC<ArchimedesNavProps> & {
    Separator : FC
} = ({
    children,
    itemNames,
    onSelect,
    initSelected,
    preventDefault = false,
    nodeStyle
}) =>{

    const [selected, setSelected] = useState(
        initSelected ||
        ( itemNames.length ? itemNames[0] : undefined )
    )

    const [selecting, setSelecting] = useState<string|undefined>(undefined);
    const handleNodeSelect = (itemName : string)=>{
        setSelecting(itemName);
    }

    const {
        Separator
    } = getComponentMembers(Members, children);

    const nodes = itemNames.reduce((agg, itemName, index)=>{
        return [
            ...agg,
            <span key={itemName}>
                {index < itemNames.length - 1 ? (
                    <>
                    <ArchimedesNavNode 
                        key={itemName}
                        style={nodeStyle}
                        selected={selected === itemName} 
                        itemName={itemName} 
                        onSelect={handleNodeSelect}/>
                    {Separator||<span key={index}>&emsp;</span>}
                </>
                ) : (
            
                        <ArchimedesNavNode 
                            key={itemName}
                            style={nodeStyle}
                            selected={selected === itemName} 
                            itemName={itemName} 
                            onSelect={handleNodeSelect}/>
                )}
            </span>
        ]
    }, [] as React.ReactNode[])

    useEffect(()=>{
        if(selecting){
            setSelecting(undefined);
            !preventDefault && setSelected(selecting);
            onSelect && onSelect(selecting)
        }
    })

    return (

        <div>
            {nodes}
        </div>

    )

}

ArchimedesNav.Separator = generateNamedMember("Separator");
export { ArchimedesNav};