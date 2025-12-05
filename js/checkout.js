document.addEventListener('DOMContentLoaded', () => {
    const checkoutList = document.getElementById('lista-checkout');
    const checkoutTotal = document.getElementById('total-checkout');
    const confirmBtn = document.getElementById('btn-confirmar-pedido');

    // Cargar Items directamente desde local storage ya que el módulo Cart podría no ser necesario aquí,
    // o podríamos reutilizar la lógica. Por simplicidad, leemos directamente.
    const saved = localStorage.getItem('noctis_cart');
    let items = [];
    
    if (saved) {
        items = JSON.parse(saved);
    }

    if (items.length === 0) {
        checkoutList.innerHTML = '<p class="msg-vacio">Tu carrito está vacío. <a href="index.html">Volver a la tienda</a></p>';
        if(confirmBtn) confirmBtn.disabled = true;
        return;
    }

    // Renderizar Items
    let total = 0;
    
    items.forEach(item => {
        // Limpiar string de precio a número
        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
        const subtotal = priceNum * item.quantity;
        total += subtotal;

        const itemEl = document.createElement('div');
        itemEl.className = 'item-checkout';
        itemEl.innerHTML = `
            <div class="info-item">
                <h4>${item.title}</h4>
                <p>Cantidad: ${item.quantity} x ${item.price}</p>
            </div>
            <div class="subtotal-item">
                $${subtotal.toLocaleString()}
            </div>
        `;
        checkoutList.appendChild(itemEl);
    });

    checkoutTotal.innerText = `$${total.toLocaleString()}`;

    // Confirmar Pedido (Integración con WhatsApp para toque "Senior")
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            let message = "Hola NOCTIS, quiero confirmar mi pedido:%0A%0A";
            items.forEach(item => {
                message += `- ${item.quantity}x ${item.title} (${item.price})%0A`;
            });
            message += `%0ATotal: $${total.toLocaleString()}`;
            message += "%0A%0A¡Muchas gracias!";

            const whatsappUrl = `https://wa.me/5492611234567?text=${message}`; // Replace with actual number if provided
            window.open(whatsappUrl, '_blank');
            
            // Optional: Clear cart after successful checkout "click"
            // localStorage.removeItem('noctis_cart'); 
        });
    }
});
