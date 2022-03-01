import React, {FC, ReactElement} from 'react';
import { Clipboard } from 'react-bootstrap-icons';
import { AthenaButton } from '../../../Components/Buttons';
import { Colors } from '../../../Theme';
import { DappOutputI } from '../DappPutType';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
            alignContent : 'center',
            alignItems : "center",
        }}>
            <table>
                <colgroup>
                    <col span={1} style={{
                        width : "80%"
                    }}/>
                    <col span={1} style={{
                        width : "20%"
                    }}/>
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            <div style={{
                                color : Colors.secondaryTextColor,
                                textAlign : "left"
                            }}>
                                <ReactMarkdown plugins={[remarkGfm]}>
                                    {dappOutput.value}
                                </ReactMarkdown>
                            </div>
                        </td>
                        <td>
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
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )

}