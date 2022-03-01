import { getFileBlob, getFileText, getSha, octokit } from "../../Sytems/Octokit";
import {to} from "await-to-js";

export interface DappDataI {
    name : string,
    readme : string,
    oracle : string,
    appTile : string,
    contract : IOpenContract,
    openContractsInterface : IOpenContract,
    dappInterface : IOpenContractnterfaceI
}

export interface DappI extends Partial<DappDataI>{
    __isDapp__ : true
    id : string
    gitUrl : string,
    owner : string,
    repo : string,
    branch : string,
    // loaded : boolean
}

export const isDapp = (obj : any) : obj is DappI => {

    return obj.__isDapp__;

}

export const parseGitUrl = (url : string) : {
    owner : string |undefined,
    repo : string | undefined,
    branch : string | undefined
}=>{

    const _indexCom = url.indexOf(".com");
    const indexCom = _indexCom > 0 ? _indexCom + 4 : 0;
    const substr = url.substring(indexCom).trim().replace(/^\/*|-\/*$/, "");

    const split = substr.split("/");

    

    return {
        owner : split.length ? split[0] : undefined,
        repo : split.length > 1 ? split[1] : undefined,
        branch : split.length > 2 ? split[2] : undefined
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
    branch ? : string
    type : string
})=>{

    return `https://raw.githubusercontent.com/${args.owner}/${args.repo}/${args.branch||"main"}/${APPTILE}.${args.type}`

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
    onGet ? : (dappInterface : IOpenContractnterfaceI)=>void
) : Promise<IOpenContractnterfaceI>=>{

    const dappInterface = (dapp.owner && dapp.repo) ? JSON.parse(
        await getFileText({
            owner : dapp.owner,
            repo : dapp.repo,
            branch : dapp.branch,
            path : jsonInterfacePath
        })
    ) : undefined

    if(!dappInterface){
        throw new Error("Failed to find a Dapp Interface.");
    }

    onGet && onGet(dappInterface);

    return dappInterface;

}

export const ocInterfacePath = "/client-protocol/opencontracts_interface.json"
export const getOpenContractsInterface = async (
    onGet ? : (dappInterface : IOpenContract)=>void
) : Promise<IOpenContract>=>{

    

    const ocInterface = JSON.parse(await (await fetch(ocInterfacePath)).text())

    if(!ocInterface){
        throw new Error("Failed to find the Open Contracts interface for this site.");
    }

    onGet && onGet(ocInterface);

    return ocInterface;

}

export const getDappContract = async (
    dapp : DappI,
    onGet ? : (contract : IOpenContract)=>void
) : Promise<IOpenContract>=>{

    const opencontract = await window.OpenContracts();
    const openContractsInterface = dapp.openContractsInterface || await getOpenContractsInterface();
    const contractLocation = `@git/${dapp.owner}/${dapp.repo}/${dapp.contract||"main"}`;
    await opencontract.parseContracts(openContractsInterface, contractLocation);

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
