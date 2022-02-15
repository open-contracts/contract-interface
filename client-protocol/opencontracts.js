/**
 * Error type to be thrown when error is in the enclave.
 */
const enclaveErrorTypeName = "EnclaveError";
class EnclaveError extends Error{
    /**
     * Constructs an EnclaveError
     * @param {string} message 
     */
    constructor(message){
        super(message);
        this.name = enclaveErrorTypeName
    }
}

/**
 * Error type to be thrown when error is in the registry.
 */
const registryErrorTypeName = "RegistryError";
class RegistryError extends Error{
    /**
     * Constructs a RegistryError
     * @param {string} message 
     */
    constructor(message){
        super(message);
        this.name = registryErrorTypeName
    }
}

/**
 * Error type to be thrown when error is on the client.
 */
const clientErrorTypeName = "ClientError";
class ClientError extends Error{
    /**
     * Constructs a Client Error.
     * @param {string} message 
     */
    constructor(message){
        super(message);
        this.name = clientErrorTypeName
    }
}

/**
 * Error type to be thrown when error is on the client.
 */
const ethereumErrorTypeName = "EthereumError";
class EthereumError extends Error{
    /**
     * Constructs an Ethereum Error.
     * @param {string} message 
     */
    constructor(message){
        super(message);
        this.name = ethereumErrorTypeName
    }
}

function hexStringToArray(hexString) {
    var pairs = hexString.match(/[\dA-F]{2}/gi);
    var integers = pairs.map(function(s) {return parseInt(s, 16);});
    return new Uint8Array(integers);
}

function ArrayToHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}


function b64Url2Buff(b64urlstring) {
  return new Uint8Array(atob(b64urlstring.replace(/-/g, '+').replace(/_/g, '/')).split('').map(
      val => {return val.charCodeAt(0);}
  ));
}


const awsNitroRootCert = `-----BEGIN CERTIFICATE-----
MIICETCCAZagAwIBAgIRAPkxdWgbkK/hHUbMtOTn+FYwCgYIKoZIzj0EAwMwSTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoMBkFtYXpvbjEMMAoGA1UECwwDQVdTMRswGQYD
VQQDDBJhd3Mubml0cm8tZW5jbGF2ZXMwHhcNMTkxMDI4MTMyODA1WhcNNDkxMDI4
MTQyODA1WjBJMQswCQYDVQQGEwJVUzEPMA0GA1UECgwGQW1hem9uMQwwCgYDVQQL
DANBV1MxGzAZBgNVBAMMEmF3cy5uaXRyby1lbmNsYXZlczB2MBAGByqGSM49AgEG
BSuBBAAiA2IABPwCVOumCMHzaHDimtqQvkY4MpJzbolL//Zy2YlES1BR5TSksfbb
48C8WBoyt7F2Bw7eEtaaP+ohG2bnUs990d0JX28TcPQXCEPZ3BABIeTPYwEoCWZE
h8l5YoQwTcU/9KNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUkCW1DdkF
R+eWw5b6cp3PmanfS5YwDgYDVR0PAQH/BAQDAgGGMAoGCCqGSM49BAMDA2kAMGYC
MQCjfy+Rocm9Xue4YnwWmNJVA44fA0P5W2OpYow9OYCVRaEevL8uO1XYru5xtMPW
rfMCMQCi85sWBbJwKKXdS6BptQFuZbT73o/gBh1qUxl/nNr12UO8Yfwr6wPLb+6N
IwLz3/Y=
-----END CERTIFICATE-----`;


// extracts pubkeys and enclave hash if attestation doc is valid
async function parseAttestation(attestationHex) {
    // decode COSE_SIGN1 message
    const cose = hexStringToArray(attestationHex).buffer;
    const coseSign1Struct = CBOR.decode(cose);
    const array = new Uint8Array(coseSign1Struct[2]);
    const attestation = CBOR.decode(array.buffer);

    // check attestation signature
    const certificate = new x509.X509Certificate(new Uint8Array(attestation['certificate']));
    await certificate.publicKey.export()
    .then(key=>window.crypto.subtle.exportKey("jwk", key))
    .then(function (key) {b64Url2Buff(key['y']); return key})
    .then(key=>COSE.verify(b64Url2Buff(key['x']), b64Url2Buff(key['y']), cose));

    // check certificate path
    const root = new x509.X509Certificate(awsNitroRootCert);
    var certs = [root];
    const cabundle = attestation['cabundle'];
    for (var i=1; i<cabundle.length; i++) {
        var cert = new Uint8Array(cabundle[i]);
        var cert = new x509.X509Certificate(cert);
        certs.push(cert);
    }
    const chain = new x509.X509ChainBuilder({certificates: certs});
    const items = await chain.build(certificate);
    const validcertpath = await root.equal(items[items.length-1]);
    if (!validcertpath) {throw new Error('Invalid Certpath in Attestation')}

    // extracts hash + pubkeys
    const hash = attestation['pcrs'][0];
    const hashHex = ArrayToHexString(hash);
    const oracleHash = "a4752a908f860d5ab079b51a974b3b7979866108ad13bfba3c6992c09998910effcad5b824874f552b427879587527f3";
    // if (hashHex != oracleHash) {throw new EnclaveError("Invalid Hash");}
    const ETHkey = new TextDecoder().decode(attestation['public_key']);
    const RSAraw = hexStringToArray(new TextDecoder().decode(attestation['user_data'])).buffer;
    const RSAkey = await crypto.subtle.importKey(
        'spki', RSAraw, {name: "RSA-OAEP", hash: "SHA-256"}, true, ["encrypt"]
    );
    const AESkey = await crypto.subtle.generateKey(
        {"name":"AES-GCM","length":256},true,['encrypt','decrypt']
    );
    const rawAES = new Uint8Array(await crypto.subtle.exportKey('raw', AESkey));
    const encryptedAESkey = await Base64.fromUint8Array(
        new Uint8Array(await window.crypto.subtle.encrypt({name: "RSA-OAEP"}, RSAkey, rawAES))
    );
    return [ETHkey, AESkey, encryptedAESkey];
}


async function requestHubTransaction(opencontracts,
                                     oracleID, nonce, calldata, oracleSignature,
                                     oracleProvider, oraclePrice, registryPrice, registrySignature) {
    fn = Object.getOwnPropertyNames(opencontracts.contract.interface.functions).filter(
        sig => opencontracts.contract.interface.getSighash(sig) == calldata.slice(0,10)
    )[0];
    call = opencontracts.contract.interface.decodeFunctionData(calldata.slice(0,10), calldata);
    var estimateHub = await opencontracts.OPNverifier.connect(opencontracts.signer).estimateGas[
        "forwardCall(address,bytes32,bytes4,bytes,bytes,address,uint256,uint256,bytes)"
    ](
        opencontracts.contract.address, oracleID, nonce, calldata, oracleSignature, oracleProvider, oraclePrice, registryPrice, registrySignature
    );
    const estimateContract = await opencontracts.contract.estimateGas[fn](
        ...call, overrides={from: opencontracts.OPNhub.address}
    );
    const estimateTotal = estimateHub.add(estimateContract);
    return opencontracts.OPNverifier.connect(opencontracts.signer).functions.forwardCall(
        opencontracts.contract.address, oracleID, nonce, calldata, oracleSignature,
        oracleProvider, oraclePrice, registryPrice, registrySignature, overrides={gasLimit: estimateTotal}
    );
}

async function encrypt(AESkey, json) {
    const nonce = window.crypto.getRandomValues(new Uint8Array(12));
    const data = new TextEncoder().encode(JSON.stringify(json));
    const ciphertext = new Uint8Array(await window.crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce}, AESkey, data));
    var encrypted = new (ciphertext.constructor)(ciphertext.length + nonce.length);
    encrypted.set(ciphertext);
    encrypted.set(nonce, ciphertext.length);
    const encryptedB64 = Base64.fromUint8Array(new Uint8Array(encrypted));
    return {fname: "encrypted", payload: encryptedB64};
}

async function decrypt(AESkey, json) {
    const encrypted = Base64.toUint8Array(json['payload']);
    const ciphertext = encrypted.slice(0, encrypted.length-12);
    const nonce = encrypted.slice(encrypted.length-12, encrypted.length);
    const decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: nonce}, AESkey, ciphertext);
    return JSON.parse(new TextDecoder().decode(decrypted));
}

async function enclaveSession(opencontracts, f) {
    var oracleIP = new URLSearchParams(window.location.search).get('oracleIP');
    if (oracleIP) {
        console.warn("Oracle IP override: ", oracleIP);
        await connect(opencontracts, f, {ip: oracleIP});
        return;
    }
    var registryIP = new URLSearchParams(window.location.search).get('registryIP');
    if (registryIP) {
        console.warn("Registry IP override: ", registryIP);
    } else {
        registryIP = hexStringToArray(await opencontracts.OPNhub.registryIpList(0)).join(".");
    }
    console.warn(`Trying to connect to registry with IP ${registryIP}.`);
     //var ws = new WebSocket("wss://" + registryIP + ":8080");
    var ws = new WebSocket("wss://test.opencontracts.io:8080/" + registryIP);
    var secondsPassed = 0;
    var timer = setInterval(() => {secondsPassed++; if (secondsPassed>30) {clearInterval(timer)}}, 1000);
    ws.onerror = function(event) {
        waiting = false;
        if (secondsPassed < 10) {
            f.errorHandler(
                new RegistryError("Early WebSocket failure. Probable reason: registry root cert not trusted by the client.")
            )
        } else {
            f.errorHandler(
                new RegistryError("Early WebSocket failure. Probable reason: registry root cert not trusted by the client.")
            )
        }
    }; 
    var waiting = false;
    ws.onopen = function () {
        waiting = true;
        ws.send(JSON.stringify({fname: 'get_oracle'}));
    }
    setTimeout(()=> {if (waiting) {f.waitHandler(55, "Oracle booting up...")}}, 3000);
    ws.onmessage = async function (event) {
        waiting = false;
        const oracle = JSON.parse(event.data);
        if (oracle['fname'] == 'return_oracle') {
            ws.close();
            if (oracle.ip.toUpperCase() == "N/A") {
                f.errorHandler(
                    new RegistryError("No oracle enclaves available right now. Try again in a bit - or become an enclave provider!")
                );
            } else {
                f.waitHandler(10, "Connecting to Oracle...");
                setTimeout(async () => {await connect(opencontracts, f, oracle)}, 10000);
            }
        }
    }
}

async function connect(opencontracts, f, oracle) {
    const oracleIP = oracle.ip;
    console.warn("connecting to oracle with IP", oracleIP);
    const domain = "test.opencontracts.io";
    //   oracleIP.split('/')[0];
    //const oracleIP = oracleIP.substring(domain.length+1);
    const location = oracleIP;
    console.warn("wss://" + domain + ":8080/" + oracleIP);
    var ws = new WebSocket("wss://" + domain + ":8080/" + location);
    //var ws = new WebSocket("wss://test.opencontracts.io/oracle/" + oracleIP);
    var ETHkey = null;
    var AESkey = null;
    var encryptedAESkey = null;
    var xpraFinished = null;
    var sessionFinished = false;
    ws.onopen = function(event) {ws.send(JSON.stringify({fname: 'get_attestation'}))};
    ws.onerror = function(event) {console.warn(event); f.errorHandler(new EnclaveError(event.type))};
    ws.onclose = function(event) {setTimeout(() => {
        if (!sessionFinished) {f.errorHandler(new EnclaveError("Enclave closed connection."))}
    }, 3000);};
    ws.onmessage = async function (event) {
        var data = JSON.parse(event.data);
        if (data['fname'] == "attestation") {
            [ETHkey, AESkey, encryptedAESkey] = await parseAttestation(data['attestation']);
            ws.send(JSON.stringify({fname: 'submit_AES', encrypted_AES: encryptedAESkey}));
            const signThis = ethers.utils.arrayify("0x" + data['signThis']);
            ws.send(JSON.stringify({
                fname: 'submit_signature',
                signature: await opencontracts.signer.signMessage(signThis).catch((error) => {f.errorHandler(error)})
            }));
            const [_, user, repo, branch] = window.location.hash.replace(/\/+$/, "").split('/');
            ws.send(JSON.stringify(await encrypt(AESkey, {fname: "run_github_oracle",
                                                          user: user, repo: repo, folder: f.oracleFolder,
                                                          branch: branch || "main"})));
        } else if (data['fname'] == "busy") {
            f.errorHandler(
                new EnclaveError("Oracle is busy. Request a new IP.")
            );
        }
        if (data['fname'] == 'encrypted') {
            data = await decrypt(AESkey, data);
            if (data['fname'] == "print") {
                await f.printHandler(data['string']);
            } else if (data['fname'] == "xpra") {
                xpraFinished = false;
                const xpraExit = new Promise((resolve, reject) => {setInterval(()=> {if (xpraFinished) {resolve(true)}}, 1000)});
                f.waitHandler(5, "Preparing interactive session...");
                //var ws = new WebSocket("https://" + oracleIP + "/oracle/");
                
                // https://open-contracts.github.io/client-protocol/xpra/index.html?server={ec2_ip}&key={aes_key}&port={tcp_port}
                const [server, key, port] = data['session'].split("&")
                data['session'] = server.split("=")[0] + `=${domain}&${key}&${port}&path=/${location}`
                setTimeout(async () => {await f.xpraHandler(data['url'], data['session'], xpraExit)}, 5000);
            } else if (data["fname"] == 'xpra_finished') {
                console.warn("xpra finished.");		
                xpraFinished = true;
            } else if (data['fname'] == 'user_input') {
                userInput = await f.inputHandler(data['message']);
                ws.send(JSON.stringify(await encrypt(AESkey, {fname: 'user_input', input: userInput})));
            } else if (data['fname'] == 'expect_delay') {
                f.waitHandler(data['seconds'], data['reason']);
            } else if (data['fname'] == 'submit') {
                sessionFinished = true;
                await f.submitHandler(async function() {
                    var success = true;
                    var txReturn = await requestHubTransaction(opencontracts,
                                                               data.oracleID, data.nonce, data.calldata, data.oracleSignature,
                                                               oracle.provider, oracle.price, oracle.registryPrice, oracle.registrySignature)
                    .then(function(tx){window.tx = tx; return tx})
                    .then(function(tx){if (tx.wait != undefined) {return tx.wait(1)} else {return tx}})
                    .then(function(tx){if (tx.logs != undefined) {return "Transaction Confirmed. " + String(tx.logs)} else {return tx}})
                    .catch(error => {
                        success=false;
                        if (error.error != undefined) {
                            error = new EthereumError(error.error.message);
                        } else if (error.message != undefined) {
                            error = new EthereumError(error.message  + " (Check your MetaMask for details)");
                        }
                        f.errorHandler(error);
                    });
                    if (success) {return String(txReturn)};
                });
            } else if (data['fname'] == 'error') {
                await f.errorHandler(
                    new EnclaveError(data['traceback'])
                );
            }
        }
    }
}

async function ethereumTransaction(opencontracts, f) {
    args = [];
    for (let i = 0; i < f.inputs.length; i++) {args.push(f.inputs[i].value); console.warn(args[i])}
    if (f.stateMutability == 'payable') {
        const msgValue = ethers.utils.parseEther(args.shift());
        args.push({value: msgValue});
    }
    return await opencontracts.contract.connect(opencontracts.signer).functions[f.name].apply(f, args);
}


async function githubOracleDownloader(user, repo, ref, dir) {
    var links = await GITHUB_FILES.content_links_json(user, repo, ref, dir);
    const downloadAsBase64 = async function (link) {
        const url = new URL(link);
        const response = await fetch(url);
        return btoa(new Uint8Array(await response.arrayBuffer()).reduce(
            (data, byte) => {return data + String.fromCharCode(byte);}, '')
        );
    }
    const downloads = Object.entries({"oracle.py": links["oracle.py"]}).map(
         ([file, link]) => [file, downloadAsBase64(link)]
    );
    return Object.fromEntries(downloads);
}


async function getOraclePys(user, repo, ref) {
    const response = await fetch(new URL(`https://raw.githubusercontent.com/${user}/${repo}/${ref}/interface.json`));
    var contract = JSON.parse(await response.text());
    var contract = contract[Object.keys(contract)[0]]
    var oraclePys = {};
    for (let i = 0; i < contract.abi.length; i++) {
        if (contract.abi[i].oracleFolder == undefined) {continue}
        if (oraclePys[contract.abi[i].oracleFolder] == undefined) {
            oraclePys[contract.abi[i].oracleFolder] = {fnames: []};
            const response = await fetch(new URL(
                `https://raw.githubusercontent.com/${user}/${repo}/${ref}/${contract.abi[i].oracleFolder}/oracle.py`
            ));
            oraclePys[contract.abi[i].oracleFolder].file = await response.text();
    }
        oraclePys[contract.abi[i].oracleFolder].fnames.push(contract.abi[i].name);
    }
    return oraclePys;
}


async function OpenContracts() {
    // TODO: get error handler
    // TODO: add args for link to github or ipfs repo
    const opencontracts = {};
    var status = "loading";
    const initialization = new Promise((resolve, reject) => {setInterval(()=> {
        if (status == "initialized") {
            resolve(opencontracts);
        } else if (status != "initialized"){
            reject(new ClientError(status));
        }
    }, 100)});
    
    // detect metamask
    if (window.ethereum) {
        await init()
    } else {
        window.addEventListener('ethereum#initialized', init, {once: true});
        setTimeout(init, 3000);
    }
    async function init() {
        const {ethereum} = window;
        if (ethereum && ethereum.isMetaMask) {
            ethereum.request({method: 'eth_requestAccounts'});
            ethereum.on('chainChanged', (_chainId) => window.location.reload());
            opencontracts.provider = new ethers.providers.Web3Provider(ethereum, 'any');
            const networks = {"1": "mainnet", "3": "ropsten", "10": "optimism", "42161": "arbitrum"};
            const chainID = String((await opencontracts.provider.getNetwork()).chainId);
            if (!(chainID in networks)) {
               status = "Your Metamask is set to a chain with unknown ID. Please change your network to Ropsten, Arbitrum or Optimism.";
            }
            opencontracts.network = networks[chainID];
            opencontracts.signer = opencontracts.provider.getSigner();
            status = "initialized";
        } else {
            status = "No Metamask detected.";
        }
    }
 
    const [_, user, repo, branch] = window.location.hash.replace(/\/+$/, "").split('/');
    opencontracts.location = `https://raw.githubusercontent.com/${user}/${repo}/${branch || "main"}`;
    console.warn('loading contract at:', opencontracts.location);
    opencontracts.contractInterface = JSON.parse(await (await fetch(new URL(`https://raw.githubusercontent.com/open-contracts/proof-of-id/main/interface.json`))).text().catch(
        (error)=>{status = "Cannot load interface.json from " + contract.location}));
    opencontracts.contractOracles = JSON.parse(await (await fetch(new URL(`https://raw.githubusercontent.com/open-contracts/proof-of-id/main/oracles.json`))).text().catch(
        (error)=>{status = "Cannot load oracles.json from " + contract.location}));
            
    // instantiates the contracts
    opencontracts.parseContracts = function (oc_interface, contract_interface) {
        // TODO: remove obolete contract_interface arg
        if (!(this.network in oc_interface)) {
            throw new ClientError("Currently, the only supported networks are: " + Object.keys(oc_interface));
        } else {
            const token = oc_interface[this.network].token;
            this.OPNtoken = new ethers.Contract(token.address, token.abi, this.provider);
            const hub = oc_interface[this.network].hub;
            this.OPNhub = new ethers.Contract(hub.address, hub.abi, this.provider);
            const verifier = oc_interface[this.network].verifier;
            this.OPNverifier = new ethers.Contract(verifier.address, verifier.abi, this.provider);
            this.getOPN = async function (amountString) {
                const amount = ethers.utils.parseEther(amountString);
                await this.OPNtoken.connect(this.signer).mint(amount);
            }
            this.approveOPN = async function (amountString) {
                const amount = ethers.utils.parseEther(amountString);
                await this.OPNtoken.connect(this.signer).approve(this.OPNverifier.address, amount);
            }
        }
        const contractInterface = opencontracts.contractInterface;
        const contractOracles = opencontracts.contractOracles;
        console.warn(contractInterface, contractInterface.address, contractInterface["address"]);
        window.ci = contractInterface;
        if (!(this.network in contractInterface["address"])) {
            var errormsg = "Your Metamask is set to " + this.network + ", which is not supported by this contract.";
            throw new ClientError(errormsg + " Set your Metamask to one of: " +  Object.keys(contractInterface.address));
        } else {
            this.contract = new ethers.Contract(contractInterface.address[this.network], contractInterface.abi, this.provider);
            this.contractName = contractInterface.name;
            this.contractDescription = contractInterface.descriptions["contract"];
            this.contractFunctions = [];
            for (let i = 0; i < contractInterface.abi.length; i++) {
                if (contractInterface.abi[i].type == 'constructor') {continue}
                const f = {};
                f.name = contractInterface.abi[i].name;
                f.description = contractInterface.descriptions[f.name];
                f.stateMutability = contractInterface.abi[i].stateMutability;
                f.requiresOracle = (f.name in contractOracles);
                f.errorHandler = async function (error) {
                    console.warn(`Warning: using default (popup) errorHandler for function ${this.name}`); 
                    alert(error);
                };
                if (f.requiresOracle) {
                    f.oracleFolder = f.name;
                    f.printHandler = async function(message) {
                        console.warn(`Warning: using default (popup) printHandler for function ${this.name}`); 
                        alert(message);
                    };
                    f.waitHandler = async function(seconds, message) {
                        console.warn(`Expect to wait around ${seconds} seconds: ${message}`); 
                    };
                    f.inputHandler = async function (message) {
                        console.warn(`Warning: using default (popup) inputHandler for function ${this.name}`); 
                        return prompt(message);
                    };
                    f.xpraHandler = async function(targetUrl, sessionUrl, xpraExit) {
                        console.warn(`Warning: using default (popup) xpraHandler for function ${this.name}`); 
                        if (window.confirm(`open interactive session to {targetUrl} in new tab?`)) {
                            var newWin = window.open(sessionUrl,'_blank');
                            xpraExit.then(newWin.close);
                            if(!newWin || newWin.closed || typeof newWin.closed=='undefined') {
                                alert("Could not open new window. Set your browser to allow popups and click ok.");
                                this.xpraHandler(targetUrl, sessionUrl);
                            }
                        }
                    };
                    f.submitHandler = async function (submit) {
                        console.warn(`Warning: using default (popup) submitHandler for function ${this.name}`); 
                        message = "Oracle execution completed. Starting final transaction. ";
                        alert(message + "It will fail if you did not grant enough $OPN to the hub.");
                        await submit()
                    };
                }
                f.inputs = [];
                if (f.stateMutability == "payable") {
                    f.inputs.push({name: "transactionValue", type: "ETH", value: null});
                }
                if (!f.requiresOracle) {
                    for (let j = 0; j < contractInterface.abi[i].inputs.length; j++) {
                        const input = contractInterface.abi[i].inputs[j];
                        f.inputs.push({name: input.name, type: input.type, value: null});
                    }
                }
                f.call = async function () {
                    const unspecifiedInputs = this.inputs.filter(i=>i.value == null).map(i => i.name);
                    if (unspecifiedInputs.length > 0) {
                        throw new ClientError(`The following inputs to "${this.name}" were unspecified:  ${unspecifiedInputs}`);
                    }
                    for (let i = 0; i < this.inputs.length; i++) {
                        if ((this.inputs[i].type === "bool") && (typeof this.inputs[i].value === 'string')) {
                            this.inputs[i].value = JSON.parse(this.inputs[i].value.toLowerCase());
                        }
                    }
                    if (this.requiresOracle) {
                        return await enclaveSession(opencontracts, this);
                    } else {
                        var success = true;
                        var txReturn = await ethereumTransaction(opencontracts, this)
                        .then(function(tx){window.tx = tx; return tx})
                        .then(function(tx){if (tx.wait != undefined) {return tx.wait(1)} else {return tx}})
                        .then(function(tx){if (tx.logs != undefined) {return "Transaction Confirmed. " + String(tx.logs)} else {return tx}})
                        .catch(error => {
                            success=false;
                            if (error.error != undefined) {
                                error = new EthereumError(error.error.message);
                            } else if (error.message != undefined) {
                                error = new EthereumError(error.message);
                            }
                            this.errorHandler(error);
                        });
                        if (success) {return String(txReturn)};
                    }
                }
                opencontracts.contractFunctions.push(f);
            }
        }
    }

    return await initialization;
}
