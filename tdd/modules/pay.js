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
        transaction: {
            'trx_type': 'compra',
            'payment_method': 'tdd',
            'card_number': data.cardNumber,
            'customer_id': data.customerId,
            'account_type': data.accountType,
            'invoice_number': data.invoiceNumber,
            'twofactor_auth': crypto.encrypt(data.twoFactorAuth, config.SECRETKEY),
            'expiration_date': data.expirationDate,
            'cvv': crypto.encrypt(data.cvv, config.SECRETKEY),
            'currency': 'ves',
            'amount': data.amount,
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

    
    const res = await fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/pay', requestOptions)
    return res.json();
}