function analizarTextoConIA(texto) {
    const lineas = texto.split('\n').filter(linea => linea.trim() !== '');
    const elementos = [];
    const parentStack = [];

    lineas.forEach((linea, index) => {
        const indentacion = linea.match(/^\s*/)[0].length;
        const nivel = Math.floor(indentacion / 2);
        const label = linea.trim();
        const id = 'n' + index;

        elementos.push({ data: { id, label } });

        if (nivel > 0 && parentStack[nivel - 1]) {
            const parentId = parentStack[nivel - 1];
            elementos.push({ data: { source: parentId, target: id } });
        }

        parentStack[nivel] = id;
        parentStack.length = nivel + 1;
    });

    return elementos;
}