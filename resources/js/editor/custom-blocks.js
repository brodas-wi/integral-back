import { blockRegistry } from "./block-registry";
import { basicBlocks } from "./blocks/basic-blocks";
import { columnBlocks } from "./blocks/column-blocks";
import { aboutBlocks } from "./blocks/about-blocks";
import { productCardsBlocks } from "./blocks/product-cards-blocks";
import { dualCardBlocks } from "./blocks/dual-card-blocks";
import { ctaBlocks } from "./blocks/cta-blocks";
import { iconGridBlocks } from "./blocks/icon-grid-blocks";
import { productLinkCardsBlocks } from "./blocks/product-link-cards-blocks";
import { iconLinksBlocks } from "./blocks/icon-links-blocks";
import { promoCtaBlocks } from "./blocks/promo-cta-blocks";
import { tabsBlocks, initializeTabsBlocks } from "./blocks/tabs-blocks";
import { splitContentBlocks } from "./blocks/split-content-blocks";
import { statsStripBlocks } from "./blocks/stats-strip-blocks";
import { serviceCardsBlocks } from "./blocks/service-cards-blocks";
import { tableBlocks, initializeTableBlocks } from "./blocks/table-blocks";
import { buttonBlocks, initializeButtonBlocks } from "./blocks/button-blocks";
import { badgeBlocks } from "./blocks/badge-blocks";
import { mapBlocks, initializeMapBlocks } from "./blocks/map-blocks";
import { bannerBlocks, initializeBannerBlocks } from "./blocks/banner-blocks";
import { bannerSingleBlocks, initializeBannerSingleBlocks } from "./blocks/banner-single-blocks";

export function addCustomBlocks(editor) {
    blockRegistry.registerBlocks(basicBlocks);
    blockRegistry.registerBlocks(columnBlocks);
    blockRegistry.registerBlocks(bannerBlocks);
    blockRegistry.registerBlocks(bannerSingleBlocks);
    blockRegistry.registerBlocks(statsStripBlocks);
    blockRegistry.registerBlocks(tabsBlocks);
    blockRegistry.registerBlocks(aboutBlocks);
    blockRegistry.registerBlocks(productCardsBlocks);
    blockRegistry.registerBlocks(iconGridBlocks);
    blockRegistry.registerBlocks(productLinkCardsBlocks);
    blockRegistry.registerBlocks(iconLinksBlocks);
    blockRegistry.registerBlocks(dualCardBlocks)
    blockRegistry.registerBlocks(promoCtaBlocks);
    blockRegistry.registerBlocks(splitContentBlocks);
    blockRegistry.registerBlocks(ctaBlocks);
    blockRegistry.registerBlocks(serviceCardsBlocks);
    blockRegistry.registerBlocks(tableBlocks);
    blockRegistry.registerBlocks(buttonBlocks);
    blockRegistry.registerBlocks(badgeBlocks);
    blockRegistry.registerBlocks(mapBlocks);

    blockRegistry.applyToEditor(editor);

    initializeMapBlocks(editor);
    initializeBannerBlocks(editor);
    initializeBannerSingleBlocks(editor);
    initializeButtonBlocks(editor);
    initializeTabsBlocks(editor);
    initializeTableBlocks(editor);
}
