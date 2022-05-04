// this file is not used by the website, it serves as an input to to create walletconnect.js with:
// browserify browserify walletconnect_source.js -p esmify --standalone WALLETCONNECT > walletconnect.js

const WalletConnectProvider = require('@walletconnect/web3-provider');

async function provider(rpc) {
    const wcprovider = new WalletConnectProvider(rpc);
    return wcprovider
}

if (typeof module !== 'undefined'){ //we are in node.js environment
    module.exports={
        provider
    }
}
