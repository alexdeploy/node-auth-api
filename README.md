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

[soon...]

- Deploy on Heroku (or others)

## 📜 Documentation

<a href="https://github.com/alexdeploy/node-auth-api/DOCUMENTATION.md">Documentation</a>
