const getauth = require('./modules/getauth.js')

const colors = require("colors");
const bodyParser = require("body-parser");
const config = require("./config.js");

const express = require("express");
const app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

/*
 * ===========================
 * ENDPOINT PARA ENTRAR AL APP
 * ===========================
*/

app.get("/", (req, res) => {
  res.render("index");
});

/*
 * ===========================
 * ENDPOINT PARA REALIZAR PAGO
 * ===========================
*/

app.post("/getauth", async (req, res) => {
  try {
    const response = await getauth(
      req.body,
      config.MERCHANTID,
      config.INTEGRATORID,
      config.TERMINALID,
      config.CLIENTID
    );
  
    const request = {
      merchantIdentify: response.merchantIdentify,
      clientIdentify: {
        ipAddress: "127.0.0.1",
        browserAgent: "",
        mobile: {
          manufacturer: "Samsung",
          model: "",
          osVersion: "",
        },
      },
    };
  
    res.json({
      request: { ...request, ...req.body },
      response: response,
    });
  } catch(e) {
    console.error(e);
  }
  
});

app.listen(config.PORT, config.HOST, () => {
  const errors = [];
  Object.keys(config).forEach((key) => {
    if (!config[key] || config[key] === "" || config[key] === 0)
      errors.push(key);
  });
  if (errors.length > 0)
    console.warn(
      `[WARN] No se encuentran las siguientes variables de entorno: ${errors.join(
        ", "
      )}. Es muy probable que no pueda continuar con la ejecución`.yellow
    );

  console.log(`Aplicación de ejemplo escuchando el puerto: ${config.PORT}`);

  console.log(
    `Asegurate de haber creado el archivo .env y configurar las variables de entorno para la ejecución del ejemplo. `
  );
  console.log(
    `Por favor ingresa al siguiente enlace para poder utilizar el ejemplo: http://${config.HOST}:${config.PORT}`
  );
});
