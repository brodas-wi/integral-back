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

    function loadOpenGroup() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (typeof parsed === "string") return parsed;
            if (parsed && typeof parsed === "object") {
                return Object.keys(parsed).find((key) => parsed[key] === true) || null;
            }
            return null;
        } catch {
            return null;
        }
    }

    function saveOpenGroup(name) {
        try {
            if (name) localStorage.setItem(STORAGE_KEY, JSON.stringify(name));
            else localStorage.removeItem(STORAGE_KEY);
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

        if (isOpen) {
            closeGroup(group);
            saveOpenGroup(null);
            return;
        }

        sidebar.querySelectorAll(".sidebar-group.is-open").forEach((other) => {
            if (other !== group) closeGroup(other);
        });
        openGroup(group);
        saveOpenGroup(group.dataset.group);
    }

    const groups = sidebar.querySelectorAll(".sidebar-group");
    const activeGroup = Array.from(groups).find((group) => group.dataset.open === "true");
    const initialName = activeGroup ? activeGroup.dataset.group : loadOpenGroup();

    if (activeGroup) saveOpenGroup(activeGroup.dataset.group);

    groups.forEach((group) => {
        const content = group.querySelector(".sidebar-group-content");

        if (!content) return;

        const shouldOpen = group.dataset.group === initialName;

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
