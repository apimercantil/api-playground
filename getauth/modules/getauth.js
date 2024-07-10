const crypto = require('./crypto');
const config = require('../config');

module.exports = async (data, merchantId, integratorId, terminalId, clientId) => {
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
        transaction_authInfo: {
            'trx_type': 'solaut',
            'payment_method': 'tdd',
            'customer_id': data.customerId,
            'card_number': data.cardNumber
        }
    }

    console.log(body.transaction)

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-IBM-Client-ID': clientId
        },
        body: JSON.stringify(body)
    }

    
    const res = await fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/getauth', requestOptions)
    return res.json();
}