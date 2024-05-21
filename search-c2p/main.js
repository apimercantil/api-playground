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
const phoneNumber = ""; // Número de telefono de origen.
const clientId = ''; // client-id

/* 
 * =================================
 * Funcion para ejecutar la busqueda
 * =================================
 */

function searchC2p(e) {

    // Evitar el envío por defecto del formulario.
    e.preventDefault();

    // Mostrar pantalla de carga mientras se ejecuta el C2P    
    document.querySelector(".loader").classList.remove("d-none");
    document.querySelector("#searchC2p").classList.add("d-none");

    // Preparar información recibida desde el formulario.

    const amount = document.querySelector("#amount").value;
    const customerId = document.querySelector("#customer-id-type").value + document.querySelector("#customer-id").value;
    const customerPhoneNumber = "58" + document.querySelector("#customer-phone-number-prefix").value + document.querySelector("#customer-phone-number").value;
    const refNumber = document.querySelector("#ref-number").value;
    const date = document.querySelector("#date").value;

    // Construir el Request Body
    const rqBody = {
        merchant_identify: {
            integratorId,
            merchantId,
            terminalId
        },
        client_identify: {
            ipaddress: '127.0.0.1',
            browser_agent: 'Chrome 18.1.3',
            mobile: {
              manufacturer: 'Samsung'
            }
        },
        search_by: {
            amount: amount,
            currency: 'ves',
            destination_id: encryptAES256(customerId, secretKey), // Documento de identidad del destinatario.
            destination_mobile_number: encryptAES256(customerPhoneNumber, secretKey), // Número telefónico del destinatario.
            origin_mobile_number: encryptAES256(phoneNumber, secretKey),
            payment_reference: refNumber,
            trx_date: date
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
    fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/mobile-payment/search', jsonData)
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

document.querySelector("#searchC2p").addEventListener("submit", searchC2p);
document.querySelector(".back").addEventListener("click", displayBack);
