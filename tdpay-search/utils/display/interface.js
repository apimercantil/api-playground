function renderResponse(data) {
    document.querySelector(".loader").classList.add("d-none");
      document.querySelector("#transactionListContainer").classList.remove("d-none");
       // Agregar el código JavaScript para mostrar la información de transaction_list
       const transactionListContainer = document.getElementById('transactionListContainer');
       const transactionList = data.transaction_list;
  
       transactionListContainer.innerHTML = "";
  
       transactionList.forEach(transaction => {
        const transactionElement = document.createElement('div');
        transactionElement.classList.add('transaction-card');
  
        transactionElement.innerHTML = `
          <p>Fecha de procesamiento: ${transaction.processing_date}</p>
          <p>Estado de la transacción: ${transaction.trx_status}</p>
          <p>Número de tarjeta: ${transaction.card_number}</p>
          <p>Identificacion del cliente: ${transaction.customer_id}</p>
          <p>Referencia: ${transaction.payment_reference}</p>
          <p>Codigo interno: ${transaction.trx_internal_status}</p>
          <p>Tipo de Transaccion: ${transaction.trx_type}</p>
          <p>Numero de factura: ${transaction.invoice_number}</p>
          <p>Monto de la Transaccion: ${transaction.amount}</p>
          <p>Moneda: ${transaction.currency}</p>
          <!-- Agregar más información de la transacción según sea necesario -->
        `;
  
        transactionListContainer.appendChild(transactionElement);
  })
  }


function displayJsonInfo(rq, rs) {
    document.querySelector(".json-container").classList.remove("d-none");
    document.querySelector(".request div").innerHTML = `<pre>${JSON.stringify(rq, null, 2)}</pre>`; 
    document.querySelector(".response div").innerHTML = `<pre>${JSON.stringify(rs, null, 2)}</pre>`; 
}

export { renderResponse, displayJsonInfo }