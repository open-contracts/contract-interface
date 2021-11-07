import React, {FC, ReactElement} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntegratedErrorBoundary } from '../Error/IntegratedErrorBoundary';
import { RunPage } from '../Pages';
import { ErrorPage } from '../Pages/ErrorPage';

export type MainRouterProps = {}

export const MainRouter : FC<MainRouterProps>  = () =>{

    return (

        <BrowserRouter>
            <IntegratedErrorBoundary>
                <Routes>
                    <Route path="/" element={<RunPage/>}/>
                    <Route path="/:owner/:repo" element={<RunPage/>}/>
                    <Route path="/:owner/:repo/error" element={<ErrorPage/>}/>
                    <Route path="/error" element={<ErrorPage/>}/>
                </Routes>
            </IntegratedErrorBoundary>
        </BrowserRouter>

    )

}