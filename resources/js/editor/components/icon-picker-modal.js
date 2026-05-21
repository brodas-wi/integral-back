const REMIX_CATEGORIES = {
    "Sistema": ["ri-settings-line","ri-settings-fill","ri-home-line","ri-home-fill","ri-search-line","ri-search-fill","ri-menu-line","ri-menu-fill","ri-close-line","ri-close-fill","ri-add-line","ri-add-fill","ri-subtract-line","ri-delete-bin-line","ri-delete-bin-fill","ri-edit-line","ri-edit-fill","ri-save-line","ri-save-fill","ri-download-line","ri-upload-line","ri-share-line","ri-link","ri-external-link-line","ri-copy-line","ri-clipboard-line","ri-filter-line","ri-filter-fill","ri-sort-asc","ri-sort-desc","ri-refresh-line","ri-loader-line","ri-more-line","ri-more-fill","ri-more-2-fill","ri-drag-move-line","ri-drag-move-fill","ri-lock-line","ri-lock-fill","ri-lock-unlock-line","ri-eye-line","ri-eye-fill","ri-eye-off-line","ri-information-line","ri-information-fill","ri-question-line","ri-question-fill","ri-alert-line","ri-alert-fill","ri-error-warning-line","ri-error-warning-fill","ri-checkbox-circle-line","ri-checkbox-circle-fill","ri-close-circle-line","ri-close-circle-fill","ri-time-line","ri-time-fill","ri-calendar-line","ri-calendar-fill","ri-bookmark-line","ri-bookmark-fill","ri-star-line","ri-star-fill","ri-heart-line","ri-heart-fill","ri-thumb-up-line","ri-thumb-up-fill","ri-thumb-down-line","ri-thumb-down-fill","ri-flag-line","ri-flag-fill","ri-price-tag-line","ri-price-tag-fill"],
    "Flechas": ["ri-arrow-left-line","ri-arrow-right-line","ri-arrow-up-line","ri-arrow-down-line","ri-arrow-left-right-line","ri-arrow-up-down-line","ri-arrow-left-circle-line","ri-arrow-right-circle-line","ri-arrow-up-circle-line","ri-arrow-down-circle-line","ri-arrow-go-back-line","ri-arrow-go-forward-line","ri-corner-up-left-line","ri-corner-up-right-line","ri-corner-down-left-line","ri-corner-down-right-line","ri-arrow-left-s-line","ri-arrow-right-s-line","ri-arrow-up-s-line","ri-arrow-down-s-line","ri-arrow-left-double-fill","ri-arrow-right-double-fill","ri-arrow-up-double-fill","ri-arrow-down-double-fill","ri-expand-left-line","ri-expand-right-line","ri-expand-up-down-line","ri-contract-left-line","ri-contract-right-line","ri-fullscreen-line","ri-fullscreen-exit-line"],
    "Medios": ["ri-play-line","ri-play-fill","ri-pause-line","ri-pause-fill","ri-stop-line","ri-stop-fill","ri-skip-back-line","ri-skip-forward-line","ri-rewind-line","ri-speed-line","ri-volume-up-line","ri-volume-down-line","ri-volume-mute-line","ri-music-line","ri-music-fill","ri-mic-line","ri-mic-fill","ri-mic-off-line","ri-video-line","ri-video-fill","ri-video-off-line","ri-film-line","ri-film-fill","ri-camera-line","ri-camera-fill","ri-camera-off-line","ri-image-line","ri-image-fill","ri-image-2-line","ri-image-add-line","ri-gallery-line","ri-gallery-fill","ri-slideshow-line","ri-slideshow-fill","ri-live-line","ri-broadcast-line","ri-tv-line","ri-tv-fill","ri-cast-line","ri-headphone-line","ri-headphone-fill","ri-radio-line","ri-album-line","ri-album-fill","ri-disc-line","ri-repeat-line","ri-repeat-2-line","ri-shuffle-line","ri-heart-add-line","ri-play-list-line"],
    "Comunicación": ["ri-message-line","ri-message-fill","ri-message-2-line","ri-message-2-fill","ri-message-3-line","ri-chat-1-line","ri-chat-2-line","ri-chat-3-line","ri-chat-4-line","ri-discuss-line","ri-discuss-fill","ri-question-answer-line","ri-feedback-line","ri-mail-line","ri-mail-fill","ri-mail-open-line","ri-mail-send-line","ri-mail-send-fill","ri-send-plane-line","ri-send-plane-fill","ri-phone-line","ri-phone-fill","ri-smartphone-line","ri-smartphone-fill","ri-tablet-line","ri-tablet-fill","ri-notification-line","ri-notification-fill","ri-notification-off-line","ri-notification-off-fill","ri-bell-line","ri-bell-fill","ri-customer-service-line","ri-customer-service-fill","ri-survey-line","ri-survey-fill","ri-questionnaire-line","ri-chat-voice-line","ri-vidicon-line","ri-vidicon-fill","ri-radio-button-line"],
    "Usuarios": ["ri-user-line","ri-user-fill","ri-user-2-line","ri-user-3-line","ri-user-4-line","ri-user-5-line","ri-user-add-line","ri-user-add-fill","ri-user-minus-line","ri-user-follow-line","ri-user-unfollow-line","ri-user-settings-line","ri-user-search-line","ri-user-star-line","ri-user-heart-line","ri-group-line","ri-group-fill","ri-group-2-line","ri-team-line","ri-team-fill","ri-account-circle-line","ri-account-circle-fill","ri-account-box-line","ri-account-box-fill","ri-contacts-line","ri-contacts-fill","ri-parent-line","ri-parent-fill","ri-spy-line","ri-robot-line","ri-robot-fill","ri-admin-line","ri-admin-fill","ri-shield-user-line","ri-shield-user-fill"],
    "Edificios": ["ri-home-2-line","ri-home-2-fill","ri-home-3-line","ri-home-4-line","ri-home-5-line","ri-home-6-line","ri-home-7-line","ri-home-8-line","ri-building-line","ri-building-fill","ri-building-2-line","ri-building-3-line","ri-building-4-line","ri-store-line","ri-store-fill","ri-store-2-line","ri-store-3-line","ri-bank-line","ri-bank-fill","ri-community-line","ri-community-fill","ri-hospital-line","ri-hospital-fill","ri-hotel-line","ri-hotel-fill","ri-school-line","ri-school-fill","ri-government-line","ri-government-fill","ri-ancient-gate-line","ri-ancient-pavilion-line","ri-base-station-line","ri-broadcast-line","ri-home-office-line","ri-home-wifi-line","ri-home-gear-line","ri-home-smile-line","ri-home-heart-line","ri-alarm-warning-line"],
    "Negocios": ["ri-briefcase-line","ri-briefcase-fill","ri-briefcase-2-line","ri-briefcase-3-line","ri-briefcase-4-line","ri-calculator-line","ri-calculator-fill","ri-bar-chart-line","ri-bar-chart-fill","ri-bar-chart-2-line","ri-line-chart-line","ri-line-chart-fill","ri-pie-chart-line","ri-pie-chart-fill","ri-pie-chart-2-line","ri-donut-chart-line","ri-donut-chart-fill","ri-stock-line","ri-funds-line","ri-funds-fill","ri-funds-box-line","ri-funds-box-fill","ri-exchange-line","ri-exchange-fill","ri-percent-line","ri-percent-fill","ri-money-cny-box-line","ri-money-dollar-box-line","ri-money-dollar-circle-line","ri-money-euro-box-line","ri-safe-line","ri-safe-fill","ri-auction-line","ri-auction-fill","ri-service-line","ri-award-line","ri-award-fill","ri-trophy-line","ri-trophy-fill","ri-medal-line","ri-medal-fill","ri-todo-line","ri-task-line","ri-task-fill","ri-clipboard-line","ri-survey-line","ri-file-list-line","ri-file-list-2-line","ri-file-list-3-line"],
    "Finanzas": ["ri-bank-card-line","ri-bank-card-fill","ri-bank-card-2-line","ri-secure-payment-line","ri-refund-line","ri-refund-fill","ri-refund-2-line","ri-coin-line","ri-coin-fill","ri-coins-line","ri-copper-coin-line","ri-copper-diamond-line","ri-bit-coin-line","ri-currency-line","ri-wallet-line","ri-wallet-fill","ri-wallet-2-line","ri-wallet-3-line","ri-gift-line","ri-gift-fill","ri-gift-2-line","ri-coupon-line","ri-coupon-fill","ri-coupon-2-line","ri-coupon-3-line","ri-coupon-4-line","ri-coupon-5-line","ri-shopping-bag-line","ri-shopping-bag-fill","ri-shopping-basket-line","ri-shopping-basket-fill","ri-shopping-cart-line","ri-shopping-cart-fill","ri-shopping-cart-2-line","ri-shopping-cart-2-fill","ri-vip-line","ri-vip-fill","ri-vip-crown-line","ri-vip-crown-fill","ri-vip-diamond-line","ri-vip-diamond-fill"],
    "Mapas": ["ri-map-line","ri-map-fill","ri-map-2-line","ri-map-pin-line","ri-map-pin-fill","ri-map-pin-2-line","ri-map-pin-2-fill","ri-map-pin-3-line","ri-map-pin-3-fill","ri-map-pin-4-line","ri-map-pin-4-fill","ri-map-pin-5-line","ri-map-pin-5-fill","ri-map-pin-add-line","ri-map-pin-range-line","ri-map-pin-time-line","ri-map-pin-user-line","ri-navigation-line","ri-navigation-fill","ri-compass-line","ri-compass-fill","ri-compass-2-line","ri-compass-3-line","ri-compass-4-line","ri-road-map-line","ri-treasure-map-line","ri-treasure-map-fill","ri-guide-line","ri-guide-fill","ri-earth-line","ri-earth-fill","ri-globe-line","ri-global-line","ri-global-fill","ri-route-line","ri-route-fill","ri-signpost-line","ri-signpost-fill","ri-direction-line","ri-direction-fill","ri-restaurant-line","ri-gas-station-line","ri-parking-line","ri-hospital-line","ri-hotel-line","ri-shopping-cart-line","ri-flight-takeoff-line","ri-bus-line","ri-train-line","ri-subway-line"],
    "Tecnología": ["ri-computer-line","ri-computer-fill","ri-mac-line","ri-mac-fill","ri-macbook-line","ri-macbook-fill","ri-keyboard-line","ri-keyboard-fill","ri-mouse-line","ri-mouse-fill","ri-printer-line","ri-printer-fill","ri-qr-scan-line","ri-qr-scan-fill","ri-cpu-line","ri-cpu-fill","ri-hard-drive-line","ri-hard-drive-fill","ri-hard-drive-2-line","ri-hard-drive-2-fill","ri-usb-line","ri-usb-fill","ri-database-line","ri-database-fill","ri-database-2-line","ri-server-line","ri-server-fill","ri-cloud-line","ri-cloud-fill","ri-wifi-line","ri-wifi-fill","ri-wifi-off-line","ri-signal-wifi-line","ri-hotspot-line","ri-bluetooth-line","ri-bluetooth-fill","ri-bluetooth-connect-line","ri-router-line","ri-router-fill","ri-code-line","ri-code-fill","ri-code-s-slash-line","ri-terminal-line","ri-terminal-fill","ri-terminal-box-line","ri-bug-line","ri-bug-fill","ri-git-branch-line","ri-git-commit-line","ri-git-merge-line","ri-git-pull-request-line"],
    "Archivos": ["ri-file-line","ri-file-fill","ri-file-2-line","ri-file-3-line","ri-file-4-line","ri-file-add-line","ri-file-add-fill","ri-file-copy-line","ri-file-copy-fill","ri-file-copy-2-line","ri-file-damage-line","ri-file-download-line","ri-file-upload-line","ri-file-edit-line","ri-file-excel-line","ri-file-excel-fill","ri-file-word-line","ri-file-word-fill","ri-file-ppt-line","ri-file-ppt-fill","ri-file-pdf-line","ri-file-pdf-fill","ri-file-zip-line","ri-file-zip-fill","ri-file-text-line","ri-file-text-fill","ri-file-code-line","ri-file-code-fill","ri-file-music-line","ri-file-video-line","ri-file-gif-line","ri-file-image-line","ri-file-image-fill","ri-file-info-line","ri-file-list-line","ri-file-list-2-line","ri-file-list-3-line","ri-file-shield-line","ri-file-lock-line","ri-file-search-line","ri-file-search-fill","ri-folder-line","ri-folder-fill","ri-folder-2-line","ri-folder-3-line","ri-folder-4-line","ri-folder-5-line","ri-folder-add-line","ri-folder-open-line","ri-folder-open-fill","ri-folder-upload-line","ri-folder-download-line","ri-folder-shared-line","ri-folder-transfer-line","ri-folder-info-line","ri-folder-music-line","ri-folder-video-line","ri-folder-image-line"],
    "Diseño": ["ri-pen-nib-line","ri-pen-nib-fill","ri-pencil-line","ri-pencil-fill","ri-pencil-ruler-line","ri-pencil-ruler-fill","ri-pencil-ruler-2-line","ri-brush-line","ri-brush-fill","ri-brush-2-line","ri-brush-3-line","ri-brush-4-line","ri-palette-line","ri-palette-fill","ri-paint-line","ri-paint-fill","ri-contrast-line","ri-contrast-fill","ri-contrast-2-line","ri-contrast-drop-line","ri-contrast-drop-fill","ri-contrast-drop-2-line","ri-scissors-line","ri-scissors-fill","ri-scissors-2-line","ri-scissors-cut-line","ri-scissors-cut-fill","ri-eraser-line","ri-eraser-fill","ri-crop-line","ri-crop-fill","ri-crop-2-line","ri-ruler-line","ri-ruler-fill","ri-ruler-2-line","ri-compasses-line","ri-compasses-fill","ri-compasses-2-line","ri-artboard-line","ri-artboard-fill","ri-artboard-2-line","ri-shape-line","ri-shape-fill","ri-shapes-line","ri-focus-line","ri-focus-fill","ri-focus-2-line","ri-focus-3-line","ri-drag-drop-line","ri-drag-drop-fill","ri-sip-line","ri-sip-fill","ri-collage-line","ri-collage-fill","ri-stack-line","ri-stack-fill","ri-magic-line","ri-magic-fill","ri-t-shirt-line","ri-t-shirt-fill","ri-t-shirt-2-line","ri-shirt-line"],
    "Transporte": ["ri-car-line","ri-car-fill","ri-roadster-line","ri-roadster-fill","ri-bus-line","ri-bus-fill","ri-bus-2-line","ri-bus-2-fill","ri-subway-line","ri-subway-fill","ri-train-line","ri-train-fill","ri-train-2-line","ri-flight-takeoff-line","ri-flight-takeoff-fill","ri-flight-land-line","ri-flight-land-fill","ri-plane-line","ri-taxi-line","ri-taxi-fill","ri-taxi-wifi-line","ri-e-bike-line","ri-e-bike-fill","ri-e-bike-2-line","ri-bike-line","ri-bike-fill","ri-motorbike-line","ri-motorbike-fill","ri-truck-line","ri-truck-fill","ri-walk-line","ri-walk-fill","ri-run-line","ri-run-fill","ri-ship-line","ri-ship-fill","ri-ship-2-line","ri-rocket-line","ri-rocket-fill","ri-rocket-2-line","ri-rocket-2-fill","ri-sailboat-line","ri-sailboat-fill","ri-parachute-line","ri-parachute-fill","ri-wheelchair-line","ri-wheelchair-fill","ri-charging-pile-line","ri-charging-pile-fill","ri-charging-pile-2-line","ri-gas-station-line","ri-gas-station-fill","ri-traffic-light-line","ri-traffic-light-fill","ri-parking-line","ri-parking-fill","ri-parking-box-line","ri-parking-box-fill","ri-speed-mini-line","ri-speed-fill","ri-roadster-line","ri-roadster-fill","ri-caravan-line","ri-caravan-fill"],
    "Naturaleza": ["ri-sun-line","ri-sun-fill","ri-moon-line","ri-moon-fill","ri-cloud-line","ri-cloud-fill","ri-rainy-line","ri-rainy-fill","ri-snowy-line","ri-snowy-fill","ri-windy-line","ri-windy-fill","ri-thunderstorms-line","ri-thunderstorms-fill","ri-haze-line","ri-haze-fill","ri-haze-2-line","ri-haze-2-fill","ri-sun-cloudy-line","ri-sun-cloudy-fill","ri-cloudy-line","ri-cloudy-fill","ri-cloudy-2-line","ri-cloudy-2-fill","ri-foggy-line","ri-foggy-fill","ri-drizzle-line","ri-drizzle-fill","ri-heavy-showers-line","ri-heavy-showers-fill","ri-showers-line","ri-showers-fill","ri-heavy-snowfall-line","ri-heavy-snowfall-fill","ri-snowfall-line","ri-snowfall-fill","ri-hail-line","ri-hail-fill","ri-tornado-line","ri-tornado-fill","ri-typhoon-line","ri-typhoon-fill","ri-mist-line","ri-mist-fill","ri-earthquake-line","ri-earthquake-fill","ri-fire-line","ri-fire-fill","ri-water-flash-line","ri-water-flash-fill","ri-leaf-line","ri-leaf-fill","ri-plant-line","ri-plant-fill","ri-tree-line","ri-tree-fill","ri-seedling-line","ri-seedling-fill","ri-flower-line","ri-flower-fill","ri-earth-line","ri-earth-fill","ri-recycle-line","ri-recycle-fill"],
    "Salud": ["ri-heart-pulse-line","ri-heart-pulse-fill","ri-mental-health-line","ri-mental-health-fill","ri-medicine-bottle-line","ri-medicine-bottle-fill","ri-capsule-line","ri-capsule-fill","ri-stethoscope-line","ri-stethoscope-fill","ri-syringe-line","ri-syringe-fill","ri-thermometer-line","ri-thermometer-fill","ri-first-aid-kit-line","ri-first-aid-kit-fill","ri-nurse-line","ri-nurse-fill","ri-hospital-line","ri-hospital-fill","ri-wheelchair-line","ri-wheelchair-fill","ri-health-book-line","ri-health-book-fill","ri-lungs-line","ri-lungs-fill","ri-virus-line","ri-virus-fill","ri-hand-sanitizer-line","ri-hand-sanitizer-fill","ri-dislike-line","ri-dislike-fill","ri-body-scan-line","ri-empathize-line","ri-empathize-fill"],
    "Redes Sociales": ["ri-facebook-line","ri-facebook-fill","ri-facebook-circle-line","ri-facebook-circle-fill","ri-facebook-box-line","ri-facebook-box-fill","ri-instagram-line","ri-instagram-fill","ri-twitter-line","ri-twitter-fill","ri-twitter-x-line","ri-twitter-x-fill","ri-linkedin-line","ri-linkedin-fill","ri-linkedin-box-line","ri-linkedin-box-fill","ri-youtube-line","ri-youtube-fill","ri-tiktok-line","ri-tiktok-fill","ri-whatsapp-line","ri-whatsapp-fill","ri-telegram-line","ri-telegram-fill","ri-pinterest-line","ri-pinterest-fill","ri-reddit-line","ri-reddit-fill","ri-slack-line","ri-slack-fill","ri-discord-line","ri-discord-fill","ri-github-line","ri-github-fill","ri-gitlab-line","ri-gitlab-fill","ri-dribbble-line","ri-dribbble-fill","ri-behance-line","ri-behance-fill","ri-medium-line","ri-medium-fill","ri-spotify-line","ri-spotify-fill","ri-apple-line","ri-apple-fill","ri-google-line","ri-google-fill","ri-windows-line","ri-windows-fill","ri-android-line","ri-android-fill","ri-microsoft-line","ri-netflix-line","ri-netflix-fill","ri-paypal-line","ri-paypal-fill","ri-mastercard-line","ri-mastercard-fill","ri-visa-line","ri-visa-fill","ri-amazon-line","ri-amazon-fill","ri-stackoverflow-line","ri-stackoverflow-fill","ri-codepen-line","ri-codepen-fill"],
};

export class IconPickerModal {
    constructor() {
        this._overlay = null;
        this._onSelect = null;
        this._currentCategory = Object.keys(REMIX_CATEGORIES)[0];
        this._searchTerm = "";
        this._bound = {
            onOverlayClick: this._onOverlayClick.bind(this),
            onKeyDown: this._onKeyDown.bind(this),
        };
    }

    get isOpen() {
        return !!this._overlay;
    }

    open(onSelect) {
        if (this._overlay) this.close();
        this._onSelect = onSelect;
        this._render();
        document.addEventListener("keydown", this._bound.onKeyDown);
    }

    close() {
        if (!this._overlay) return;
        this._overlay.remove();
        this._overlay = null;
        this._onSelect = null;
        document.removeEventListener("keydown", this._bound.onKeyDown);
    }

    destroy() {
        this.close();
    }

    _onOverlayClick(e) {
        if (e.target === this._overlay) this.close();
    }

    _onKeyDown(e) {
        if (e.key === "Escape") this.close();
    }

    _render() {
        this._overlay = document.createElement("div");
        this._overlay.className = "icon-picker-overlay";
        this._overlay.addEventListener("click", this._bound.onOverlayClick);

        const modal = document.createElement("div");
        modal.className = "icon-picker-modal";
        modal.innerHTML = this._getTemplate();

        this._overlay.appendChild(modal);
        document.body.appendChild(this._overlay);

        this._bindEvents(modal);
        this._renderGrid(modal);
    }

    _getTemplate() {
        const categoryTabs = Object.keys(REMIX_CATEGORIES)
            .map(cat => `<button class="icon-picker-tab${cat === this._currentCategory ? " active" : ""}" data-category="${cat}">${cat}</button>`)
            .join("");

        return `
            <div class="icon-picker-header">
                <div class="icon-picker-title">
                    <i class="ri-emotion-happy-line"></i>
                    <span>Selector de Íconos</span>
                </div>
                <button class="icon-picker-close" data-action="close"><i class="ri-close-line"></i></button>
            </div>
            <div class="icon-picker-search-wrap">
                <i class="ri-search-line"></i>
                <input class="icon-picker-search" type="text" placeholder="Buscar ícono..." value="${this._searchTerm}">
            </div>
            <div class="icon-picker-tabs">${categoryTabs}</div>
            <div class="icon-picker-grid-wrap">
                <div class="icon-picker-grid"></div>
            </div>
        `;
    }

    _bindEvents(modal) {
        const searchInput = modal.querySelector(".icon-picker-search");
        searchInput.addEventListener("input", (e) => {
            this._searchTerm = e.target.value.trim().toLowerCase();
            this._renderGrid(modal);
        });
        setTimeout(() => searchInput.focus(), 50);

        modal.querySelector("[data-action='close']").addEventListener("click", () => this.close());

        modal.querySelectorAll(".icon-picker-tab").forEach(tab => {
            tab.addEventListener("click", () => {
                this._currentCategory = tab.dataset.category;
                this._searchTerm = "";
                searchInput.value = "";
                modal.querySelectorAll(".icon-picker-tab").forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                this._renderGrid(modal);
            });
        });
    }

    _getFilteredIcons() {
        if (this._searchTerm.length > 0) {
            const all = Object.values(REMIX_CATEGORIES).flat();
            return [...new Set(all)].filter(icon => icon.includes(this._searchTerm));
        }
        return REMIX_CATEGORIES[this._currentCategory] || [];
    }

    _renderGrid(modal) {
        const grid = modal.querySelector(".icon-picker-grid");
        const icons = this._getFilteredIcons();

        if (icons.length === 0) {
            grid.innerHTML = `<div class="icon-picker-empty"><i class="ri-emotion-sad-line"></i><span>Sin resultados para "<strong>${this._searchTerm}</strong>"</span></div>`;
            return;
        }

        grid.innerHTML = icons.map(icon => `
            <button class="icon-picker-item" title="${icon}" data-icon="${icon}">
                <i class="${icon}"></i>
                <span>${icon.replace("ri-", "").replace(/-/g, " ").replace(/(line|fill)$/, "").trim()}</span>
            </button>
        `).join("");

        grid.querySelectorAll(".icon-picker-item").forEach(btn => {
            btn.addEventListener("click", () => {
                const selected = btn.dataset.icon;
                const callback = this._onSelect;
                this.close();
                if (callback) callback(selected);
            });
        });
    }
}