const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_SECRET_KEY;
const secretResetKey = process.env.TOKEN_RESET_SECRET_KEY;


function authenticateToken(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token de acceso no proporcionado' });
    }

    jwt.verify(token, secretKey, (err, user) => {

        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user; // Esto es lo que se envía a la ruta?
        console.log(req.user)
        next();
    });
}

// Middleware para verificar el token de restablecimiento de contraseña
function verifyResetToken(req, res, next) {

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(400).json({ error: 'Token no proporcionado' });
    }

    // Verificar el token de restablecimiento de contraseña
  jwt.verify(token, secretKey, (err, decoded) => {

    if (err) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = { authenticateToken, verifyResetToken };