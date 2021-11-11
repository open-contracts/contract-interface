import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { generateNamedMember, getComponentMembers } from 'rgfm';
import { Colors } from '../../../Theme';
import { useColorStore } from '../../../Theme/ColorProvider';

const Members = ["ToggleIcon"];

export type AbleAccountToggleProps = {
    size? : React.CSSProperties["height"],
    onToggle? : ()=>void
}

const AbleAccountToggle : FC<AbleAccountToggleProps> & {
    ToggleIcon : FC
}  = ({
    children,
    size = "40px",
    onToggle
}) =>{

    const {
        ToggleIcon
    } = getComponentMembers(Members, children);

    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = ()=>{
        setHovered(true);
    }

    const handleMouseLeave = ()=>{
        setHovered(false);
    }

    const Colors = useColorStore();

    return (

        <div 
        className={hovered ? "shadow" : "none"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onToggle}
        style={{
            height : size,
            width : size,
            cursor : "pointer",
            background : hovered ? Colors.colors.backgroundColorSecondary : "#00000000",
            border : hovered ? `1px solid ${Colors.colors.primaryTextColor}` : "none",
            borderRadius : "50%",
            display : "grid",
            alignContent : "center",
            alignItems : 'center',
            justifyContent : "center",
            justifyItems : "center"
        }}>
            <div style={{
                height : "85%",
                width : "85%",
                display : "grid",
                alignContent : "center",
                alignItems : 'center',
                justifyContent : "center",
                justifyItems : "center"
            }}>
                {ToggleIcon}
            </div>
        </div>

    )

}

AbleAccountToggle.ToggleIcon = generateNamedMember("ToggleIcon");

export {
    AbleAccountToggle
}