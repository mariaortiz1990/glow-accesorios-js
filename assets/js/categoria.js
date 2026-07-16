//Petición Productos por Categoría - Página Tienda
const cardsContainer = document.getElementById('card');
const titulo = document.querySelector('.titulo-categoria');

const parametroUrlCategoriaActual = new URLSearchParams(window.location.search);
const urlParametroID = parametroUrlCategoriaActual.get('id');

const peticionFiltroProductosPorCategoria = () => {
    fetch('./productos.json')
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const categoriaActual = datos.find((producto) => 
                producto.categoria.id_categoria == urlParametroID);
            titulo.innerHTML = `
                <h1>${categoriaActual.categoria.nombre_categoria}</h1>
            `;
            datos.forEach((item, index) => {
                if (item.categoria.id_categoria == urlParametroID) {
                    const card = document.createElement('div');
                    card.classList.add('col');
                    card.innerHTML = `
                        <div class="card h-100">   
                            <a href="./producto.html?id=${item.id_producto}&producto=${item.nombre_producto}" class="" data-id-producto="${item.id_producto}">
                                <img src="./${item.imagen_producto}" class="card-img-top" alt="${item.nombre_producto}">
                                <div class="card-body">
                                    <h5 class="card-title">${item.nombre_producto}</h5>
                                    <p class="card-text">$${item.precio}</p>
                                    <a href="#" class="btn btn-primary btn-carrito" data-id-producto="${item.id_producto}">Añadir al Carrito</a>
                                </div>
                            </a>
                        </div>
                        `;
                    cardsContainer.appendChild(card);
                }

            });
            eventoAgregarAlCarrito(datos);
        })
    .catch(() => {
        cardsContainer.innerHTML = `
            <p class="text-center text-danger w-100 fw-bold">Ha ocurrido un error inesperado! Por favor intenta nuevamente.</p>   
        `; 
    })
}
peticionFiltroProductosPorCategoria();
