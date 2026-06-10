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

    document.addEventListener("keydown", (e) => {
        if (
            e.key === "Escape" &&
            !sidebar.classList.contains("-translate-x-full")
        ) {
            closeSidebarMenu();
        }
    });

    if (window.innerWidth < 1024) {
        sidebar.querySelectorAll(".sidebar-link, .sidebar-child-link").forEach((link) => {
            link.addEventListener("click", closeSidebarMenu);
        });
    }

    const STORAGE_KEY = "cms_sidebar_groups";

    function loadGroupState() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        } catch {
            return {};
        }
    }

    function saveGroupState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // ignore storage errors
        }
    }

    function openGroup(group) {
        const content = group.querySelector(".sidebar-group-content");
        const arrow = group.querySelector(".sidebar-group-arrow");
        if (!content) return;

        content.style.maxHeight = content.scrollHeight + "px";
        group.classList.add("is-open");
        if (arrow) arrow.classList.add("rotate-180");
    }

    function closeGroup(group) {
        const content = group.querySelector(".sidebar-group-content");
        const arrow = group.querySelector(".sidebar-group-arrow");
        if (!content) return;

        content.style.maxHeight = "0px";
        group.classList.remove("is-open");
        if (arrow) arrow.classList.remove("rotate-180");
    }

    function toggleGroup(group) {
        const isOpen = group.classList.contains("is-open");
        const groupName = group.dataset.group;
        const state = loadGroupState();

        if (isOpen) {
            closeGroup(group);
            state[groupName] = false;
        } else {
            openGroup(group);
            state[groupName] = true;
        }

        saveGroupState(state);
    }

    const groups = sidebar.querySelectorAll(".sidebar-group");
    const persistedState = loadGroupState();

    groups.forEach((group) => {
        const groupName = group.dataset.group;
        const serverOpen = group.dataset.open === "true";
        const content = group.querySelector(".sidebar-group-content");

        if (!content) return;

        const shouldOpen =
            serverOpen ||
            (persistedState[groupName] === true);

        if (shouldOpen) {
            content.style.maxHeight = content.scrollHeight + "px";
            group.classList.add("is-open");
            const arrow = group.querySelector(".sidebar-group-arrow");
            if (arrow) arrow.classList.add("rotate-180");
        } else {
            content.style.maxHeight = "0px";
        }

        const btn = group.querySelector(".sidebar-group-btn");
        btn?.addEventListener("click", () => toggleGroup(group));
    });
}
