# Sistema de Login Seguro con Node.js

Este es un sistema de login seguro desarrollado con Node.js, Express y MongoDB. Implementa buenas prácticas de seguridad para proteger la autenticación de los usuarios. A continuación, se muestra un flujo detallado del sistema y las buenas prácticas de seguridad implementadas:

## Flujo del sistema

El sistema de login seguro sigue los siguientes pasos:

### Registro de usuarios (/register):

- Los usuarios proporcionan un nombre de usuario, una contraseña y un correo electrónico en el formulario de registro.

- Antes de crear un nuevo usuario, se verifica si el correo electrónico ya está registrado en la base de datos. Esto se realiza consultando la base de datos para encontrar un usuario con el mismo correo electrónico.

- La contraseña proporcionada por el usuario se almacena de forma segura utilizando el algoritmo bcrypt para el hashing y salting. Esto garantiza que la contraseña no se almacene en texto plano en la base de datos.

- Se crea un nuevo usuario en la base de datos con el nombre de usuario, la contraseña encriptada y el correo electrónico.

### Inicio de sesión (/login):

- Los usuarios proporcionan su nombre de usuario y contraseña en el formulario de inicio de sesión.

- Se verifica si el nombre de usuario existe en la base de datos.

- Si el nombre de usuario existe, se compara la contraseña proporcionada con la contraseña almacenada en la base de datos utilizando el algoritmo bcrypt.

- Si las credenciales de inicio de sesión son válidas, se genera un token JSON Web Token (JWT) firmado. El token contiene información como el ID del usuario y tiene una fecha de vencimiento para mejorar la seguridad. Este token se devuelve al cliente y se utilizará en las solicitudes posteriores para autenticar al usuario.

### Recuperación de contraseña (/forgot-password):

- Los usuarios pueden solicitar la recuperación de su contraseña proporcionando su correo electrónico en el formulario de recuperación de contraseña.

- Se verifica si el correo electrónico existe en la base de datos.

- Si el correo electrónico existe, se genera un token JWT de restablecimiento de contraseña válido por un tiempo limitado. El token contiene información como el ID del usuario y se firma con una clave secreta para garantizar su autenticidad.

- El token se envía al usuario por correo electrónico. Este token se utilizará en el proceso de restablecimiento de contraseña.

### Restablecimiento de contraseña (/reset-password):

- Los usuarios reciben un correo electrónico con un enlace que contiene el token de restablecimiento de contraseña.

- Al hacer clic en el enlace, el usuario se dirige a la página de restablecimiento de contraseña donde puede proporcionar una nueva contraseña.

- Se verifica la validez del token de restablecimiento de contraseña para garantizar que no haya sido alterado y no haya expirado.

- Si el token es válido, se actualiza la contraseña del usuario en la base de datos utilizando el algoritmo bcrypt para encriptarla y almacenarla de forma segura.

## Buenas prácticas de seguridad implementadas

El sistema de login seguro implementa las siguientes buenas prácticas de seguridad:

- **Encriptación segura de contraseñas**: Las contraseñas de los usuarios se almacenan de forma segura utilizando el algoritmo bcrypt. Este algoritmo realiza hashing y salting para proteger las contraseñas de los usuarios y evitar el almacenamiento en texto plano en la base de datos. Al utilizar bcrypt, las contraseñas se vuelven difíciles de descifrar incluso si un atacante obtiene acceso a la base de datos.

- **Uso de tokens JWT**: En lugar de utilizar sesiones de servidor tradicionales, el sistema de login seguro utiliza tokens JSON Web Token (JWT) para la autenticación. Los tokens JWT son autónomos, lo que significa que contienen toda la información necesaria para autenticar al usuario sin necesidad de consultar la base de datos en cada solicitud. Además, los tokens están firmados digitalmente, lo que garantiza su autenticidad y evita modificaciones no autorizadas.

- **Protección de rutas y autorización**: Se utilizan middlewares para proteger las rutas que requieren autenticación. Al verificar el token JWT en cada solicitud entrante, se asegura que solo los usuarios autenticados tengan acceso a las rutas protegidas. Esto garantiza que solo los usuarios con credenciales válidas puedan acceder a las funcionalidades protegidas, como la actualización de la contraseña.

- **Verificación de existencia de usuario**: Antes de registrar un nuevo usuario, se verifica si el nombre de usuario y el correo electrónico ya están registrados en la base de datos. Esto evita la creación de duplicados y garantiza que cada usuario tenga identificadores únicos.

- **Manejo seguro de contraseñas**: Las contraseñas se manejan de manera segura utilizando el algoritmo bcrypt. Esto garantiza que incluso si un atacante obtiene acceso a la base de datos, no podrá recuperar las contraseñas en texto plano. Además, se utiliza un proceso de hashing y salting para agregar una capa adicional de seguridad a las contraseñas.

- **Limitación de intentos de inicio de sesión (falta)**: Aunque no se ha implementado en el código generado, una buena práctica es limitar el número de intentos de inicio de sesión fallidos. Esto puede realizarse mediante técnicas como el bloqueo de cuentas después de varios intentos fallidos o la introducción de retrasos entre los intentos. Estas medidas ayudan a prevenir ataques de fuerza bruta y protegen contra intentos maliciosos de adivinar contraseñas.

- **Uso de transporte de correo seguro**: Para la funcionalidad de recuperación de contraseña, se utiliza un transporte de correo seguro utilizando la librería Nodemailer. Esto garantiza que los correos electrónicos de restablecimiento de contraseña se envíen de manera segura y confiable, evitando el riesgo de interceptación o manipulación de la información de restablecimiento de contraseña.