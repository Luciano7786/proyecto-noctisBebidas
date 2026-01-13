document.addEventListener('DOMContentLoaded', () => {
    // Crear el botón
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'btn-scroll-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.ariaLabel = 'Volver arriba';
    document.body.appendChild(scrollBtn);

    // Lógica de visibilidad
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    };

    // Event Loop Throttling básico
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                toggleVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Acción de Click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
