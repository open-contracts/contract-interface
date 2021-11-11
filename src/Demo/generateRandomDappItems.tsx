import { DappI, parseGitUrl } from "../Items";
import {generate} from "shortid"

export const generateRandomDappItem = () : DappI=>{

    const url = (Math.floor(Math.random() * 100) % 2) === 0 ? 
                "https://github.com/l-monninger/open-contracts-test"
                : "https://github.com/l-monninger/climate-dapp"

    const {
        owner,
        repo
    } = parseGitUrl(url)

    return {
        __isDapp__ : true,
        id : `${owner}/${repo}`,
        gitUrl : url
    }
}

export const generateRandomDappItems = (length : number = 20) : {
    [key : string] : DappI
}=>{

    return Array(length).fill(null).reduce((map)=>{

        const newItem = generateRandomDappItem();

        return {
            ...map,
            [newItem.id] : newItem
        }

    }, {})

}