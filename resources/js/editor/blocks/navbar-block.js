export const initializeNavbarBlock = (editor) => {
  // 1. Añadir el bloque al panel de bloques
  editor.Blocks.add("navbar", {
    id: "navbar",
    label: "Barra de navegación",
    category: "Navegación",
    media: iconNavbar,
    attributes: { class: "fa fa-bars" },
    content: NAVBAR,
    style: NAVBAR_STYLES,
    activate: true,
  });

  // 2. Inicializar el menú móvil cuando el bloque se inserta o el editor está listo
  editor.on("component:add", (model) => {
    if (model.get("id") === "navbar") {
      setTimeout(() => {
        initNavbarMobileMenu();
      }, 100);
    }
  });

  // Por si ya existe al cargar
  setTimeout(() => {
    initNavbarMobileMenu();
  }, 300);
};