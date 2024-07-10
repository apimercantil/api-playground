import { displayResponse, displayBack } from "./interface.js";

// BOTONES
const sendButton = document.querySelector("#send-button");
const retry = document.querySelector(".retry");

//CAMPOS DE PAYMENT
const accountNumber= document.querySelector("#account-number");
const amount = document.querySelector("#amount");
const paymentReference = document.querySelector("#payment-reference");
const transactionDate = document.querySelector("#transaction-date");
const customerIdPrefix = document.querySelector("#customerid-prefix");
const customerId = document.querySelector("#customerid");
const bankId = document.querySelector("#bank-id");

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
    accountNumber: accountNumber.value,
    customerId: customerIdPrefix.value + customerId.value,
    transactionDate: transactionDate.value,
    paymentReference: paymentReference.value,
    amount: amount.value,
    bankId: bankId.value
  });

  document.querySelector(".loader").classList.remove("hide");
  document.querySelector(".main-container").classList.add("hide");

  const res = await sendData(PAY_ENDPOINT, body);

  document.querySelector(".loader").classList.add("hide");
  document.querySelector(".main-container").classList.remove("hide");

  displayResponse(res.request, res.response);
});

retry.addEventListener("click", displayBack);
