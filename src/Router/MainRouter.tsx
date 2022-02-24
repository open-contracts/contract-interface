import React, {FC, ReactElement} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntegratedErrorBoundary } from '../Error/IntegratedErrorBoundary';
import { RunPage } from '../Pages';
import { ErrorPage } from '../Pages/ErrorPage';
import { CheckProvider } from '../Sytems';
import {MainPage} from ".././Pages/MainPage"

export type MainRouterProps = {}

export const MainRouter : FC<MainRouterProps>  = () =>{

    return (

        <BrowserRouter>
            <CheckProvider>
                <IntegratedErrorBoundary>
                    <Routes>
                        <Route path="/:owner/:repo/:branch/:funcName" element={<MainPage/>}/>
                        <Route path="/:owner/:repo/:branch" element={<MainPage/>}/>
                        <Route path="/:owner/:repo" element={<MainPage/>}/>
                        <Route path="/error" element={<ErrorPage/>}/>
                        <Route path="/" element={<MainPage/>}/>
                    </Routes>
                </IntegratedErrorBoundary>
            </CheckProvider>
        </BrowserRouter>

    )

}