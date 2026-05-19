const tabsBlockIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="5" rx="1" fill="#003B71"/>
    <rect x="12" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="22" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="11" width="28" height="17" rx="2" fill="#003B71" fill-opacity="0.08" stroke="#003B71" stroke-width="1"/>
    <rect x="5" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="14" width="4" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`;

const TABS_STYLES = `
.tabs-btn{transition:background 0.2s,color 0.2s;}
.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}
.tabs-panel{display:none;}
.tabs-panel.active{display:grid;}
.tab-card:hover{background:#003B71;}
.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}
.tab-card:hover .tab-card-title{color:#ffffff;}
.tab-card:hover .tab-card-text{color:#ffffff;}`;

function createTabsScript() {
    return function () {
        const section = this;

        const STYLES = `.tabs-btn{transition:background 0.2s,color 0.2s;}.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}.tabs-panel{display:none;}.tabs-panel.active{display:grid;}.tab-card:hover{background:#003B71;}.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}.tab-card:hover .tab-card-title{color:#ffffff;}.tab-card:hover .tab-card-text{color:#ffffff;}`;

        (function ensureStyles() {
            const doc = section.ownerDocument ?? document;
            if (!doc.getElementById("tabs-section-styles")) {
                const s = doc.createElement("style");
                s.id = "tabs-section-styles";
                s.textContent = STYLES;
                doc.head.appendChild(s);
            }
        })();

        function activate(index) {
            section.querySelectorAll(".tabs-btn").forEach((btn, i) => {
                btn.classList.toggle("active", i === index);
            });
            section.querySelectorAll(".tabs-panel").forEach((panel, i) => {
                panel.classList.toggle("active", i === index);
            });
        }

        section.querySelectorAll(".tabs-btn").forEach((btn, i) => {
            btn.addEventListener("click", () => activate(i));
        });

        activate(0);
    };
}

const DEFAULT_TAB_CARD = () => `
<div class="tab-card flex flex-col items-center text-center p-8 border-2 border-[#003B71] rounded-2xl gap-4 cursor-pointer transition-all duration-200">
    <div class="tab-card-icon w-14 h-14 rounded-full border-2 border-[#003B71] flex items-center justify-center text-2xl text-[#003B71] shrink-0 transition-all duration-200">
        <i class="ri-lightbulb-line"></i>
    </div>
    <h3 class="tab-card-title text-lg font-bold text-[#003B71] transition-colors duration-200">Lorem ipsum</h3>
    <p class="tab-card-text text-base font-normal leading-relaxed text-[#003B71] transition-colors duration-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>`;

const DEFAULT_PANEL = (index) => `
<div class="tabs-panel${index === 0 ? " active" : ""} grid-cols-3 gap-5">
    ${DEFAULT_TAB_CARD()}
    ${DEFAULT_TAB_CARD()}
    ${DEFAULT_TAB_CARD()}
    ${DEFAULT_TAB_CARD()}
    ${DEFAULT_TAB_CARD()}
    ${DEFAULT_TAB_CARD()}
</div>`;

const DEFAULT_TABS_HTML = `
<div class="max-w-6xl mx-auto px-6 flex flex-col gap-8 py-16">
    <div class="text-center flex flex-col gap-4 max-w-2xl mx-auto">
        <h2 class="text-4xl font-bold leading-tight text-[#003B71]">Lorem ipsum dolor sit amet consectetur</h2>
        <p class="text-base font-normal leading-relaxed text-[#003B71]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <nav class="flex flex-wrap justify-center gap-2">
        <button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>
        <button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>
        <button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>
        <button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>
        <button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>
    </nav>
    <div class="tabs-body">
        ${DEFAULT_PANEL(0)}
        ${DEFAULT_PANEL(1)}
        ${DEFAULT_PANEL(2)}
        ${DEFAULT_PANEL(3)}
        ${DEFAULT_PANEL(4)}
    </div>
</div>
<style>${TABS_STYLES}</style>`;

const tabCardSingleIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="none" stroke="#003B71" stroke-width="2"/>
    <circle cx="16" cy="10" r="4" fill="none" stroke="#003B71" stroke-width="1.5"/>
    <rect x="8" y="17" width="16" height="2" rx="1" fill="#003B71"/>
    <rect x="6" y="22" width="20" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`;

export const tabsBlocks = [
    {
        id: "tabs-cards",
        label: "Sección con tabs",
        category: "Contenido",
        media: tabsBlockIcon,
        content: { type: "tabs-cards-component" },
    },
    {
        id: "tab-card-single",
        label: "Tarjeta de tab",
        category: "Contenido",
        media: tabCardSingleIcon,
        content: `${DEFAULT_TAB_CARD()}`,
    },
];

export function initializeTabsBlocks(editor) {
    const componentType = "tabs-cards-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) => {
            if (el.getAttribute?.("data-gjs-type") === componentType) {
                return { type: componentType };
            }
            return false;
        },

        model: {
            defaults: {
                name: "Sección con tabs",
                tagName: "section",
                draggable: true,
                droppable: false,
                editable: false,
                stylable: false,
                resizable: false,
                selectable: true,
                hoverable: true,
                layerable: true,
                highlightable: false,
                copyable: true,
                removable: true,
                attributes: {
                    "data-gjs-type": componentType,
                    "data-tab-count": "5",
                },
                components: DEFAULT_TABS_HTML,
                script: createTabsScript(),
                traits: [
                    {
                        type: "number",
                        name: "data-tab-count",
                        label: "Número de tabs (2-10)",
                        min: 2,
                        max: 10,
                        changeProp: false,
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
                this.on("change:attributes", (model, attrs) => {
                    const count = parseInt(attrs["data-tab-count"]);
                    if (!isNaN(count)) {
                        this.updateTabCount(count);
                    }
                });
            },

            updateTabCount(count) {
                const clamped = Math.min(10, Math.max(2, count));

                const buildHTML = (n) => {
                    const btns = Array.from(
                        { length: n },
                        () =>
                            `<button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>`,
                    ).join("\n");

                    const panels = Array.from(
                        { length: n },
                        (_, i) =>
                            `<div class="tabs-panel${i === 0 ? " active" : ""} grid-cols-3 gap-5">
                            ${DEFAULT_TAB_CARD()}
                            ${DEFAULT_TAB_CARD()}
                            ${DEFAULT_TAB_CARD()}
                            ${DEFAULT_TAB_CARD()}
                            ${DEFAULT_TAB_CARD()}
                            ${DEFAULT_TAB_CARD()}
                        </div>`,
                    ).join("\n");

                    return `
                    <div class="max-w-6xl mx-auto px-6 flex flex-col gap-8 py-16">
                        <div class="text-center flex flex-col gap-4 max-w-2xl mx-auto">
                            <h2 class="text-4xl font-bold leading-tight text-[#003B71]">Lorem ipsum dolor sit amet consectetur</h2>
                            <p class="text-base font-normal leading-relaxed text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <nav class="flex flex-wrap justify-center gap-2">${btns}</nav>
                        <div class="tabs-body">${panels}</div>
                    </div>
                    <style>${TABS_STYLES}</style>`;
                };

                this.components(buildHTML(clamped));

                setTimeout(() => {
                    const script = this.get("script");
                    const el = this.getEl();
                    if (script && typeof script === "function" && el) {
                        script.call(el);
                    }
                }, 200);
            },
        },
    });

    setupTabsEditorEvents(editor, componentType);
    injectTabsEditorStyles(editor, componentType);
}

function setupTabsEditorEvents(editor, componentType) {
    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (el?.getAttribute?.("data-gjs-type") === componentType) {
            component.set("type", componentType);
            setTimeout(() => {
                const script = component.get("script");
                if (script && typeof script === "function") script.call(el);
            }, 300);
        }
    });

    editor.on("component:clone", (component) => {
        if (component.get("type") === componentType) {
            const el = component.getEl();
            if (el) {
                setTimeout(() => {
                    const script = component.get("script");
                    if (script && typeof script === "function") script.call(el);
                }, 300);
            }
        }
    });

    editor.on("storage:end:load", () => {
        setTimeout(() => {
            editor
                .getWrapper()
                .find(`[data-gjs-type="${componentType}"]`)
                .forEach((comp) => {
                    comp.set("type", componentType);
                    const el = comp.getEl();
                    if (el?.isConnected) {
                        const script = comp.get("script");
                        if (script && typeof script === "function")
                            script.call(el);
                    }
                });
        }, 800);
    });

    editor.on("storage:start:store", () => {
        editor
            .getWrapper()
            .find(`[data-gjs-type="${componentType}"]`)
            .forEach((comp) => {
                comp.set("type", componentType);
                comp.addAttributes({ "data-gjs-type": componentType });
            });
    });
}

function injectTabsEditorStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const head = iframe.contentDocument?.head;
        if (!head) return;

        if (!head.querySelector("#tabs-section-styles")) {
            const s = document.createElement("style");
            s.id = "tabs-section-styles";
            s.textContent = TABS_STYLES;
            head.appendChild(s);
        }

        if (!head.querySelector(`#${componentType}-editor-css`)) {
            const s = document.createElement("style");
            s.id = `${componentType}-editor-css`;
            s.textContent = `
                [data-gjs-type="${componentType}"] * { pointer-events: none !important; }
                [data-gjs-type="${componentType}"].gjs-selected,
                [data-gjs-type="${componentType}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `;
            head.appendChild(s);
        }
    });
}
