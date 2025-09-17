function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = 'login.html';
    });
}

// Cargar lista de grafos
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        firebase.firestore().collection('grafos')
            .where('userID', '==', user.uid)
            .orderBy('fecha', 'desc')
            .get().then((querySnapshot) => {
                const container = document.getElementById('listaGrafos');
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const div = document.createElement('div');
                    div.className = 'grafo-item';
                    div.innerHTML = `
                        <h3>${data.titulo}</h3>
                        <p>${data.textoEstructurado.substring(0, 100)}...</p>
                        <small>${data.fecha.toDate().toLocaleString()}</small>
                    `;
                    container.appendChild(div);
                });
            });
    }
});