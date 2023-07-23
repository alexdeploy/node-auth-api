require('dotenv').config();
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = process.env.TOKEN_SECRET_KEY;
const config = require('../api.config.json');
const { sendVerificationEmail, sendRestorePasswordEmail } = require('../plugins/nodemailer');
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

// TODO: Convertir string de email a minúsculas ?
const signInByMail = async (req, res) => {

  console.log('--------------------------------------------------------------------')
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (config.security.logginAttempts.active) {
      const isLocked = checkIfAccountIsLocked(user);
      if (isLocked) {º
        const userLockedUntil = new Date(user.security.accountLockedUntil);
        const userLockedUntilString = userLockedUntil.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
        console.log('----- La cuenta está bloqueada hasta: ' + userLockedUntilString + '. Quedan ' + (userLockedUntil - Date.now()) / 60000 + ' minutos para desbloquearla.');
        return res.status(401).json({ message: 'Account is locked until: ' + userLockedUntilString });
      } else {
          resetLockValues(user);
      }
    }

    // Verificar la contraseña utilizando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Increment +1 loggin attempts if password is invalid or reset loggin attempts to 0 if password is valid
    if(config.security.logginAttempts.active){
      console.log('Verificando contraseña...')
      user.security.logginAttempts = isPasswordValid ? 0 : user.security.logginAttempts + 1
      console.log('Checkeando si ha alcanzado intentos máximos de sesión...')
      const maxAttemptsReached = checkMaxLogginAttempts(user, config.security.logginAttempts.max);
      if (maxAttemptsReached) {
        lockUser(user)
        return res.status(401).json({ message: 'Max loggin attempts reached. Account is locked.' });
      }
      console.log('----- La cuenta no ha alcanzado el número máximo de intentos de inicio de sesión.');
    }

    console.log('Verificando contraseña...')
    if (!isPasswordValid) {
      console.log('----- Contraseña inválida. Intentos de sesión: ' + (user.security.logginAttempts) + '/' + config.security.logginAttempts.max);
      user.save();
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user._id },
      secretKey,
      { expiresIn: '1h' } // Adjustable expiration time
    );

    res.status(200).json({
      email: user.email,
      token
    });
    console.log('----- Contraseña verificada correctamente. Inicio de sesión exitoso.');
    user.save();

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

// TODO: Convertir string de email a minúsculas ?
const signUpByMail = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email)
    // Convertir el email a minúsculas
    const lowerCaseEmail = email.toLowerCase();
    // Verificar si el usuario ya existe en la base de datos
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ error: 'User email already exists' });
    }

    // Generar una contraseña hash utilizando bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario en la base de datos
    const newUser = new User({
      email,
      password: hashedPassword
    });

    const sessionToken = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '30m' });

    newUser.tokens.session = sessionToken;

    if (config.register.verify_email.active) sendVerificationEmail (email, sessionToken);
    
    await newUser.save();

    res.json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}
// TODO: Convertir string de email a minúsculas ?
// ! Not tested -- probably not working
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

    res.json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
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
    const restoreToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '30m' });

    // Enviar un correo electrónico con el token para restablecer la contraseña
    await sendRestorePasswordEmail(email, restoreToken);

    res.json({ message: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// * Este endpoint [/reset-password] recibe un token enviado por el usuario en la página de recuperación de contraseña.
// * El servidor verifica el token y actualiza la contraseña del usuario en el servidor.
// * El link solo es accesible desde el correo electrónico del usuario, y tiene el token como parámetro.
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.userId;

    // Obtener el usuario de la base de datos
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Generar una nueva contraseña hash utilizando bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Actualizar la contraseña en la base de datos
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const verifyMail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verificar el token de verificación
    const decodedToken = jwt.verify(token, secretKey);

    // Obtener el ID de usuario desde el token
    const userId = decodedToken.userId;

    // Actualizar el estado de verificación del usuario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();
    return res.status(200).json({ message: 'Correo electrónico verificado correctamente' });
  } catch (error) {
    return res.status(400).json({ error: 'Token de verificación inválido' });
  }
};

module.exports = {
  signInByMail,
  signUpByUsername,
  signUpByMail,
  forgotPassword,
  resetPassword,
  verifyMail
};