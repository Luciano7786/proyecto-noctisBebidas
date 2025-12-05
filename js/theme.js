document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el botón de toggle o crearlo
    // Asumiremos que un botón con id="theme-toggle" existe o lo inyectamos.
    
    // Inyectar botón en navbar si no existe (más simple para mantenimiento)
    const navContainer = document.querySelector('.contenedor-nav');
    if (navContainer && !document.getElementById('theme-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.className = 'boton-alternar-tema';
        toggleBtn.ariaLabel = 'Cambiar Tema';
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; 
// Estándar: Ícono de Luna -> Cambiar a Oscuro. Ícono de Sol -> Cambiar a Claro.
        // Entonces:
        // Modo Claro Activo -> Mostrar Luna (para ir a Oscuro).
        // Modo Oscuro Activo (Por defecto) -> Mostrar Sol (para ir a Claro).
        
        // Insertar antes del hamburguesa
        const hamburger = document.querySelector('.hamburguesa');
        if (hamburger) {
            navContainer.insertBefore(toggleBtn, hamburger);
        } else {
            navContainer.appendChild(toggleBtn);
        }
        
        // Lógica
        const body = document.body;
        const icon = toggleBtn.querySelector('i');
        
        // Verificar local storage
        const currentTheme = localStorage.getItem('noctis_theme');
        if (currentTheme === 'light') {
            body.classList.add('tema-claro');
            icon.className = 'fas fa-moon'; // En modo claro, mostrar luna
        } else {
            icon.className = 'fas fa-sun'; // En modo oscuro, mostrar sol
        }
        
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('tema-claro');
            
            if (body.classList.contains('tema-claro')) {
                localStorage.setItem('noctis_theme', 'light');
                icon.className = 'fas fa-moon';
                // Clase de animación opcional
                icon.style.transform = 'rotate(360deg)';
                setTimeout(() => icon.style.transform = '', 300);
            } else {
                localStorage.setItem('noctis_theme', 'dark');
                icon.className = 'fas fa-sun';
                icon.style.transform = 'rotate(360deg)';
                setTimeout(() => icon.style.transform = '', 300);
            }
        });
    }
});
