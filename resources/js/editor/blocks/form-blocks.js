const formIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="3" y="4" width="26" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="10" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="10" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="16" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="16" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="22" width="26" height="5" fill="#F07C28" rx="1"/>
</svg>`;

const FORM_STYLES = `
<style>
.fm-section{width:100%;padding:3.5rem 4rem;background:#ffffff;box-sizing:border-box;}
.fm-form{display:flex;flex-direction:column;gap:1.25rem;}
.fm-row{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
.fm-field{display:flex;flex-direction:column;gap:0.4rem;}
.fm-label{font-size:0.9rem;font-weight:500;color:#F07C28;}
.fm-input{width:100%;padding:0.65rem 0.85rem;border:2px solid #F07C28;border-radius:0.4rem;font-size:0.95rem;color:#003B71;background:#ffffff;box-sizing:border-box;outline:none;transition:border-color .2s ease;}
.fm-input:focus{border-color:#003B71;}
.fm-select-wrapper{position:relative;display:flex;align-items:stretch;}
.fm-select{width:100%;padding:0.65rem 0.85rem;border:2px solid #F07C28;border-right:none;border-radius:0.4rem 0 0 0.4rem;font-size:0.95rem;color:#003B71;background:#ffffff;box-sizing:border-box;outline:none;cursor:pointer;appearance:none;}
.fm-select:focus{border-color:#003B71;}
.fm-select-btn{display:flex;align-items:center;justify-content:center;width:44px;flex-shrink:0;background:#003B71;border:2px solid #003B71;border-radius:0 0.4rem 0.4rem 0;cursor:pointer;}
.fm-select-btn svg{pointer-events:none;}
.fm-textarea{width:100%;padding:0.65rem 0.85rem;border:2px solid #F07C28;border-radius:0.4rem;font-size:0.95rem;color:#003B71;background:#ffffff;box-sizing:border-box;outline:none;resize:vertical;min-height:120px;transition:border-color .2s ease;}
.fm-textarea:focus{border-color:#003B71;}
.fm-btn{width:100%;padding:1rem;background:#F07C28;color:#ffffff;font-size:0.95rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;border:none;border-radius:0.4rem;cursor:pointer;transition:background .2s ease;}
.fm-btn:hover{background:#d96a1a;}
@media(max-width:1280px){.fm-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.fm-section{padding:2.5rem 1.5rem;}.fm-row{grid-template-columns:1fr;}}
</style>
<script>
(function(){
    document.querySelectorAll('.fm-select-btn').forEach(function(btn){
        btn.addEventListener('click', function(){
            var select = btn.previousElementSibling;
            select.focus();
            var event = new MouseEvent('mousedown', {bubbles:true});
            select.dispatchEvent(event);
        });
    });
})();
</script>
`;

export const formBlocks = [
    {
        id: "contact-form",
        label: "Formulario de contacto",
        category: "Formularios",
        media: formIcon,
        content: `
<section class="fm-section">
    <div class="fm-form">
        <div class="fm-field">
            <label class="fm-label">Nombre *</label>
            <input type="text" class="fm-input" placeholder="">
        </div>
        <div class="fm-row">
            <div class="fm-field">
                <label class="fm-label">Correo electrónico *</label>
                <input type="email" class="fm-input" placeholder="">
            </div>
            <div class="fm-field">
                <label class="fm-label">Teléfono *</label>
                <input type="tel" class="fm-input" placeholder="">
            </div>
        </div>
        <div class="fm-row">
            <div class="fm-field">
                <label class="fm-label">DUI *</label>
                <input type="text" class="fm-input" placeholder="">
            </div>
            <div class="fm-field">
                <label class="fm-label">Tipo de solicitud *</label>
                <div class="fm-select-wrapper">
                    <select class="fm-select">
                        <option value="" disabled selected>Seleccione</option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                    </select>
                    <button type="button" class="fm-select-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="fm-row">
            <div class="fm-field">
                <label class="fm-label">Selecciona tu agencia más cercana *</label>
                <div class="fm-select-wrapper">
                    <select class="fm-select">
                        <option value="" disabled selected>Seleccione</option>
                        <option>Agencia 1</option>
                        <option>Agencia 2</option>
                    </select>
                    <button type="button" class="fm-select-btn" onclick="this.previousElementSibling.size=this.previousElementSibling.size==1?5:1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                </div>
            </div>
            <div class="fm-field">
                <label class="fm-label">¿Por qué medio se enteró de Integral? *</label>
                <div class="fm-select-wrapper">
                    <select class="fm-select">
                        <option value="" disabled selected>Seleccione</option>
                        <option>Redes sociales</option>
                        <option>Recomendación</option>
                    </select>
                    <button type="button" class="fm-select-btn" onclick="this.previousElementSibling.size=this.previousElementSibling.size==1?5:1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="fm-field">
            <label class="fm-label">Comentario *</label>
            <textarea class="fm-textarea"></textarea>
        </div>
        <button type="button" class="fm-btn">Enviar</button>
    </div>
</section>
${FORM_STYLES}`,
    },
];
