import { encryptAES256 } from "./utils/encrypt.js";

/* 
 * =============================
 * Informacion sobre el comercio
 * =============================
 */
const secretKey = ""; // Llave cifrada.
const integratorId = 0; // ID del integrador.
const merchantId = 0; // ID del comercio.
const terminalId = ""; // ID del terminal.
const phoneNumber = ""; // Número de telefono de origen.
const clientId = '';

/* 
 * ================================================
 * Funcion para generar numero de factura aleatorio
 * ================================================
 */

function invoiceNumber() {
    // Crear una nueva fecha
    let fecha = new Date();

    // Obtener el día, la hora, el segundo y el milisegundo
    let dia = fecha.getDate(); // Día del mes (1-31)
    let hora = fecha.getHours(); // Hora (0-23)
    let minuto = fecha.getMinutes(); // Minuto (0-59)
    let segundo = fecha.getSeconds(); // Segundo (0-59)

    // Crear un string numérico con los componentes de la fecha
    let stringNumericoFecha = `${fecha.getMonth() + 1}${dia}${hora}${minuto}${segundo}`;
    return stringNumericoFecha; // Devolver el string numérico, no es necesario usar toString
}

/* 
 * ============================
 * Funcion para ejecutar el c2p
 * ============================
 */

function c2p(trxType, amount, customerId, customerPhoneNumber, refNumber, authNumber) {

    // Construir cuerpo del request.
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
        transaction_c2p: {
            amount: amount, // Monto de la transacción.
            currency: 'ves', // Moneda utilizada en la transacción.
            destination_bank_id: 105, // ID del banco destinatario.
            destination_id: encryptAES256(customerId, secretKey), // Documento de identidad del destinatario.
            destination_mobile_number: encryptAES256(customerPhoneNumber, secretKey), // Número telefónico del destinatario.
            origin_mobile_number: encryptAES256(phoneNumber, secretKey), // Número telefónico del remitente.
            payment_reference: trxType == "anulacion" ? refNumber : "", // Referencia de la transacción(Solo para anulación).
            trx_type: trxType, // Tipo de transacción(compra / anulacion / vuelto).
            payment_method: trxType == 'vuelto' ? "p2p" : "c2p", // Método de pago(P2P / C2P).
            invoice_number: invoiceNumber(), // Número de factura(Generado aleatoriamente para el ejemplo).
            twofactor_auth: trxType == 'compra' ? encryptAES256(authNumber, secretKey) : '' // Clave de pago(Solo para compra).
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

    // Ejecutar peticion POST.
    fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/c2p', jsonData)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
}