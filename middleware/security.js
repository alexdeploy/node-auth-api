const config = require('../api.config.js');

// TODO: Refactorizar y simplificar
// TODO: Documentar funciones

// Comprueba si la cuenta del usuario está bloqueada.
// Si la cuenta está bloqueada, devuelve true, de lo contrario, devuelve false.
const checkIfAccountIsLocked = (user) => user.security.accountLockedUntil !== null && user.security.accountLockedUntil > new Date() ? true : false;

// Comprueba si el usuario ha superado el número máximo de intentos de inicio de sesión.
// Si el usuario ha superado el número máximo de intentos de inicio de sesión, devuelve true, de lo contrario, devuelve false.
const checkMaxLogginAttempts = (user, maxAttempts) => user.security.logginAttempts >= maxAttempts ? true : false;

const resetLockValues = (user) => {
    // check if accountLockedUntil is defined but has expired
    console.log('Checkeando si la cuenta está bloqueada...')
    if (user.security.accountLockedUntil !== null && user.security.accountLockedUntil < new Date()){
    user.security.accountLockedUntil = null; // Reset accountLockedUntil because Date is null or has expired.
    user.security.logginAttempts = 0; // Reset logginAttempts because Date is null or has expired.
    console.log('----- La cuenta se ha desbloqueado.');
    }
    console.log('----- La cuenta no está bloqueada.');
};

const securityCheck = (user, res) => {
    if (config.security.logginAttempts.active) {
        console.log('Checkeando si la cuenta está bloqueada...')
        const isLocked = checkIfAccountIsLocked(user);
        if (isLocked) {
          const userLockedUntil = new Date(user.security.accountLockedUntil);
          const userLockedUntilString = userLockedUntil.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
          console.log('----- La cuenta está bloqueada hasta: ' + userLockedUntilString + '. Quedan ' + (userLockedUntil - Date.now()) / 60000 + ' minutos para desbloquearla.');
          return res.status(401).json({ message: 'Account is locked until: ' + userLockedUntilString });
        } else {
            resetLockValues(user);
        }
        const maxAttemptsReached = checkMaxLogginAttempts(user, config.security.logginAttempts.max);
        console.log('Checkeando si ha alcanzado intentos máximos de sesión...')
        if (maxAttemptsReached) {
          user.security.accountLockedUntil = new Date(Date.now() + config.security.logginAttempts.lockTime * 60000);
          user.save();
          console.log('----- La cuenta ha alcanzado el número máximo de intentos de inicio de sesión. La cuenta está bloqueada hasta: ' + user.security.accountLockedUntil.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }));
          return res.status(401).json({ message: 'Max loggin attempts reached. Account is locked.' });
        }
        console.log('----- La cuenta no ha alcanzado el número máximo de intentos de inicio de sesión.');
      }
}

///////////////////////////
// PENDING OF USE/TESTING
///////////////////////////
// TODO: Crear funciones de filtrado sanitizado los strings para correo, nombre de usuario y contraseña.

const escapeHtml = (unsafe) => {
  return unsafe.replace(/[&<"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[m]));
}

const sanitizedUsername = (username) => username.replace(/[^\w\s]/gi, '');

const sanitizedEmail = (email) => email.replace(/[^\w\s@.]/gi, '');

module.exports = { 
  securityCheck,
  checkIfAccountIsLocked,
  checkMaxLogginAttempts,
  resetLockValues
 };