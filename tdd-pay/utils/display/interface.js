/* 
 * ======================================
 * Funcion para mostrar el response y request
 * ======================================
 */

function displayJsonInfo(rq, rs) {
    document.querySelector(".json-container").classList.remove("d-none");
    document.querySelector(".request div").innerHTML = `<pre>${JSON.stringify(rq, null, 2)}</pre>`; 
    document.querySelector(".response div").innerHTML = `<pre>${JSON.stringify(rs, null, 2)}</pre>`; 
}

/* 
 * ==========================================================
 * Funcion para mostrar dinamicamente opciones del formulario
 * ==========================================================
 */

function formDisplayHandler(e) {
    if(e.target.value == "anulacion") {
        document.querySelector(".ref-number-field").classList.remove("d-none");
        document.querySelector(".auth-number-field").classList.add("d-none");
    }
    else if(e.target.value == "compra") {
        document.querySelector(".auth-number-field").classList.remove("d-none");
        document.querySelector(".ref-number-field").classList.add("d-none");
    }
    else {
        document.querySelector(".ref-number-field").classList.add("d-none");
        document.querySelector(".auth-number-field").classList.add("d-none");
    }
}

/* 
 * ==============================================
 * Funcion para mostrar nuevamente el formmulario
 * ==============================================
 */

function displayBack() {
    document.querySelector(".json-container").classList.add("d-none");
    document.querySelector(".loader").classList.add("d-none");
    document.querySelector(".transaction-response").classList.add("d-none");
    document.querySelector("#payment-form").classList.remove("d-none");
}

function displayResponse(rq, rs) {
    document.querySelector(".transaction-response").classList.remove("d-none");
    document.querySelector(".loader").classList.add("d-none");
    if(rs.hasOwnProperty("error_list") || rs.hasOwnProperty("code") || rs.hasOwnProperty("httpCode")) {
        document.querySelector(".transaction-response h2").innerText = "Error al procesar la solicitud.";
        document.querySelector(".transaction-response p").innerText = "Se ha generado un error al intentar procesar su solicitud.";
    }
    else {
        document.querySelector(".transaction-response h2").innerText = "Solicitud procesada exitosamente.";
        document.querySelector(".transaction-response p").innerText = "Su solicitud se ha procesado correctamente.";
    }
    displayJsonInfo(rq, rs);
}

export { displayBack, displayJsonInfo, formDisplayHandler, displayResponse};