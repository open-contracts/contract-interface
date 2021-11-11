import { octokit } from "../Octokit"
import { FEATURED } from "."
import { parseGitUrl } from "../../Items";
import { FeaturedJSONI, getFeaturedJSON } from "./getFeatured";

export const addPrToFeatured = async (gitUrl : string) : Promise<FeaturedJSONI>=>{

    const featuredJSON = await getFeaturedJSON();

    return {
        ...featuredJSON,
        featured : {
            [gitUrl] : gitUrl
        }
    }

}

export const submitPr = async (gitUrl : string)=>{

    console.log("Submitting pr...")

    const {
        owner,
        repo
    } = parseGitUrl(gitUrl);

    const name = `${owner?.toLowerCase()}-${repo?.toLowerCase()}`;
    const commit = `Request from ${owner} to inlcude [${repo}](${gitUrl}) in featured dapps.`

    return await octokit.createPullRequest({
        ...FEATURED,
        title : name,
        body : commit,
        base : "main",
        head : name,
        changes : [
            {
                files : {
                    [FEATURED.path] : JSON.stringify(await addPrToFeatured(gitUrl))
                }
            }
        ],
        commit : commit
    })

}