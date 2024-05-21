import { displayResponse, displayBack } from "./utils/display/interface.js";
import { encryptAES256 } from "./utils/encrypt.js";

/* 
 * =============================
 * Informacion sobre el comercio
 * =============================
 */

const secretKey = "";
const integratorId = 0; // ID de integrador.
const merchantId = 0; // ID del comercio.
const terminalId = ""; // ID del terminal.
const clientId = ''; // IBM Client ID.


/* 
 * =============================
 * Informacion sobre el comercio
 * =============================
 */

function invoice_number() {
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
 * =================================
 * Funcion para ejecutar el pago TDC
 * =================================
 */

function pay(e) {
  e.preventDefault(); // Evitar el envío por defecto del formulario

  document.querySelector(".loader").classList.remove("d-none");
  document.querySelector("#payment-form").classList.add("d-none")

  // Obtener los valores del formulario
  const cardNumber = document.querySelector('#card_number').value;
  const customerId = document.querySelector("#customer-id-type").value + document.querySelector("#customer-id").value;
  const cvv = document.querySelector('#cvv').value;
  const fecha = document.querySelector('#fecha').value;

    // Body del request
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
          manufacturer: "Samsung"
        }
      },
      transaction: {
        amount: 1.50,
        currency: "ves",
        trx_type: "compra",
        payment_method: "tdc",
        card_number: cardNumber, // Usar el valor del campo card_number del formulario
        customer_id: customerId, // Usar el valor del campo customer_id del formulario
        invoice_number: invoice_number(),
        //campos encriptados con AES.
        expiration_date: encryptAES256(fecha, secretKey),
        cvv: encryptAES256(cvv, secretKey),
      }
    };

    // Creación del request
    const jsonData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-IBM-Client-Id': clientId
      },
      body: JSON.stringify(rqBody)
    }

    // Ejecución de la petición POST con el request creado.
    fetch('https://apimbu.mercantilbanco.com/mercantil-banco/sandbox/v1/payment/pay', jsonData)
    .then(res => res.json())
    .then(data => {
      document.querySelector(".loader").classList.add("d-none");
      displayResponse(rqBody, data);
    });  
}

/*
 * ==========================================
 * Capturar el evento de envío del formulario
 * ==========================================
*/
document.querySelector('#payment-form').addEventListener('submit', pay);
document.querySelector(".back").addEventListener("click", displayBack);