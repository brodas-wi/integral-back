const OPEN_CATEGORY = "Básico";

const CATEGORY_ORDER = [
    "Básico",
    "Columnas",
    "Banners",
    "Heroes",
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
