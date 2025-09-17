// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', (event) => {

    // Obtener referencias a los elementos del DOM
    const generarGrafoBtn = document.getElementById('generarGrafoBtn');
    const textoInput = document.getElementById('texto');
    const grafoContainer = document.getElementById('grafo');

    // Asegurarse de que todos los elementos existen antes de añadir el listener
    if (generarGrafoBtn && textoInput && grafoContainer) {
        generarGrafoBtn.addEventListener('click', () => {
            const textoUsuario = textoInput.value;

            // Validar que el usuario haya escrito algo
            if (textoUsuario.trim() === '') {
                alert('Por favor, escribe algo en el área de apuntes antes de generar el grafo.');
                return;
            }

            // Mostrar un estado de carga en el contenedor del grafo
            grafoContainer.innerHTML = '<p style="text-align:center; color:#555;">Analizando texto y generando grafo con IA...</p>';
            generarGrafoBtn.disabled = true;
            generarGrafoBtn.innerText = 'Generando...';

            // Preparar la llamada a la función de Firebase (emulada o en la nube)
            const generarGrafoConGemini = firebase.functions().httpsCallable('generarGrafoConGemini');

            // Llamar a la función con el texto del usuario
            generarGrafoConGemini({ texto: textoUsuario })
                .then((resultado) => {
                    const grafoTexto = resultado.data.grafo;
                    console.log("Respuesta de la IA (texto indentado):", grafoTexto);
                    // Procesar la respuesta y dibujar el grafo
                    dibujarGrafo(grafoTexto);
                })
                .catch((error) => {
                    // Manejar errores de la función
                    console.error("Error al llamar a la función de IA:", error);
                    grafoContainer.innerHTML = `<p style="text-align:center; color:red;">Error: ${error.message}</p>`;
                })
                .finally(() => {
                    // Reactivar el botón
                    generarGrafoBtn.disabled = false;
                    generarGrafoBtn.innerText = 'Generar Grafo con IA';
                });
        });
    }

    /**
     * Parsea el texto indentado de la IA y dibuja el grafo usando vis-network.
     * @param {string} textoIndentado El string con el grafo representado por sangrías.
     */
    function dibujarGrafo(textoIndentado) {
        if (!textoIndentado || textoIndentado.trim() === '') {
             grafoContainer.innerHTML = '<p style="text-align:center; color:#888;">La IA no devolvió una estructura válida. Intenta con un texto más claro.</p>';
             return;
        }

        const lineas = textoIndentado.trim().split('\n');
        const nodos = [];
        const aristas = [];
        const mapaNodos = new Map(); // Para rastrear nodos y sus padres
        let idCounter = 1;

        lineas.forEach(linea => {
            if (linea.trim() === '') return;

            const nivelIndentacion = linea.search(/\S|$/);
            const nombreNodo = linea.trim();
            
            const id = idCounter++;
            nodos.push({ id: id, label: nombreNodo });

            mapaNodos.set(nivelIndentacion, id);

            // Si no es un nodo raíz, crear una arista con su padre
            if (nivelIndentacion > 0) {
                // Buscar el padre en el nivel de indentación anterior
                let nivelPadre = -1;
                for (const [nivel, idPadre] of mapaNodos.entries()) {
                    if (nivel < nivelIndentacion && nivel > nivelPadre) {
                        nivelPadre = nivel;
                    }
                }
                if (nivelPadre !== -1) {
                    const idPadre = mapaNodos.get(nivelPadre);
                    aristas.push({ from: idPadre, to: id });
                }
            }
        });

        // Crear los datos para Vis Network
        const data = {
            nodes: new vis.DataSet(nodos),
            edges: new vis.DataSet(aristas),
        };

        // Opciones de configuración del grafo
        const options = {
            layout: {
                hierarchical: {
                    sortMethod: 'directed', // directed | hubsize
                    shakeTowards: 'roots',  // roots | leaves
                    levelSeparation: 150,
                    nodeSpacing: 150,
                },
            },
            nodes: {
                shape: 'box',
                font: { size: 16, color: '#333' },
                color: { 
                    border: '#4CAF50',
                    background: '#E8F5E9',
                    highlight: { border: '#2E7D32', background: '#C8E6C9'}
                },
                margin: 10,
                shadow: true
            },
            edges: {
                arrows: 'to',
                color: '#666',
                smooth: true,
                shadow: true
            },
            physics: {
                enabled: false, // Desactivar físicas para layout jerárquico
            },
        };

        // Inicializar la red
        new vis.Network(grafoContainer, data, options);
    }
});
