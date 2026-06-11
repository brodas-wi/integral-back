import{a as d}from"./index-DcNlVx-A.js";import{s as c}from"./notifications-Cgjr4krQ.js";const l=document.querySelector('meta[name="csrf-token"]')?.content;document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".script-toggle").forEach(e=>{e.addEventListener("change",function(){const o=this.dataset.scriptId,a=this.checked,s=document.getElementById(`script-item-${o}`);u(o,a,s,this)})});const t=document.getElementById("show-script-toggle");t&&t.addEventListener("change",function(){const e=this.dataset.scriptId,o=this.checked;u(e,o,null,this)});const n=document.getElementById("btn-copy-code");n&&n.addEventListener("click",function(){const e=document.getElementById("show-code-content");e&&navigator.clipboard.writeText(e.textContent).then(()=>{n.innerHTML='<i class="ri-check-line mr-1"></i>Copiado',setTimeout(()=>{n.innerHTML='<i class="ri-file-copy-line mr-1"></i>Copiar'},2e3)}).catch(()=>{c("No se pudo copiar el código.","error")})}),g()});function u(t,n,e,o){const s=`${document.querySelector('meta[name="scripts-base-url"]')?.content||"/scripts"}/${t}/toggle-active`;d.patch(s,{},{headers:{"X-CSRF-TOKEN":l}}).then(r=>{if(r.data.success){c(r.data.message,"success");const i=document.getElementById("toggle-label");i&&(i.textContent=r.data.is_active?"Activo":"Inactivo"),f(r.data.is_active)}else o.checked=!n,c(r.data.message,"error")}).catch(r=>{o.checked=!n;const i=r.response?.data?.message||"Error al cambiar el estado del script.";c(i,"error")})}function f(t){const n=document.querySelector(".flex.flex-wrap.items-center.gap-2.mb-2");if(!n)return;const e=n.querySelector(".badge-active-indicator");if(t&&!e){const o=document.createElement("span");o.className="badge badge-success badge-active-indicator",o.innerHTML='<i class="ri-checkbox-circle-line mr-1"></i>Activo',n.appendChild(o)}else!t&&e&&e.remove()}function g(){const t=document.getElementById("btn-run-preview"),n=document.getElementById("btn-reset-preview"),e=document.getElementById("preview-iframe");if(!t||!e)return;const o=document.querySelector('meta[name="script-type"]')?.content,a=document.querySelector('meta[name="script-content"]')?.content;if(!a)return;const s=atob(a);t.addEventListener("click",function(){let r="";o==="js"?r=`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vista Previa</title>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f8fafc; color: #333; }
    .preview-notice { background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 13px; color: #0369a1; }
  </style>
</head>
<body>
  <div class="preview-notice">
    <strong>Sandbox activo</strong> — El script se ejecuta en un entorno aislado.
  </div>
  <div id="app">
    <p>Contenido de ejemplo de la página pública.</p>
    <p>El script puede interactuar con este contenido.</p>
  </div>
  <script>
    try {
      ${s}
    } catch(e) {
      document.body.innerHTML += '<div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:8px;padding:12px;margin-top:16px;color:#dc2626;font-size:13px;"><strong>Error en el script:</strong> ' + e.message + '</div>';
    }
  <\/script>
</body>
</html>`:r=`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vista Previa CSS</title>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f8fafc; color: #333; }
    .preview-notice { background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 13px; color: #0369a1; }
    ${s}
  </style>
</head>
<body>
  <div class="preview-notice">
    <strong>Sandbox activo</strong> — Los estilos CSS se aplican a este contenido de ejemplo.
  </div>
  <div id="app">
    <h1>Título de ejemplo</h1>
    <p>Párrafo de ejemplo para visualizar los estilos.</p>
    <button class="btn">Botón de ejemplo</button>
    <a href="#" class="link">Enlace de ejemplo</a>
  </div>
</body>
</html>`;const i=new Blob([r],{type:"text/html"}),p=URL.createObjectURL(i);e.src=p,t.innerHTML='<i class="ri-refresh-line mr-1"></i>Re-ejecutar'}),n.addEventListener("click",function(){e.src="about:blank",t.innerHTML='<i class="ri-play-line mr-1"></i>Ejecutar'})}window.approveScriptShow=function(t){const n=document.querySelector('meta[name="approve-url"]')?.content;n&&confirm("¿Confirmas que deseas aprobar este script?")&&d.patch(n,{},{headers:{"X-CSRF-TOKEN":l}}).then(e=>{e.data.success?(c(e.data.message,"success"),setTimeout(()=>window.location.reload(),1200)):c(e.data.message,"error")}).catch(e=>{c(e.response?.data?.message||"Error al aprobar el script.","error")})};window.openRejectModalShow=function(t,n){const e=document.getElementById("reject-modal-show"),o=document.getElementById("reject-script-name-show"),a=document.getElementById("rejection-reason-show");e&&(o&&(o.textContent=n),a&&(a.value=""),e.classList.remove("hidden"))};window.closeRejectModalShow=function(){const t=document.getElementById("reject-modal-show");t&&t.classList.add("hidden")};window.submitRejectShow=function(){const t=document.querySelector('meta[name="reject-url"]')?.content,n=document.getElementById("rejection-reason-show")?.value.trim();if(!n){c("Debes indicar el motivo del rechazo.","warning");return}d.patch(t,{rejection_reason:n},{headers:{"X-CSRF-TOKEN":l}}).then(e=>{e.data.success?(window.closeRejectModalShow(),c(e.data.message,"success"),setTimeout(()=>window.location.reload(),1200)):c(e.data.message,"error")}).catch(e=>{c(e.response?.data?.message||"Error al rechazar el script.","error")})};window.approveScript=function(t,n){const e=document.querySelector('meta[name="scripts-base-url"]')?.content||"/scripts";confirm(`¿Confirmas que deseas aprobar "${n}"?`)&&d.patch(`${e}/${t}/approve`,{},{headers:{"X-CSRF-TOKEN":l}}).then(o=>{o.data.success?(c(o.data.message,"success"),setTimeout(()=>window.location.reload(),1200)):c(o.data.message,"error")}).catch(o=>{c(o.response?.data?.message||"Error al aprobar el script.","error")})};let m=null;window.openRejectModal=function(t,n){m=t;const e=document.getElementById("reject-modal"),o=document.getElementById("reject-script-name"),a=document.getElementById("rejection-reason");e&&(o&&(o.textContent=n),a&&(a.value=""),e.classList.remove("hidden"))};window.closeRejectModal=function(){const t=document.getElementById("reject-modal");t&&t.classList.add("hidden"),m=null};window.submitReject=function(){if(!m)return;const t=document.querySelector('meta[name="scripts-base-url"]')?.content||"/scripts",n=document.getElementById("rejection-reason")?.value.trim();if(!n){c("Debes indicar el motivo del rechazo.","warning");return}d.patch(`${t}/${m}/reject`,{rejection_reason:n},{headers:{"X-CSRF-TOKEN":l}}).then(e=>{e.data.success?(window.closeRejectModal(),c(e.data.message,"success"),setTimeout(()=>window.location.reload(),1200)):c(e.data.message,"error")}).catch(e=>{c(e.response?.data?.message||"Error al rechazar el script.","error")})};window.confirmDeleteScript=function(t,n){if(!confirm(`¿Estás seguro de que deseas eliminar "${n}"?
Esta acción no se puede deshacer.`))return;const e=document.querySelector('meta[name="delete-url"]')?.content||`${document.querySelector('meta[name="scripts-base-url"]')?.content||"/scripts"}/${t}`,o=document.querySelector('meta[name="scripts-index-url"]')?.content||document.querySelector('meta[name="scripts-base-url"]')?.content||"/scripts";d.delete(e,{headers:{"X-CSRF-TOKEN":l}}).then(a=>{a.data.success?(c(a.data.message,"success"),setTimeout(()=>{window.location.href=o},1200)):c(a.data.message,"error")}).catch(a=>{c(a.response?.data?.message||"Error al eliminar el script.","error")})};
