import {WebSocket, Event} from "ws";

function connectEnclave() {
    var enclaveProviderIP = $('#enclaveProviderIP').val();
    // var oracleCode =  getOracleString(); // $('#oracleCode').val();	
    var trusted_connection = false;
    console.log("wss://" + enclaveProviderIP + ":8080/")
    var ws = new WebSocket("wss://" + enclaveProviderIP + ":8080/");
    var ETHkey = null;
    var AESkey = null;
    var encryptedAESkey = null;
    ws.onopen = function(event) {
        console.log("WebSocket is open now."); 
        ws.send(JSON.stringify({fname: 'get_attestation'}));
    };
    ws.onmessage = async function (event) {
        data = JSON.parse(event.data);
        if (data['fname'] == "attestation" && !trusted_connection) {
            let oracleCode = await getOracleCode();
            [ETHkey, AESkey, encryptedAESkey] = await extractContentIfValid(data['attestation']);
            trusted_connection = true;
            ws.send(JSON.stringify({fname: 'submit_AES', encrypted_AES: encryptedAESkey}));
	    ws.send(JSON.stringify({fname: 'submit_signature', signature: await signHex(data['signThis'])}));
            ws.send(JSON.stringify(await encrypt(AESkey, {fname: 'submit_oracle', fileContents: oracleCode})));
            ws.send(JSON.stringify(await encrypt(AESkey, {fname: 'run_oracle'})));
        }
	if (data['fname'] == 'encrypted') {
	    data = await decrypt(AESkey, data);
	    if (data['fname'] == "print") {
                document.getElementById("enclaveOutput").innerHTML += "<code>" + data['string'] + "</code><br>";
            } else if (data['fname'] == "xpra") {
                document.getElementById("enclaveOutput").innerHTML += "Opened " + data['url'] + " in interactive session at  <a href=" + data['session'] + " target='_blank'> this link. </a><br>";
            } else if (data['fname'] == 'user_input') {
                formID = Math.floor(Math.random() * 100000);
                submitForm = '<form action="javascript:void(0);" id="' + formID + '"> <label for="input">' + data["message"] + '</label>'
                submitForm += '<input type="text" id="input" name="input" value=""> <input type="submit" value="Submit" name="submit"> </form>';
                document.getElementById("enclaveOutput").innerHTML += submitForm;
                form = document.getElementById(formID);
                form.addEventListener('submit', async function() {
                    form.input.disabled = true;
                    form.submit.disabled = true;
                    ws.send(JSON.stringify(await encrypt(AESkey, {fname: 'user_input', input: form.input.value})));
                })		
            } else if (data['fname'] == 'submit') {
                document.getElementById("enclaveOutput").innerHTML += "Received oracle results. Requesting transaction to the Open Contracts Hub.";
		hubTX = "<p>You can now trigger the final transaction to the contract, via the Hub.</p>";
	        nonce = '0x' + data['nonce'];
		calldata = '0x' + data['calldata'];
		oracleSig = data['oracleSignature'];
		oracleProvider = data['oracleProvider'];
		registrySig = data['registrySignature'];
                hubTX += `<input type="submit" value="Call Hub" onclick="requestHubTransaction('${nonce}','${calldata}','${oracleSig}','${oracleProvider}','${registrySig}')" /><br />`;
	        $('#hubTX').html(hubTX);
            }
        } 
    };
}


export interface OpenEnclaveReturnsI {
    event : Event,
    ws : WebSocket
}

/**
 * Opens a socket connection with the enclave.
 * @param enclaveIp the enclave's Ip
 * @returns 
 */
export const openEnclaveSocket = async (enclaveIp : string) : Promise<Event>=>{

    const ws = new WebSocket(`ws://${enclaveIp}:8080/`);

    return new Promise((resolve, reject)=>{

        ws.onopen = (event : Event)=>{
            resolve(event);
        }

        ws.onerror = ()=>{
            reject();
        }

    })

}

/**
 * Makes a request for the enclave attestation.
 * @param ws 
 * @returns 
 */
export const requestEnclaveAttestation = (ws : WebSocket)=>{

    return  ws.send(JSON.stringify({fname: 'get_attestation'}));

}

/**
 * Whether an event is an attestation.
 * @param event 
 * @returns 
 */
export const isAttestationEvent = (event : Event) : boolean=>{

    return event["data"]["fname"] === "attestation";

}

export interface ReceiveEncalveAttestationReturnsI{
    event : Event, 
    ws : WebSocket
}

/**
 * 
 * @param ws 
 * @returns 
 */
export const receiveEnclaveAttesation = (ws : WebSocket)=>{

    return new Promise((resolve, request)=>{

        ws.onmessage = (event : Event)=>{

            if(isAttestationEvent(event)){
                resolve(event);
            }

        }

    })

}

/**
 * 
 * @param ws 
 * @returns
 */
export const getEnclaveAttestation = async (ws : WebSocket)=>{

    return new Promise((resolve, request)=>{

        requestEnclaveAttestation(ws);

    })

}

/**
 * 
 * @param enclaveIp 
 */
export const connectToEnclave = async (enclaveIp : string)=>{

    const ws = new WebSocket(`ws://${enclaveIp}:8080/`);
    typeof ws.onopen

}