/* 
 * =============================
 * Informacion sobre el comercio
 * =============================
 */

const secretKey = ''; // Llave secreta.
const integratorId = 0; // ID de integrador.
const merchantId = 0; // ID del comercio.
const terminalId = ''; // ID del terminal.
const clientId = ''; // IBM Client ID.

/* 
 * ======================================
 * Funcion para invocar el API de GetAuth
 * ======================================
 */

function getaAuth(cardNumber, customerId) {

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
            console.log(data);
        });
}