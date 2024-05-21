/*
 * =============================
 * Información sobre el comercio
 * =============================
*/

const integratorId = 0;
const merchantId = 0;
const terminalId = "";
const clientId = '';

/*
 * =====================================
 * Función para buscar pago con tarjetas
 * =====================================
*/

function search() {
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
    search_by: {
      search_criteria: searchCriteriaValue,
      procesing_date: processingDateValue
    }
  };

  const jsonData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-IBM-Client-Id': clientId
    },
    body: JSON.stringify(rqBody)
  }

  // Realizar una solicitud fetch
  fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/search', jsonData)
  .then(res => res.json())
  .then(data => {
    console.log('API Response:', data);
    });
}