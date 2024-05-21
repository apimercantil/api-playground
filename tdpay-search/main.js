import { renderResponse, displayJsonInfo } from "./utils/display/interface.js";

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

function search(e) {
  e.preventDefault(); // Evitar el envío por defecto del formulario

  // Obtener los valores del formulario
  const searchCriteriaValue = document.querySelector('#search_criteria').value;
  const processingDateValue = document.querySelector('#processing_date').value;

  document.querySelector(".loader").classList.remove("d-none");
  document.querySelector("#transactionListContainer").classList.add("d-none");

  const rqBody = {
    // Se Realiza la asignacion de datos en el merchant_identify con los codigos asignados por Mercantil
    merchant_identify: {
      integratorId,
      merchantId,
      terminalId
    },
    //Asignamos la ip y resto de informacion de donde se realiza la peticion
    client_identify: {
      ipaddress: "127.0.0.1",
      browser_agent: "Chrome 18.1.3", 
      mobile: {
        "manufacturer": "Samsung"
              }
    },
    //asignamos los valores que ingrese el usuario
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
    renderResponse(data);
    displayJsonInfo(rqBody, data);
  });
}

/*
 * ==========================================
 * Capturar el evento de envío del formulario
 * ==========================================
*/

document.querySelector('form').addEventListener('submit', search);