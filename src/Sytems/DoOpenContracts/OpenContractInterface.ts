export interface OpenContractInterfaceI {
    name:                 string;
    network:              string;
    address:              string;
    onlyDisplayAnnotated: boolean;
    abi:                  AbiI[];
}

export interface AbiI {
    inputs:          PutI[];
    name:            string;
    outputs:         PutI[];
    stateMutability: string;
    type:            string;
    annotation?:     string;
    description?:    string;
    oracle_folder?:  string;
}

export interface PutI {
    internalType: string;
    name:         string;
    type:         string;
}


/**
 * Fetches the interface for an open contract from GitHub.
 * @param contractRepo 
 * @returns 
 */
export const OpenContractInterface = async (contractRepo : string)
: Promise<OpenContractInterfaceI>=>{
    return JSON.parse(
        await(
            await (
                fetch(
                    new URL(
                        `${contractRepo}/interface.json` 
                    ) as unknown as string
                )
            )
        ).text()
    )
}