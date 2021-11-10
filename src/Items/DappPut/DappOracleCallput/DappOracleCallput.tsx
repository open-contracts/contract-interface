import React, {FC, ReactElement} from 'react';
import {AthenaButton} from "../../../Components/Buttons";
import {Colors} from "../../../Theme";

export type DappOracleCallputProps = {
    call : ()=>Promise<string>
}

export const DappOracleCallput : FC<DappOracleCallputProps>  = ({
    call
}) =>{

    return (

        <AthenaButton 
            primaryColor={Colors.primaryTextColor}
            secondaryColor={Colors.Maintheme}
        >
            Execute oracle
        </AthenaButton>

    )

}