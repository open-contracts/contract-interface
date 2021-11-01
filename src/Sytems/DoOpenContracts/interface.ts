/**
 * Fetches the open contracts interace from GitHub.
 * @param contractRepo 
 * @returns 
 */
export const fetchOpenContractsInterface = async (contractRepo : string)=>{
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