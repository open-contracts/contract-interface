import React, {FC, ReactElement} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { generateRandomDappItems } from '../Demo';
import { useErrorContext } from '../Error/ErrorProvider';
import { DappI } from '../Items';
import { MainRouter } from '../Router';
import { getFeaturedDapps } from '../Sytems/Featured';
import { ItemProvider } from '../Sytems/ItemProvider';
import { Colors, DesktopSizes } from '../Theme';
import { ColorProvider } from '../Theme/ColorProvider';

export type MainSegmentProps = {}

export const MainSegment : FC<MainSegmentProps>  = () =>{

    const [[initItems, initItemsRequested], setInitItems] = 
        useState<[
            {[key : string] : DappI}|undefined,
            boolean
        ]>([undefined, false]);
    const {
        dispatch
    } = useErrorContext();

    useEffect(()=>{

        if(!initItems && !initItemsRequested){

            setInitItems([undefined, true]);
            getFeaturedDapps().then((dapps)=>{
                setInitItems([dapps, true]);
            }).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })

        }


    })

    if(!initItems){

        return (
            <div style={{
                height : "100%",
                width : "100%",
                padding : DesktopSizes.Padding.whitespacePreferred
            }}>
                <Skeleton height="200px"/>
                <br/><br/>
                <Skeleton height="400px"/>
            </div>
        )

    }

    return (

        <ItemProvider initialItems={initItems}>
            <ColorProvider {...Colors}>
                <MainRouter/>
            </ColorProvider>
        </ItemProvider>


    )

}