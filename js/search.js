document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('busqueda-producto');

    // Índice simple de productos clave para búsqueda global
    // En una app real, esto vendría de un JSON o API.
    const globalProducts = [
        // Alcoholicas
        { name: 'Jägermeister', url: 'alcoholicas.html', category: 'licor hierbas' },
        { name: 'Fernet Branca', url: 'alcoholicas.html', category: 'aperitivo hierbas' },
        { name: 'Smirnoff', url: 'alcoholicas.html', category: 'vodka' },
        { name: 'Sernova', url: 'alcoholicas.html', category: 'vodka' },
        { name: 'Gordon\'s Gin Pink', url: 'alcoholicas.html', category: 'gin ginebra rosa' },
        { name: 'Carpano', url: 'alcoholicas.html', category: 'vermouth rosso vermut' },
        { name: 'Santa Julia', url: 'alcoholicas.html', category: 'vino blanco dulce chenin' },
        { name: 'Corona', url: 'alcoholicas.html', category: 'cerveza porron' },
        { name: 'Amargo Obrero', url: 'alcoholicas.html', category: 'aperitivo' },
        { name: 'Jack Daniel\'s', url: 'index.html#ofertas', category: 'whisky bourbon tenessee' },
        { name: 'Red Label', url: 'index.html#ofertas', category: 'whisky scotch johnnie walker' },

        // Sin Alcohol
        { name: 'Speed Unlimited', url: 'sin-alcohol.html', category: 'energizante energy' },
        { name: 'Red Bull', url: 'sin-alcohol.html', category: 'energizante energy' },
        { name: 'Coca Cola', url: 'sin-alcohol.html', category: 'gaseosa cola' },
        { name: 'Agua Tónica', url: 'sin-alcohol.html', category: 'gaseosa paso de los toros' },
        { name: 'Monster Energy', url: 'sin-alcohol.html', category: 'energizante' },

        // Combos
        { name: 'Combo Smirnoff + Sprite', url: 'combos.html', category: 'vodka hielo' },
        { name: 'Combo Smirnoff + Red Bull', url: 'combos.html', category: 'vodka energizante' },
        { name: 'Combo Gordon\'s Pink', url: 'combos.html', category: 'gin tonica' },
        { name: 'Combo Carpano', url: 'combos.html', category: 'vermouth pomelo' },
        { name: 'Corona 4x3', url: 'combos.html', category: 'cerveza promo pack' },
        { name: 'Combo Fernet + Coca', url: 'combos.html', category: 'aperitivo hielo' },
        { name: 'Combo Sernova', url: 'combos.html', category: 'vodka sprite' },
        { name: 'Combo Amargo Obrero', url: 'combos.html', category: 'aperitivo pomelo' }
    ];

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.tarjeta-oferta');
            let visibleCount = 0;

            // 1. Filtrar tarjetas locales (si las hay)
            cards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const desc = card.querySelector('p').innerText.toLowerCase();

                if (title.includes(term) || desc.includes(term)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // 2. Manejar Sugerencias Globales si no hay resultados locales
            const grid = document.querySelector('.grilla-ofertas');
            let feedbackMsg = document.getElementById('msg-busqueda-feedback');

            if (!feedbackMsg) {
                feedbackMsg = document.createElement('div');
                feedbackMsg.id = 'msg-busqueda-feedback';
                feedbackMsg.style.gridColumn = '1 / -1';
                feedbackMsg.style.padding = '20px';
                feedbackMsg.style.textAlign = 'center';
                feedbackMsg.style.color = 'var(--text-secondary)';
                if (grid) grid.appendChild(feedbackMsg);
            }

            if (term === '') {
                feedbackMsg.innerHTML = '';
                feedbackMsg.style.display = 'none';
                return;
            }

            if (visibleCount === 0) {
                // Buscar en índice global
                const globalMatches = globalProducts.filter(p =>
                    p.name.toLowerCase().includes(term) ||
                    p.category.toLowerCase().includes(term)
                );

                if (globalMatches.length > 0) {
                    const links = globalMatches.slice(0, 3).map(p => `<a href="${p.url}" style="color: var(--accent-gold); text-decoration: underline;">${p.name}</a>`).join(', ');
                    feedbackMsg.innerHTML = `<p>No lo encontramos en esta página, pero tenemos: ${links} en otras secciones.</p>`;
                } else {
                    feedbackMsg.innerHTML = `<p>No encontramos productos que coincidan con "${term}". Intenta con "Fernet", "Vodka" o "Combos".</p>`;
                }
                feedbackMsg.style.display = 'block';
            } else {
                feedbackMsg.style.display = 'none';
            }
        });
    }
});
