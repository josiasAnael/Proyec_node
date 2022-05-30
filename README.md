<div align="center" id="top">

  ### <img src="https://dev.unicah.net/wp-content/uploads/2020/12/logo-unicah-svg-blanco-mini.svg" height="30px"/> [UNICAH](https://unicah.edu)
  
  ***HTML5/CSS3/JS/JavaScript***
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de Contenido</summary>
  <ol>
    <li><a href="#about-the-project">Sobre el proyecto</a></i>
    <li><a href="#getting-started">Cómo empezar</a></li>
    <li><a href="#contact">Contacto</a></li>
    <li><a href="#contact">Base de datos</a></li>

  </ol>
</details>

## Sobre el proyecto

![Unicah screenshot](/src/assets/unicah.png)

Este es el back-end del sitio web práctica profesional que permite hacer las peticiones a la base de datos y a las Apis.

<p align="right"><a href="#top">Volver arriba 🔼</a></p>

## Como Empezar

Instalar las dependencias:

```sh
$ npm install
// or
$ yarn
```

Ejecutar en modo desarrollador:

```sh
$ npm run dev
// or
$ yarn dev
```

### Variables globales:

Paso 1:
- Iniciamos sesión con la cuenta de google.
- El siguiente enlace permitirá crear un proyecto en google https://console.cloud.google.com/.
- Seleccionamos en nuevo proyecto.
- Colocamos un nombre al proyecto y damos en crear.
- Nos deplegara un modal el cual daremos clic en seleccionar el proyecto.

Paso 2:
- Nos dirigimos al menú lateral y seleccionamos en Apis & Services.
- damos clic en Habilitar Apis y servicios.
- Buscamos google drive API y le damos clic y activamos el servicio.

Paso 3:
- Nos dirigimos al menú lateral y seleccionamos credenciales.
- Selecionamos OAuth client ID
- Seleccionamos el tipo de usuario y damos en crear.
- Llenamos todos los campos necesarios.
- En al seccion API de redirección autorizadas copiamos https://developers.google.com/oauthplayground, en este sitio obtendemos nuestra actualización del token.
- Al finalizar damos clic en crear.
- Se desplegará un modal el cual tendrá el CLIENT_ID y el CLIENT_SECRET variables globales del proyecto.

Paso 4:
- Damos clic en https://developers.google.com/oauthplayground y damos clic en el icono de ajustes y selecionamos en "User your own OUth credentials".
- Llenamos el CLIENT_ID y el CLIENT_SECRET.
- Damos los permisos en la selección y Autorización de Apis para google drive y gmail.
- Esto nos genera un token el cual es REFRESH_TOKEN.

<p align="right"><a href="#top">Volver arriba 🔼</a></p>



### Coneccion a la base de datos

- Creamos una cuenta en Mongo Atlas https://account.mongodb.com/account/register.
- Creamos un shandbox cluster.
- Una vez creado nos dirigimos a Network Access y seleccionamos "allow access from anywhere" y damos en confirmar.
- Nos dirigimos a database Access y creamos un usuario el cual nos permitirá conectarnos a la base de datos.


<p align="right"><a href="#top">Volver arriba 🔼</a></p>

### Construido

- JavaScript

<p align="right"><a href="#top">Volver arriba 🔼</a></p>


## Contact 📭

Josias Anael Martinez Hernandez <br>

[Josias Martinez](https://www.facebook.com/profile.php?id=100004634116377) - josias199749@gmail.com

<p align="right"><a href="#top">Volver arriba 🔼</a></p>
