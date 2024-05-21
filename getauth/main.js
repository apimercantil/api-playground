import { displayBack, displayResponse } from "./utils/display/interface.js";

/* 
 * =============================
 * Informacion sobre el comercio
 * =============================
 */

const secretKey = ""; // Llave de cifrado
const integratorId = 0; // ID de integrador.
const merchantId = 0; // ID del comercio.
const terminalId = ""; // ID del terminal.
const clientId = ''; // IBM Client ID.

/* 
 * ===========================================
 * Funcion para llamar a get-auth y autenticar
 * ===========================================
 */

function getAuth(e) {
    e.preventDefault(); // Evitar el envío por defecto del formulario

    getAuthForm.classList.add("d-none");
    loader.classList.remove("d-none");

    // Obtener los valores del formulario
    const cardNumber = document.querySelector('#card-number').value;
    const customerId = document.querySelector("#customer-id-type").value + document.querySelector("#customer-id").value;

    // Body del request
    const rqBody = {
    merchant_identify: {
        integratorId,
        merchantId,
        terminalId
    },
    client_identify: {
        ipaddress: "127.0.0.1",
        browser_agent: "Chrome 18.1.3", 
        mobile: {
        "manufacturer": "Samsung"
        }
    },
    transaction_authInfo: {
        trx_type: "solaut",
        payment_method: "tdd",
        card_number: cardNumber,
        customer_id: customerId
    }
    };

    // Creación del request
    const jsonData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-IBM-Client-Id': clientId
        },
        body: JSON.stringify(rqBody)
    };

    // Ejecución de la petición POST con el request creado.
    fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/getauth', jsonData)
        .then( (res) => res.json())
        .then(data => {
            displayResponse(rqBody, data, false);
        });
}

const loader = document.querySelector(".loader");
const getAuthForm = document.querySelector("#get-auth");

/*
 * ==========================================
 * Capturar el evento de envío del formulario
 * ==========================================
*/

getAuthForm.addEventListener('submit', getAuth);
document.querySelector(".back").addEventListener("click", displayBack);