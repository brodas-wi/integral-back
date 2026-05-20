class AnnouncementModal {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.announcements = [];
        this.currentIndex = 0;
        this.slideInterval = null;
        this.currentPage = this.getCurrentPageSlug();
        this.init();
    }

    getCurrentPageSlug() {
        const path = window.location.pathname;
        const segments = path.split("/").filter(Boolean);

        if (segments.length === 0 || path === "/") {
            return "home";
        }

        if (segments[0] === "p") {
            return segments[1] || "home";
        }

        return segments[segments.length - 1] || "home";
    }

    async init() {
        try {
            const announcements = await this.fetchAnnouncements();

            if (announcements && announcements.length > 0) {
                this.announcements = announcements;
                this.createModal();
                setTimeout(() => this.showModal(), 500);

                if (this.announcements.length > 1) {
                    this.startSlideShow();
                }
            }
        } catch (error) {
            console.error("Error loading announcements:", error);
        }
    }

    async fetchAnnouncements() {
        try {
            const response = await fetch(
                `/api/announcements/for-page?page=${this.currentPage}`,
            );
            const data = await response.json();

            if (
                data.success &&
                data.announcements &&
                data.announcements.length > 0
            ) {
                return data.announcements;
            }
            return null;
        } catch (error) {
            console.error("Error fetching announcements:", error);
            return null;
        }
    }

    createModal() {
        this.overlay = document.createElement("div");
        this.overlay.id = "announcement-overlay";
        this.overlay.className =
            "fixed inset-0 bg-black/50 z-[9998] hidden transition-opacity duration-300";

        this.modal = document.createElement("div");
        this.modal.id = "announcement-modal";
        this.modal.className =
            "fixed inset-0 z-[9999] flex items-center justify-center p-4 hidden";
        this.modal.innerHTML = this.getModalContainerHTML();

        document.body.appendChild(this.overlay);
        document.body.appendChild(this.modal);

        this.attachEventListeners();
        this.renderCurrentAnnouncement();
    }

    getModalContainerHTML() {
        return `
            <div class="relative max-w-full max-h-full">
                <button type="button" id="close-announcement"
                    class="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all">
                    <i class="ri-close-line text-2xl"></i>
                </button>

                ${this.announcements.length > 1 ? this.getNavigationHTML() : ""}

                <div id="announcement-content-container" class="relative">
                    <!-- Los avisos se renderizan aquí -->
                </div>

                ${this.announcements.length > 1 ? this.getIndicatorsHTML() : ""}
            </div>
        `;
    }

    getNavigationHTML() {
        return `
            <button type="button" id="prev-announcement"
                class="absolute -left-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-primary transition-all hover:scale-110">
                <i class="ri-arrow-left-s-line text-3xl"></i>
            </button>

            <button type="button" id="next-announcement"
                class="absolute -right-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-primary transition-all hover:scale-110">
                <i class="ri-arrow-right-s-line text-3xl"></i>
            </button>
        `;
    }

    getIndicatorsHTML() {
        return `
            <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                ${this.announcements
                    .map(
                        (_, index) => `
                    <button type="button"
                        class="announcement-indicator w-2.5 h-2.5 rounded-full transition-all bg-white shadow-lg ${index === 0 ? "w-8" : "opacity-60"}"
                        data-index="${index}">
                    </button>
                `,
                    )
                    .join("")}
            </div>
        `;
    }

    renderCurrentAnnouncement() {
        const container = document.getElementById(
            "announcement-content-container",
        );
        const announcement = this.announcements[this.currentIndex];

        container.innerHTML = this.getAnnouncementHTML(announcement);

        this.updateIndicators();

        setTimeout(() => {
            const content = container.querySelector(
                "[data-announcement-content]",
            );
            if (content) {
                content.style.transform = "scale(1)";
                content.style.opacity = "1";
            }
        }, 10);
    }

    getAnnouncementHTML(announcement) {
        if (announcement.display_mode === "image_only") {
            return this.getImageOnlyHTML(announcement);
        }
        return this.getFullHTML(announcement);
    }

    getImageOnlyHTML(announcement) {
        const imageWidth = announcement.image_width || 1920;
        const imageHeight = announcement.image_height || 1080;

        const viewportHeight = window.innerHeight - 160;
        const viewportWidth = window.innerWidth - 64;

        const maxWidth = Math.min(imageWidth, viewportWidth, 1200);
        const maxHeight = Math.min(imageHeight, viewportHeight, 800);

        const aspectRatio = imageWidth / imageHeight;
        let displayWidth = maxWidth;
        let displayHeight = maxWidth / aspectRatio;

        if (displayHeight > maxHeight) {
            displayHeight = maxHeight;
            displayWidth = maxHeight * aspectRatio;
        }

        return `
            <div class="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 scale-95 opacity-0 relative"
                 data-announcement-content
                 style="max-width: ${displayWidth}px; max-height: ${displayHeight}px;">
                <img src="${announcement.image_url}"
                     alt="${announcement.image_alt || "Aviso"}"
                     class="w-full h-full object-contain">
            </div>
        `;
    }

    getFullHTML(announcement) {
        const ctaButton =
            announcement.cta_text && announcement.cta_url
                ? `
            <a href="${announcement.cta_url}"
               target="${announcement.cta_new_tab ? "_blank" : "_self"}"
               rel="${announcement.cta_new_tab ? "noopener noreferrer" : ""}"
               class="w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 text-center inline-block">
                ${announcement.cta_text}
                ${announcement.cta_new_tab ? '<i class="ri-external-link-line ml-1"></i>' : ""}
            </a>
        `
                : "";

        return `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 scale-95 opacity-0"
                 data-announcement-content>
                ${
                    announcement.image_url
                        ? `
                    <div class="relative w-full h-64 sm:h-80 overflow-hidden">
                        <img src="${announcement.image_url}"
                             alt="${announcement.image_alt || announcement.title}"
                             class="w-full h-full object-cover">
                    </div>
                `
                        : ""
                }

                <div class="p-6 sm:p-8">
                    ${announcement.title ? `<h2 class="text-2xl sm:text-3xl font-bold text-secondary mb-4">${announcement.title}</h2>` : ""}

                    ${
                        announcement.description
                            ? `
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            ${announcement.description}
                        </p>
                    `
                            : ""
                    }

                    ${ctaButton ? `<div class="flex justify-center">${ctaButton}</div>` : ""}
                </div>
            </div>
        `;
    }

    updateIndicators() {
        const indicators = document.querySelectorAll(".announcement-indicator");
        indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add("w-8");
                indicator.classList.remove("opacity-60", "w-2.5");
            } else {
                indicator.classList.remove("w-8");
                indicator.classList.add("opacity-60", "w-2.5");
            }
        });
    }

    startSlideShow() {
        this.slideInterval = setInterval(() => {
            this.nextAnnouncement();
        }, 5000);
    }

    stopSlideShow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    nextAnnouncement() {
        this.currentIndex = (this.currentIndex + 1) % this.announcements.length;
        this.transitionToAnnouncement();
    }

    prevAnnouncement() {
        this.currentIndex =
            (this.currentIndex - 1 + this.announcements.length) %
            this.announcements.length;
        this.transitionToAnnouncement();
    }

    goToAnnouncement(index) {
        this.currentIndex = index;
        this.transitionToAnnouncement();
        this.stopSlideShow();
        this.startSlideShow();
    }

    transitionToAnnouncement() {
        const container = document.getElementById(
            "announcement-content-container",
        );
        const currentContent = container.querySelector(
            "[data-announcement-content]",
        );

        if (currentContent) {
            currentContent.style.transition = "opacity 0.3s, transform 0.3s";
            currentContent.style.opacity = "0";
            currentContent.style.transform = "scale(0.95)";
        }

        setTimeout(() => {
            this.renderCurrentAnnouncement();
        }, 300);
    }

    attachEventListeners() {
        const closeBtn = document.getElementById("close-announcement");
        const prevBtn = document.getElementById("prev-announcement");
        const nextBtn = document.getElementById("next-announcement");

        closeBtn?.addEventListener("click", () => this.hideModal());
        prevBtn?.addEventListener("click", () => {
            this.stopSlideShow();
            this.prevAnnouncement();
            this.startSlideShow();
        });
        nextBtn?.addEventListener("click", () => {
            this.stopSlideShow();
            this.nextAnnouncement();
            this.startSlideShow();
        });

        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("announcement-indicator")) {
                const index = parseInt(e.target.dataset.index);
                this.goToAnnouncement(index);
            }
        });

        this.overlay?.addEventListener("click", () => this.hideModal());

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.hideModal();
            } else if (e.key === "ArrowLeft" && this.announcements.length > 1) {
                this.stopSlideShow();
                this.prevAnnouncement();
                this.startSlideShow();
            } else if (
                e.key === "ArrowRight" &&
                this.announcements.length > 1
            ) {
                this.stopSlideShow();
                this.nextAnnouncement();
                this.startSlideShow();
            }
        });

        this.modal?.addEventListener("mouseenter", () => {
            this.stopSlideShow();
        });

        this.modal?.addEventListener("mouseleave", () => {
            if (this.announcements.length > 1) {
                this.startSlideShow();
            }
        });
    }

    showModal() {
        if (!this.modal || !this.overlay) return;

        document.body.style.overflow = "hidden";

        this.overlay.classList.remove("hidden");
        this.modal.classList.remove("hidden");

        setTimeout(() => {
            this.overlay.style.opacity = "1";
        }, 10);
    }

    hideModal() {
        if (!this.modal || !this.overlay) return;

        this.stopSlideShow();
        this.overlay.style.opacity = "0";

        setTimeout(() => {
            this.modal?.remove();
            this.overlay?.remove();
            document.body.style.overflow = "";
        }, 300);
    }
}

export function initAnnouncementModal() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            new AnnouncementModal();
        });
    } else {
        new AnnouncementModal();
    }
}
