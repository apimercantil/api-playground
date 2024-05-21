/* 
 * ======================================
 * Funcion para cifrar los campos con AES
 * ======================================
 */

function encryptAES256(message, key)  {
    // Convertir la llave secreta en un hash SHA256
    const cipherKey = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(key)).toString();

    // Obtener los primeros 16 bytes del hash
    const keyString = cipherKey.toString();
    const firstHalf = keyString.slice(0, keyString.length / 2);
    const keyHex = CryptoJS.enc.Hex.parse(firstHalf);

    // Encriptacion del mensaje usando la clave nueva   
    const encrypt = CryptoJS.AES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return CryptoJS.enc.Base64.stringify(encrypt.ciphertext); // Valor devuelto en Base64
}

/* 
 * =========================================
 * Funcion para descifrar los campos con AES
 * =========================================
 */

function decryptAES256(message, key) {
    // Convertir la llave secreta en un hash SHA256
    const decipherKey = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(key));

    // Obtener los primeros 16 bytes del hash
    const keyString = decipherKey.toString();
    const firstHalf = keyString.slice(0, keyString.length / 2);
    const keyHex = CryptoJS.enc.Hex.parse(firstHalf);

    // Codificar el mensaje a Base64
    const cipherBytes = CryptoJS.enc.Base64.parse(message)

    // Encriptacion del mensaje usando la clave nueva
    const decrypt = CryptoJS.AES.decrypt({ciphertext: cipherBytes}, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

    return CryptoJS.enc.Utf8.stringify(decrypt); // Valor devuelto en UTF8
}

export { encryptAES256, decryptAES256 }