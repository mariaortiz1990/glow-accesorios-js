//Carrito HTML - Página del Carrito
function carritoEnPagina() {
    let productosEnCarrito = localStorage.getItem("Carrito");
    const carritoConProductos = JSON.parse(productosEnCarrito);    
    const carritoLleno = document.getElementById('carrito-lleno-container');
    const carritoVacio = document.getElementById('carrito-vacio-container');
    carritoVacio.innerHTML = '';
    if (carritoConProductos && carritoConProductos.length !== 0) {
        const productosSeleccionadosContainer = document.querySelector('.tabla-carrito-filas');
        const productosUnicos = new Map();
        carritoConProductos.forEach(item => {
            productosUnicos.set(item.id_producto, item);
        });
        let carrito = [];
        const cantidadProducto = (idProducto) => {
            const productosEnCarrito = JSON.parse(localStorage.getItem("Carrito")) || carrito;
            return productosEnCarrito.filter(producto => producto.id_producto === idProducto).length;
        }
        let totalCarrito = 0;
        productosSeleccionadosContainer.innerHTML = '';
        const total = document.createElement('p');
        let item = 0;
        productosUnicos.forEach((producto) => {
            const numeroItem = item + 1;
            item = item + 1;
            const cantidad = cantidadProducto(producto.id_producto);
            const subtotalPorProducto = producto.precio * cantidad;
            totalCarrito = totalCarrito + subtotalPorProducto;
            const productoSeleccionado = document.createElement('tr');
            productoSeleccionado.innerHTML = `
                <th scope="row">${numeroItem}</th>
                <td>
                    <a href="producto.html?id=${producto.id_producto}&producto=${producto.nombre_producto}" data-id-producto="${producto.id_producto}" class="imagen-producto-carrito" aria-current="true">
                        <img src="${producto.imagen_producto}" class="float-left rounded" alt="${producto.nombre_producto}}">
                    </a>
                </td>
                <td>${producto.nombre_producto}</td>
                <td>${cantidad}</td>
                <td>${producto.precio}</td>
                <td>${subtotalPorProducto}</td>
                <td>
                    <button type="button" class="boton-aumentar-carrito-pagina btn" data-id-producto="${producto.id_producto}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </button>
                </td>
                <td>
                    <button type="button" class="boton-disminuir-carrito-pagina btn" data-id-producto="${producto.id_producto}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                        </svg>
                     </button>
                </td>
                <td>
                    <button type="button" class="boton-borrar-carrito-pagina btn" data-id-producto="${producto.id_producto}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </td>
            `;
            productosSeleccionadosContainer.appendChild(productoSeleccionado);
        });
        const totalGeneralCarrito = document.getElementById('carrito-total');
        totalGeneralCarrito.innerHTML = '';
        total.innerHTML = `
            <div class="carrito-footer d-flex flex-column">
                <span>TOTAL $${totalCarrito}</span>
                <a href="#" class="boton-finalizar-compra btn btn-primary">FINALIZAR COMPRA</a>
            </div>
        `;
        totalGeneralCarrito.appendChild(total);
        carritoVacio.classList.remove('d-flex');
        carritoVacio.classList.add('d-none');
        carritoLleno.classList.remove('d-none');
        carritoLleno.classList.add('d-flex');
        eventoBorrarDelCarritoEnPagina();
        eventoAumentarCantidadEnCarritoEnPagina();
        eventoDisminuirCantidadEnCarritoEnPagina();
        eventoFinalizarCompra();
    }
    else {
        carritoVacio.innerHTML = `
            <p>Tu Carrito Está Vacío</p>
            <a href="./tienda.html" class="btn btn-primary">Ir a la Tienda</a>
        `;
        carritoLleno.classList.remove('d-flex');
        carritoLleno.classList.add('d-none');
        carritoVacio.classList.remove('d-none');
        carritoVacio.classList.add('d-flex');
    }       
}
carritoEnPagina();

//Evento Borrar Producto Carrito Sidebar
function eventoBorrarDelCarritoEnPagina () {
    const botonBorrarCarrito = document.querySelectorAll('.boton-borrar-carrito-pagina');
    botonBorrarCarrito.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const idProducto = event.target.dataset.idProducto;
            let productosEnCarrito = JSON.parse(localStorage.getItem("Carrito"));
            const nuevoCarrito = productosEnCarrito.filter((producto) =>
                producto.id_producto != idProducto
            );
            localStorage.setItem("Carrito", JSON.stringify(nuevoCarrito));
            carritoEnPagina();
        })    
    })
}

//Evento Aumentar Producto Carrito Sidebar
function eventoAumentarCantidadEnCarritoEnPagina () {
    const botonAumentarCarrito = document.querySelectorAll('.boton-aumentar-carrito-pagina');
    botonAumentarCarrito.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const idProducto = event.target.dataset.idProducto;
            let productosEnCarrito = JSON.parse(localStorage.getItem("Carrito"));
            const productosPorAumentar = productosEnCarrito.filter((producto) =>
                producto.id_producto == idProducto
            );
            productosEnCarrito.push(productosPorAumentar[0]);
            localStorage.setItem("Carrito", JSON.stringify(productosEnCarrito));
            carritoEnPagina();
        })
    })
}

//Evento Disminuir Producto Carrito Sidebar
function eventoDisminuirCantidadEnCarritoEnPagina () {
    const botonDisminuirCarrito = document.querySelectorAll('.boton-disminuir-carrito-pagina');
    botonDisminuirCarrito.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const idProducto = event.target.dataset.idProducto;
            let productosEnCarrito = JSON.parse(localStorage.getItem("Carrito"));         
            const indiceProductoPorDisminuir = productosEnCarrito.findIndex(producto => producto.id_producto == idProducto);
            productosEnCarrito.splice(indiceProductoPorDisminuir, 1);
            localStorage.setItem("Carrito", JSON.stringify(productosEnCarrito));
            carritoEnPagina();
        })
    })
}