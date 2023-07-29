module.exports = {
    // Opciones de configuración para CORS
    options: {
        // 1. Origen permitido para las solicitudes (valor por defecto: '*')
        origin: '*', // Recomendación: Establece el dominio o URL desde donde se permitirán las solicitudes. 
    
        // 2. Métodos HTTP permitidos (valor por defecto: 'GET,HEAD,PUT,PATCH,POST,DELETE')
        methods: 'GET,POST,PUT,DELETE', // Recomendación: Define los métodos HTTP que se pueden utilizar en las solicitudes. Ajusta según las necesidades de tu API.
    
        // 3. Encabezados permitidos en las solicitudes (valor por defecto: 'Content-Type')
        allowedHeaders: 'Authorization,Content-Type', // Recomendación: Indica qué encabezados se permiten en las solicitudes. Habilita el encabezado 'Authorization' para permitir autenticación con tokens.
    
        // 4. Encabezados expuestos en las respuestas (valor por defecto: '')
        exposedHeaders: 'Authorization', // Recomendación: Define qué encabezados se pueden mostrar en las respuestas del servidor. Exponer el encabezado 'Authorization' permite que el cliente acceda a ese encabezado en las respuestas.
    
        // 5. Permitir el uso de credenciales (valor por defecto: false)
        credentials: true, // Recomendación: Habilita el uso de credenciales (como cookies o encabezados de autorización) en las solicitudes para permitir autenticación con credenciales.
    
        // 6. Tiempo en segundos para cachear las opciones preflight (valor por defecto: 86400 segundos / 24 horas)
        maxAge: 3600 // Recomendación: Especifica el tiempo en segundos que los navegadores deben almacenar en caché las opciones preflight. Ajusta según las necesidades de tu API.
    }
}