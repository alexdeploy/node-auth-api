# CORS Configuration for API [EN]

CORS (Cross-Origin Resource Sharing) is a security policy used by web browsers to restrict requests between different domains. This CORS configuration is suitable for an authentication API that requires advanced security. Below are the configuration options and their allowed values:

## Description of Configuration Options

### 1. `origin`:
- **Description**: Defines the allowed origin for requests.
- **Usage**: Restricts requests only from specified domains or URLs.
- **Recommendation**: Set the domain or URL from which requests will be allowed. It's important to limit access only to domains that need to interact with your API.

#### Allowed Values

> 'https://example.com'

> ['https://example.com', 'http://localhost:3000']

> '*'

### 2. `methods`:
- **Description**: Defines the allowed HTTP methods for requests.
- **Usage**: Limits the HTTP methods that can be used in requests.
- **Recommendation**: Define the methods that your API supports, ensuring that only necessary operations are performed.

#### Allowed Values

> 'GET,POST,PUT,DELETE'

> ['GET', 'POST', 'PUT', 'DELETE']

### 3. `allowedHeaders`:
- **Description**: Indicates which headers are allowed in requests.
- **Usage**: Enables specific headers that are allowed in requests.
- **Recommendation**: Enable the 'Authorization' header to allow authentication with tokens.

#### Allowed Values

> 'Authorization,Content-Type'

> ['Authorization', 'Content-Type']

### 4. `exposedHeaders`:
- **Description**: Defines which headers can be exposed in server responses.
- **Usage**: Allows clients to access specific headers in server responses.
- **Recommendation**: Exposing the 'Authorization' header allows clients to access it in responses.

#### Allowed Values

> 'Authorization'

> ['Authorization']

### 5. `credentials`:
- **Description**: Enables or disables the use of credentials (such as cookies or authorization headers) in requests.
- **Usage**: Allows authentication with credentials in requests.
- **Recommendation**: Enable the use of credentials to allow authentication with credentials (such as cookies or authorization headers).

#### Allowed Values

> true

> false

### 6. `maxAge`:
- **Description**: Specifies the time in seconds that browsers should cache preflight options.
- **Usage**: Controls how long the browser will cache preflight options.
- **Recommendation**: Adjust according to your API's needs. A shorter cache time can improve the security and responsiveness of your API.

#### Allowed Values

> 3600

Make sure to properly configure CORS for your authentication API to ensure the security and proper protection of your resources and sensitive data.


# Configuración de CORS para API [ES]

CORS (Cross-Origin Resource Sharing) es una política de seguridad utilizada por los navegadores web para restringir las solicitudes entre diferentes dominios. Esta configuración de CORS es adecuada para una API de autenticación que requiere seguridad avanzada. A continuación, se explican las opciones de configuración y sus valores permitidos:

## Descripción de las opciones de configuración

### 1. `origin`:
- **Descripción**: Define el origen permitido para las solicitudes.
- **Uso**: Restringe las solicitudes solo desde los dominios o URLs especificados.
- **Recomendación**: Establece el dominio o URL desde donde se permitirán las solicitudes. Es importante limitar el acceso solo a los dominios que necesiten interactuar con tu API.

#### Valores

> 'https://example.com'

> ['https://example.com', 'http://localhost:3000']

> '*'

### 2. `methods`:
- **Descripción**: Define los métodos HTTP permitidos para las solicitudes.
- **Uso**: Limita los métodos HTTP que se pueden utilizar en las solicitudes.
- **Recomendación**: Define los métodos que tu API admite, asegurando que solo se realicen las operaciones necesarias.

#### Valores

> 'GET,POST,PUT,DELETE'

> ['GET', 'POST', 'PUT', 'DELETE']

### 3. `allowedHeaders`:
- **Descripción**: Indica qué encabezados se permiten en las solicitudes.
- **Uso**: Habilita los encabezados específicos que se permiten en las solicitudes.
- **Recomendación**: Habilita el encabezado 'Authorization' para permitir la autenticación con tokens.

#### Valores

> 'Authorization,Content-Type'

> ['Authorization', 'Content-Type']

### 4. `exposedHeaders`:
- **Descripción**: Define qué encabezados se pueden mostrar en las respuestas del servidor.
- **Uso**: Permite al cliente acceder a los encabezados específicos en las respuestas del servidor.
- **Recomendación**: Exponer el encabezado 'Authorization' permite que el cliente acceda a ese encabezado en las respuestas.

#### Valores

> 'Authorization'

> ['Authorization']

### 5. `credentials`:
- **Descripción**: Habilita o deshabilita el uso de credenciales (como cookies o encabezados de autorización) en las solicitudes.
- **Uso**: Permite la autenticación con credenciales en las solicitudes.
- **Recomendación**: Habilita el uso de credenciales para permitir autenticación con credenciales (como cookies o encabezados de autorización).

#### Valores

> true

> false

### 6. `maxAge`:
- **Descripción**: Especifica el tiempo en segundos que los navegadores deben almacenar en caché las opciones preflight.
- **Uso**: Controla el tiempo que el navegador almacenará en caché las opciones preflight.
- **Recomendación**: Ajusta según las necesidades de tu API. Un tiempo de caché más corto puede mejorar la seguridad y la capacidad de respuesta de tu API.

#### Valores

> 3600

Asegúrate de configurar adecuadamente CORS para tu API de autenticación para garantizar la seguridad y la protección adecuada de tus recursos y datos sensibles.


