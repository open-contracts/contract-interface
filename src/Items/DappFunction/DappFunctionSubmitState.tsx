import React, {FC, ReactElement, useState} from 'react';
import { AthenaButton } from '../../Components/Buttons';
import { Colors } from '../../Theme';

export type DappFunctionSubmitStateProps = {
    contractFunction : OpenContractFunctionI,
    call : ()=>void
}

export const DappFunctionSubmitState : FC<DappFunctionSubmitStateProps>  = ({
    contractFunction,
    call
}) =>{

    const [oracleLoaded, setOracleLoaded] = useState(false);

    return (

        <div style={{
            display : "flex",
            justifyContent : "right",
            justifyItems : "right"
        }}>
            {contractFunction.requiresOracle && <AthenaButton 
                primaryColor={"white"}
                secondaryColor={Colors.Maintheme}>
                Load oracle data        
            </AthenaButton>}
            <AthenaButton
                onClick={call}
                disabled={contractFunction.requiresOracle && !oracleLoaded}
                primaryColor={"white"}
                secondaryColor={Colors.Maintheme}
            >
                Call function
            </AthenaButton>
        </div>

    )

}