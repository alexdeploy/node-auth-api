const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_SECRET_KEY;
const secretResetKey = process.env.TOKEN_RESET_SECRET_KEY;

const roles = {
  admin: { id: 0, name: 'admin', description: 'Administrator' },
  user: { id: 1, name: 'user', description: 'User' },
  guest: { id: 2, name: 'guest', description: 'Guest' },
}

function verifySessionToken(req, res, next) {

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

    const bearerToken = req.headers.authorization.split(' ')[1];

    if (!bearerToken) {
        return res.status(400).json({ error: 'Token no proporcionado' });
    }

    // Verificar el token de restablecimiento de contraseña
  jwt.verify(bearerToken, secretResetKey, (err, decoded) => {

    if (err) {
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
 * TODO: Añadir un parametro "all" para permitir todos los roles.
 * @param  {...any} allowedRoles Array of roles objects
 * @returns 
 */
const authorize = (...allowedRoles) => {

  return (req, res, next) => {

      const token = req.headers.authorization;
  
      if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso no autorizado. Debes estar autenticado.' });
      }
  
      const jwtToken = token.split(' ')[1];
  
      const decodedToken = jwt.decode(jwtToken);
  
      const userRole = decodedToken.role;
  
      const allowed = allowedRoles.find(allowedRole => allowedRole.id === userRole.id);
  
      if (!allowed) {
        return res.status(403).json({ message: 'Acceso denegado. No tienes permiso para acceder a esta ruta.' });
      }

    next();
  };
};


module.exports = { 
  verifySessionToken,
  verifyResetToken,
  authorize
};