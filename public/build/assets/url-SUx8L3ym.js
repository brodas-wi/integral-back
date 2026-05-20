function m(e){const n={...{title:"¿Estás seguro?",message:"¿Deseas continuar con esta acción?",confirmText:"Confirmar",cancelText:"Cancelar",type:"warning",onConfirm:()=>{},onCancel:()=>{}},...e},i=document.getElementById("confirm-modal");i&&i.remove();const t=document.createElement("div");t.id="confirm-modal",t.className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in";const a=l(n.type),c=s(n.type);t.innerHTML=`
        <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onclick="closeConfirmModal()"></div>
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full relative z-10 animate-scale-in">
            <div class="pb-0 pt-6 px-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full ${c} flex items-center justify-center">
                        <i class="${a} text-2xl"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-secondary mb-2">${n.title}</h3>
                        <p class="text-gray-600">${n.message}</p>
                    </div>
                </div>
            </div>
            <div class="px-6 py-4 bg-gray-50 rounded-b-xl flex gap-3 justify-end">
                <button 
                    onclick="closeConfirmModal()" 
                    class="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
                >
                    ${n.cancelText}
                </button>
                <button 
                    onclick="confirmModalAction()" 
                    class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
                >
                    ${n.confirmText}
                </button>
            </div>
        </div>
    `,document.body.appendChild(t),window.currentModalAction=n.onConfirm,window.currentModalCancel=n.onCancel,document.body.style.overflow="hidden"}function r(){const e=document.getElementById("confirm-modal");e&&(e.classList.add("animate-fade-out"),setTimeout(()=>{e.remove(),document.body.style.overflow="",window.currentModalCancel&&window.currentModalCancel()},200))}function u(){window.currentModalAction&&window.currentModalAction(),r()}function l(e){const o={warning:"ri-alert-line",danger:"ri-error-warning-line",info:"ri-information-line",success:"ri-checkbox-circle-line"};return o[e]||o.warning}function s(e){const o={warning:"bg-yellow-100 text-yellow-600",danger:"bg-red-100 text-red-600",info:"bg-blue-100 text-blue-600",success:"bg-green-100 text-green-600"};return o[e]||o.warning}const d=(()=>{const e=document.querySelector('meta[name="app-url"]');return e?e.content.replace(/\/$/,""):window.location.origin})();function f(e){return d+"/"+e.replace(/^\//,"")}export{u as a,f as b,r as c,m as s};
