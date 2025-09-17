// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBI94vZE0eHZDENilVYw63yEsXZ9aA9vX0",
    authDomain: "graphflow-5cdf7.firebaseapp.com",
    projectId: "graphflow-5cdf7",
    storageBucket: "graphflow-5cdf7.firebasestorage.app",
    messagingSenderId: "27579305013",
    appId: "1:27579305013:web:8c0837c6706d8c1c79757c"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// --- EMULATOR SETUP ---
// Este código detecta si estás en el entorno local (localhost) y redirige
// las llamadas de Firebase a los emuladores locales en lugar de a la nube.
// Es crucial para probar la función de IA localmente.
if (location.hostname === "localhost") {
  console.log("--- MODO DE DESARROLLO LOCAL ---");
  console.log("Conectando a los Emuladores de Firebase...");

  // Conectar al emulador de Autenticación (puerto por defecto: 9099)
  firebase.auth().useEmulator("http://127.0.0.1:9099");

  // Conectar al emulador de Firestore (puerto que vimos en la terminal: 8080)
  firebase.firestore().useEmulator("127.0.0.1", 8080);

  // Conectar al emulador de Functions (IA) (puerto que vimos en la terminal: 5001)
  firebase.functions().useEmulator("127.0.0.1", 5001);

  console.log("Conexión con emuladores establecida. Las llamadas se harán localmente.");
  console.log("---------------------------------");
}
// --- END EMULATOR SETUP ---


function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Guardar nombre de usuario en Firestore
            const user = userCredential.user;
            firebase.firestore().collection('users').doc(user.uid).set({
                username: username,
                email: email,
                createdAt: new Date()
            });
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}
