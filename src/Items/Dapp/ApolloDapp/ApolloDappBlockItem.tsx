import React, {FC, ReactElement, useEffect, useState} from 'react';
import { Colors, DesktopSizes } from '../../../Theme';
import { DappI, getDappImageUri, getDappInfo, getDappName } from '../Dapp';
import Skeleton from "react-loading-skeleton";
import { Redirect, useHistory } from 'react-router-dom';
import { GrowOnEventAchamaenid } from '../../../Glitter/Animations';
import { ThroughGlassAgathocles } from '../../../Glitter/Animations/ThroughGlass/ThroughGlassAgathocles';
import { useErrorContext } from '../../../Error/ErrorProvider';


export type ApolloBlockItemImageProps = {
    style? : React.CSSProperties,
    uri : string | undefined
}

export const ApolloBlockItemImage : FC<ApolloBlockItemImageProps>= ({
    uri,
    style
})=>{

    return (
        <div style={{
            overflow : "hidden",
            height : "100%",
            width : "100%",
            borderRadius : DesktopSizes.BorderRadius.standard,
            ...style
        }}>
        {!uri && <Skeleton height="100%" width="100%"/>}
        {uri && <img style={{
            width : "100%",
            height : "100%",
            borderRadius : DesktopSizes.BorderRadius.standard,
            objectFit: "cover",
            objectPosition : "center",
            overflow : "hidden"
        }} src={uri}/>}
        </div>
    )

}

export type ApolloBlockItemNameProps = {
    style? : React.CSSProperties,
    name : string | undefined
}

export const ApolloBlockItemName : FC<ApolloBlockItemNameProps>= ({
    name,
    style
})=>{

    return (
        <div style={{
            display : "grid",
            alignItems : "center",
            alignContent : "center",
            ...style
        }}>
            {!name && <Skeleton height="100%" width="100%"/>}
            {name && <p>{name.toUpperCase()}</p>}
        </div>
    )

}

export type ApolloDappBlockItemInternalsProps = {
    dappItem : DappI
    style? : React.CSSProperties,
    key? : React.Key,
}

export const ApolloDappBlockItemInternals :  FC<ApolloDappBlockItemInternalsProps>  = ({
    dappItem,
    style
}) => {

    const history = useHistory();

    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = ()=>{
        setHovered(true);
    }

    const handleMouseLeave = ()=>{
        setHovered(false);
    }


    const [redirect, setRedirect] = useState(false);
    const handleClick = ()=>{
        history.push(`dapp/${dappItem.id}`)
    }

    return (

        <GrowOnEventAchamaenid grow={hovered} style={{
            borderRadius : DesktopSizes.BorderRadius.standard
        }}>
            <ThroughGlassAgathocles glass={hovered} glassOpacity={.8} style={{
            borderRadius : DesktopSizes.BorderRadius.standard
        }}>
                <div 
                    className="dapp"
                    onClick={handleClick}
                    onMouseOver={handleMouseEnter}
                    onMouseOut={handleMouseLeave}
                    key={dappItem.gitUrl}
                    style={{
                        display : "grid",
                        alignContent : "center",
                        alignItems : "center",
                        width : "100%",
                        height : "300px",
                        cursor : "pointer",
                        gridTemplateRows : "3fr 1fr",
                        color : Colors.Maintheme,
                        borderRadius : DesktopSizes.BorderRadius.standard,
                        overflow : "hidden",
                        ...style
                    }}>
                        <ApolloBlockItemImage uri={dappItem.appTile} style={{
                            height : "100%",
                            width : "100%",
                            borderRadius : DesktopSizes.BorderRadius.standard
                        }}/>
                        <div style={{
                            height : "100%",
                            width : "100%",
                            display : "grid",
                            alignContent : "center",
                            alignItems : "center"
                        }}>
                            <ApolloBlockItemName name={dappItem.name}/>
                        </div>
                </div>
            </ThroughGlassAgathocles>
        </GrowOnEventAchamaenid>

    )

}


export type ApolloDappBlockItemProps = {
    dappItem : DappI
    style? : React.CSSProperties,
    key? : React.Key,
    updateDapp ? : (dapp : DappI)=>void,
    forceLoad ? : boolean
}

/**
 * 
 * @param param0 
 * @returns 
 */
export const ApolloDappBlockItem : FC<ApolloDappBlockItemProps>  = ({
    dappItem,
    style,
    updateDapp,
    forceLoad = false
}) =>{

    const {
        dispatch
    } = useErrorContext();

    const [dappState, setDappState] = useState(dappItem);
    useEffect(()=>{

        if(dappState !== dappItem && updateDapp){
            updateDapp(dappState)
        }

    })

    const [[nameLoad, nameRequested], setNameLoad] = useState<[
        string|undefined,
        boolean
    ]>([
        forceLoad ? undefined : dappState.name,
        false
    ]);
    useEffect(()=>{

        if(!nameLoad && !nameRequested){
            setNameLoad([undefined, true])
            getDappName(
                dappItem,
                (name : string)=>setNameLoad([name, true])
            ).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    })
    useEffect(()=>{

        if(dappState.name !== nameLoad){
            setDappState({
                ...dappState,
                name : nameLoad
            })
        }

    })


    const [[imageUriLoad, imageUriRequested], setImageUriLoad] = useState<[
        string|undefined,
        boolean
    ]>([
        forceLoad ? undefined : dappState.appTile,
        false
    ]);
    useEffect(()=>{

        if(!imageUriLoad && !imageUriRequested){

            console.log(dappItem.id);

            setImageUriLoad([undefined, true])

            getDappImageUri(
                dappItem,
                (imageUri : string)=>setImageUriLoad([imageUri, true])
            ).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    })
    useEffect(()=>{

        if(dappState.appTile !== imageUriLoad){
            setDappState({
                ...dappState,
                appTile : imageUriLoad
            })
        }

    })


    

    return (

       <ApolloDappBlockItemInternals dappItem={dappState} style={style}/>

    )

}