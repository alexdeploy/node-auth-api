# Plugins

## Nodemailer Plugin

The <a href="https://nodemailer.com/about/">nodemailer</a> module is a Node.js library that allows you to send emails easily. In this file, two functions are defined to send verification and password restoration emails using nodemailer.

## Dependencies

- `nodemailer`: Required version of the nodemailer package.
- `fs`: Node.js module used for reading files.
- `dotenv`: Package used for loading environment variables from `.env` file.

## Configuration

Before using this module, you need to provide proper configuration in the `api.config.json` file and the `.env` file. Make sure to configure the following values:

- `config.domain`: The base domain used for constructing the verification and password restoration URLs.

### Verify Email

- `config.nodemailer.verify_email.host`: The outgoing mail server host for sending verification emails. Example: `stmp.example.com`
- `config.nodemailer.verify_email.port`: The outgoing mail server port.
- `config.nodemailer.verify_email.secure`: Indicates whether a secure connection should be used for the outgoing mail server.
- `config.nodemailer.verify_email.auth.user`: The email address used for authentication with the outgoing mail server.
- `process.env.EMAIL_VERIFY_PASSWORD`: The password of the email account used for authentication with the outgoing mail server.

### Restore password

- `config.nodemailer.restore_psw.host`: The outgoing mail server host for sending password restoration emails.
- `config.nodemailer.restore_psw.port`: The outgoing mail server port.
- `config.nodemailer.restore_psw.secure`: Indicates whether a secure connection should be used for the outgoing mail server.
- `config.nodemailer.restore_psw.auth.user`: The email address used for authentication with the outgoing mail server.
- `process.env.EMAIL_RESTORE_PASSWORD`: The password of the email account used for authentication with the outgoing mail server.

## Functions

### sendVerificationEmail

This function is used to send a verification email to a user. It takes two parameters:

- `email`: The recipient's email address.
- `verificationToken`: The verification token to be included in the verification URL.

The function performs the following steps:

1. Creates a `transporter` object using the configuration provided in `config.nodemailer.verify_email`.
2. Constructs the verification URL using the base domain and the verification token.
3. Reads the content of the email template from the `./mails/verify_email.html` file.
4. Replaces the `{{verificationURL}}` placeholder in the template with the verification URL.
5. Sets up the email options, including the sender's email address, recipient, subject, and HTML body.
6. Uses the `transporter` object to send the email.
7. Handles any errors that occur during the email sending process.

### sendRestorePasswordEmail

This function is used to send a password restoration email to a user. It takes two parameters:

- `email`: The recipient's email address.
- `token`: The password restoration token to be included in the restoration URL.

The function performs the following steps:

1. Creates a `transporter` object using the configuration provided in `config.nodemailer.restore_psw`.
2. Constructs the restoration URL using the base domain and the restoration token.
3. Sets up the email options, including the sender's email address, recipient, subject, and plain text body.
4. Uses the `transporter` object to send the email.
5. Handles any errors that occur during the email sending process.

## Usage

To use this module, make sure to import `nodemailer`, `config`, and `fs`. Also, load the environment variables using `dotenv`. Then, you can call the exported `sendVerificationEmail` and `sendRestorePasswordEmail` functions.

````js
const { sendVerificationEmail, sendRestorePasswordEmail } = require('../plugins/nodemailer');
````


