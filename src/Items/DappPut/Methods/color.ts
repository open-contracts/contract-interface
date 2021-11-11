import Color from "color";
import React from "react";

export const lightenStandard = (color : React.CSSProperties["color"])=>{

    return Color(color).lighten(.2).hex();

}

export const darkenStandard = (color : React.CSSProperties["color"])=>{
    return Color(color).darken(.2).hex();
}