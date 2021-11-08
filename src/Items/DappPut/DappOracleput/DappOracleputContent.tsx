import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors, DesktopSizes } from '../../../Theme';
import { DappOracleputI } from '../DappPutType';
import { darkenStandard, lightenStandard } from '../Methods';
import {OracleLink} from "./OracleLink"

export type DappOracleputContentProps = {
    dappOracleput : DappOracleputI
}

export const DappOracleputContent : FC<DappOracleputContentProps>  = ({
    dappOracleput
}) =>{

    const [load, setLoad] = useState(false);

    return (

        <div style={{
            color : Colors.primaryTextColor
        }}>
            <br/>
            <br/>
            <AthenaButton
            onClick={()=>{
                setLoad(true);
            }}
                    primaryColor={darkenStandard(Colors.deepCyan)}
                    secondaryColor={lightenStandard(Colors.cyan)}
                >
                    Load oracle data
            </AthenaButton>
            <br/>
            <br/>
           {load && <div style={{
               border : `1px solid ${Colors.cyan}`,
               borderRadius : DesktopSizes.BorderRadius.standard,
               padding : DesktopSizes.Padding.standard,
               background : Colors.primaryTextColor,
               color : Colors.deepCyan
           }}>
                <h6>Awaiting 2/4...</h6>
                <OracleLink link={"https://sample.com/a"} ready={"ready"}/>
                <OracleLink link={"https://sample.com/b"} ready={"ready"}/>
                <OracleLink link={"https://sample.com/c"} ready={"failed"}/>
                <OracleLink link={"https://sample.com/d"} ready={"not ready"}/>
           </div>}
        </div>

    )

}