import { displayBack, displayResponse } from "./utils/display/interface.js";
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
 * ============================
 * Funcion para ejecutar el c2p
 * ============================
 */

async function scp(e) {

    // Evitar el envío por defecto del formulario.
    e.preventDefault();

    // Mostrar pantalla de carga mientras se ejecuta el C2P    
    document.querySelector(".loader").classList.remove("d-none");
    document.querySelector("#scp").classList.add("d-none");

    // Preparar información recibida desde el formulario.

    const customerId = document.querySelector("#customer-id-type").value + document.querySelector("#customer-id").value;
    const customerPhoneNumber = "58" + document.querySelector("#customer-phone-number-prefix").value + document.querySelector("#customer-phone-number").value;

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
        transaction_scpInfo: {
            destination_id: encryptAES256(customerId, secretKey), // Documento de identidad del destinatario.
            destination_mobile_number: encryptAES256(customerPhoneNumber, secretKey) // Número telefónico del destinatario.
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

    // Ejecutar peticion POST
    fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/mobile-payment/scp', jsonData)
        .then(res => res.json())
        .then(data => {
            document.querySelector(".loader").classList.add("d-none");
            displayResponse(rqBody, data);
            console.log(data)
            /* 
             * Aqui se maneja el response.
             */
        });
}

/*
 * Eventos 
*/
document.querySelector("#scp").addEventListener("submit", scp);
document.querySelector(".back").addEventListener("click", displayBack);
