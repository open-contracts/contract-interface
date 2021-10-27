import React, {FC, ReactElement} from 'react';
import { MarketBenchDesktop } from '../../Benches';
import { LogoA } from '../../Glitter';
import { DappI, isDapp } from '../../Items';
import { MainLayoutDesktop } from '../../Layouts';
import { HeaderResponsive } from '../../Maps/Headers';
import { useItemStore } from '../../Sytems/ItemProvider';
import { Colors, DesktopSizes } from '../../Theme';
import { useColorStore } from '../../Theme/ColorProvider';
import { HOME } from '../../Maps/Headers';
import { MediaResponsive } from '../../Sytems';
import { MarketBenchMobile } from '../../Benches/Market/MarkBenchMobile';
import { MainLayoutMobile } from '../../Layouts';

export type HomePageProps = {}

export const HomePage : FC<HomePageProps>  = () =>{

    const {
        items,
        dispatch
    } = useItemStore();

    const dappItems = Object.values(items).filter((item)=>{
        return isDapp(item);
    }).sort((a : DappI, b : DappI)=>{
        return a.id.localeCompare(b.id)
    })

    const updateDapp = (id : string, item : DappI)=>{

        dispatch((state)=>{

            const {[id] : target, ...rest} = state.items;

            return {
                ...state,
                items : {
                    ...rest,
                    [item.id] : item
                }
            }
        })

    }

    const Colors = useColorStore();

    return (

       <MediaResponsive>
           <MediaResponsive.Desktop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <MarketBenchDesktop items={dappItems} updateDapp={updateDapp}/>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Desktop>
           <MediaResponsive.Laptop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        <MarketBenchDesktop items={dappItems} updateDapp={updateDapp}/>
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
           </MediaResponsive.Laptop>
           <MediaResponsive.Tablet>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        <MarketBenchMobile items={dappItems} updateDapp={updateDapp}/>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
           </MediaResponsive.Tablet>
           <MediaResponsive.Mobile>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        <MarketBenchMobile items={dappItems} updateDapp={updateDapp}/>
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
           </MediaResponsive.Mobile>
       </MediaResponsive>
    )

}