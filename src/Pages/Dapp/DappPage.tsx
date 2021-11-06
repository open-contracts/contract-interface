import React, {FC, ReactElement} from 'react';
import { MainLayoutDesktop, MainLayoutMobile } from '../../Layouts';
import { useParams } from 'react-router';
import { useItemStore } from '../../Sytems/ItemProvider';
import { ApolloDappMainItem } from '../../Items/Dapp/ApolloDapp/ApolloDappMainItem';
import { HeaderResponsive, HOME } from '../../Maps/Headers';
import { submitPr } from '../../Sytems/Featured/submitPr';
import { useEffect } from 'react';
import { MediaResponsive } from '../../Sytems';
import { ApolloDappMainItemMobile } from '../../Items/Dapp/ApolloDapp/ApolloDappMainItemMobile';
import { DappI } from '../../Items';

export type DappPageProps = {}

export const DappPage : FC<DappPageProps>  = () =>{

    const {
        owner,
        repo
    } = useParams();

    const {
        items,
        dispatch
    } = useItemStore();
    

    const id = `${owner}/${repo}`;

    const updateDapp = (item : DappI)=>{

        dispatch((state)=>{

            const {[id] : target, ...rest} = state.items;
    
            return {
                ...state,
                items : {
                    ...rest,
                    [id] : item
                }
            }
        })

    }

    return (

        <MediaResponsive>
            <MediaResponsive.Desktop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        {items[id] && <ApolloDappMainItem dappItem={items[id]} updateDapp={updateDapp}/>}
                        {!items[id] && <h6>DAPP NOT FOUND</h6>}
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Desktop>
            <MediaResponsive.Laptop>
                <MainLayoutDesktop>
                    <MainLayoutDesktop.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutDesktop.Header>
                    <MainLayoutDesktop.Content>
                        {items[id] && <ApolloDappMainItem dappItem={items[id]} updateDapp={updateDapp}/>}
                        {!items[id] && <h6>DAPP NOT FOUND</h6>}
                    </MainLayoutDesktop.Content>
                </MainLayoutDesktop>
            </MediaResponsive.Laptop>
            <MediaResponsive.Tablet>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        {items[id] && <ApolloDappMainItemMobile dappItem={items[id]} updateDapp={updateDapp}/>}
                        {!items[id] && <h6>DAPP NOT FOUND</h6>}
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
            </MediaResponsive.Tablet>
            <MediaResponsive.Mobile>
                <MainLayoutMobile>
                    <MainLayoutMobile.Header>
                        <HeaderResponsive selected={HOME}/>
                    </MainLayoutMobile.Header>
                    <MainLayoutMobile.Content>
                        {items[id] && <ApolloDappMainItemMobile dappItem={items[id]} updateDapp={updateDapp}/>}
                        {!items[id] && <h6>DAPP NOT FOUND</h6>}
                    </MainLayoutMobile.Content>
                </MainLayoutMobile>
            </MediaResponsive.Mobile>
        </MediaResponsive>

    )

}