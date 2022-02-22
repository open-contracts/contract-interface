import React, {FC, ReactElement} from 'react';
import {useResizeDetector} from "react-resize-detector";
import { generateNamedMember, getComponentMembers} from 'rgfm';

export const satisfies = (width : number, height : number, props : SizeSafeProps) : boolean=>{

    const {
        minClientHeight,
        maxClientHeight,
        minClientWidth,
        maxClientWidth
    } = props;

    return (minClientWidth ?  (width > minClientWidth) : true)
            && (maxClientWidth ? (width < maxClientWidth) : true) 
            && (minClientHeight ? (height > minClientHeight) : true)
            && (maxClientHeight ? (height < maxClientHeight) : true)
      
}

const Members = ["Main", "Fallback"];

export type SizeSafeProps = {
    minClientWidth?: number,
    maxClientWidth?: number,
    minClientHeight?: number,
    maxClientHeight?: number
}

/**
 * 
 * @param param0 
 * @returns 
 */
const SizeSafe : FC<SizeSafeProps> & {
    Main : FC,
    Fallback : FC
} = ({
    children,
    minClientHeight,
    maxClientHeight,
    minClientWidth,
    maxClientWidth
}) =>{

    const {width, height, ref} = useResizeDetector<HTMLDivElement>();

    const displayMain = satisfies(width || 0, height || 0, {
        minClientHeight,
        maxClientHeight,
        minClientWidth,
        maxClientWidth
    })

    const {
        Main,
        Fallback
    } = getComponentMembers(Members, children);

    return (

        <>
            {displayMain ? Main : Fallback}
        </>

    )

}

SizeSafe.Main = generateNamedMember("Main");
SizeSafe.Fallback = generateNamedMember("Fallback");

