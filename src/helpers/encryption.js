import nacl from "tweetnacl";
import secureRandom from "secure-random";
import naclUtil, { decodeUTF8 } from "tweetnacl-util";
nacl.util = naclUtil;

export function newNonce() {
    // optionally takes a second parameter
    // { type: 'Type' }
    // where 'Type' could be any of
    // - 'Array'
    // - 'Buffer'
    // - 'Uint8Array'
    return secureRandom(24, { type: "Uint8Array" });
}

export function Uint8ArrayToString(data) {
    return nacl.util.encodeUTF8(data);
}

export function Uint8ArrayToBase64(data) {
    return nacl.util.encodeBase64(data);
}

export function Base64ToUint8Array(data) {
    return nacl.util.decodeBase64(data);
}

export function StringToUTF8(data) {
    return nacl.util.decodeUTF8(data);
}


export function encryptBox(message, serverPublicKey) {

    const {
        publicKey: clientPublicKey,
        secretKey: clientPrivateKey,
    } = nacl.box.keyPair();


    const clientPublicKeyText = Uint8ArrayToBase64(clientPublicKey)
    const nonce = newNonce()
    const nonceText = Uint8ArrayToBase64(nonce)
    const cipher = nacl.box(
        StringToUTF8(message),
        nonce,
        serverPublicKey,
        clientPrivateKey,
    );
    const cipherText = Uint8ArrayToBase64(cipher)
    var encrypted = { cipherText, nonceText, clientPublicKeyText };
    return encrypted

}


export function formatEncryptedField(seedId, cipherText, nonceText, clientPublicKeyText) {
    return { _id: seedId, Nonce: nonceText, Message: cipherText, ClientPublicKey: clientPublicKeyText }

}


export function decryptBox(message,nonce, serverPublicKey, clientPrivateKey) {

    const decipher = nacl.box.open(
        Base64ToUint8Array(message),
        Base64ToUint8Array(nonce),
        Base64ToUint8Array(serverPublicKey),
        Base64ToUint8Array(clientPrivateKey),
    );
    const decipherText = Uint8ArrayToString(decipher);
    return decipherText
}