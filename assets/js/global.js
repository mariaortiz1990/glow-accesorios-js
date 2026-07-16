//Evento Botón Agregar al Carrito
function eventoAgregarAlCarrito(productos) {
    let botonAgregarCarrito = document.querySelectorAll('.btn-carrito');
    botonAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const idProducto = event.target.dataset.idProducto
            const productoSeleccionado = productos.filter((producto) =>
                producto.id_producto == idProducto
            );
            let carrito = [];
            let productosAgregadosCarrito = JSON.parse(localStorage.getItem("Carrito"));
            if (productosAgregadosCarrito != null) {
                carrito = productosAgregadosCarrito;
            }
            carrito.push(productoSeleccionado[0]);
            localStorage.setItem("Carrito", JSON.stringify(carrito));   
            Toastify({
                text: productoSeleccionado[0].nombre_producto + " fue agregado al carrito",
                duration: 3000,
                gravity: "bottom", 
                position: "right",
                style: {
                    background: "#6b736e",
                }
            }).showToast();
        });
    });
}

//Carrito HTML Sidebar
function carritoSidebarHTML() {
    let productosAgregadosCarrito = localStorage.getItem("Carrito");
    const carritoConProductos = JSON.parse(productosAgregadosCarrito);
    const containerTotalCarrito = document.getElementById('carrito-total-sidebar');
    const carritoVacioContainer = document.getElementById('carrito-vacio-sidebar');
    carritoVacioContainer.innerHTML = '';
    const carritoLlenoContainer = document.getElementById('carrito-lleno-sidebar');
    if (carritoConProductos && carritoConProductos.length !== 0) {
        const containerProductosSeleccionados = document.getElementById('producto-carrito-sidebar');
        containerProductosSeleccionados.innerHTML = '';
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
        containerTotalCarrito.innerHTML = '';
        const total = document.createElement('p');
        productosUnicos.forEach((producto) => {
            const cantidad = cantidadProducto(producto.id_producto);
            const subtotalPorProducto = producto.precio * cantidad;
            totalCarrito = totalCarrito + subtotalPorProducto;
            const productoSeleccionado = document.createElement('li');
            productoSeleccionado.innerHTML = `
                <div class="producto-sidebar d-flex flex-row">
                    <a href="producto.html?id=${producto.id_producto}&producto=${producto.nombre_producto}" data-id-producto="${producto.id_producto}" class="imagen-producto-sidebar" aria-current="true">
                        <img src="${producto.imagen_producto}" class="float-left rounded" alt="${producto.nombre_producto}}">
                    </a>
                    <div class="column-2 w-100">
                        <div class="w-100 carrito-info-producto-sidebar d-flex flex-column">
                            <h6 class="mb-1">${producto.nombre_producto}</h6>
                            <small>${cantidad} x $${producto.precio} c/u</small>
                        </div>
                        <small>Subtotal $${subtotalPorProducto}</small>
                    </div>  
                    <div class="sidebar-boton-borrar d-flex">
                        <button type="button" class="boton-aumentar-carrito btn" data-id-producto="${producto.id_producto}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                        <button type="button" class="boton-disminuir-carrito btn" data-id-producto="${producto.id_producto}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                            </svg>
                        </button>
                        <button type="button" class="boton-borrar-carrito btn" data-id-producto="${producto.id_producto}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </button>
                    </div>   
                </div>      
            `;
            containerProductosSeleccionados.appendChild(productoSeleccionado);
        });
        total.innerHTML = `
            <div class="sidebar-carrito-footer d-flex flex-column">
                <span>TOTAL $${totalCarrito}</span>
                <a href="./carrito.html" class="btn btn-primary">VER CARRITO</a>
                <a href="#" class="boton-finalizar-compra btn btn-primary">FINALIZAR COMPRA</a>
            </div>
        `;
        containerTotalCarrito.appendChild(total);
        carritoVacioContainer.classList.remove('d-flex');
        carritoVacioContainer.classList.add('d-none');
        carritoLlenoContainer.classList.remove('d-none');
        carritoLlenoContainer.classList.add('d-flex');
        eventoBorrarDelCarritoSidebar();
        eventoAumentarCantidadEnCarritoSidebar();
        eventoDisminuirCantidadEnCarritoSidebar();
        eventoFinalizarCompra();
    }
    else {
        carritoVacioContainer.innerHTML = `
            <p>Tu Carrito Está Vacío</p>
            <a href="./tienda.html" class="btn btn-primary">Ir a la Tienda</a>
        `;
        carritoLlenoContainer.classList.remove('d-flex');
        carritoLlenoContainer.classList.add('d-none');
        carritoVacioContainer.classList.remove('d-none');
        carritoVacioContainer.classList.add('d-flex');
    }        
}
//Evento Abrir Icono Carrito 
function carritoSidebar() {
    const botonCarrito = document.getElementById('boton-carrito-sidebar');
    botonCarrito.addEventListener('click', () => {
        carritoSidebarHTML();
    });
}
carritoSidebar();

//Evento Borrar Producto Carrito Sidebar
function eventoBorrarDelCarritoSidebar () {
    const botonBorrarCarrito = document.querySelectorAll('.boton-borrar-carrito');
    botonBorrarCarrito.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const idProducto = event.target.dataset.idProducto;
            let productosEnCarrito = JSON.parse(localStorage.getItem("Carrito"));
            const nuevoCarrito = productosEnCarrito.filter((producto) =>
                producto.id_producto != idProducto
            );
            localStorage.setItem("Carrito", JSON.stringify(nuevoCarrito));
            carritoSidebarHTML();
            if (typeof carritoEnPagina === 'function'){
                carritoEnPagina();
            }
        })    
    })
}

//Evento Aumentar Producto Carrito Sidebar
function eventoAumentarCantidadEnCarritoSidebar () {
    const botonAumentarCarrito = document.querySelectorAll('.boton-aumentar-carrito');
    botonAumentarCarrito.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const idProducto = event.target.dataset.idProducto;
            let productosEnCarrito = JSON.parse(localStorage.getItem("Carrito"));
            const productosPorAumentar = productosEnCarrito.filter((producto) =>
                producto.id_producto == idProducto
            );
            productosEnCarrito.push(productosPorAumentar[0]);
            localStorage.setItem("Carrito", JSON.stringify(productosEnCarrito));
            carritoSidebarHTML();
            if (typeof carritoEnPagina === 'function'){
                carritoEnPagina();
            }
        })
    })
}

//Evento Disminuir Producto Carrito Sidebar
function eventoDisminuirCantidadEnCarritoSidebar () {
    const botonDisminuirCarrito = document.querySelectorAll('.boton-disminuir-carrito');
    botonDisminuirCarrito.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const idProducto = event.target.dataset.idProducto;
            let productosEnCarrito = JSON.parse(localStorage.getItem("Carrito"));         
            const indiceProductoPorDisminuir = productosEnCarrito.findIndex(producto => producto.id_producto == idProducto);
            productosEnCarrito.splice(indiceProductoPorDisminuir, 1);
            localStorage.setItem("Carrito", JSON.stringify(productosEnCarrito));
            carritoSidebarHTML();
            if (typeof carritoEnPagina === 'function'){
                carritoEnPagina();
            }
        })
    })
}

//Evento Finalizar Compra
function eventoFinalizarCompra () {
    const botonFinalizarCompra = document.querySelectorAll('.boton-finalizar-compra');
    botonFinalizarCompra.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const carritoABorrar = JSON.parse(localStorage.getItem("Carrito"));
            let ordenes = [];
            let ordenesHistorial = JSON.parse(localStorage.getItem("Ordenes"));
            if (ordenesHistorial != null) {
                ordenes = ordenesHistorial;
            }
            ordenes.push(carritoABorrar);
            localStorage.setItem("Ordenes", JSON.stringify(ordenes));
            localStorage.removeItem("Carrito");
            carritoSidebarHTML();
            if (typeof carritoEnPagina === 'function'){
                carritoEnPagina();
            }
            const ordenActual = ordenes.length-1;
            Swal.fire({
                title: "<strong>Gracias por tu Compra!</strong>",
                html: `
                    <p>Vuelve a la tienda para seguir comprando o mira el detalle de tu orden aquí:</p>
                    <div>
                        <a href="./tienda.html" class="btn btn-primary boton-popup-finalizar" target="">Seguir Comprando</a>
                        <a href="mi-compra.html?ordenId=${ordenActual}" class="btn btn-primary boton-popup-finalizar" target="">Ver mi Orden</a>
                    </div>
                `,
                showConfirmButton: false,
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: false,
                showCloseButton: true
            });
        })
    })
}
eventoFinalizarCompra();