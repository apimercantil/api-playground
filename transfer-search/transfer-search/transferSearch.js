import { encryptAES256 } from "./utils/encrypt.js";

/* 
 * =============================
 * Informacion sobre el comercio
 * =============================
 */
const secretKey = ""; // Llave secreta.
const integratorId = 0; // ID del integrador.
const merchantId = 0; // ID del comercio.
const terminalId = ""; // ID del terminal.
const clientId = ''; // client-id

/* 
 * =================================
 * Funcion para ejecutar la busqueda
 * =================================
 */

function transferSearch(amount, issuerCustomerId, accountNumber, paymentReference, date) {
    // Construir el Request Body
    const rqBody = {
        merchantIdentify: {
            integratorId,
            merchantId,
            terminalId
        },
        clientIdentify: {
            ipAddress: '127.0.0.1',
            browserAgent: 'Chrome 18.1.3',
            mobile: {
              manufacturer: 'Samsung'
            }
        },
        transferSearchBy: {
            amount: amount,
            issuerCustomerId: encryptAES256(issuerCustomerId, secretKey),
            account: encryptAES256(accountNumber, secretKey),
            issuerBankId: 105,
            paymentReference: paymentReference,
            trxDate: date,
            transactionType: 1
        }
    }

    // Construir el request
    const jsonData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-IBM-Client-Id': clientId
        },
        body: JSON.stringify(rqBody)
    }

    // Ejecutar peticion
    fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/transfer-search', jsonData)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
}
