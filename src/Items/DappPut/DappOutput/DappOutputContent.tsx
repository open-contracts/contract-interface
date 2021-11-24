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
            color : Colors.Maintheme,
            width : "100%",
            display : "grid",
            gridTemplateColumns : "6fr 1fr",
            alignContent : 'center',
            alignItems : "center",
        }}>
            <div style={{
                color : Colors.secondaryTextColor,
                textAlign : "left"
            }}>
                {dappOutput.value}
            </div>
            <div style={{
                width : "100%",
                display : "grid",
                gridTemplateColumns : "1fr",
                justifyContent : "center"
            }}>
                <AthenaButton 
                style={{
                    width : "100%",
                    border : `1px solid ${Colors.Maintheme}`,
                    boxShadow : "none"
                }}
                primaryColor={Colors.Maintheme}
                secondaryColor={"white"}
                action={async ()=>{
                    navigator.clipboard.writeText(dappOutput.value||"");
                }}>
                   
                            <Clipboard size={16}/>
                </AthenaButton>
            </div>
        </div>

    )

}