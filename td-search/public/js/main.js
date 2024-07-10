import { displayResponse, displayBack, displayForm } from "./interface.js";

// BOTONES
const sendButton = document.querySelector("#send-button");
const retry = document.querySelector(".retry");

//CAMPOS DE PAYMENT
const searchCriteria = document.querySelector("#search-criteria");
const procesingDate = document.querySelector("#procesing-date");
const paymentReference = document.querySelector("#payment-reference");
const invoiceNumber = document.querySelector("#invoice-number");

// URLS y ENDPOINTS
const URL = "http://127.0.0.1:3003";
const PAY_ENDPOINT = "/search";

// FUNCIÓN PARA ENVIAR EL REQUEST CON LOS DATOS CORRECTOS
const sendData = async (endpoint, body) => {
  const res = await fetch(`${URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  return await res.json();
};

// FUNCIÓN PARA ENVIAR LA INFORMACIÓN AL ENDPOINT

sendButton.addEventListener("click", async () => {
  const body = JSON.stringify({
    searchCriteria: searchCriteria.value,
    procesingDate: procesingDate.value.replaceAll("-", "/"),
    paymentReference: paymentReference.value,
    invoiceNumber: invoiceNumber.value
  });

  document.querySelector(".loader").classList.remove("hide");
  document.querySelector(".main-container").classList.add("hide");

  const res = await sendData(PAY_ENDPOINT, body);

  document.querySelector(".loader").classList.add("hide");
  document.querySelector(".main-container").classList.remove("hide");

  displayResponse(res.request, res.response);
});

retry.addEventListener("click", displayBack);
