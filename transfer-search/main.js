import { encryptAES256 } from "./utils/encrypt.js";
import { displayBack, displayResponse } from "./utils/display/interface.js";

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

function transferSearch(e) {

    // Evitar el envío por defecto del formulario.
    e.preventDefault();

    // Mostrar pantalla de carga mientras se ejecuta el C2P    
    document.querySelector(".loader").classList.remove("d-none");
    document.querySelector("#transfer-search").classList.add("d-none");

    // Preparar información recibida desde el formulario.

    const amount = document.querySelector("#amount").value;
    const issuerCustomerId = document.querySelector("#customer-id-type").value + document.querySelector("#customer-id").value;
    const refNumber = document.querySelector("#ref-number").value;
    const accountNumber = document.querySelector("#account-number").value;
    const date = document.querySelector("#date").value;

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
            paymentReference: refNumber,
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
            document.querySelector(".loader").classList.add("d-none");
            displayResponse(rqBody, data);
        });
}

/* 
 * ======================================
 * Funcion para mostrar el response y request
 * ======================================
 */

document.querySelector("#transfer-search").addEventListener("submit", transferSearch);
document.querySelector(".back").addEventListener("click", displayBack);
