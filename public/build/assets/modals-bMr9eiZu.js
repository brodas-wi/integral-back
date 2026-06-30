function f(t){const e={...{title:"¿Estás seguro?",message:"¿Deseas continuar con esta acción?",confirmText:"Confirmar",cancelText:"Cancelar",type:"warning",onConfirm:()=>{},onCancel:()=>{}},...t},i=document.getElementById("confirm-modal");i&&i.remove();const n=document.createElement("div");n.id="confirm-modal",n.className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in";const a=s(e.type),d=r(e.type);n.innerHTML=`
        <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onclick="closeConfirmModal()"></div>
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full relative z-10 animate-scale-in">
            <div class="pb-0 pt-6 px-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full ${d} flex items-center justify-center">
                        <i class="${a} text-2xl"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-secondary mb-2">${e.title}</h3>
                        <p class="text-gray-600">${e.message}</p>
                    </div>
                </div>
            </div>
            <div class="px-6 py-4 bg-gray-50 rounded-b-xl flex gap-3 justify-end">
                <button 
                    onclick="closeConfirmModal()" 
                    class="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
                >
                    ${e.cancelText}
                </button>
                <button 
                    onclick="confirmModalAction()" 
                    class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
                >
                    ${e.confirmText}
                </button>
            </div>
        </div>
    `,document.body.appendChild(n),window.currentModalAction=e.onConfirm,window.currentModalCancel=e.onCancel,document.body.style.overflow="hidden"}function m(){const t=document.getElementById("confirm-modal");t&&(t.classList.add("animate-fade-out"),setTimeout(()=>{t.remove(),document.body.style.overflow="",window.currentModalCancel&&window.currentModalCancel()},200))}function g(){window.currentModalAction&&window.currentModalAction(),m()}function u(t){const e={...{title:"Ingresa un valor",message:"",label:"Nombre",placeholder:"",initialValue:"",confirmText:"Confirmar",cancelText:"Cancelar",type:"info",showSlugPreview:!1,onInput:()=>{},onConfirm:()=>{},onCancel:()=>{}},...t},i=document.getElementById("prompt-modal");i&&i.remove();const n=document.createElement("div");n.id="prompt-modal",n.className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in";const a=s(e.type),d=r(e.type);n.innerHTML=`
        <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onclick="closePromptModal()"></div>
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full relative z-10 animate-scale-in">
            <div class="pb-0 pt-6 px-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full ${d} flex items-center justify-center">
                        <i class="${a} text-2xl"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-secondary mb-2">${e.title}</h3>
                        ${e.message?`<p class="text-gray-600 mb-3">${e.message}</p>`:""}
                        <label class="block text-sm font-semibold text-gray-700 mb-1">${e.label}</label>
                        <input
                            type="text"
                            id="prompt-modal-input"
                            value="${e.initialValue}"
                            placeholder="${e.placeholder}"
                            class="input-field w-full"
                            maxlength="255"
                        >
                        ${e.showSlugPreview?`
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
                    ${e.cancelText}
                </button>
                <button
                    onclick="confirmPromptModalAction()"
                    id="prompt-modal-confirm-btn"
                    class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
                >
                    ${e.confirmText}
                </button>
            </div>
        </div>
    `,document.body.appendChild(n),window.currentPromptModalAction=e.onConfirm,window.currentPromptModalCancel=e.onCancel;const l=document.getElementById("prompt-modal-input");l.addEventListener("input",()=>e.onInput(l.value)),l.focus(),l.select(),document.body.style.overflow="hidden"}function c(){const t=document.getElementById("prompt-modal");t&&(t.classList.add("animate-fade-out"),setTimeout(()=>{t.remove(),document.body.style.overflow="",window.currentPromptModalCancel&&window.currentPromptModalCancel()},200))}function p(){const t=document.getElementById("prompt-modal-input"),o=t?t.value:"";window.currentPromptModalAction&&window.currentPromptModalAction(o),c()}window.showPromptModal=u;window.closePromptModal=c;window.confirmPromptModalAction=p;function s(t){const o={warning:"ri-alert-line",danger:"ri-error-warning-line",info:"ri-information-line",success:"ri-checkbox-circle-line"};return o[t]||o.warning}function r(t){const o={warning:"bg-yellow-100 text-yellow-600",danger:"bg-red-100 text-red-600",info:"bg-blue-100 text-blue-600",success:"bg-green-100 text-green-600"};return o[t]||o.warning}export{g as a,u as b,m as c,f as s};
