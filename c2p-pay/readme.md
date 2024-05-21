# Botón de pagos móviles(C2P, vuelto y anulación)

[Más informacion sobre el API](https://apiportal.mercantilbanco.com/mercantil-banco/produccion/product/21034)

### Índice
    
1. [Ejemplo de encriptación](./utils/encrypt.js)
2. [Ejemplo de petición fetch](./c2p/c2p.js)
3. [API Playground](#playground)<br>
3.1 [Configuración y uso del API playground](#playground-config)<br>
3.2 [Ejemplos de uso del API playground](#playground-examples)
4. [Request y Response](#rq)
5. [Códigos de error](#error-codes)


<a id="playground" ></a>
## API Playground

<a id="playground-config"> </a>
### Configuración y uso del API Playground

1. Descargar el código ubicado en este repositorio en su ordenador.<br>
![Imagen de ejemplo](./img/readme-img-1.png)

2. Descomprimir el archivo descargado en su ordenador.<br>
![Imagen de ejemplo](./img/readme-img-6.png)

3. Abrir con un editor de texto(VS Code, Notepad, Sublime Text, Atom) el archivo **main.js** ubicado en la carpeta principal del ejemplo.<br>
![Imagen de ejemplo](./img/readme-img-7.png)

4. Configurar sus credenciales en el archivo **main.js** (Utilizar las credenciales suministradas por Mercantil Banco).<br>
![Imagen de ejemplo](./img/readme-img-2.png)

5. Abrir el archivo **index.html** en el navegador.<br>
![Imagen de ejemplo](./img/readme-img-8.png)

6. Utilizar los datos de prueba suministrados vía email por Mercantil Banco para rellenar las casillas del formulario en el API Playground.<br>
![Imagen de ejemplo](./img/readme-img-3.png)

<a id="playground-examples"></a>
### Ejemplos de uso del API Playground

1. Ingresar la información en el formulario.<br>
![Imagen de ejemplo](./img/readme-img-3.png)

2. Presionar el botón del formulario para enviar la petición.<br>
![Imagen de ejemplo](./img/readme-img-4.png)

3. Esperar la carga de la información.<br>

4. Revisar el request y el response.<br>
![Imagen de ejemplo](./img/readme-img-5.png)

5. Módifica el código a tu gusto y haz las pruebas que requieras.<br>

<a id="rq"></a>
### Request y Reponse

![Request example](https://www.mercantilbanco.com/mercprod/apiportal/images/request_vuelto_c2p.png)
![Response example](https://www.mercantilbanco.com/mercprod/apiportal/images/response_vuelto_c2p.png)

Para información detallada sobre los campos del request pulsa [compra/anulación](https://www.mercantilbanco.com/mercprod/apiportal/pdfs/api_c2p_descripcion_de_atributos_y_campos_compra_anulacion_0.pdf) - [vuelto](https://www.mercantilbanco.com/mercprod/apiportal/pdfs/api_c2p_descripcion_de_atributos_y_campos_vuelto_0.pdf)

<a id="error-codes"></a>
### Códigos de error

Para información detallada sobre la lista de errores pulsa [aquí](https://www.mercantilbanco.com/mercprod/apiportal/pdfs/api_c2p_tipo_de_errores_0.pdf).
