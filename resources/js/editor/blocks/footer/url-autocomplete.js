import { esc } from "./utils";

const getSearchUrl = () => {
    const base =
        document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/, "") ?? "";
    return `${base}/api/pages/search`;
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlight = (text, query) => {
    const safeText = esc(text);
    const pattern = escapeRegExp(esc(query));
    return pattern
        ? safeText.replace(new RegExp(`(${pattern})`, "gi"), "<mark>$1</mark>")
        : safeText;
};

export function attachUrlAutocomplete(input) {
    if (input.dataset.ftmAutocomplete) return;
    input.dataset.ftmAutocomplete = "true";

    const wrapper = document.createElement("div");
    wrapper.className = "ftm-ac-wrap";
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const list = document.createElement("ul");
    list.className = "ftm-ac-list";
    wrapper.appendChild(list);

    let timer = null;
    let requestId = 0;
    let skipNext = false;
    let activeIndex = -1;

    const hide = () => {
        list.classList.remove("ftm-show");
        activeIndex = -1;
    };

    const setActive = (index) => {
        Array.from(list.children).forEach((node, i) =>
            node.classList.toggle("ftm-ac-active", i === index),
        );
        activeIndex = index;
    };

    const choose = (slug) => {
        skipNext = true;
        input.value = `/${slug}`;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        hide();
    };

    const render = (pages, query) => {
        list.innerHTML = "";
        if (!pages.length) {
            hide();
            return;
        }
        pages.forEach((page) => {
            const item = document.createElement("li");
            item.className = "ftm-ac-item";
            item.innerHTML = `<span class="ftm-ac-title">${highlight(page.title, query)}</span><span class="ftm-ac-slug">/${esc(page.slug)}</span>`;
            item.addEventListener("mousedown", (event) => {
                event.preventDefault();
                choose(page.slug);
            });
            list.appendChild(item);
        });
        activeIndex = -1;
        list.classList.add("ftm-show");
    };

    const search = async (query) => {
        const current = ++requestId;
        if (!query || /^(https?:|#|mailto:|tel:)/i.test(query)) {
            hide();
            return;
        }
        try {
            const response = await fetch(`${getSearchUrl()}?q=${encodeURIComponent(query)}`, {
                headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            });
            if (!response.ok) throw new Error(response.statusText);
            const pages = await response.json();
            if (current === requestId) render(Array.isArray(pages) ? pages : [], query);
        } catch {
            if (current === requestId) hide();
        }
    };

    input.addEventListener("input", () => {
        if (skipNext) {
            skipNext = false;
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(() => search(input.value.trim()), 220);
    });

    input.addEventListener("focus", () => {
        if (input.value.trim()) search(input.value.trim());
    });

    input.addEventListener("blur", () => setTimeout(hide, 150));

    input.addEventListener("keydown", (event) => {
        if (!list.classList.contains("ftm-show")) return;
        const count = list.children.length;
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((activeIndex + 1) % count);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((activeIndex - 1 + count) % count);
        } else if (event.key === "Enter" && activeIndex >= 0) {
            event.preventDefault();
            list.children[activeIndex].dispatchEvent(
                new MouseEvent("mousedown", { cancelable: true }),
            );
        } else if (event.key === "Escape") {
            event.stopPropagation();
            hide();
        }
    });
}