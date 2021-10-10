var provider = null;
var user = null;
var contract = null;
var initialized = false;


function init() {
  $('#network').html("starting connection...");
  const {ethereum} = window;
  ethereum.on('chainChanged', (_chainId) => window.location.reload());
  const newAccounts = ethereum.request({method: 'eth_requestAccounts'});
  provider =  new ethers.providers.Web3Provider(ethereum, 'any');
  provider.getNetwork().then((chain) => {$('#network').html(chain.name);});
  //++ const openProvider = new opencontracts.providers.Web3Provider(provider);
  user = provider.getSigner();
  initialized = true;
}

// executed by "Load Contract" button
function loadContract() {
  // Connect wallet if necessary
  if (!initialized) {
    if (window.ethereum) {
      init();
    } else {
      window.addEventListener('ethereum#initialized', setup, {
        once: true,
      });
      setTimeout(init, 30000); // 30 seconds
    }
  }
	
  // Load Contract
  var contractAddress = $('#contractAddress').val();
  var contractABI = JSON.parse($('#contractABI').val());
  //++ const openContractABI = JSON.parse($('#oracle.py').val());
  contract = new ethers.Contract(contractAddress, contractABI, provider).connect(user);
  //++ const openContract = new opencontracts.Contract(contract, openContractABI)
    
  // add a button for every function in our contract
  var contractFunctions = contract.interface.fragments;
  var fnames = "<p><b>Functions:</b></p>";
  for (let i = 1; i < contractFunctions.length; i++) {
    fname = contractFunctions[i].name;
    fnames += `<input id=${fname} type="submit" value="${fname}" onclick="showFunction(${fname})" />`;
	}
  fnames += "<br />"
  $('#functionNames').html(fnames);
  $('#currentFunction').html("");
  $('#results').html("");
}

// executed by clicking on a function button
function showFunction(fname) {
  fname = fname.value;
  var fjson = contract.interface.fragments.filter(x=>x.name==fname)[0];
  var currentFunction = `<p><b>Function name:</b>  ${fname}</p>`;
  currentFunction += `<p><b>State mutability:</b> ${fjson.stateMutability}</p>`;
  currentFunction += '<form id="contractForm" action="javascript:void(0);"> <p><b>Arguments:</b>';
  if (fjson.inputs.length == 0 && fjson.stateMutability!="payable") {currentFunction += " none  <br />"}
  if (fjson.stateMutability=="payable") {
  	currentFunction += `<div>	<label for="msgValue">messageValue (ETH):	</label> <input id="msgValue" type="text" value="0" size="60" /></div>`;
  }
  for (let i = 0; i < fjson.inputs.length; i++) {
  	var input = fjson.inputs[i];
  	var inputname = input.name;
  	if (inputname == null) {inputname = input.type}
  	currentFunction += `<div>	<label for="${inputname}">	${inputname}:	</label> <input id="${inputname}" type="text" value="${input.type}" size="60" /> 	</div>`;
	}
  currentFunction +=`<br /> <input type="submit" value="Call" onclick=callFunction(${fname}) /> </form>`
  $('#currentFunction').html(currentFunction)
  $('#results').html("");
}


// executed by the Call button
async function callFunction(fname) {
   fname = fname.value;
   var fjson = contract.interface.fragments.filter(x=>x.name==fname)[0];
   var args = [];
   for (let i = 0; i < fjson.inputs.length; i++) {
     	var input = fjson.inputs[i];
     	var inputname = input.name;
     	if (inputname == null) {inputname = input.type}
   		args.push($(`#${inputname}`).val());
   }
   
   if (fjson.stateMutability=="payable") {
      var msgVal = ethers.utils.parseEther($("#msgValue").val());
      args.push({value: msgVal});
   }

   try {
   	 var txReturn = await contract.functions[fname].apply(this, args);
     if (fjson.stateMutability=="view") {
    	 $('#results').html(txReturn.map(x => x.toString()));
     } else {
       $('#results').html("Waiting for confirmation...");
       await txReturn.wait();
     	 $('#results').html("Confirmed!");
     }
     console.log(txReturn);
   } catch(error) {
     $('#results').html(error.message);
   }
   
}

function hexStringToArrayBuffer(hexString) {
    var pairs = hexString.match(/[\dA-F]{2}/gi);
    var integers = pairs.map(function(s) {return parseInt(s, 16);});
    var array = new Uint8Array(integers);
    return array.buffer;
}

function b64Url2Buff(b64urlstring) {
  return new Uint8Array(atob(b64urlstring.replace(/-/g, '+').replace(/_/g, '/')).split('').map(val => {
    return val.charCodeAt(0);
  }));
}

async function ifValidExtractRSAkey(attestation_data) {
    // validates attestation, and extracts enclave's RSA pubkey if succesfull
    const cose = hexStringToArrayBuffer(attestation_data);
    const cose_sign1_struct = CBOR.decode(cose);
    const array = new Uint8Array(cose_sign1_struct[2]);
    const attestation_doc = CBOR.decode(array.buffer);
    console.log("ENCLAVE HASHES:-----------", attestation_doc['pcrs'])
    const certificate = new x509.X509Certificate(new Uint8Array(attestation_doc['certificate']));
    var valid = false;
    // checks attestation signature
    await certificate.publicKey.export()
    .then(key=>window.crypto.subtle.exportKey("jwk", key))
    .then(function (key) {b64Url2Buff(key['y']); return key})
    .then(key=>COSE.verify(b64Url2Buff(key['x']), b64Url2Buff(key['y']), cose));
    // checks certificate path
    var certs = [];
    for (var i=0; i<=attestation_doc['cabundle'].length; i++) {
	    var cert = new x509.X509Certificate(new Uint8Array(attestation_doc['cabundle'][i]));
	    certs.push(cert)
    }
    const chain = new x509.X509ChainBuilder({certificates: certs});
    const items = await chain.build(certificate);
    return true;
}


function submitOracle() {
    var enclaveProviderIP = $('#enclaveProviderIP').val();
    var oracleCode =  $('#oracleCode').val();	
    var trusted_connection = false;
    console.log("wss://" + enclaveProviderIP + ":8080/")
    var ws = new WebSocket("wss://" + enclaveProviderIP + ":8080/");
    var RSAkey = null;
    ws.onopen = function(event) {
        console.log("WebSocket is open now."); 
        ws.send(JSON.stringify({fname: 'get_attestation'}));
    };
    ws.onmessage = async function (event) {
        data = JSON.parse(event.data);
	if (data['fname'] == "attestation") {
	   RSAkey = await ifValidExtractRSAkey(data['attestation']);
	   console.log(RSAkey);
	   trusted_connection = false;
	}
	if (trusted_connection) {
            ws.onmessage = function (event) {
                data = JSON.parse(event.data);
                if (data['fname'] == "print") {
                    document.getElementById("enclaveOutput").innerHTML += "<code>" + data['string'] + "</code><br>";
                } else if (data['fname'] == "xpra") {
                    document.getElementById("enclaveOutput").innerHTML += "Opened " + data['url'] + " in interactive session at  <a href=" + data['session'] + "> this link. </a><br>";
                }
            };
            ws.send(JSON.stringify({fname: 'submit_oracle', fileContents: oracleCode}));
            ws.send(JSON.stringify({fname: 'run_oracle'}));
        };    
    };
}
