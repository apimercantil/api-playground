import { displayResponse, displayBack } from "./interface.js";

// BOTONES
const sendButton = document.querySelector("#send-button");
const retry = document.querySelector(".retry");

//CAMPOS DE PAYMENT
const customerIdPrefix = document.querySelector("#customerid-prefix");
const customerId = document.querySelector("#customerid");
const cardNumber = document.querySelector("#card-number");

// URLS y ENDPOINTS
const URL = "http://127.0.0.1:3002";
const AUTH_ENDPOINT = "/getauth";

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
        customerId: customerIdPrefix.value + customerId.value,
        cardNumber: cardNumber.value
      })

  document.querySelector(".loader").classList.remove("hide");
  document.querySelector(".main-container").classList.add("hide");

  const res = await sendData(AUTH_ENDPOINT, body);

  document.querySelector(".loader").classList.add("hide");
  document.querySelector(".main-container").classList.remove("hide");

  displayResponse(res.request, res.response);
});

retry.addEventListener("click", displayBack);
