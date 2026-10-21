function initNavbar(root) {
    if (!root || root.__nbReady || typeof root.querySelector !== "function") return;
    if (!root.querySelector("[id^='nb-root-']")) return;
    root.__nbReady = true;

    const OPEN = "nb-open";
    const BREAKPOINT = 992;
    const doc = root.ownerDocument;
    const win = doc.defaultView || window;
    const controller = new AbortController();
    const signal = controller.signal;

    const setAttr = (el, name, value) => {
        if (el) el.setAttribute(name, value);
    };

    const isEditor = () =>
        doc.documentElement.hasAttribute("data-gjs-canvas") || Boolean(win.__gjseditor);

    const syncOffset = () => {
        const height = root.offsetHeight;
        root.style.setProperty("--nb-offset", height + "px");
        if (!isEditor()) doc.body.style.paddingTop = height + "px";
    };

    const closeDesktop = () => {
        root.querySelectorAll(".nb-nav-item." + OPEN).forEach((item) => {
            item.classList.remove(OPEN);
            setAttr(item.querySelector(".nb-nav-trigger"), "aria-expanded", "false");
        });
    };

    const closeMobile = () => {
        const menu = root.querySelector(".nb-mobile-menu");
        if (menu) menu.classList.remove(OPEN);
        setAttr(root.querySelector(".nb-hamburger"), "aria-expanded", "false");
        root.querySelectorAll(".nb-mobile-item." + OPEN).forEach((item) => {
            item.classList.remove(OPEN);
            setAttr(item.querySelector(".nb-mobile-link"), "aria-expanded", "false");
        });
    };

    const isAlive = () => {
        if (root.isConnected) return true;
        controller.abort();
        return false;
    };

    root.addEventListener(
        "click",
        (event) => {
            const target = event.target;

            const trigger = target.closest(".nb-nav-trigger");
            if (trigger) {
                const item = trigger.closest(".nb-nav-item");
                const wasOpen = item.classList.contains(OPEN);
                closeDesktop();
                if (!wasOpen) {
                    item.classList.add(OPEN);
                    setAttr(trigger, "aria-expanded", "true");
                }
                return;
            }

            const mobileTrigger = target.closest(".nb-mobile-item > .nb-mobile-link");
            if (mobileTrigger) {
                const isOpen = mobileTrigger.parentElement.classList.toggle(OPEN);
                setAttr(mobileTrigger, "aria-expanded", String(isOpen));
                return;
            }

            const hamburger = target.closest(".nb-hamburger");
            if (hamburger) {
                const menu = root.querySelector(".nb-mobile-menu");
                if (menu) setAttr(hamburger, "aria-expanded", String(menu.classList.toggle(OPEN)));
                return;
            }

            if (!target.closest(".nb-mega")) closeDesktop();
        },
        { signal }
    );

    doc.addEventListener(
        "click",
        (event) => {
            if (isAlive() && !root.contains(event.target)) closeDesktop();
        },
        { signal }
    );

    doc.addEventListener(
        "keydown",
        (event) => {
            if (!isAlive() || event.key !== "Escape") return;
            closeDesktop();
            closeMobile();
        },
        { signal }
    );

    win.addEventListener(
        "resize",
        () => {
            if (!isAlive()) return;
            if (win.innerWidth > BREAKPOINT) closeMobile();
            syncOffset();
        },
        { signal }
    );

    if (win.ResizeObserver) {
        const observer = new win.ResizeObserver(syncOffset);
        observer.observe(root);
        signal.addEventListener("abort", () => observer.disconnect());
    }

    syncOffset();
}

const SOURCE = initNavbar.toString();

export const NAVBAR_COMPONENT_SCRIPT = `(${SOURCE})(this);`;

export const NAVBAR_RUNTIME_SCRIPT = `(function(){var init=${SOURCE};var run=function(){document.querySelectorAll("nav.nb-wrapper").forEach(function(el){init(el);});};if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",run);}else{run();}})();`;