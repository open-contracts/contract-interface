import React, {FC, ReactElement} from 'react';
import { Clipboard } from 'react-bootstrap-icons';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors } from '../../../Theme';
import { DappOutputI } from '../DappPutType';

export type DappOutputContentProps = {
    dappOutput : DappOutputI
}

export const DappOutputContent : FC<DappOutputContentProps>  = ({
    dappOutput
}) =>{

    return (

        <div style={{
            color : Colors.primaryTextColor,
            width : "100%",
            display : "flex",
            alignContent : 'center',
            alignItems : "center"
        }}>
            <AthenaButton primaryColor={Colors.royalBlue} secondaryColor={Colors.deepBlue} action={async ()=>{
                navigator.clipboard.writeText(dappOutput.value||"");
            }}>
               <div style={{
                   display : "flex",
                   alignContent : "center",
                   alignItems : "center"
               }}>
                    <Clipboard 
                    style={{
                        color : Colors.primaryTextColor
                    }}/>
               </div>
            </AthenaButton>
            &emsp;
            <div style={{
                color : Colors.secondaryTextColor
            }}>
                {dappOutput.value}
            </div>
        </div>

    )

}