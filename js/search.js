document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('busqueda-producto');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.tarjeta-oferta');
            let hasResults = false;

            cards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const desc = card.querySelector('p').innerText.toLowerCase();
                
                if (title.includes(term) || desc.includes(term)) {
                    card.style.display = 'block';
                    // Re-trigger animation if needed? 
                    // Better to just show it.
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });

            // Manejar mensaje de "No hay resultados"
            const grid = document.querySelector('.grilla-ofertas');
            let noResultsMsg = document.getElementById('msg-sin-resultados');
            
            if (!hasResults && term !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('p');
                    noResultsMsg.id = 'msg-sin-resultados';
                    noResultsMsg.innerText = 'No se encontraron productos que coincidan con tu búsqueda.';
                    noResultsMsg.style.textAlign = 'center';
                    noResultsMsg.style.gridColumn = '1 / -1';
                    noResultsMsg.style.padding = '20px';
                    noResultsMsg.style.color = 'var(--text-secondary)';
                    grid.appendChild(noResultsMsg);
                }
            } else {
                if (noResultsMsg) {
                    noResultsMsg.remove();
                }
            }
        });
    }
});
