import React, {FC, ReactElement} from 'react';
import { MainLayoutDesktop } from '../../Layouts';
import { useParams } from 'react-router';
import { useItemStore } from '../../Sytems/ItemProvider';
import { ApolloDappMainItem } from '../../Items/Dapp/ApolloDapp/ApolloDappMainItem';
import { HeaderResponsive } from '../../Maps/Headers';
import { HOME } from '../../Maps/Headers';
import { submitPr } from '../../Sytems/Featured/submitPr';

export type CreateDappPageProps = {}

export const CreateDappPage : FC<CreateDappPageProps>  = () =>{

    const {
        owner,
        repo
    } = useParams();

    const {
        items
    } = useItemStore();

    const id = `${owner}/${repo}`;

    return (

        <MainLayoutDesktop>
            <MainLayoutDesktop.Header>
                <HeaderResponsive selected={HOME}/>
            </MainLayoutDesktop.Header>
            <MainLayoutDesktop.Content>
                {items[id] && <ApolloDappMainItem dappItem={items[id]}/>}
                {!items[id] && "Dapp not found."}
            </MainLayoutDesktop.Content>
        </MainLayoutDesktop>

    )

}