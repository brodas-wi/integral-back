/**
 * MediaService - Handles all media-related API operations
 */
export class MediaService {
    constructor() {
        this.apiUrl = document.querySelector('meta[name="media-api-url"]')?.content ?? "/media/api";
        this.baseUrl = this.apiUrl.replace("/api", "");
        this.cache = {
            media: null,
            lastFetch: null,
            cacheDuration: 60000,
        };
    }

    /**
     * Fetch paginated media with filters
     * @param {Object} filters - Filter parameters
     * @returns {Promise<Object>} Media data with pagination
     */
    async fetchMedia(filters = {}) {
        const now = Date.now();

        if (
            this.cache.media &&
            this.cache.lastFetch &&
            now - this.cache.lastFetch < this.cacheDuration &&
            Object.keys(filters).length === 0
        ) {
            return this.cache.media;
        }

        try {
            const params = new URLSearchParams();

            if (filters.type === "document") {
                params.append("types[]", "pdf");
                params.append("types[]", "document");
            } else if (filters.type) {
                params.append("type", filters.type);
            }
            if (filters.search) params.append("search", filters.search);
            if (filters.date_from)
                params.append("date_from", filters.date_from);
            if (filters.date_to) params.append("date_to", filters.date_to);
            if (filters.per_page) params.append("per_page", filters.per_page);
            if (filters.page) params.append("page", filters.page);

            const url = `${this.apiUrl}?${params.toString()}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (Object.keys(filters).length === 0) {
                this.cache.media = data;
                this.cache.lastFetch = now;
            }

            return data;
        } catch (error) {
            console.error("Error fetching media:", error);
            throw error;
        }
    }

    /**
     * Get media by ID
     * @param {number} mediaId - Media ID
     * @returns {Promise<Object>} Media data
     */
    async getMediaById(mediaId) {
        try {
            const response = await fetch(`${this.baseUrl}/${mediaId}`, {
                method: "GET",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching media by ID:", error);
            throw error;
        }
    }

    /**
     * Invalidate cache (call after upload/delete operations)
     */
    invalidateCache() {
        this.cache.media = null;
        this.cache.lastFetch = null;
    }

    /**
     * Format file size for display
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted size
     */
    formatFileSize(bytes) {
        if (!bytes) return "0 B";

        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    }

    /**
     * Get media type icon
     * @param {string} type - Media type
     * @returns {string} Icon class
     */
    getMediaIcon(type) {
        const icons = {
            image: "ri-image-line",
            pdf: "ri-file-pdf-line",
            document: "ri-file-text-line",
            xlsx: "ri-file-excel-line",
            xls: "ri-file-excel-line",
            doc: "ri-file-word-line",
            docx: "ri-file-word-line",
        };

        return icons[type] || "ri-file-line";
    }
}
