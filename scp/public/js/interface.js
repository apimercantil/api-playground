/* 
 * ======================================
 * Funcion para mostrar el response y request
 * ======================================
 */

function renderSpaces(amount) {
    let string = '';
    for(let i = 0; i < amount; i++) {
        string += ' ';
    }
    return string;
}

function renderObject(object, spaces, element) {
    element.innerHTML += `{\n`;
    Object.keys(object).forEach( (key, index) => {
        element.innerHTML += `${renderSpaces(spaces)}<span class="key">${key}</span>: `;
        if(typeof object[key] == "object") {
            spaces += 2
            renderObject(object[key], spaces, element)
            spaces -= 2
            element.innerHTML += `${renderSpaces(spaces)}}`;
        } else {
            element.innerHTML += `<span class="value ${typeof object[key] == 'string' ? '' : 'number'}">${typeof object[key] == "string" ? `"${object[key]}"` :  object[key]}</span`;
        }
        if (Object.keys(object).length - 1 > index) element.innerHTML += `,`;
            element.innerHTML += `\n`;
    });
}

/*
 * ============================================
 * Funcion para mostrar la información del JSON 
 * ============================================
*/

function displayJsonInfo(rq, rs) {
    
    document.querySelector('.response div').innerHTML = ``;
    document.querySelector('.request div').innerHTML = ``;
    document.querySelector(".json-container").classList.remove("hide");

    
    document.querySelector(".request div").innerHTML += `<pre>`; 
    const rqElem = document.querySelector(".request div pre");
    renderObject(rq, 2, rqElem);
    document.querySelector('.request div pre').innerHTML += `}`;
    
    

    document.querySelector('.response div').innerHTML += `<pre>`;
    const rsElem = document.querySelector(".response div pre");
    renderObject(rs, 2, rsElem);
    document.querySelector('.response div pre').innerHTML += `}`;
}

/*
 * =========================================
 * Funcion para cambiar de formulario activo
 * ========================================= 
*/

const displayForm = () => {
    document.querySelector('form').classList.add('hide');
    document.querySelector('.payment-title').innerText = 'Crear agendamiento';
    document.querySelector(".next").classList.add('hide');
    document.querySelector('.transaction-response').classList.add('hide');
    document.querySelector('.json-container').classList.add('hide');
    document.querySelector("button").classList.remove("hide");
};

/* 
 * ==============================================
 * Funcion para mostrar nuevamente el formmulario
 * ==============================================
 */

function displayBack() {
    document.querySelector(".json-container").classList.add("hide");
    document.querySelector(".loader").classList.add("hide");
    document.querySelector(".transaction-response").classList.add("hide");
    document.querySelector('form').classList.remove('hide');
    document.querySelector("button").classList.remove("hide");
}

function displayResponse(rq, rs) {
    document.querySelector(".transaction-response").classList.remove("hide");
    document.querySelector("form").classList.add("hide");
    document.querySelector("button").classList.add("hide");
    if(rs.hasOwnProperty("errorList") || rs.hasOwnProperty("error_list") || rs.hasOwnProperty("code") || rs.hasOwnProperty("httpCode") || rs.hasOwnProperty("http_code")) {
        document.querySelector(".transaction-response h2").innerText = "Error al procesar la solicitud";
        document.querySelector(".transaction-response h2").classList.add('error');
        document.querySelector(".transaction-response p").innerText = "Se ha generado un error al procesar la solicitud";
    }
    else {
        document.querySelector(".transaction-response h2").innerText = "Solicitud procesada exitosamente";
        document.querySelector(".transaction-response h2").classList.remove('error')
        document.querySelector(".transaction-response p").innerText = "Su solicitud se ha procesado exitosamente";
    }
    displayJsonInfo(rq, rs);
}

export { displayBack, displayJsonInfo, displayResponse, displayForm };