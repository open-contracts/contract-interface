import React, {FC, ReactElement} from 'react';
import { ErrorProvider } from '../ErrorProvider';
import { UniversalErrorBoundary } from '..';

export type IntegratedErrorBoundaryProps = {}

export const IntegratedErrorBoundary : FC<IntegratedErrorBoundaryProps>  = ({
    children
}) =>{

    return (

        <ErrorProvider>
            <UniversalErrorBoundary>
                {children}
            </UniversalErrorBoundary>
        </ErrorProvider>

    )

}