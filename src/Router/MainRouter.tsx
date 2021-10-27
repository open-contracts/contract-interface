import React, {FC, ReactElement} from 'react';
import {BrowserRouter, Route, Switch, useParams} from "react-router-dom";
import { IntegratedErrorBoundary } from '../Error/IntegratedErrorBoundary';
import { HomePage } from '../Pages';
import { AboutPage } from '../Pages/About/AboutPage';
import { DappPage } from '../Pages/Dapp';
import { DocsPage } from '../Pages/Docs';
import { ErrorPage } from '../Pages/ErrorPage';
import { RunDapp } from '../Pages/RunDapp';

export type MainRouterProps = {}

export const MainRouter : FC<MainRouterProps>  = () =>{

    return (

        <BrowserRouter>
            <IntegratedErrorBoundary>
                <Switch>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route path="/about">
                        <AboutPage/>
                    </Route>
                    <Route path="/dapp/:owner/:repo">
                        <DappPage/>
                    </Route>
                    <Route path='/run-dapp/:owner/:repo'>
                        <RunDapp/>
                    </Route>
                    <Route path="/docs">
                        <DocsPage/>
                    </Route>
                    <Route path="/error">
                        <ErrorPage/>
                    </Route>
                </Switch>
            </IntegratedErrorBoundary>
        </BrowserRouter>

    )

}