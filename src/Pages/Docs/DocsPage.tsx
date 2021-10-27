import React, {FC, ReactElement} from 'react';
import { useState } from 'react';
import { MarketBenchDesktop } from '../../Benches';
import { LogoA } from '../../Glitter';
import { isDapp } from '../../Items';
import { MainLayoutDesktop } from '../../Layouts';
import { ABOUT, DOCS, HeaderResponsive } from '../../Maps/Headers';
import { useItemStore } from '../../Sytems/ItemProvider';
import { Colors, DesktopSizes } from '../../Theme';
import { useColorStore } from '../../Theme/ColorProvider';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { getFileText } from '../../Sytems/Octokit';
import { useEffect } from 'react';
import { useErrorContext } from '../../Error/ErrorProvider';
import { MediaResponsive } from '../../Sytems';
import { MainLayoutMobile } from '../../Layouts';


export type DocsPageProps = {}

export const DocsPage : FC<DocsPageProps>  = () =>{

    const [[readme, readmeRequested], setReadme] = useState<[
        string|undefined,
        boolean
    ]>([undefined, false]);
    const {
        dispatch
    } = useErrorContext();


    useEffect(()=>{

        if(!readme && !readmeRequested){
            setReadme([undefined, true]);
            getFileText({
                owner : "open-contracts",
                repo : "protocol",
                path : "PROTOCOL.md"
            }).then((data)=>{
                setReadme([data, true]);
            }).catch((err)=>{
                dispatch((state)=>{
                    return {
                        ...state,
                        error : err
                    }
                })
            })
        }

    })

    return (

        <MediaResponsive>
            <MediaResponsive.Desktop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={ABOUT}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <div style={{
                            textAlign : "left"
                        }}>
                            {!readme && <Skeleton width="100%" count={5}/>}
                            {readme && <ReactMarkdown plugins={[remarkGfm]}>
                                {decodeURI(readme)}
                            </ReactMarkdown>}
                        </div>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Desktop>
            <MediaResponsive.Laptop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={ABOUT}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <div style={{
                            textAlign : "left"
                        }}>
                            {!readme && <Skeleton width="100%" count={5}/>}
                            {readme && <ReactMarkdown plugins={[remarkGfm]}>
                                {decodeURI(readme)}
                            </ReactMarkdown>}
                        </div>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Laptop>
            <MediaResponsive.Tablet>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={ABOUT}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        <div style={{
                            textAlign : "left",
                            fontSize : "10px",
                            width : "600px"
                        }}>
                            {!readme && <Skeleton width="100%" count={5}/>}
                            {readme && <ReactMarkdown plugins={[remarkGfm]}>
                                {decodeURI(readme)}
                            </ReactMarkdown>}
                        </div>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
            </MediaResponsive.Tablet>
            <MediaResponsive.Mobile>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={ABOUT}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        <div style={{
                            textAlign : "left",
                            fontSize : "7px",
                            width : "350px"
                        }}>
                            {!readme && <Skeleton width="100%" count={5}/>}
                            {readme && <ReactMarkdown plugins={[remarkGfm]}>
                                {decodeURI(readme)}
                            </ReactMarkdown>}
                        </div>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
            </MediaResponsive.Mobile>
        </MediaResponsive>
    )

}