const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require('@google/generative-ai');

admin.initializeApp();

// Configura la API de Gemini de forma segura desde las variables de entorno
const genAI = new GoogleGenerativeAI(functions.config().gemini.key);

exports.generarGrafoConGemini = functions.https.onCall(async (data, context) => {
    // 1. Verificación de autenticación
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Debes estar autenticado para llamar a esta función.');
    }

    // 2. Validación de la entrada
    const textoUsuario = data.texto;
    if (!textoUsuario || typeof textoUsuario !== 'string' || textoUsuario.trim() === '') {
        throw new functions.https.HttpsError('invalid-argument', 'La función espera un campo "texto" que no puede estar vacío.');
    }

    // 3. Configuración y Prompt para la IA
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = `
        Analiza el siguiente texto de apuntes de un estudiante. El texto está desordenado. 
        Tu tarea es identificar los conceptos clave y las relaciones jerárquicas o de dependencia entre ellos.
        Devuelve una estructura de texto con sangría (indentación) que represente un grafo. 
        Cada línea debe ser un nodo. La indentación (usando 2 espacios) debe representar las dependencias. 
        No añadas comentarios, explicaciones ni saludos. Solo el grafo estructurado.

        Ejemplo de entrada:
        "Primero necesito un login. Para el login uso Firebase. Luego una base de datos. Para la BD uso Firestore, que es de Firebase. Y finalmente la visualización. Para la visualización uso Cytoscape."
        
        Salida esperada para el ejemplo:
        Login
          Firebase Auth
        Base de Datos
          Firestore
        Visualización
          Cytoscape.js

        --- 

        Ahora, analiza este texto real y devuelve el grafo estructurado:
        "${textoUsuario}"
    `;

    // 4. Llamada a la IA y manejo de la respuesta
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textoEstructurado = response.text();
        
        // -- ¡ESTA ES LA CORRECCIÓN! --
        // Devolvemos el objeto directamente. Firebase lo envolverá en 'data' una sola vez.
        return { grafo: textoEstructurado };

    } catch (error) {
        console.error("Error al contactar la API de Gemini:", error);
        // Si algo sale mal con la API de Gemini, lanzamos un error que el cliente puede manejar.
        throw new functions.https.HttpsError('internal', 'Ocurrió un error al generar la respuesta de la IA. Por favor, revisa los logs del emulador.');
    }
});
