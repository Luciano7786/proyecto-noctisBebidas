function openQuickView(title, price, imageSrc, description) {
    // Verificar si el contenedor del modal existe, si no, crearlo
    let modal = document.getElementById('modal-vista-rapida');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-vista-rapida';
        modal.className = 'modal-vista-rapida';
        modal.innerHTML = `
            <div class="contenido-vista-rapida">
                <button class="cerrar-modal">&times;</button>
                <div class="grilla-vista-rapida">
                    <div class="imagen-vista-rapida">
                        <img src="" alt="Imagen del Producto">
                    </div>
                    <div class="detalles-vista-rapida">
                        <h2 class="titulo-vista-rapida"></h2>
                        <span class="precio-vista-rapida"></span>
                        <p class="descripcion-vista-rapida"></p>
                        <button class="boton-primario agregar-carrito-rapido">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Lógica de cierre
        modal.querySelector('.cerrar-modal').addEventListener('click', () => {
            modal.classList.remove('activo');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('activo');
        });
        
         // Agregar al carrito desde el modal
         modal.querySelector('.agregar-carrito-rapido').addEventListener('click', () => {
            const currentTitle = modal.querySelector('.titulo-vista-rapida').innerText;
            const currentPrice = modal.querySelector('.precio-vista-rapida').innerText;
            
             if (typeof showToast === 'function') {
                showToast(`${currentTitle} agregado al carrito`);
             }
             
             // Integrar con el Módulo de Carrito
             if (window.addToCartGlobal) {
                 window.addToCartGlobal(currentTitle, currentPrice);
             }

             modal.classList.remove('activo');
         });
    }

    // Poblar datos
    modal.querySelector('img').src = imageSrc;
    modal.querySelector('.titulo-vista-rapida').innerText = title;
    modal.querySelector('.precio-vista-rapida').innerText = price;
    modal.querySelector('.descripcion-vista-rapida').innerText = description || 'Descripción detallada del producto...';

    // Mostrar modal
    modal.classList.add('activo');
}

document.addEventListener('DOMContentLoaded', () => {
    // Delegamos el evento porque los botones podrían agregarse dinámicamente más tarde
    // o podemos adjuntarlos a tarjetas existentes.
    // Por ahora, agreguemos el botón a las tarjetas existentes vía JS para evitar editar todos los HTMLs manualmente
    // Pero es mejor agregar el listener al contenedor o tarjetas.
    
    // En realidad, inyectemos el botón "Vista Rápida" en todos los elementos .tarjeta-oferta
    const cards = document.querySelectorAll('.tarjeta-oferta');
    cards.forEach(card => {
        // Crear botón
        const btn = document.createElement('button');
        btn.className = 'boton-vista-rapida';
        btn.innerText = 'Vista Rápida';
        btn.innerHTML = '<i class="far fa-eye"></i>'; // ¿Solo ícono o texto? Usemos ícono
        
        // Adjuntar al contenedor de imagen
        const imgContainer = card.querySelector('.imagen-oferta');
        if (imgContainer) {
            imgContainer.appendChild(btn);
            
            // Evento click para Vista Rápida
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevenir que se dispare el click del toast de la tarjeta
                const title = card.querySelector('h3').innerText;
                const price = card.querySelector('.etiqueta-precio').innerText;
                const imgSrc = card.querySelector('img').src;
                const desc = card.querySelector('p').innerText;
                
                openQuickView(title, price, imgSrc, desc);
            });
        }
    });
});
