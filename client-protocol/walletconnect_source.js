// this file is not used by the website, it serves as an input to to create walletconnect.js with:
// browserify walletconnect_source.js --standalone WALLETCONNECT > walletconnect.js

const provider = require('@walletconnect/web3-provider');

if (typeof module !== 'undefined'){ //we are in node.js environment
    module.exports={
        provider
    }
}
