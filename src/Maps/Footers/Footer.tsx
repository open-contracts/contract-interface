import React, {FC, ReactElement} from 'react';
import { FileTextFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { Colors } from '../../Theme';

export type FooterProps = {}

export const Footer : FC<FooterProps>  = () =>{

    const nav = useNavigate();

    return (

        <div style={{
            paddingTop : "40px",
            width : '100%',
            display : "grid",
            gridTemplateColumns : "1fr",
            justifyContent : "center",
            justifyItems : "center",
            color : Colors.Maintheme,
            fontSize : "14px",
            paddingBottom : "20px",
            gap : "10px",
            /*bottom : 0,
            position : "absolute"*/
        }}>
            <div>
                Copyright &copy; 2022, Open Contracts
            </div>
            <div style={{
                    display : "flex",
                    alignContent : "center",
                    alignItems : "center",
                    textAlign : 'right',
                    flexDirection : "row-reverse"
                }}>
                    <a onClick={(e)=>{
                        e.preventDefault();
                        nav("/terms");
                    }} href="/terms">Terms</a>&ensp;<FileTextFill/>
                    </div>
                <div>
            </div>
        </div>

    )

}