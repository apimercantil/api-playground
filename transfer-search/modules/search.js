const { encrypt } = require("./crypto");
const config = require("../config");

module.exports = async (data, merchantId, integratorId, terminalId, clientId) => {
    const body = {
        merchantIdentify: {
            integratorId,
            merchantId,
            terminalId
        },
        clientIdentify: {
            ipAddress: "10.0.0.1",
            browserAgent: "Chrome 18.1.3",
            mobile: {
                manufacturer: "Samsung"
            }
        },
        transferSearchBy: {
            "account":  encrypt(data.accountNumber, config.SECRETKEY),
            "issuerCustomerId": encrypt(data.customerId, config.SECRETKEY),
            "trxDate": data.transactionDate,
            "issuerBankId": data.bankId,
            "transactionType": 1,
            "paymentReference": data.paymentReference,
            "amount": data.amount
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

    
    const res = await fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/transfer-search', requestOptions)
    return res.json();
}