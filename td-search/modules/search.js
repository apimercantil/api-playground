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
        search_by: {
            "search_criteria": data.searchCriteria,
            "procesing_date": data.procesingDate,
            "invoice_number": data.invoiceNumber,
            "payment_reference": data.paymentReference
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

    
    const res = await fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/search', requestOptions)
    return res.json();
}