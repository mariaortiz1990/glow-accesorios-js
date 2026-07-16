//Petición Categorías- Página Inicio
const cardsCategorias = document.getElementById('card-categorias');

const peticionCategorias = () => {
    fetch('./productos.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            const categoriasUnicas = new Map();
            datos.forEach(item => {
                categoriasUnicas.set(item.categoria.id_categoria, item.categoria);
            });
            categoriasUnicas.forEach(categoria => {
                const card = document.createElement('div');
                card.classList.add('col');
                card.innerHTML = `
                    <div class="card h-100 card-categorias-inicio">
                        <a href="./categoria.html?id=${categoria.id_categoria}&categoria=${categoria.nombre_categoria}" class="" data-id-categoria="${categoria.id_categoria}">                          
                            <img src="./${categoria.imagen_categoria}" class="card-img-top" alt="${categoria.nombre_categoria}">
                            <div class="card-body">
                                <h5 class="card-title">${categoria.nombre_categoria}</h5>
                            </div>
                        </a>

                    </div>
                `;
                cardsCategorias.appendChild(card);
            });

        })
    .catch(() => {
        cardsCategorias.innerHTML = `
            <p class="text-center text-danger w-100 fw-bold">Ha ocurrido un error inesperado! Por favor intenta nuevamente.</p>   
        `; 
    })
}

peticionCategorias();

