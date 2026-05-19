// Toggle dropdown menu visibility with smart positioning
export function toggleDropdown(dropdown) {
    const isCurrentlyActive = dropdown.classList.contains("active");

    document.querySelectorAll(".dropdown").forEach((d) => {
        if (d !== dropdown) d.classList.remove("active");
    });

    dropdown.classList.toggle("active");

    if (!isCurrentlyActive) {
        positionDropdown(dropdown);
    }
}

// Calculate and apply optimal dropdown position
function positionDropdown(dropdown) {
    const menu = dropdown.querySelector(".dropdown-menu");
    if (!menu) return;

    const rect = dropdown.getBoundingClientRect();
    const menuHeight = menu.offsetHeight;
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    menu.classList.remove("dropdown-menu-top", "dropdown-menu-bottom");

    if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        menu.classList.add("dropdown-menu-top");
    } else {
        menu.classList.add("dropdown-menu-bottom");
    }
}

// Initialize dropdown click outside listener
export function initDropdowns() {
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".dropdown")) {
            document
                .querySelectorAll(".dropdown")
                .forEach((d) => d.classList.remove("active"));
        }
    });

    window.addEventListener("scroll", repositionActiveDropdowns, true);
    window.addEventListener("resize", repositionActiveDropdowns);
}

// Reposition active dropdowns on scroll or resize
function repositionActiveDropdowns() {
    document.querySelectorAll(".dropdown.active").forEach((dropdown) => {
        positionDropdown(dropdown);
    });
}
