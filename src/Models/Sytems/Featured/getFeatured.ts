import { DappI, parseGitUrl } from "../../Items";
import { getFileText } from "../Octokit"

export interface FeaturedJSONI {
    disclaimer : string,
    featured : {
        [key : string] : string
    }
}

export const FEATURED = {
    owner : "open-contracts",
    repo : "protocol",
    path : "featured_contracts.json"
}

export const getFeaturedJSON = async () : Promise<FeaturedJSONI>=>{
    const res = await getFileText(FEATURED);
    const json : FeaturedJSONI = JSON.parse(res);
    return json;
}

export const getFeaturedUrls = async () : Promise<string[]> =>{


   const json = await getFeaturedJSON();

    return Object.keys(
        Object.values(json.featured).reduce((map, value)=>{
            return {
                ...map,
                [value] : value
            }
        }, {})
    )

}

export const getFeaturedDapps = async () : Promise<{
    [key : string] : DappI
}>=>{


    const featuredUrls = await getFeaturedUrls();

    return featuredUrls.reduce((map, url)=>{

        const {
            owner,
            repo
        } = parseGitUrl(url);

        const id = `${owner}/${repo}`

        return {
            ...map,
            [id] : {
                __isDapp__ : true,
                id : `${owner}/${repo}`,
                gitUrl : url
            }
        }

    }, {})

}