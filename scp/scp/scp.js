/* 
 * ====================================================
 * Informacion sobre el comercio otorgados por el banco
 * ====================================================
 */

const secretKey = ""; // Llave cifrada.
const integratorId = 0; // ID del integrador.
const merchantId = 0; // ID del comercio.
const terminalId = ""; // ID del terminal.
const clientId = ''; // client-id

/* 
 * ===================================================
 * Funcion para ejecutar la solicitud de clave de pago
 * ===================================================
 */

function scp(customerId, customerPhoneNumber) {
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
            destination_id: customerId, // Documento de identidad del destinatario.
            destination_mobile_number: customerPhoneNumber // Número telefónico del destinatario.
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
            /* 
             * Aqui se maneja el response.
             */
            console.log(data)
        });
}
