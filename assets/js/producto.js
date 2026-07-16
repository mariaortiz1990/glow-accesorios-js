//Petición Página del Producto
const peticionInfoDelProducto = () => {
    const productoContainer = document.getElementById('producto-container');
    const parametroUrlProductoActual = new URLSearchParams(window.location.search);
    const urlParametroID = parametroUrlProductoActual.get('id');    
    fetch('./productos.json')
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const productoActual = datos.find((producto) => 
                producto.id_producto == urlParametroID);
            const tituloPagina = document.querySelector('title');
            tituloPagina.innerHTML = `
                ${productoActual.nombre_producto}
            `;            
            const productoSubContainer = document.createElement('div');
            productoSubContainer.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-2', 'g-3');
            productoSubContainer.innerHTML = `
                    <div class="imagen-producto">
                        <img src="./${productoActual.imagen_producto}" class="card-img-top" alt="${productoActual.nombre_producto}">
                    </div>
                    <div class="descripcion">
                        <h1 class="">${productoActual.nombre_producto}</h1>
                        <p>${productoActual.descripcion}</p>
                        <p class="precio-pagina-producto">$${productoActual.precio}</p>
                        <a href="#" class="btn btn-primary btn-carrito" data-id-producto="${productoActual.id_producto}">Añadir al Carrito</a>
                    </div>
            `;
            productoContainer.appendChild(productoSubContainer);            
            eventoAgregarAlCarrito(datos);
        })
    .catch(() => {
        productoContainer.innerHTML = `
            <p class="text-center text-danger w-100 fw-bold">Ha ocurrido un error inesperado! Por favor intenta nuevamente.</p>   
        `; 
    })
}
peticionInfoDelProducto();