import { displayResponse, displayBack, displayForm } from "./interface.js";

// BOTONES
const sendButton = document.querySelector("#send-button");
const retry = document.querySelector(".retry");

//CAMPOS DE PAYMENT
const expirationDate = document.querySelector("#expiration-date");
const customerIdPrefix = document.querySelector("#customerid-prefix");
const customerId = document.querySelector("#customerid");
const cardNumber = document.querySelector("#card-number");
const amount = document.querySelector("#amount");
const cvv = document.querySelector("#cvv");
const invoiceNumber = document.querySelector("#invoice-number");
const accountType = document.querySelector("#account-type");
const twoFactor = document.querySelector("#twofactor");

// URLS y ENDPOINTS
const URL = "http://127.0.0.1:3001";
const PAY_ENDPOINT = "/pay";

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
        cardNumber: cardNumber.value,
        expirationDate: expirationDate.value,
        amount: amount.value,
        cvv: cvv.value,
        invoiceNumber: invoiceNumber.value,
        accountType: accountType.value,
        twoFactorAuth: twoFactor.value
      })

  document.querySelector(".loader").classList.remove("hide");
  document.querySelector(".main-container").classList.add("hide");

  const res = await sendData(PAY_ENDPOINT, body);

  document.querySelector(".loader").classList.add("hide");
  document.querySelector(".main-container").classList.remove("hide");

  displayResponse(res.request, res.response);
});

retry.addEventListener("click", displayBack);
