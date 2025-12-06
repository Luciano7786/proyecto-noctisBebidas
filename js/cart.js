const Cart = {
    items: [],
    
    init() {
        // Cargar desde localStorage
        const saved = localStorage.getItem('noctis_cart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
        this.renderUI();
        this.updateBadge(); // Actualización inicial del badge
    },

    addItem(product) {
        const existing = this.items.find(item => item.title === product.title);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
        this.updateBadge();
        
        // Actualización en tiempo real: Si el drawer está abierto, re-renderizar items
        const drawer = document.getElementById('cajon-carrito');
        if (drawer && drawer.classList.contains('abierto')) {
            this.renderItems();
        }
    },

    removeItem(title) {
        this.items = this.items.filter(item => item.title !== title);
        this.save();
        this.renderItems();
        this.updateBadge();
    },

    clearAll() {
        this.items = [];
        this.save();
        this.renderItems();
        this.updateBadge();
    },

    updateQuantity(title, change) {
        const item = this.items.find(i => i.title === title);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(title);
            } else {
                this.save();
                this.renderItems();
                this.updateBadge(); // Actualizar badge si la cantidad total cambia
            }
        }
    },

    save() {
        localStorage.setItem('noctis_cart', JSON.stringify(this.items));
        // ¿También disparar un evento para que otras pestañas/componentes lo sepan?
    },

    toggleCart() {
        const cartDrawer = document.getElementById('cajon-carrito');
        cartDrawer.classList.toggle('abierto');
        if (cartDrawer.classList.contains('abierto')) {
            this.renderItems();
        }
    },

    renderUI() {
        if (document.getElementById('btn-icono-carrito')) return;

        // Crear Ícono Flotante
        const btn = document.createElement('div');
        btn.id = 'btn-icono-carrito';
        btn.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <span id="badge-carrito">0</span>
        `;
        document.body.appendChild(btn);

        // Crear Drawer
        const drawer = document.createElement('div');
        drawer.id = 'cajon-carrito';
        drawer.innerHTML = `
            <div class="encabezado-carrito">
                <h2>Tu Compra</h2>
                <div class="acciones-encabezado">
                    <button id="papelera-vaciar-carrito" title="Vaciar Carrito"><i class="fas fa-trash-alt"></i></button>
                    <button id="cerrar-carrito">&times;</button>
                </div>
            </div>
            <div class="items-carrito" id="contenedor-items-carrito">
                <!-- Items go here -->
                <p class="msg-vacio">Tu carrito está vacío.</p>
            </div>
            <div class="pie-carrito">
                <div class="total-carrito">
                    <span>Total:</span>
                    <span id="precio-total-carrito">$0</span>
                </div>
                <button class="boton-primario" id="btn-finalizar-compra">Finalizar Compra</button>
            </div>
        `;
        document.body.appendChild(drawer);

        // Eventos
        btn.addEventListener('click', () => this.toggleCart());
        document.getElementById('cerrar-carrito').addEventListener('click', () => this.toggleCart());
        document.getElementById('papelera-vaciar-carrito').addEventListener('click', () => {
             if (this.items.length === 0) {
                 if (typeof showToast === 'function') {
                     showToast('Tu carrito no tiene bebidas para vaciar.');
                 } else {
                     alert('Tu carrito no tiene bebidas para vaciar.');
                 }
                 return;
             }
             if(confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                 this.clearAll();
             }
        });
        
        // Redirección al Checkout
        const checkoutBtn = document.getElementById('btn-finalizar-compra');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.items.length > 0) {
                    window.location.href = 'checkout.html';
                }
            });
        }
    },

    renderItems() {
        const container = document.getElementById('contenedor-items-carrito');
        const totalEl = document.getElementById('precio-total-carrito');
        
        const trashBtn = document.getElementById('papelera-vaciar-carrito');
        if (trashBtn) {
            trashBtn.style.opacity = this.items.length === 0 ? '0.5' : '1';
            trashBtn.style.cursor = this.items.length === 0 ? 'not-allowed' : 'pointer';
        }

        if (this.items.length === 0) {
            container.innerHTML = '<p class="msg-vacio">Tu carrito está vacío.</p>';
            totalEl.innerText = '$0';
            return;
        }

        container.innerHTML = '';
        let total = 0;

        this.items.forEach(item => {
            // Limpiar string de precio a número (remover $ y puntos)
            const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
            total += priceNum * item.quantity;

            const itemEl = document.createElement('div');
            itemEl.className = 'item-carrito';
            itemEl.innerHTML = `
                <div class="detalles-item-carrito">
                    <h4>${item.title}</h4>
                    <span class="precio-item-carrito">${item.price}</span>
                </div>
                <div class="controles-carrito">
                    <button class="btn-cantidad menos">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-cantidad mas">+</button>
                </div>
            `;
            
            // Eventos para cantidad (usando clausura para mantener referencia al título)
            itemEl.querySelector('.menos').addEventListener('click', () => this.updateQuantity(item.title, -1));
            itemEl.querySelector('.mas').addEventListener('click', () => this.updateQuantity(item.title, 1));
            
            container.appendChild(itemEl);
        });

        totalEl.innerText = `$${total.toLocaleString()}`;
    },

    updateBadge() {
        const badge = document.getElementById('badge-carrito');
        if (badge) {
            const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
            badge.innerText = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Cart.init();

    Cart.init();

    // Enganchar lógica existente de "Agregar al Carrito" (Toast) para agregar también al Carrito real
    // Ten cuidado de no duplicar listeners si main.js los agrega.
    // En su lugar, main.js llama a 'mostrarToast'. ¿Podemos exponer un ayudante global 'agregarAlCarrito'?
    // O adjuntar listeners específicos aquí.
    
    // Mejor estrategia: ¿Adjuntar listener a una clase común o anular el comportamiento del toast?
    // Modifiquemos los listeners de click en main.js para llamar a Cart.addItem()
    // O: ya que main.js agrega listener de click a .tarjeta-oferta, podemos agregar OTRO listener aquí.
    
    // [Eliminado] La acción de click en la tarjeta ya no debe agregar al carrito directament.
    // Solo a través del modal de vista rápida.

    // ¿También enganchar el botón "Agregar al Carrito" de Vista Rápida?
    // quick-view.js genera el botón dinámicamente.
    // Podemos observar el DOM o agregar una función global.
    window.addToCartGlobal = (title, price) => {
        Cart.addItem({ title, price });
    };
});
