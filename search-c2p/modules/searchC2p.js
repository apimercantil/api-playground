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
        search_by: {
            amount: data.amount, // Monto de la transacción.
            currency: 'ves', // Moneda utilizada en la transacción.
            destination_mobile_number: crypto.encrypt(data.customerPhoneNumber, config.SECRETKEY), // Número telefónico del destinatario.
            origin_mobile_number: crypto.encrypt(config.PHONE_NUMBER, config.SECRETKEY), // Número telefónico del remitente.
            payment_reference: data.refNumber,
            trx_date: data.transactionDate
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
    
    const res = await fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/mobile-payment/search', requestOptions);
    return res.json();
}