document.addEventListener('DOMContentLoaded', () => {
    injectAboutModal();
    setupAboutEventListeners();
});

function injectAboutModal() {
    // Check if modal already exists
    if (document.getElementById('modal-acerca')) return;

    const modalHTML = `
    <div id="modal-acerca" class="modal-acerca">
        <div class="contenido-modal-acerca">
            <button id="cerrar-modal-acerca" class="cerrar-modal-acerca"><i class="fas fa-times"></i></button>
            <div class="header-modal-acerca">
                <h2>Acerca de NOCTIS</h2>
            </div>
            
            <p class="modal-descripcion">
                Fundada en el corazón de Mendoza, <strong>NOCTIS</strong> redefine la experiencia de disfrutar bebidas premium.<br><br>
                Somos proveedores de una amplia variedad de licores, vinos y destilados, entregados directamente a tu puerta con un servicio inigualable.<br><br>
                Más que una tienda, somos tus anfitriones en el arte del buen beber.
            </p>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function setupAboutEventListeners() {
    const openBtn = document.getElementById('btn-abrir-acerca');
    const modal = document.getElementById('modal-acerca');
    const closeBtn = document.getElementById('cerrar-modal-acerca');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('activo');
        });
    } else {
        // Warning if button is missing in HTML (User might not have added it yet)
        console.warn('Botón "Acerca" no encontrado en el DOM.');
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('activo');
        });
    }

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('activo');
            }
        });
    }
}
