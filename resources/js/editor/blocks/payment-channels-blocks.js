import { assetUrl } from "@/utils/url.js";

const iconPaymentChannels = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="18" height="2.4" rx="1.2" fill="#E97300"/>
    <rect x="3" y="8" width="8.5" height="9" rx="1.5" fill="#fff" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="12.75" y="8" width="8.5" height="9" rx="1.5" fill="#fff" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="22.5" y="8" width="6.5" height="9" rx="1.5" fill="#fff" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="3" y="19" width="8.5" height="9" rx="1.5" fill="#fff" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="12.75" y="19" width="8.5" height="9" rx="1.5" fill="#fff" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="22.5" y="19" width="6.5" height="9" rx="1.5" fill="#fff" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="5" y="14" width="4.5" height="1.6" rx="0.8" fill="#E97300"/>
    <rect x="14.75" y="14" width="4.5" height="1.6" rx="0.8" fill="#E97300"/>
    <rect x="24" y="14" width="3.5" height="1.6" rx="0.8" fill="#E97300"/>
    <rect x="5" y="25" width="4.5" height="1.6" rx="0.8" fill="#E97300"/>
    <rect x="14.75" y="25" width="4.5" height="1.6" rx="0.8" fill="#E97300"/>
    <rect x="24" y="25" width="3.5" height="1.6" rx="0.8" fill="#E97300"/>
</svg>`;

const iconPaymentChannelItem = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="7" width="26" height="18" rx="2.5" fill="#fff" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.5"/>
    <circle cx="10" cy="16" r="3.4" fill="#E97300"/>
    <rect x="16" y="11.5" width="10" height="1.8" rx="0.9" fill="#003B71" fill-opacity="0.6"/>
    <rect x="16" y="16" width="10" height="3.6" rx="1.8" fill="#E97300"/>
</svg>`;

const PAYMENT_CHANNELS_STYLES = `
<style>
.pc-heading{color:#E97300;}
.pc-title{color:#003B71;}
.pc-card{box-shadow:0 2px 12px rgba(0,59,113,0.12);}
.pc-btn{background:#E97300;color:#fff;text-decoration:none;}
.pc-btn:hover{background:#cf6600;}
.pc-grid{grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));}
</style>`;

const buildCard = (title) => `
<div class="pc-card flex flex-row flex-wrap items-center justify-center gap-4 bg-white rounded-2xl p-5 sm:p-6 min-w-0">
    <img src="${assetUrl("images/placeholder.svg")}" alt="Icono" class="pc-icon w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 object-contain">
    <div class="flex flex-col items-start gap-3 flex-1 min-w-[140px]">
        <h3 class="pc-title text-sm sm:text-base font-bold leading-snug break-words">${title}</h3>
        <a href="#" class="pc-btn inline-flex items-center justify-center rounded-full px-6 py-1.5 text-sm font-bold w-full max-w-[180px]">Ver más</a>
    </div>
</div>`;

const buildPaymentChannels = () => `
<section class="pc-section w-full bg-white flex flex-col gap-6 md:gap-8 p-6 sm:p-8 md:p-12 lg:px-16">
    <p class="pc-heading text-lg font-bold leading-snug">Puedes pagar tu crédito en los corresponsales financieros autorizados:</p>
    <div class="pc-grid grid gap-4 md:gap-6">
        ${buildCard("Mi Banca Empresarial")}
        ${buildCard("Mi Banca Integral")}
        ${buildCard("Corresponsales Financieros")}
        ${buildCard("Akí pago")}
        ${buildCard("Punto Express")}
        ${buildCard("WhatsApp")}
    </div>
</section>
${PAYMENT_CHANNELS_STYLES}`;

export const paymentChannelsBlocks = [
    {
        id: "payment-channels-block",
        label: "Canales de pago",
        category: "Contenido",
        media: iconPaymentChannels,
        content: buildPaymentChannels(),
    },
    {
        id: "payment-channel-item-block",
        label: "Canal de pago (tarjeta)",
        category: "Contenido",
        media: iconPaymentChannelItem,
        content: `${buildCard("Nuevo canal de pago")}${PAYMENT_CHANNELS_STYLES}`,
    },
];