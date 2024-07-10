const config = require("../config");
const crypto = require("./crypto");

module.exports = async (data, merchantId, integratorId, terminalId, clientId) => {
    console.log(data);

    const body = {
        merchant_identify: {
            integratorId,
            merchantId,
            terminalId
        },
        client_identify: {
            ipaddress: '127.0.0.1',
            browser_agent: 'Chrome 18.1.3',
            mobile: {
                manufacturer: 'Samsung',
            }
        },
        transaction_c2p: {
            amount: data.amount, // Monto de la transacción.
            currency: 'ves', // Moneda utilizada en la transacción.
            destination_bank_id: 105, // ID del banco destinatario.
            destination_id: crypto.encrypt(data.customerId, config.SECRETKEY), // Documento de identidad del destinatario.
            destination_mobile_number: crypto.encrypt(data.customerPhoneNumber, config.SECRETKEY), // Número telefónico del destinatario.
            origin_mobile_number: crypto.encrypt(config.PHONE_NUMBER, config.SECRETKEY), // Número telefónico del remitente.
            payment_reference: data.trxType == "anulacion" ? data.refNumber : "", // Referencia de la transacción(Solo para anulación).
            trx_type: data.trxType, // Tipo de transacción(compra / anulacion / vuelto).
            payment_method: data.trxType == 'vuelto' ? "p2p" : "c2p", // Método de pago(P2P / C2P).
            invoice_number: data.invoiceNumber, // Número de factura(Generado aleatoriamente para el ejemplo).
            twofactor_auth: data.trxType == 'compra' ? crypto.encrypt(data.twofactor, config.SECRETKEY) : '' // Clave de pago(Solo para compra / 00001111 para fines del ejemplo).
        }
    }

    console.log(body);

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-IBM-Client-ID': clientId
        },
        body: JSON.stringify(body)
    }

    
    const res = await fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/c2p', requestOptions)
    return res.json();
}