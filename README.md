# 🍷 NOCTIS - Bebidas & Experiencias Premium

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![Status](https://img.shields.io/badge/status-active-success)

## 📄 Descripción del Proyecto

**NOCTIS** es una plataforma web moderna y elegante diseñada para la venta y exhibición de bebidas alcohólicas, combos y productos premium. El proyecto se centra en ofrecer una **Experiencia de Usuario (UX)** superior mediante un diseño sofisticado (modo oscuro por defecto), transiciones suaves y funcionalidades interactivas avanzadas.

El objetivo es no solo vender productos, sino "curar experiencias" para clientes exigentes.

## ✨ Características Principales

- **Diseño Responsive Premium**: Interfaz adaptable a móviles, tablets y escritorio, con un diseño "Glassmorphism" y estética minimalista.
- **Carrito de Compras Persistente**:
  - Los productos seleccionados se guardan automáticamente (LocalStorage).
  - Actualización en tiempo real de totales y cantidades.
  - Botón de "Limpiar Carrito" con confirmación.
  - Drawer lateral deslizante para gestionar la compra sin salir de la navegación.
- **Búsqueda y Filtrado en Tiempo Real**: Barra de búsqueda inteligente que filtra productos instantáneamente mientras escribes.
- **Vista Rápida (Quick View)**: Modal interactivo para ver detalles del producto sin recargar la página.
- **Checkout con WhatsApp**: Generación automática de un mensaje de pedido detallado para enviar directamente por WhatsApp, facilitando la venta personalizada.
- **Tema Claro/Oscuro (Dark/Light Mode)**:
  - Switch interactivo con animaciones.
  - Persistencia de preferencia de usuario.
  - Contraste optimizado para legibilidad perfecta en ambos modos.
- **Skeleton Loading**: Carga progresiva de imágenes para mejorar la percepción de velocidad.
- **Verificación de Edad**: Modal de entrada para cumplir con normativas legales.

## 🛠️ Tecnologías Utilizadas

El proyecto está construido utilizando tecnologías web estándar, sin dependencias pesadas de frameworks, garantizando **alto rendimiento** y **facilidad de mantenimiento**.

- **HTML5 Semántico**: Estructura limpia y accesible.
- **CSS3 Moderno**:
  - **Variables CSS (Custom Properties)** para gestión de temas y consistencia.
  - **Flexbox y Grid** para layouts complejos.
  - **Animaciones Keyframe** para interacciones y transiciones.
  - Diseño modular (archivos CSS separados por componentes).
- **JavaScript (ES6+)**:
  - Lógica modular (`cart.js`, `search.js`, `theme.js`, etc.).
  - Manipulación eficiente del DOM.
  - Uso de `LocalStorage` para persistencia de datos.
- **Font Awesome**: Para iconografía vectorial escalable.
- **Google Fonts**: Tipografías 'Outfit' y 'Playfair Display' para la identidad de marca.

## 📂 Estructura del Proyecto

```text
proyecto-bebidas/
├── assets/             # Imágenes y recursos estáticos
├── css/                # Estilos modulares
│   ├── components/     # Estilos de componentes (navbar, footer, cart, cards...)
│   ├── pages/          # Estilos específicos de página (home, checkout...)
│   └── global.css      # Variables y estilos base
├── js/                 # Lógica JavaScript modular
│   ├── cart.js         # Lógica del carrito de compras
│   ├── checkout.js     # Lógica de la página de resumen
│   ├── main.js         # Scripts generales e inicialización
│   ├── search.js       # Buscador en tiempo real
│   ├── theme.js        # Cambio de tema Dark/Light
│   └── ...
├── index.html          # Página principal (Landing Page)
├── alcoholicas.html    # Catálogo de bebidas alcohólicas
├── combos.html         # Catálogo de combos
├── sin-alcohol.html    # Catálogo de bebidas sin alcohol
├── checkout.html       # Página de resumen de pedido
├── mantenimiento.html  # Página de "En Mantenimiento"
└── README.md           # Documentación del proyecto
```

## 🚀 Cómo Ejecutar

1.  Clona el repositorio o descarga los archivos.
2.  Abre el archivo `index.html` en tu navegador web favorito (Chrome, Edge, Firefox).
3.  ¡Disfruta de la experiencia NOCTIS!

---

_Desarrollado con pasión por el equipo de NOCTIS._
