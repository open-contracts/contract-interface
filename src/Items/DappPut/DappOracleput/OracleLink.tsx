import React, {FC, ReactElement} from 'react';
import { Check, X, Circle, CircleFill} from 'react-bootstrap-icons';
import { Ellipsis } from 'react-bootstrap/esm/PageItem';
import {ReadyT} from "../../../Components/Ready"
import { Colors } from '../../../Theme';

export type OracleLinkProps = {
    ready ? :ReadyT,
    link : string
}

export const OracleLink : FC<OracleLinkProps>  = ({
    ready,
    link
}) =>{



    return (

        <div style={{
            display : "flex",
            alignContent : "center",
            alignItems : "center"
        }}>

            <div style={{
                width : "30px",
                display : "flex",
                alignItems : "center",
                alignContent : 'center',
                justifyItems : "center",
                justifyContent : "center"
            }}>
                {ready === "ready"  && 
                    <Check size={20} style={{
                        color : Colors.forestEdge
                    }} />
                }
                {!ready || (ready === "failed") && 
                    <X size={20} style={{
                        color : Colors.failedRed
                    }}/>
                }
                {ready === "not ready" && 
                    <CircleFill size={10} style={{
                        color : Colors.arizonaOrange
                    }}/>
                }
            </div>
            <div>
            &emsp;<a style ={{
                color  : Colors.babyBlue
            }} href={link}>{link}</a>
            </div>
        </div>

    )

}