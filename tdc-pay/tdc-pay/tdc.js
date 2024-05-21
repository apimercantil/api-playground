import { encryptAES256 } from "./utils/encrypt.js";

/* 
 * =============================
 * Informacion sobre el comercio
 * =============================
 */

const secretKey = "";
const integratorId = 0; // ID de integrador.
const merchantId = 0; // ID del comercio.
const terminalId = ""; // ID del terminal.
const clientId = ''; // IBM Client ID.

/* 
 * =================================
 * Funcion para ejecutar el pago TDC
 * =================================
 */

function pay(cardNumber, customerId, cvv, fecha) {
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
          manufacturer: "Samsung"
        }
      },
      transaction: {
        amount: 1.50,
        currency: "ves",
        trx_type: "compra",
        payment_method: "tdc",
        card_number: cardNumber, // Usar el valor del campo card_number del formulario
        customer_id: customerId, // Usar el valor del campo customer_id del formulario
        invoice_number: invoice_number(),
        //campos encriptados con AES.
        expiration_date: encryptAES256(fecha, secretKey),
        cvv: encryptAES256(cvv, secretKey),
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
    }

    // Ejecución de la petición POST con el request creado.
    fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/pay', jsonData)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });  
}