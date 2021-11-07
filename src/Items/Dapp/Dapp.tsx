import { getFileBlob, getFileText, getSha, octokit } from "../../Sytems/Octokit";
import {to} from "await-to-js";

export interface DappDataI {
    name : string,
    readme : string,
    oracle : string,
    appTile : string,
    contract : OpenContractI,
    openContractsInterface : OpenContractsInterfaceI,
    dappInterface : OpenContractInterfaceI
}

export interface DappI extends Partial<DappDataI>{
    __isDapp__ : true
    id : string
    gitUrl : string
}

export const isDapp = (obj : any) : obj is DappI => {

    return obj.__isDapp__;

}

export const parseGitUrl = (url : string) : {
    owner : string |undefined,
    repo : string | undefined
}=>{


    const split = url.split("/");


    return {
        owner : split[split.length -2],
        repo : split[split.length - 1]
    }
    

}

const README = 'README.md';

export const parseName = (readme : string)=>{

    const lines = readme.split("\n");
    return lines.length ? 
                    lines[0].replace(/(\W|\s)/, "").trim()
                    : "Unnamed"


}

export const getDappName = async (dapp : DappI, onGet ? : (name : string)=>void) : Promise<string>=>{

    const {
        owner,
        repo 
    } = parseGitUrl(dapp.gitUrl);

    

    const [err, readme] = owner && repo ? await to(getFileText({
        owner : owner,
        repo : repo,
        path : README
    })) : [undefined, ""]
    
    if(err) throw err;

    const name = parseName(readme||"");

    onGet && onGet(name);

    return name;

}

export const isDescriptionLine = (line : string)=>{

    return (
        line.length < 1 ||
        line[0] !== "#"
    )

}

export const getDescriptionLines = (readme : string) : [number, number]=>{

    const lines = readme.split("\n");

    if(lines.length < 2){
        return [-1, -1];
    }

    if(!isDescriptionLine(lines[1])){
        return [-1, -1];
    }

    let i = 1;
    while(i < lines.length && isDescriptionLine(lines[i])) ++i;

    return [1, i];

}

export const parseDescription = (readme : string) : string=>{

    const descriptionLines = getDescriptionLines(readme);

    return readme.split("\n").slice(descriptionLines[0], descriptionLines[1] + 1).join("\n");

}

export const getDescription = async (dapp : DappI, onGet ? : (description : string)=>void) : Promise<string>=>{

    const {
        owner,
        repo 
    } = parseGitUrl(dapp.gitUrl);
    
    const [err, readme] = owner && repo ? await to(getFileText({
        owner : owner,
        repo : repo,
        path : README
    })) : [undefined, ""]
    
    if(err) throw err;


    const description = parseDescription(readme||"");


    onGet && onGet(description);

    return description;

}

export const SOLIDITY = "contract.sol";

export const getDappSolidityContract = async (dapp : DappI, onGet ? : (contract : string)=>void) : Promise<string>=>{

    const {
        owner,
        repo 
    } = parseGitUrl(dapp.gitUrl);
    
    const [err, contract] = owner && repo ? await to(getFileText({
        owner : owner,
        repo : repo,
        path : SOLIDITY
    })) : [undefined, ""];

    if(err) throw err;

    onGet && onGet(contract||"");

    return contract||"";

}

export const ORACLE = "oracle.py";

export const getDappOracle = async (dapp : DappI, onGet ? : (oracle : string)=>void) : Promise<string>=>{

    const {
        owner,
        repo 
    } = parseGitUrl(dapp.gitUrl);
    
    const oracle = owner && repo ? await getFileText({
        owner : owner,
        repo : repo,
        path : ORACLE
    }) : "";

    onGet && onGet(oracle);

    return oracle;

}

export const APPTILE = "tile";

export const imageUriFromRepoAndOwner = (args : {
    owner : string,
    repo : string,
    type : string
})=>{

    return `https://raw.githubusercontent.com/${args.owner}/${args.repo}/main/${APPTILE}.${args.type}`

}

export const getDappImageUri = async (dapp : DappI, onGet ? : (imageUri : string)=>void) : Promise<string>=>{

    const {
        owner,
        repo 
    } = parseGitUrl(dapp.gitUrl);
    
    let uri =  "";
    try {

        const ext = "png";

        await getFileBlob({
            owner : owner||"",
            repo : repo||"",
            path : `${APPTILE}.${ext}`
        })

        uri = owner && repo ? imageUriFromRepoAndOwner({
            owner : owner,
            repo : repo,
            type : ext
        })  : ""

    

    } catch(e){

        try {

            const ext = "jpg"

            await getFileBlob({
                owner : owner||"",
                repo : repo||"",
                path : `${APPTILE}.${ext}`
            })

            uri = owner && repo ? imageUriFromRepoAndOwner({
                owner : owner,
                repo : repo,
                type : ext
            })  : ""

        } catch(e){

            const ext = "jpg"


            await getFileBlob({
                owner : owner||"",
                repo : repo||"",
                path : `${APPTILE}.${ext}`
            })

            uri = owner && repo ? imageUriFromRepoAndOwner({
                owner : owner,
                repo : repo,
                type : ext
            })  : ""
        }

    } 

    onGet && onGet(uri);

    return uri;

}

export const getDappReadMe = async (dapp : DappI, onGet ? : (readme : string)=>void) : Promise<string>=>{

    const {
        owner,
        repo 
    } = parseGitUrl(dapp.gitUrl);
    
    const readme = decodeURI(owner && repo ? await getFileText({
        owner : owner,
        repo : repo,
        path : README
    }) : "");

    onGet && onGet(readme);

    return readme;

}

export const jsonInterfacePath = "interface.json";
export const getDappInterface = async (
    dapp : DappI,
    onGet ? : (dappInterface : OpenContractInterfaceI)=>void
) : Promise<OpenContractInterfaceI>=>{

    const {
        owner,
        repo 
    } = parseGitUrl(dapp.gitUrl);

    const dappInterface = (owner && repo) ? JSON.parse(
        await getFileText({
            owner : owner,
            repo : repo,
            path : jsonInterfacePath
        })
    ) : undefined

    if(!dappInterface){
        throw new Error("Failed to find a Dapp Interface.");
    }

    onGet && onGet(dappInterface);

    return dappInterface;

}

export const ocInterfacePath = "/protocol/opencontracts_interface.json"
export const getOpenContractsInterface = async (
    onGet ? : (dappInterface : OpenContractsInterfaceI)=>void
) : Promise<OpenContractsInterfaceI>=>{

    

    const ocInterface = JSON.parse(await (await fetch(ocInterfacePath)).text())

    if(!ocInterface){
        throw new Error("Failed to find the Open Contracts interface for this site.");
    }

    onGet && onGet(ocInterface);

    return ocInterface;

}

export const getDappContract = async (
    dapp : DappI,
    onGet ? : (contract : OpenContractI)=>void
) : Promise<OpenContractI>=>{

    const opencontract = await window.OpenContracts();
    const dappInterface = dapp.dappInterface|| await getDappInterface(dapp);
    const openContractsInterface = dapp.openContractsInterface || await getOpenContractsInterface();

    opencontract.parseContracts(openContractsInterface, dappInterface);

    onGet && onGet(opencontract);

    return opencontract;

}

export const getDappInfo = async (
    dapp : DappI
)=>{

    

    const {
        owner,
        repo 
    } = parseGitUrl(dapp.gitUrl);

    return owner && repo && await octokit.rest.repos.get({
        owner : owner,
        repo : repo
    });

}
