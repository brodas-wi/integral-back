const OPEN_CATEGORY = "Básico";

const CATEGORY_ORDER = [
    "Básico",
    "Columnas",
    "Heroes",
    "Banners",
    "Contenido",
];

class BlockRegistry {
    constructor() {
        this.blocks = new Map();
    }

    registerBlock(id, config) {
        if (!this.blocks.has(config.category)) {
            this.blocks.set(config.category, []);
        }
        this.blocks.get(config.category).push({ id, ...config });
    }

    registerBlocks(blocksArray) {
        blocksArray.forEach((block) => {
            this.registerBlock(block.id, block);
        });
    }

    getOrderedCategories() {
        const allCategories = Array.from(this.blocks.keys());
        const prioritized = CATEGORY_ORDER.filter((cat) =>
            allCategories.includes(cat),
        );
        const remaining = allCategories.filter(
            (cat) => !CATEGORY_ORDER.includes(cat),
        );
        return [...prioritized, ...remaining];
    }

    applyToEditor(editor) {
        const orderedCategories = this.getOrderedCategories();

        orderedCategories.forEach((category) => {
            const blocks = this.blocks.get(category) || [];
            blocks.forEach((block) => {
                const { id, ...blockConfig } = block;
                editor.BlockManager.add(id, blockConfig);
            });
        });

        this.blocks.clear();

        this.applyCollapseSettings(editor);
        this.hideDefaultCategories(editor);
    }

    reorderExistingBlocks(editor) {
        const bm = editor.BlockManager;
        const allBlocks = bm.getAll();
        const byCategory = new Map();

        allBlocks.each((block) => {
            const cat = block.get("category");
            const catLabel =
                typeof cat === "object" && cat !== null
                    ? cat.get("label") || cat.get("id")
                    : cat;
            if (!byCategory.has(catLabel)) byCategory.set(catLabel, []);
            byCategory.get(catLabel).push(block);
        });

        const allCategoryLabels = Array.from(byCategory.keys());
        const prioritized = CATEGORY_ORDER.filter((c) =>
            allCategoryLabels.includes(c),
        );
        const remaining = allCategoryLabels.filter(
            (c) => !CATEGORY_ORDER.includes(c),
        );
        const finalOrder = [...prioritized, ...remaining];

        const orderedBlocks = [];
        finalOrder.forEach((label) => {
            byCategory.get(label).forEach((block) => orderedBlocks.push(block));
        });

        bm.getAll().reset(orderedBlocks);
    }

    applyCollapseSettings(editor) {
        setTimeout(() => {
            editor.BlockManager.getCategories().each((category) => {
                category.set("open", category.get("label") === OPEN_CATEGORY);
            });
        }, 500);
    }

    hideDefaultCategories(editor) {
        setTimeout(() => {
            const toHide = ["Basic", "Extra"];
            document.querySelectorAll(".gjs-block-category").forEach((el) => {
                const title = el.querySelector(".gjs-title");
                if (title && toHide.includes(title.textContent.trim())) {
                    el.style.display = "none";
                }
            });
        }, 100);
    }
}

export const blockRegistry = new BlockRegistry();
