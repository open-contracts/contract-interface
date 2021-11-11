import React, {FC, ReactElement} from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { IntegratedErrorBoundary } from '../Error/IntegratedErrorBoundary';
import { RunPage } from '../Pages';
import { ErrorPage } from '../Pages/ErrorPage';

export type MainRouterProps = {}

export const MainRouter : FC<MainRouterProps>  = () =>{

    return (

        <HashRouter>
            <IntegratedErrorBoundary>
                <Routes>
                    <Route path="/" element={<RunPage/>}/>
                    <Route path="/:owner/:repo" element={<RunPage/>}/>
                    <Route path="/:owner/:repo/error" element={<RunPage/>}/>
                    <Route path="/:owner/:repo/:branch" element={<RunPage/>}/>
                    <Route path="/:owner/:repo/:/branch/error" element={<ErrorPage/>}/>
                    <Route path="/error" element={<ErrorPage/>}/>
                </Routes>
            </IntegratedErrorBoundary>
        </HashRouter>

    )

}