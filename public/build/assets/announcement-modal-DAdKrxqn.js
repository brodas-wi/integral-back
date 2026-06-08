class d{constructor(){this.modal=null,this.overlay=null,this.announcements=[],this.currentIndex=0,this.slideInterval=null,this.currentPage=this.getCurrentPageSlug(),this.init()}getCurrentPageSlug(){const t=window.location.pathname,e=t.split("/").filter(Boolean);return e.length===0||t==="/"?"home":e[0]==="p"?e[1]||"home":e[e.length-1]||"home"}async init(){try{const t=await this.fetchAnnouncements();t&&t.length>0&&(this.announcements=t,this.createModal(),setTimeout(()=>this.showModal(),500),this.announcements.length>1&&this.startSlideShow())}catch(t){console.error("Error loading announcements:",t)}}async fetchAnnouncements(){try{const e=await(await fetch(`/api/announcements/for-page?page=${this.currentPage}`)).json();return e.success&&e.announcements&&e.announcements.length>0?e.announcements:null}catch(t){return console.error("Error fetching announcements:",t),null}}createModal(){this.overlay=document.createElement("div"),this.overlay.id="announcement-overlay",this.overlay.className="fixed inset-0 bg-black/50 z-[9998] hidden transition-opacity duration-300",this.modal=document.createElement("div"),this.modal.id="announcement-modal",this.modal.className="fixed inset-0 z-[9999] flex items-center justify-center p-4 hidden",this.modal.innerHTML=this.getModalContainerHTML(),document.body.appendChild(this.overlay),document.body.appendChild(this.modal),this.attachEventListeners(),this.renderCurrentAnnouncement()}getModalContainerHTML(){return`
            <div class="relative max-w-full max-h-full">
                <button type="button" id="close-announcement"
                    class="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all">
                    <i class="ri-close-line text-2xl"></i>
                </button>

                ${this.announcements.length>1?this.getNavigationHTML():""}

                <div id="announcement-content-container" class="relative">
                    <!-- Los avisos se renderizan aquí -->
                </div>

                ${this.announcements.length>1?this.getIndicatorsHTML():""}
            </div>
        `}getNavigationHTML(){return`
            <button type="button" id="prev-announcement"
                class="absolute -left-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-primary transition-all hover:scale-110">
                <i class="ri-arrow-left-s-line text-3xl"></i>
            </button>

            <button type="button" id="next-announcement"
                class="absolute -right-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-primary transition-all hover:scale-110">
                <i class="ri-arrow-right-s-line text-3xl"></i>
            </button>
        `}getIndicatorsHTML(){return`
            <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                ${this.announcements.map((t,e)=>`
                    <button type="button"
                        class="announcement-indicator w-2.5 h-2.5 rounded-full transition-all bg-white shadow-lg ${e===0?"w-8":"opacity-60"}"
                        data-index="${e}">
                    </button>
                `).join("")}
            </div>
        `}renderCurrentAnnouncement(){const t=document.getElementById("announcement-content-container"),e=this.announcements[this.currentIndex];t.innerHTML=this.getAnnouncementHTML(e),this.updateIndicators(),setTimeout(()=>{const n=t.querySelector("[data-announcement-content]");n&&(n.style.transform="scale(1)",n.style.opacity="1")},10)}getAnnouncementHTML(t){return t.display_mode==="image_only"?this.getImageOnlyHTML(t):this.getFullHTML(t)}getImageOnlyHTML(t){const e=t.image_width||1920,n=t.image_height||1080,i=window.innerHeight-160,s=window.innerWidth-64,l=Math.min(e,s,1200),o=Math.min(n,i,800),r=e/n;let c=l,a=l/r;return a>o&&(a=o,c=o*r),`
            <div class="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 scale-95 opacity-0 relative"
                 data-announcement-content
                 style="max-width: ${c}px; max-height: ${a}px;">
                <img src="${t.image_url}"
                     alt="${t.image_alt||"Aviso"}"
                     class="w-full h-full object-contain">
            </div>
        `}getFullHTML(t){const e=t.cta_text&&t.cta_url?`
            <a href="${t.cta_url}"
               target="${t.cta_new_tab?"_blank":"_self"}"
               rel="${t.cta_new_tab?"noopener noreferrer":""}"
               class="w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 text-center inline-block">
                ${t.cta_text}
                ${t.cta_new_tab?'<i class="ri-external-link-line ml-1"></i>':""}
            </a>
        `:"";return`
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 scale-95 opacity-0"
                 data-announcement-content>
                ${t.image_url?`
                    <div class="relative w-full h-64 sm:h-80 overflow-hidden">
                        <img src="${t.image_url}"
                             alt="${t.image_alt||t.title}"
                             class="w-full h-full object-cover">
                    </div>
                `:""}

                <div class="p-6 sm:p-8">
                    ${t.title?`<h2 class="text-2xl sm:text-3xl font-bold text-secondary mb-4">${t.title}</h2>`:""}

                    ${t.description?`
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            ${t.description}
                        </p>
                    `:""}

                    ${e?`<div class="flex justify-center">${e}</div>`:""}
                </div>
            </div>
        `}updateIndicators(){document.querySelectorAll(".announcement-indicator").forEach((e,n)=>{n===this.currentIndex?(e.classList.add("w-8"),e.classList.remove("opacity-60","w-2.5")):(e.classList.remove("w-8"),e.classList.add("opacity-60","w-2.5"))})}startSlideShow(){this.slideInterval=setInterval(()=>{this.nextAnnouncement()},5e3)}stopSlideShow(){this.slideInterval&&(clearInterval(this.slideInterval),this.slideInterval=null)}nextAnnouncement(){this.currentIndex=(this.currentIndex+1)%this.announcements.length,this.transitionToAnnouncement()}prevAnnouncement(){this.currentIndex=(this.currentIndex-1+this.announcements.length)%this.announcements.length,this.transitionToAnnouncement()}goToAnnouncement(t){this.currentIndex=t,this.transitionToAnnouncement(),this.stopSlideShow(),this.startSlideShow()}transitionToAnnouncement(){const e=document.getElementById("announcement-content-container").querySelector("[data-announcement-content]");e&&(e.style.transition="opacity 0.3s, transform 0.3s",e.style.opacity="0",e.style.transform="scale(0.95)"),setTimeout(()=>{this.renderCurrentAnnouncement()},300)}attachEventListeners(){const t=document.getElementById("close-announcement"),e=document.getElementById("prev-announcement"),n=document.getElementById("next-announcement");t?.addEventListener("click",()=>this.hideModal()),e?.addEventListener("click",()=>{this.stopSlideShow(),this.prevAnnouncement(),this.startSlideShow()}),n?.addEventListener("click",()=>{this.stopSlideShow(),this.nextAnnouncement(),this.startSlideShow()}),document.addEventListener("click",i=>{if(i.target.classList.contains("announcement-indicator")){const s=parseInt(i.target.dataset.index);this.goToAnnouncement(s)}}),this.overlay?.addEventListener("click",()=>this.hideModal()),document.addEventListener("keydown",i=>{i.key==="Escape"?this.hideModal():i.key==="ArrowLeft"&&this.announcements.length>1?(this.stopSlideShow(),this.prevAnnouncement(),this.startSlideShow()):i.key==="ArrowRight"&&this.announcements.length>1&&(this.stopSlideShow(),this.nextAnnouncement(),this.startSlideShow())}),this.modal?.addEventListener("mouseenter",()=>{this.stopSlideShow()}),this.modal?.addEventListener("mouseleave",()=>{this.announcements.length>1&&this.startSlideShow()})}showModal(){!this.modal||!this.overlay||(document.body.style.overflow="hidden",this.overlay.classList.remove("hidden"),this.modal.classList.remove("hidden"),setTimeout(()=>{this.overlay.style.opacity="1"},10))}hideModal(){!this.modal||!this.overlay||(this.stopSlideShow(),this.overlay.style.opacity="0",setTimeout(()=>{this.modal?.remove(),this.overlay?.remove(),document.body.style.overflow=""},300))}}function u(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{new d}):new d}export{u as initAnnouncementModal};
