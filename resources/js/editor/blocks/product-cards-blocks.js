const iconProductCards = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="2.5" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="2.5" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2.5" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2.5" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="9.5" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="11" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="11" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="11" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="11" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="18" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="19.5" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="19.5" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="19.5" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="19.5" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="26.5" y="6" width="4.5" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="27.5" y="8" width="2.5" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="27.5" y="20" width="2.5" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`;

const iconProductCard = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="2"/>
    <rect x="6" y="6" width="7" height="7" fill="#003B71" fill-opacity="0.12" rx="1.5"/>
    <rect x="6" y="16" width="14" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.6"/>
    <rect x="6" y="19" width="11" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="6" y="22" width="20" height="4" rx="1.5" fill="#003B71" fill-opacity="0.5"/>
</svg>`;

const PRODUCT_CARD = `
<div class="pc-card">
    <div class="pc-card-img-wrap">
        <img src="${assetUrl("images/placeholder.svg")}" alt="Producto" class="pc-card-img">
    </div>
    <div class="pc-card-body">
        <h3 class="pc-card-title">TÍTULO DEL PRODUCTO</h3>
        <p class="pc-card-desc">Descripción breve del producto financiero.</p>
    </div>
    <a href="#" class="pc-btn">Solicitar</a>
</div>`;

const PRODUCT_CARDS_STYLES = `
<style>
.pc-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.pc-carousel-wrap{position:relative;overflow:hidden;width:100%;}
.pc-track{display:flex;gap:1.5rem;cursor:grab;user-select:none;width:max-content;}
.pc-track.is-dragging{cursor:grabbing;}
.pc-card{flex:0 0 260px;display:flex;flex-direction:column;align-items:center;gap:1rem;background:#ffffff;border:2px solid #003B71;border-radius:1rem;padding:1.25rem;box-sizing:border-box;}
.pc-card-img-wrap{width:100%;aspect-ratio:1/1;border-radius:0.75rem;overflow:hidden;background:#dce8f5;}
.pc-card-img{width:100%;height:100%;object-fit:cover;display:block;}
.pc-card-body{display:flex;flex-direction:column;align-items:center;gap:0.4rem;text-align:center;flex:1;}
.pc-card-title{font-size:0.95rem;font-weight:700;color:#003B71;text-transform:uppercase;}
.pc-card-desc{font-size:0.9rem;color:#003B71;line-height:1.5;text-align:center;}
.pc-btn{display:block;width:100%;padding:0.5rem 1rem;border-radius:0.5rem;background:#003B71;color:#ffffff;font-size:0.95rem;font-weight:600;text-align:center;text-decoration:none;transition:background .2s;}
.pc-btn:hover{background:#002a52;}
.pc-more-wrap{display:flex;justify-content:center;margin-top:2rem;}
.pc-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:2rem;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background .2s;}
.pc-more-btn:hover{background:#c96200;}
@media(max-width:1280px){.pc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.pc-section{padding:2.5rem 1.5rem;}.pc-card{flex:0 0 220px;}}
@media(max-width:480px){.pc-card{flex:0 0 80vw;}}
</style>`;

const PRODUCT_CARDS_SCRIPT = `
<script>
(function(){
    function initCarousel(section){
        var track = section.querySelector('.pc-track');
        if(!track) return;
        var autoplay = section.dataset.autoplay === 'true';
        var speed = parseInt(section.dataset.speed || '3000');
        var isDragging = false;
        var startX = 0;
        var scrollLeft = 0;
        var autoTimer = null;

        var origItems = Array.from(track.children);
        origItems.forEach(function(item){
            var clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden','true');
            track.appendChild(clone);
        });

        function getMaxScroll(){
            return track.scrollWidth / 2;
        }

        function checkInfinite(){
            if(track.parentElement.scrollLeft >= getMaxScroll()){
                track.parentElement.scrollLeft -= getMaxScroll();
            }
            if(track.parentElement.scrollLeft <= 0 && !isDragging){
            }
        }

        if(autoplay){
            autoTimer = setInterval(function(){
                track.parentElement.scrollLeft += 1;
                checkInfinite();
            }, 16);
        }

        track.parentElement.addEventListener('scroll', checkInfinite);

        track.addEventListener('mousedown', function(e){
            isDragging = true;
            track.classList.add('is-dragging');
            startX = e.pageX - track.parentElement.offsetLeft;
            scrollLeft = track.parentElement.scrollLeft;
            if(autoTimer) clearInterval(autoTimer);
        });

        document.addEventListener('mouseup', function(){
            if(!isDragging) return;
            isDragging = false;
            track.classList.remove('is-dragging');
            if(autoplay){
                autoTimer = setInterval(function(){
                    track.parentElement.scrollLeft += 1;
                    checkInfinite();
                }, 16);
            }
        });

        document.addEventListener('mousemove', function(e){
            if(!isDragging) return;
            e.preventDefault();
            var x = e.pageX - track.parentElement.offsetLeft;
            var walk = (x - startX) * 1.5;
            track.parentElement.scrollLeft = scrollLeft - walk;
            checkInfinite();
        });

        track.parentElement.addEventListener('touchstart', function(e){
            startX = e.touches[0].pageX - track.parentElement.offsetLeft;
            scrollLeft = track.parentElement.scrollLeft;
            if(autoTimer) clearInterval(autoTimer);
        }, {passive:true});

        track.parentElement.addEventListener('touchend', function(){
            if(autoplay){
                autoTimer = setInterval(function(){
                    track.parentElement.scrollLeft += 1;
                    checkInfinite();
                }, 16);
            }
        });

        track.parentElement.addEventListener('touchmove', function(e){
            var x = e.touches[0].pageX - track.parentElement.offsetLeft;
            var walk = (x - startX) * 1.5;
            track.parentElement.scrollLeft = scrollLeft - walk;
            checkInfinite();
        }, {passive:true});
    }

    function init(){
        document.querySelectorAll('.pc-section').forEach(function(section){
            initCarousel(section);
        });
    }

    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>`;

export const productCardsBlocks = [
    {
        id: "product-cards-section",
        label: "Sección de productos",
        category: "Productos y Servicios",
        media: iconProductCards,
        content: `
<section class="pc-section" data-autoplay="false" data-speed="3000">
    <div class="text-center mb-8">
        <h2 class="text-4xl font-bold text-[#003B71] mb-3">Créditos</h2>
        <p class="text-base text-[#003B71]">Opciones de financiamiento diseñadas para hacer realidad tus proyectos.</p>
    </div>
    <div class="pc-carousel-wrap">
        <div class="pc-track">
            ${PRODUCT_CARD}
            ${PRODUCT_CARD}
            ${PRODUCT_CARD}
            ${PRODUCT_CARD}
        </div>
    </div>
    <div class="pc-more-wrap">
        <a href="#" class="pc-more-btn">Ver más</a>
    </div>
</section>
${PRODUCT_CARDS_STYLES}
${PRODUCT_CARDS_SCRIPT}`,
    },
    {
        id: "product-card",
        label: "Tarjeta de producto",
        category: "Productos y Servicios",
        media: iconProductCard,
        content: `${PRODUCT_CARD}${PRODUCT_CARDS_STYLES}`,
    },
];