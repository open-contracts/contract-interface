export {};

/*// extracts pubkeys and enclave hash if attestation doc is valid
async function extractContentIfValid(attestation_data) {
    // decode COSE_SIGN1 message
    const cose = hexStringToArrayBuffer(attestation_data);
    const cose_sign1_struct = CBOR.decode(cose);
    const array = new Uint8Array(cose_sign1_struct[2]);
    const attestation_doc = CBOR.decode(array.buffer);

    // check attestation signature
    const certificate = new x509.X509Certificate(new Uint8Array(attestation_doc['certificate']));
    await certificate.publicKey.export()
    .then(key=>window.crypto.subtle.exportKey("jwk", key))
    .then(function (key) {b64Url2Buff(key['y']); return key})
    .then(key=>COSE.verify(b64Url2Buff(key['x']), b64Url2Buff(key['y']), cose));

    // check certificate path
    root = new x509.X509Certificate(rootcert);
    var certs = [root];
    const cabundle = attestation_doc['cabundle'];
    for (var i=1; i<cabundle.length; i++) {
        var cert = new Uint8Array(cabundle[i]);
        var cert = new x509.X509Certificate(cert);
        certs.push(cert);
    }
    const chain = new x509.X509ChainBuilder({certificates: certs});
    const items = await chain.build(certificate);
    const validcertpath = await root.equal(items[items.length-1]);
    if (!validcertpath) {throw Error('Invalid Certpath in Attestation')}

    // extracts hash + pubkeys
    const hash = attestation_doc['pcrs'][0];
    console.log("------->UNCHECKED< ENCLAVE HASH:--------", hash);
    // TODO: Add hash ceck
    const ETHkey = new TextDecoder().decode(attestation_doc['public_key']);
    const RSAraw = hexStringToArrayBuffer(new TextDecoder().decode(attestation_doc['user_data']));
    const RSAkey = await crypto.subtle.importKey('spki', RSAraw, {name: "RSA-OAEP", hash: "SHA-256"}, true, ["encrypt"]);
    const AESkey = await crypto.subtle.generateKey({"name":"AES-GCM","length":256},true,['encrypt','decrypt']);
    const rawAES = new Uint8Array(await crypto.subtle.exportKey('raw', AESkey));
    const encryptedAESkey = await Base64.fromUint8Array(new Uint8Array(await window.crypto.subtle.encrypt({name: "RSA-OAEP"}, RSAkey, rawAES)));
    return [ETHkey, AESkey, encryptedAESkey];
}*/


