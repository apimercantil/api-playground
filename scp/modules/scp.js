const config = require("../../c2p/config");
const { encrypt } = require("../../c2p/modules/crypto");

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
        transaction_scpInfo: {
            destination_id: encrypt(data.customerId, config.SECRETKEY),
            destination_mobile_number: encrypt(data.customerPhoneNumber, config.SECRETKEY)
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

    
    const res = await fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/mobile-payment/scp', requestOptions)
    return res.json();
}