/* 
 * =============================
 * Informacion sobre el comercio
 * =============================
 */
const secretKey = ""; // Llave de cifrado.
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

function searchC2p(amount, customerId, customerPhoneNumber, refNumber, date) {

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
            destination_id: customerId, // Documento de identidad del destinatario.
            destination_mobile_number: customerPhoneNumber, // Número telefónico del destinatario.
            origin_mobile_number: phoneNumber,
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
        });
}
