
import React, { FC, useEffect, useState } from 'react';
import { Form, InputGroup } from "react-bootstrap";
import Color from "color"
import {Search} from "react-bootstrap-icons";
import { AthenaButton } from '../../Buttons';


export type ArendtSearchBarProps = {
    primaryColor: string,
    secondaryColor: string,
    tertiaryColor: string,
    onKeyUp? : React.KeyboardEventHandler<HTMLInputElement>,
    search?: ()=>Promise<void>,
    size?: "sm" | "lg" | undefined,
    initString? : string,
    style? : React.CSSProperties
}

/**
 * @description 
 */
export const ArendtSearchBar : FC<ArendtSearchBarProps>  = ({
    primaryColor,
    secondaryColor,
    tertiaryColor,
    onKeyUp=()=>{},
    search=async ()=>{return},
    size,
    initString,
    style
}) =>{

    const [initialized, setInitialized] = useState(false);

    const [isSearching, setSearching] = useState(false);
    const handleSearch = async ()=>{
        setSearching(true);
        await search();
        setSearching(false);
    }

    useEffect(()=>{
        if(!initialized){
            setInitialized(true);
        }
    })

    const handleKeyUp = (e : React.KeyboardEvent<any>)=>{
        
        switch (e.key){
            case "Enter" :{
                search();
            } 
        }

        onKeyUp(e);
    }

    const [focus, setFocus] = useState(false);

    const handleFocus = ()=>{
        setFocus(true);
    }

    const handleBlur = ()=>{
        setFocus(false);
    }


    return (

                <InputGroup size={size} style={{
                    ...style
                }}>
                    <InputGroup.Prepend>
                        <InputGroup.Text style={{
                        borderColor: tertiaryColor,
                        backgroundColor: secondaryColor,
                        borderRight: "none",
                        height: "100%",
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 0,
                        ...style
                    }}>
                            <Search color={focus ? primaryColor : tertiaryColor}/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control className={`shadow-none`} onKeyUp={handleKeyUp} disabled={isSearching}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        autoFocus={true}
                        size={size}
                        style={{
                            borderColor: tertiaryColor,
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                            backgroundColor: secondaryColor,
                            color : focus ? primaryColor : tertiaryColor,
                            outline: "none",
                            borderLeft: "none",
                            ...style
                        }}
                        placeholder={`Search dapps`}
                        value={!initialized && initString !== "" ? initString : undefined}
                    />
                        <InputGroup.Append style={{
                            height: "100%"
                        }}>
                            <AthenaButton size={size} disabled={isSearching} loading={isSearching} action={search} label="Search" {...{primaryColor, secondaryColor}}/>
                        </InputGroup.Append>
                </InputGroup>
    )

}