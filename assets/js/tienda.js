//Petición Productos - Página Tienda
const cardsContainer = document.getElementById('card');

const peticionProductos = () => {
    fetch('./productos.json')
        .then((respuesta) =>  respuesta.json())
        .then((datos) => {
            const data = datos;
            data.forEach((item, index) => {
                const card = document.createElement('div');
                card.classList.add('col'); 
                card.innerHTML = `
                <div class="card h-100">
                    <a href="./producto.html?id=${item.id_producto}&producto=${item.nombre_producto}" data-id-producto="${item.id_producto}" target="_blank">
                        <img src="./${item.imagen_producto}" class="card-img-top" alt="${item.nombre_producto}">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre_producto}</h5>
                            <p class="card-text">$${item.precio}</p>
                            <a href="#" class="btn btn-primary btn-carrito d-flex justify-content-center" data-id-producto="${item.id_producto}">Añadir al Carrito</a>
                        </div>  
                    </a>
                </div>
                    `;
                cardsContainer.appendChild(card);
            });
            eventoAgregarAlCarrito(data);
        })
    .catch(() => {
        cardsContainer.innerHTML = `
            <p class="text-center text-danger w-100 fw-bold">Ha ocurrido un error inesperado! Por favor intenta nuevamente.</p>   
        `; 
    })
}
peticionProductos();


