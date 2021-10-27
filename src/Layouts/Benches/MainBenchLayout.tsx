import React, {FC, ReactElement} from 'react';
import { generateNamedMember, getComponentMembers } from 'rgfm';

const Members = ["Header", "Items"];

export type MainBenchLayoutProps = {}

const MainBenchLayout : FC<MainBenchLayoutProps> & {
    Header : FC,
    Items : FC,
} = ({
    children
}) =>{

    const {
        Header,
        Items
    } = getComponentMembers(Members, children);

    return (

        <div 
        style={{
            height : "100%",
            width : "100%",
            display : "grid",
            gridTemplateRows: "auto 1fr",
            overflow : "visible"
        }}>
            <div style={{
                height : "100%",
                width : "100%"
            }}>
                {Header}
            </div>
            <div style={{
                height : "100%",
                width : "100%",
                overflow : "visible"
            }}>
                {Items}
            </div>
        </div>

    )

}

MainBenchLayout.Header = generateNamedMember("Header");
MainBenchLayout.Items = generateNamedMember("Items");

export {
     MainBenchLayout
}