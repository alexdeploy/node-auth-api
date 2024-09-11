const jwt = require('jsonwebtoken');

function verifySessionToken(req, res, next) {

    const secretSessionKey = process.env.TOKEN_SESSION_SECRET_KEY;
    const sessionToken = req.headers.authorization;

    if (!sessionToken) {
        return res.status(401).json({ message: 'Token de acceso no proporcionado' });
    }

    jwt.verify(sessionToken, secretSessionKey, (err, user) => {

        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user; // Esto es lo que se envía a la ruta?
        console.log(req.user)
        next();
    });
}

// Middleware para verificar el token de restablecimiento de contraseña
function verifyResetToken(req, res, next) {

    const secretResetKey = process.env.TOKEN_RESET_SECRET_KEY;
    const resetPasswordToken = req.headers.authorization.split(' ')[1];

    if (!resetPasswordToken) {
        return res.status(400).json({ error: 'Token no proporcionado' });
    }

  jwt.verify(resetPasswordToken, secretResetKey, (err, decoded) => {

    if (err) {
      console.log(err);
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    req.userId = decoded.userId;
    next();
  });
}

/**
 * Role authorization middleware
 * * Comprueba si el token es tipo auth [Bearer].
 * * Extrae el token JWT y decodifica el contenido.
 * * Comprueba si el id del rol del usuario coincide con alguno de los roles permitidos.
 * @param  {...any} allowedRoles Array of role object
 * @returns response to the next middleware
 */
const authorize = (...allowedRoles) => {

  return (req, res, next) => {

      const token = req.headers.authorization;
  
      if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized access. You have to be authenticated' });
      }
  
      const jwtToken = token.split(' ')[1];
  
      const decodedToken = jwt.decode(jwtToken);
  
      const userRole = decodedToken.role;

      // Check if allowedRole is "all"
      if(allowedRoles.find(allowedRole => allowedRole.id === 999)) return next();
      
      const allowed = allowedRoles.find(allowedRole => allowedRole.id === userRole.id);
  
      if (!allowed) {
        return res.status(403).json({ message: 'Access denied. You do not have permission to access this resource' });
      }

    next();
  };
};


module.exports = { 
  verifySessionToken,
  verifyResetToken,
  authorize
};