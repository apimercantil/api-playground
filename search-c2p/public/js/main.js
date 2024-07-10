import { displayResponse, displayBack, formDisplayHandler } from "./interface.js";

// BOTONES
const sendButton = document.querySelector("#send-button");
const retry = document.querySelector(".retry");

//CAMPOS DE PAYMENT
const amount = document.querySelector("#amount");
const customerIdPrefix = document.querySelector("#customerid-prefix");
const customerId = document.querySelector("#customerid");
const customerPhoneNumberPrefix = document.querySelector("#customer-phone-number-prefix");
const customerPhoneNumber = document.querySelector("#customer-phone-number");
const refNumber = document.querySelector("#payment-reference");
const transactionDate = document.querySelector("#transaction-date");
// URLS y ENDPOINTS
const URL = "http://127.0.0.1:3000";
const PAY_ENDPOINT = "/searchC2p";

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
    amount: amount.value,
    customerId: `${customerIdPrefix.value}${customerId.value}`,
    customerPhoneNumber: `58${customerPhoneNumberPrefix.value}${customerPhoneNumber.value}`,
    refNumber: refNumber.value,
    transactionDate: transactionDate.value
  });

  console.log(body)

  document.querySelector(".loader").classList.remove("hide");
  document.querySelector(".main-container").classList.add("hide");

  const res = await sendData(PAY_ENDPOINT, body);

  document.querySelector(".loader").classList.add("hide");
  document.querySelector(".main-container").classList.remove("hide");

  displayResponse(res.request, res.response);
});

retry.addEventListener("click", displayBack);
