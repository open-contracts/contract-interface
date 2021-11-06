import React, {FC, ReactElement} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/dapp/:owner/:repo" element={<DappPage/>}/>
                    <Route path='/run-dapp/:owner/:repo' element={<RunDapp/>}/>
                    <Route path="/docs" element={<DocsPage/>}/>
                    <Route path="/error" element={<ErrorPage/>}/>
                </Routes>
            </IntegratedErrorBoundary>
        </BrowserRouter>

    )

}