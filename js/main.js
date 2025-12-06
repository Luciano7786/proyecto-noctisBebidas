document.addEventListener('DOMContentLoaded', () => {

  // Intersection Observer para Animaciones de Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Animar solo una vez
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".aparecer-arriba, .aparecer");
  animatedElements.forEach((el) => observer.observe(el));

  // Scroll Suave para Enlaces Ancla
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      // Solo prevenir el comportamiento por defecto si es un enlace hash en la misma página
      if (href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
            });
          }
      }
    });
  });

    // Toggle de Menú Móvil
    const hamburger = document.querySelector('.hamburguesa');
    const navLinks = document.querySelector('.enlaces-nav');
    const links = document.querySelectorAll('.enlaces-nav li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-activo');
            hamburger.classList.toggle('activo');

            // Animar Enlaces
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Cerrar menú al hacer click en un enlace
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-activo');
                hamburger.classList.remove('activo');
                links.forEach(link => {
                    link.style.animation = '';
                });
            });
        });
    }

    // Notificación Toast para Tarjetas de Oferta
    // [Modificado] El click en la tarjeta ya no agrega al carrito, por lo tanto no mostramos toast aquí.
    // La funcionalidad se mueve exclusivamente al modal de vista rápida.
    const offerCards = document.querySelectorAll('.tarjeta-oferta');
    offerCards.forEach(card => {
        // card.style.cursor = 'pointer'; // Roto el enlace directo
        // Logic removed
    });


    // Lógica de Skeleton Loading
    const offerImages = document.querySelectorAll('.imagen-oferta');
    
    offerImages.forEach(container => {
        // Verificar si la imagen ya está cargada
        const img = container.querySelector('img');
        
        if (img) {
             if (img.complete) {
                container.classList.remove('cargando-esqueleto');
             } else {
                container.classList.add('cargando-esqueleto');
                img.addEventListener('load', () => {
                    container.classList.remove('cargando-esqueleto');
                    img.style.opacity = '1'; // Efecto de aparición gradual
                });
             }
        }
    });

});
