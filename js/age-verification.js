document.addEventListener("DOMContentLoaded", () => {
    // Age Verification Logic
    const ageModal = document.getElementById('age-verification-modal');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    if (ageModal) {
        // Check if age is already verified
        if (!localStorage.getItem('ageVerified')) {
            // Show modal if not verified
            document.body.style.overflow = 'hidden';
            ageModal.classList.remove('hidden');
        } else {
            ageModal.classList.add('hidden');
        }

        if (btnYes) {
            btnYes.addEventListener('click', () => {
                localStorage.setItem('ageVerified', 'true');
                ageModal.classList.add('hidden');
                document.body.style.overflow = 'auto'; // Restore scrolling
            });
        }

        if (btnNo) {
            btnNo.addEventListener('click', () => {
                // Redirect to Google or show a message
                window.location.href = 'https://www.google.com';
            });
        }
    }
});
