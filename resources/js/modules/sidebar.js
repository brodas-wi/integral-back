/**
 * Sidebar toggle functionality for mobile/responsive layouts
 */
export function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const openSidebar = document.getElementById("openSidebar");
    const closeSidebar = document.getElementById("closeSidebar");

    if (!sidebar || !sidebarOverlay) {
        return;
    }

    function toggleSidebar() {
        sidebar.classList.toggle("-translate-x-full");
        sidebarOverlay.classList.toggle("hidden");
    }

    function closeSidebarMenu() {
        sidebar.classList.add("-translate-x-full");
        sidebarOverlay.classList.add("hidden");
    }

    openSidebar?.addEventListener("click", toggleSidebar);
    closeSidebar?.addEventListener("click", toggleSidebar);
    sidebarOverlay?.addEventListener("click", toggleSidebar);

    // Close sidebar on ESC key
    document.addEventListener("keydown", (e) => {
        if (
            e.key === "Escape" &&
            !sidebar.classList.contains("-translate-x-full")
        ) {
            closeSidebarMenu();
        }
    });

    // Close sidebar when clicking on navigation links (mobile only)
    if (window.innerWidth < 1024) {
        const sidebarLinks = sidebar.querySelectorAll(".sidebar-link");
        sidebarLinks.forEach((link) => {
            link.addEventListener("click", closeSidebarMenu);
        });
    }
}
