function u(e){const o={...{title:"¿Estás seguro?",message:"¿Deseas continuar con esta acción?",confirmText:"Confirmar",cancelText:"Cancelar",type:"warning",onConfirm:()=>{},onCancel:()=>{}},...e},i=document.getElementById("confirm-modal");i&&i.remove();const n=document.createElement("div");n.id="confirm-modal",n.className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in";const a=r(o.type),d=m(o.type);n.innerHTML=`
        <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onclick="closeConfirmModal()"></div>
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full relative z-10 animate-scale-in">
            <div class="pb-0 pt-6 px-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full ${d} flex items-center justify-center">
                        <i class="${a} text-2xl"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-secondary mb-2">${o.title}</h3>
                        <p class="text-gray-600">${o.message}</p>
                    </div>
                </div>
            </div>
            <div class="px-6 py-4 bg-gray-50 rounded-b-xl flex gap-3 justify-end">
                <button 
                    onclick="closeConfirmModal()" 
                    class="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
                >
                    ${o.cancelText}
                </button>
                <button 
                    onclick="confirmModalAction()" 
                    class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
                >
                    ${o.confirmText}
                </button>
            </div>
        </div>
    `,document.body.appendChild(n),window.currentModalAction=o.onConfirm,window.currentModalCancel=o.onCancel,document.body.style.overflow="hidden"}function c(){const e=document.getElementById("confirm-modal");e&&(e.classList.add("animate-fade-out"),setTimeout(()=>{e.remove(),document.body.style.overflow="",window.currentModalCancel&&window.currentModalCancel()},200))}function p(){window.currentModalAction&&window.currentModalAction(),c()}function f(e){const o={...{title:"Ingresa un valor",message:"",label:"Nombre",placeholder:"",initialValue:"",confirmText:"Confirmar",cancelText:"Cancelar",type:"info",showSlugPreview:!1,onInput:()=>{},onConfirm:()=>{},onCancel:()=>{}},...e},i=document.getElementById("prompt-modal");i&&i.remove();const n=document.createElement("div");n.id="prompt-modal",n.className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in";const a=r(o.type),d=m(o.type);n.innerHTML=`
        <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onclick="closePromptModal()"></div>
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full relative z-10 animate-scale-in">
            <div class="pb-0 pt-6 px-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full ${d} flex items-center justify-center">
                        <i class="${a} text-2xl"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-secondary mb-2">${o.title}</h3>
                        ${o.message?`<p class="text-gray-600 mb-3">${o.message}</p>`:""}
                        <label class="block text-sm font-semibold text-gray-700 mb-1">${o.label}</label>
                        <input
                            type="text"
                            id="prompt-modal-input"
                            value="${o.initialValue}"
                            placeholder="${o.placeholder}"
                            class="input-field w-full"
                            maxlength="255"
                        >
                        ${o.showSlugPreview?`
                        <p class="text-xs font-mono text-gray-500 mt-2" id="prompt-modal-slug-preview"></p>
                        <p class="text-xs mt-1 hidden" id="prompt-modal-slug-status"></p>
                        <div class="flex flex-wrap gap-2 mt-2 hidden" id="prompt-modal-slug-suggestions"></div>
                        `:""}
                    </div>
                </div>
            </div>
            <div class="px-6 py-4 bg-gray-50 rounded-b-xl flex gap-3 justify-end">
                <button
                    onclick="closePromptModal()"
                    class="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
                >
                    ${o.cancelText}
                </button>
                <button
                    onclick="confirmPromptModalAction()"
                    id="prompt-modal-confirm-btn"
                    class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
                >
                    ${o.confirmText}
                </button>
            </div>
        </div>
    `,document.body.appendChild(n),window.currentPromptModalAction=o.onConfirm,window.currentPromptModalCancel=o.onCancel;const l=document.getElementById("prompt-modal-input");l.addEventListener("input",()=>o.onInput(l.value)),l.focus(),l.select(),document.body.style.overflow="hidden"}function s(){const e=document.getElementById("prompt-modal");e&&(e.classList.add("animate-fade-out"),setTimeout(()=>{e.remove(),document.body.style.overflow="",window.currentPromptModalCancel&&window.currentPromptModalCancel()},200))}function g(){const e=document.getElementById("prompt-modal-input"),t=e?e.value:"";window.currentPromptModalAction&&window.currentPromptModalAction(t),s()}window.showConfirmModal=u;window.closeConfirmModal=c;window.confirmModalAction=p;window.showPromptModal=f;window.closePromptModal=s;window.confirmPromptModalAction=g;function r(e){const t={warning:"ri-alert-line",danger:"ri-error-warning-line",info:"ri-information-line",success:"ri-checkbox-circle-line"};return t[e]||t.warning}function m(e){const t={warning:"bg-yellow-100 text-yellow-600",danger:"bg-red-100 text-red-600",info:"bg-blue-100 text-blue-600",success:"bg-green-100 text-green-600"};return t[e]||t.warning}export{p as a,f as b,c,u as s};
