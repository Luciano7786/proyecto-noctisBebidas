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
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    Tu destino premium para las mejores bebidas, entregadas en la puerta de tu casa.
                </p>
            </div>
            
            <p class="modal-descripcion">
                Desarrollado con <i class="fas fa-heart heart-icon"></i> usando <strong>Vanilla JS</strong> por<br>
                <strong>Luciano Cirvini</strong>
            </p>

            <span class="modal-version">v1.0.0</span>

            <a href="https://lucianojoaquincirvini.web.app/" target="_blank" class="btn-portfolio">
                Visitar Portfolio <i class="fas fa-external-link-alt"></i>
            </a>

            <div class="tech-stack">
                <h4>Tecnologías Utilizadas</h4>
                <div class="stack-icons">
                    <i class="fab fa-html5 stack-icon html" title="HTML5"></i>
                    <i class="fab fa-css3-alt stack-icon css" title="CSS3"></i>
                    <i class="fab fa-js stack-icon js" title="JavaScript"></i>
                    <i class="fas fa-fire stack-icon firebase" title="Firebase"></i>
                </div>
            </div>
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
