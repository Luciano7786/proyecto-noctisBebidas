document.addEventListener('DOMContentLoaded', () => {
    initProductSorter();
});

function initProductSorter() {
    // Inject Sort Dropdown if not present
    // We will assume the HTML has a specific container .encabezado-ordenamiento inside .seccion .contenedor, OR insert before .grilla-ofertas
    
    // Find where to insert
    const offersGrid = document.querySelector('.grilla-ofertas');
    if (!offersGrid) return; // Not a product page

    // Create Control Container if it doesn't exist
    let controlsContainer = document.querySelector('.controles-ordenamiento');
    if (!controlsContainer) {
        controlsContainer = document.createElement('div');
        controlsContainer.className = 'controles-ordenamiento';
        
        // Insert it before the grid
        offersGrid.parentNode.insertBefore(controlsContainer, offersGrid);
    }

    // Add Select Element
    controlsContainer.innerHTML = `
        <select id="ordenar-productos" class="select-ordenamiento" aria-label="Ordenar productos">
            <option value="default" disabled selected>Ordenar por...</option>
            <option value="az">Alfabético (A-Z)</option>
            <option value="za">Alfabético (Z-A)</option>
            <option value="menor-mayor">Precio: Menor a Mayor</option>
            <option value="mayor-menor">Precio: Mayor a Menor</option>
        </select>
    `;

    const sortSelect = document.getElementById('ordenar-productos');
    sortSelect.addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });
}

function sortProducts(criteria) {
    const grid = document.querySelector('.grilla-ofertas');
    const cards = Array.from(grid.querySelectorAll('.tarjeta-oferta'));

    cards.sort((a, b) => {
        const titleA = a.querySelector('h3').innerText.toLowerCase();
        const titleB = b.querySelector('h3').innerText.toLowerCase();
        
        // Parse Price: Remove '$', '.', and trim
        const priceTextA = a.querySelector('.etiqueta-precio, .precio').innerText.replace('$', '').replace(/\./g, '').trim();
        const priceTextB = b.querySelector('.etiqueta-precio, .precio').innerText.replace('$', '').replace(/\./g, '').trim();
        
        const priceA = parseFloat(priceTextA);
        const priceB = parseFloat(priceTextB);

        switch (criteria) {
            case 'az':
                return titleA.localeCompare(titleB);
            
            case 'za':
                return titleB.localeCompare(titleA);

            case 'menor-mayor':
                return priceA - priceB;
            
            case 'mayor-menor':
                return priceB - priceA;
            
            default:
                return 0;
        }
    });

    // Re-append sorted cards with animation
    grid.innerHTML = '';
    cards.forEach((card, index) => {
        card.style.animation = 'none'; // Reset animation
        card.offsetHeight; // Trigger reflow
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
        grid.appendChild(card);
    });
}
