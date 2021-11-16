import { Octokit } from "@octokit/rest";
import to from "await-to-js";
import {fromByteArray} from "base64-js";
const { createPullRequest } = require("octokit-plugin-create-pull-request");

export const MyOctokit = Octokit.plugin(createPullRequest);
export const octokit = new MyOctokit({
    auth : process.env.REACT_APP_GITHUB_TOKEN
});

export const getSha = async (args : {
    owner : string,
    repo : string,
    path : string
})=>{
    
    const { data: { sha } } = await octokit.request(`GET /repos/${args.owner}/${args.repo}/contents/${args.path}`);

    return sha
}

export const getFileBlob = async (args : {
    owner : string,
    repo : string,
    path : string
})=>{
    
    return await octokit.rest.git.getBlob({
        owner : args.owner,
        repo : args.repo,
        file_sha : await getSha({
            owner : args.owner,
            repo : args.repo,
            path : args.path
        })
    })

}

/**
 * https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
 * @param str 
 * @returns 
 */
function b64DecodeUnicode(str : string) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

export const getFileText = async (args : {
    owner : string,
    repo : string,
    branch ? : string
    path : string
}) : Promise<string>=> {

    const [error, text] = await to(
        (await fetch(`https://raw.githubusercontent.com/${args.owner}/${args.repo}/${args.branch||"main"}/${args.path}`)).text()
    )

    if(error){
        throw error;
    }

    return text as string;

}