# Botón de pagos con tarjeta (TDC).

[Más informacion sobre el API.](https://apiportal.mercantilbanco.com/mercantil-banco/produccion/product/21031)

### Índice
    
1. [Ejemplo de encriptación](./modules/crypto.js)
2. [Ejemplo de petición fetch](./modules/pay.js)
3. [API Playground](#playground)<br>
3.1 [Configuración y uso del API playground](#playground-config)<br>
3.2 [Ejemplos de uso del API playground](#playground-examples)
4. [Request y Response](#rq)
5. [Códigos de error](#error-codes)


<a id="playground" ></a>
## API Playground

<a id="playground-config"> </a>
### Configuración y uso del API Playground

**Debes tener instalado [NodeJS(^20.12.2)](https://nodejs.org/) para la correcta configuración y ejecución de este ejemplo.**

1. Descargar el código de ejemplo ubicado en este repositorio haciendo click [aquí](https://github.com/apimercantil/api-playground/releases/download/V1/tdc.zip).<br>

2. Descomprimir el archivo descargado en su ordenador.<br>

3. Abrir con un editor de texto(VS Code, Notepad, Sublime Text, Atom) el archivo **/.env** ubicado en la carpeta principal del ejemplo.<br>

4. Configurar sus credenciales en el archivo abierto (Utilizar las credenciales suministradas por Mercantil Banco).<br>
![Imagen de ejemplo](./img/readme-img-1.png)

5. Abrir desde la terminal la **carpeta principal del proyecto**.<br>
![Imagen de ejemplo](./img/readme-img-2.png)

6. Ejecutar el comando ```npm i``` o ```npm install``` (Recuerda tener instalado [NodeJS(^20.12.2)](https://nodejs.org/) para poder continuar con la configuración).<br>
![Imagen de ejemplo](./img/readme-img-3.png)

7. Ejecuta el ejemplo con el comando ```npm run play``` o ```node index.js```.<br>
![Imagen de ejemplo](./img/readme-img-4.png)

<a id="playground-examples"></a>
### Ejemplos de uso del API Playground

1. Ingresar la información en el formulario de pago.<br>
![Imagen de ejemplo](./img/readme-img-5.png)

8. Presionar el botón del formulario para enviar la petición.<br>
![Imagen de ejemplo](./img/readme-img-6.png)

9. Revisar el request y el response.<br>
![Imagen de ejemplo](./img/readme-img-7.png)

10. Módifica el código a tu gusto y haz las pruebas que requieras.<br>

<a id="rq"></a>
### Request y Reponse

![Request|Response example](https://www.mercantilbanco.com/mercprod/apiportal/images/img_pay.png)

Para información detallada sobre los campos del request pulsa [aquí](https://www.mercantilbanco.com/mercprod/apiportal/pdfs/mapping_campos_tipo_txns_tdc.pdf).
<a id="error-codes"></a>
### Códigos de error

Para información detallada sobre la lista de errores pulsa [aquí](https://www.mercantilbanco.com/mercprod/apiportal/pdfs/Errores_con_TDD.pdf).
