document.addEventListener("DOMContentLoaded", () => {
  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".fade-in-up");
  animatedElements.forEach((el) => observer.observe(el));

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('active');

        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('active');
            links.forEach(link => {
                link.style.animation = '';
            });
        });
    });


    // Age Verification Logic
    const ageModal = document.getElementById('age-verification-modal');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    // Check if age is already verified
    if (!localStorage.getItem('ageVerified')) {
        // Show modal if not verified
        // We use a small timeout to ensure the transition works if we were to add one on load
        // But since it's fixed, it just appears.
        // If we wanted to prevent scrolling while modal is open:
        document.body.style.overflow = 'hidden';
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
});
