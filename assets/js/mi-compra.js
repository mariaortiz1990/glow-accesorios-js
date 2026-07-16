//Detalle de Mi Orden
function ordenHTML () {
    const numeroPedidoContainer = document.querySelector('.numero-pedido');
    const parametroUrlProductoActual = new URLSearchParams(window.location.search);
    const urlParametroID = parametroUrlProductoActual.get('ordenId');
    const ordenes = JSON.parse(localStorage.getItem("Ordenes"))
    const numeroPedido = document.createElement('p');
    numeroPedido.innerHTML = `
        Orden #${urlParametroID}
    `;
    numeroPedidoContainer.appendChild(numeroPedido);
    const ordenActual = ordenes[urlParametroID];
    let item = 0;
    let totalOrden = 0;
    const total = document.createElement('p');
    const productosUnicos = new Map();
    ordenActual.forEach(item => {
            productosUnicos.set(item.id_producto, item);
        });
    const cantidadProducto = (idProducto) => {
        return ordenActual.filter(producto => producto.id_producto === idProducto).length;
    }    
    const detalleProductosContainer = document.querySelector('.tabla-mi-compra-filas');
    productosUnicos.forEach (producto => {
        const detalleProductos = document.createElement('tr');
        const numeroItem = item + 1;
        item = item + 1;
        const cantidad = cantidadProducto(producto.id_producto);
        const subtotalPorProducto = producto.precio * cantidad;
        totalOrden = totalOrden + subtotalPorProducto;
        detalleProductos.innerHTML = `
            <th scope="row">${numeroItem}</th>
            <td>
                <a href="./producto.html?id=${producto.id_producto}&producto=${producto.nombre_producto}" data-id-producto="${producto.id_producto}" class="imagen-producto-carrito" aria-current="true">
                    <img src="./${producto.imagen_producto}" class="float-left rounded" alt="${producto.nombre_producto}}">
                </a>
            </td>
            <td>${producto.nombre_producto}</td>
            <td>${cantidad}</td>
            <td>${producto.precio}</td>
            <td>${subtotalPorProducto}</td>                  
        `;
        detalleProductosContainer.appendChild(detalleProductos);
    })
    const totalGeneralOrden = document.getElementById('orden-total');
        totalGeneralOrden.innerHTML = '';
        total.innerHTML = `
            <div class="carrito-footer d-flex flex-column">
                <span>TOTAL $${totalOrden}</span>
            </div>
        `;
        totalGeneralOrden.appendChild(total); 
}
ordenHTML();