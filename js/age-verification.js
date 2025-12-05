document.addEventListener("DOMContentLoaded", () => {
    // Lógica de Verificación de Edad
    const ageModal = document.getElementById('age-verification-modal');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    if (ageModal) {
        // Verificar si la edad ya está confirmada
        if (!localStorage.getItem('ageVerified')) {
            // Mostrar modal si no está verificado
            document.body.style.overflow = 'hidden';
            ageModal.classList.remove('oculto');
        } else {
            ageModal.classList.add('oculto');
        }

        if (btnYes) {
            btnYes.addEventListener('click', () => {
                localStorage.setItem('ageVerified', 'true');
                ageModal.classList.add('oculto');
                document.body.style.overflow = 'auto'; // Restaurar scroll
            });
        }

        if (btnNo) {
            btnNo.addEventListener('click', () => {
                // Redirigir a Google o mostrar un mensaje
                window.location.href = 'https://www.google.com';
            });
        }
    }
});
