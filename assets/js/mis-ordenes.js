//Historial de Órdenes
function historialOrdenesHTML () {
    let ordenesStorage = localStorage.getItem("Ordenes");
    const ordenes = JSON.parse(ordenesStorage);
    const conOrdenes = document.getElementById('ordenes-lleno-container');
    const sinOrdenes = document.getElementById('ordenes-vacio-container');
    sinOrdenes.innerHTML = '';
    if (ordenes && ordenes.length !== 0) {
        const ordenesContainer = document.querySelector('.tabla-mis-ordenes-filas');
        let item = 0;
        ordenes.forEach(orden => {
            const numeroItem = item + 1;
            const ordenFila = document.createElement('tr');
            ordenFila.innerHTML = `
                <th scope="row">${numeroItem}</th>
                <td>
                    <a href="./mi-compra.html?ordenId=${item}">Orden# ${item}</a>
                </td>
            `;
            item = item + 1;
            ordenesContainer.appendChild(ordenFila);
        });
    }
    else {
        const sinOrdenesContainer = document.createElement('div');
        sinOrdenesContainer.innerHTML = `
            <p>No hay órdenes</p>
            <a href="./tienda.html" class="btn btn-primary">Ir a la Tienda</a>
        `;
        sinOrdenes.appendChild(sinOrdenesContainer);
        conOrdenes.classList.add('d-none');
    }
}
historialOrdenesHTML();