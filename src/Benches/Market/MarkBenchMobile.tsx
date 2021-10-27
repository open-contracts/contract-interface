import React, {FC, ReactElement, useState} from 'react';
import { generateNamedMember, getComponentMembers } from 'rgfm';
import { ApolloDappBlockItem, DappI } from '../../Items';
import { MainBenchLayout } from '../../Layouts/Benches';
import { Colors, DesktopSizes } from '../../Theme';
import { Stars } from 'react-bootstrap-icons';
import { ArendtSearchBar } from '../../Components/Searchbars';
import { AppolloNewDappBlockItem } from '../../Items/Dapp/ApolloDapp/AppolloNewDappBlockItem';
import { useErrorContext } from '../../Error/ErrorProvider';
import { useContext } from 'react';
import { useEffect } from 'react';
import { getFileText } from '../../Sytems/Octokit';
import ReactMarkdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton';
import remarkGfm from 'remark-gfm'
import {to} from "await-to-js";


const Members = ["Header", "Items"];

export type MarketBenchMobileProps = {
    items : DappI[],
    updateDapp? : (prevId : string, dapp : DappI)=>void
}

export const MarketBenchMobile : FC<MarketBenchMobileProps> = ({
    children,
    items,
    updateDapp
}) =>{

    const {
        dispatch
    } = useErrorContext();

    const [[frontpage, frontpageRequested], setFrontpage] = useState<[
        string |undefined,
        boolean
    ]>([undefined, false]);
    useEffect(()=>{

        if(!frontpage && !frontpageRequested){

            setFrontpage([undefined, true])

            setFrontpage([undefined, true])

            const getFrontPage = async ()=>{

                const [err, page] = await to(getFileText({
                    owner : "open-contracts",
                    repo : "opencontracts.io",
                    path : "FRONTPAGE.md"
                }))

                if(err) {
                    dispatch((state)=>{
                        return {
                            ...state,
                            error : err
                        }
                    });
                    return;
                }

                setFrontpage([page || "", true]);

            }

            getFrontPage();

        }

    })

    const nodes = items.map((item)=>{

        const _updateDapp = (item : DappI)=>{

            updateDapp && updateDapp(item.id, item);

        }

        return (
            <ApolloDappBlockItem key={item.gitUrl} dappItem={item} updateDapp={_updateDapp}/>
        )
    })

    const [hovered, setHovered] = useState(false)

    return (

        <MainBenchLayout>
            <MainBenchLayout.Header>
            </MainBenchLayout.Header>
            <MainBenchLayout.Items>
                <div>
                        <div style={{
                            display : "grid",
                            gridTemplateColumns : "1fr 1fr",
                            height : "100%",
                            width : "100%",
                            gap : DesktopSizes.Padding.whitespacePreferred,
                            paddingTop : DesktopSizes.Padding.whitespacePreferred,
                            paddingBottom : DesktopSizes.Padding.whitespacePreferred,
                        }}>
                            {nodes}
                            <AppolloNewDappBlockItem/>
                        </div>
                        <div style={{
                            textAlign : "left"
                        }}>
                            {!frontpage && <Skeleton count={5}/>}
                            {frontpage && <ReactMarkdown plugins={[remarkGfm]}>
                                {frontpage}
                            </ReactMarkdown>}
                        </div>
                        <br/>
                 </div>
            </MainBenchLayout.Items>
        </MainBenchLayout>

    )

}