function showToast(message, type = 'exito') {
    // Verificar si el contenedor de toast existe, si no, crearlo
    let container = document.querySelector('.contenedor-toast');
    if (!container) {
        container = document.createElement('div');
        container.className = 'contenedor-toast';
        document.body.appendChild(container); // Adjuntar al body, estilos manejados en CSS
    }

    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = `notificacion notificacion-${type} aparecer-arriba`;
    
    // Ícono basado en el tipo
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-times-circle';
    if (type === 'info') icon = 'fa-info-circle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    // Adjuntar al contenedor
    container.appendChild(toast);

    // Forzar reflow para animación
    void toast.offsetWidth;
    toast.classList.add('visible');

    // Remover después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300); // Esperar transición
    }, 3000);
}
