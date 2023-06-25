const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = process.env.TOKEN_SECRET_KEY;
const config = require('../api.config.json');
const nodemailer = require('nodemailer');

// TODO: Convertir string de email a minúsculas ?
const loginByMail = async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Verificar la contraseña utilizando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user._id },
      secretKey,
      { expiresIn: '1h' } // Adjustable expiration time
    );

    res.status(200).json({
      ok: true,
      email: user.email,
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

// TODO: Convertir string de email a minúsculas ?
const registerByMail = async (req, res) => {
  try {
    const { email, password } = req.body;

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
      password: hashedPassword,
    });
    // TODO: Configurar el transporte de correo [nodemailer]
    if(config.register.verify_email.active){
      // Generar un token de verificación
      const verificationToken = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '30m' });
      newUser.verificationToken = verificationToken;
      newUser.isVerified = false;

      // Enviar correo electrónico de verificación
      const transporter = nodemailer.createTransport({ /* configuración del transporte de correo */ });
      const verificationURL = `${config.domain}/verify?token=${verificationToken}`;
      const mailOptions = {
        from: config.register.verify_email.from,
        to: newUser.email,
        subject: config.register.verify_email.subject,
        text: `${config.register.verify_email.text} ${verificationURL}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error al enviar el correo de verificación:', error);
        }
      });
    }
    
    await newUser.save();

    res.json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}
// TODO: Convertir string de email a minúsculas ?
const registerByUsername = async (req, res) => {
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

// TODO: Configurar el transporte de correo electrónico (por ejemplo, SMTP)
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si el email existe en la base de datos
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Email no encontrado' });
    }

    // Generar un token para restablecer la contraseña
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '30m' });

    // Enviar un correo electrónico con el token para restablecer la contraseña
    const transporter = nodemailer.createTransport({
      // Configurar el transporte de correo electrónico (por ejemplo, SMTP)
    });

    const mailOptions = {
      from: 'sender@example.com',
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

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
    /* user.verificationToken = undefined; */
    await user.save();
    return res.status(200).json({ message: 'Correo electrónico verificado correctamente' });
  } catch (error) {
    return res.status(400).json({ error: 'Token de verificación inválido' });
  }
};

module.exports = {
  loginByMail,
  registerByUsername,
  registerByMail,
  forgotPassword,
  resetPassword,
  verifyMail
};