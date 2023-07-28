<p align="center">
 <!-- image -->
</p>

<h1 align="center">Node Auth API</h1>
<p align="center">
  <a href="#-features">Features</a> ·
  <a href="#-installation">Installation</a> ·
  <a href="#️-configuration">Configuration</a> ·
  <a href="#-deploying">Deploying</a> ·
  <a href="#-documentation">Docs</a>

</p>
<p align="center">High secure authentication API built with NodeJS</p>
<div align="center">

![node.js version](https://img.shields.io/badge/node.js-v18.14.1-5865F2?style=flat&logo=node.js&color=80bc02) ![express version](https://img.shields.io/badge/express-v4.18.2-222222?style=flat&logo=express) ![mongodb version](https://img.shields.io/badge/mongodb-v5.6.0-222222?style=flat&logo=mongodb) ![license](https://img.shields.io/badge/license-MIT-purple)

</div>

Secure and easy-to-configure user authentication API developed using Node.js, Express, and MongoDB. It provides robust **password encryption**, **token-based authentication**, **email verification**, and **seamless email delivery** integration. With its straightforward setup, this project enables developers to quickly build a reliable and secure API user authentication system for their applications.

  ## 🧩 Features
  
- ✅ Login attempts limited.
- ✅ Server-side password encryption using <a href="https://github.com/dcodeIO/bcrypt.js">bcrypt</a>.
- ✅ Generation of verification tokens with <a href="https://jwt.io/">jwt</a>
- ✅ Account verification via email with <a href="https://nodemailer.com/about/">nodemailer</a>
- ✅ API calls with validation-middelware using user token.
- ⬜ Protection against code injection.
### Performance

- ✅ Well-defined endpoints for each authentication step.
- ✅ Solid unit testing.
- ✅ Easy app configuration using `app.config.json` file

### Functions

- ✅ Sign up.
- ✅ Sign in.
- ✅ Restore password.
- ✅ Verify user email.
- ⬜ Sign in/up with social [ `Apple, Google` ]
- ⬜ Biometric Authentification

## 📥 Installation

1. Clone the repository
````bash
git clone https://github.com/alexdeploy/node-auth-api.git
````

2. Navigate to project directory.
````bash
cd node-auth-api
````

3. Install the dependencies.
````bash
yarn install
````

> ⚠️ Ya tenemos el proyecto instalado, pero antes de iniciarlo hay que realizar configuración importante para que la API funcione, como la conexión con nuestra base de datos, las variables de entorno, y la configuración global de la API.

## ⚙️ Configuration

[soon...]

### Crear / añadir base de datos.

En este caso vamos a utilizar <a href="https://www.mongodb.com/atlas/database">MongoDB Atlas</a>, un servicio de MongoDB en la nube. El plan gratuito te ofrece características sucifientes, sino, ajústalo a tu proyecto.

Aquí puedes ver 👉 <a href="https://medium.com">cómo crear una base de datos en MongoDB Atlas para node-auth-api</a>.

Obtenemos en link para conectarnos a la base de datos. En mongoDB Cloud es algo como esto:

````
DB_URI=mongodb+srv://<username>:<password>@cluster0.ardcz2k.mongodb.net/
````

Donde `<username>` y `<password>` son las credenciales de un usuario con acceso a la base de datos.

- api.config.json
- Connect with MongoDB
- User Schema

## 🚀 Deploying

El deploy se va a hacer en Heroku. Para esto vamos a necesitar:

- Cuenta de Heroku
- Heroku CLI

Una vez instalado heroku CLI, en la carpeta del proyecto ejecutamos:

````bash
heroku login
````

Y persionamos ENTER. Nos abrirá una ventana para hacer login en nuestra cuenta de heroku.

````bash
heroku create -a app-name
````

Esto creará una nueva app en heroku.

Comprobamos que se ha configurado correctamente con:

````bash
git remote -v
````


````bash
> heroku  https://git.heroku.com/node-auth-api-dev.git (fetch)
> heroku  https://git.heroku.com/node-auth-api-dev.git (push)
> origin  https://github.com/alexdeploy/node-auth-api.git (fetch)
> origin  https://github.com/alexdeploy/node-auth-api.git (push)
````

Configuramos las variables de entorno en heroku.

````bash
heroku config:set NOMBRE_VARIABLE=valor
````

Comprobamos que se han guardado correctamente

````bash
heroku config
````

Vamos a nuestra aplicación -> Settings -> Config Bars.

Introducimos todos las claves y valores del archivo `.env`.

````bash
# Desplegar la rama main
git push heroku main
````

````bash
# Desplegar otra rama (dev)
git push heroku dev:main
````

NOTAS IMPORTANTES SOBRE HEROKU CLI

- Para volver a hacer deploy en caso de falla, tienes que realizar por lo menos un `git commit`

### Set a custom domain

Vamos a hacerlo utilizando los <a href="https://devcenter.heroku.com/articles/custom-domains">comandos `domain` de Heroku CLI</a>.

Si ya tenemos nuestro proveedor de dominios y nuestro dominio:

````bash
heroku domains:add www.example.com
````

Comprobamos que se ha creado:

````bash
heroku domains
````

|   Domain Name   | DNS Record Type  |       DNS Target        |    SNI Endpoint   |
|-----------------|------------------|-------------------------| ------------------|
| www.example.com | CNAME            | ...6qyoi.herokudns.com  | randomname-123321 |

Si te equivocas, se pueden borrar con `heroku domains:remove www.example.com`.

El DNS Target es el que tenemos que introducir en el valor CNAME de los registros DNS de nuestro dominio. El proveedor de dominio en este caso va a ser <a href="https://www.hostinger.com/">hostinger.com</a>.

Quedando así:

|  Type  | Name            | Content (DNS Target)   | TTL |
|--------|-----------------| -----------------------|-----|
| CNAME  | www.example.com | ...6qyoi.herokudns.com | ?   |

En caso de un subdominio, habría que introducir solo su nombre, por ejemplo introduciendo `api`, apuntaría a `api.example.com`.


## 📜 Documentation

<a href="https://github.com/alexdeploy/node-auth-api/DOCUMENTATION.md">Documentation</a>
