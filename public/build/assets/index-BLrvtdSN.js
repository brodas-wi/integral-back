import{a as s}from"./index-DcNlVx-A.js";const d=document.querySelector('meta[name="csrf-token"]')?.content;document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".script-toggle").forEach(e=>{e.addEventListener("change",function(){const n=this.dataset.scriptId,a=this.checked,r=document.getElementById(`script-item-${n}`);m(n,a,r,this)})});const o=document.getElementById("show-script-toggle");o&&o.addEventListener("change",function(){const e=this.dataset.scriptId,n=this.checked;m(e,n,null,this)});const t=document.getElementById("btn-copy-code");t&&t.addEventListener("click",function(){const e=document.getElementById("show-code-content");e&&navigator.clipboard.writeText(e.textContent).then(()=>{t.innerHTML='<i class="ri-check-line mr-1"></i>Copiado',setTimeout(()=>{t.innerHTML='<i class="ri-file-copy-line mr-1"></i>Copiar'},2e3)}).catch(()=>{c("No se pudo copiar el código.","error")})}),g()});function m(o,t,e,n){const a=`/scripts/${o}/toggle-active`;s.patch(a,{},{headers:{"X-CSRF-TOKEN":d}}).then(r=>{if(r.data.success){c(r.data.message,"success");const i=document.getElementById("toggle-label");i&&(i.textContent=r.data.is_active?"Activo":"Inactivo"),f(r.data.is_active)}else n.checked=!t,c(r.data.message,"error")}).catch(r=>{n.checked=!t;const i=r.response?.data?.message||"Error al cambiar el estado del script.";c(i,"error")})}function f(o){const t=document.querySelector(".flex.flex-wrap.items-center.gap-2.mb-2");if(!t)return;const e=t.querySelector(".badge-active-indicator");if(o&&!e){const n=document.createElement("span");n.className="badge badge-success badge-active-indicator",n.innerHTML='<i class="ri-checkbox-circle-line mr-1"></i>Activo',t.appendChild(n)}else!o&&e&&e.remove()}function g(){const o=document.getElementById("btn-run-preview"),t=document.getElementById("btn-reset-preview"),e=document.getElementById("preview-iframe");if(!o||!e)return;const n=document.querySelector('meta[name="script-type"]')?.content,a=document.querySelector('meta[name="script-content"]')?.content;if(!a)return;const r=atob(a);o.addEventListener("click",function(){let i="";n==="js"?i=`<!DOCTYPE html>
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
      ${r}
    } catch(e) {
      document.body.innerHTML += '<div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:8px;padding:12px;margin-top:16px;color:#dc2626;font-size:13px;"><strong>Error en el script:</strong> ' + e.message + '</div>';
    }
  <\/script>
</body>
</html>`:i=`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vista Previa CSS</title>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f8fafc; color: #333; }
    .preview-notice { background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 13px; color: #0369a1; }
    ${r}
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
</html>`;const p=new Blob([i],{type:"text/html"}),u=URL.createObjectURL(p);e.src=u,o.innerHTML='<i class="ri-refresh-line mr-1"></i>Re-ejecutar'}),t.addEventListener("click",function(){e.src="about:blank",o.innerHTML='<i class="ri-play-line mr-1"></i>Ejecutar'})}window.approveScriptShow=function(o){const t=document.querySelector('meta[name="approve-url"]')?.content;t&&confirm("¿Confirmas que deseas aprobar este script?")&&s.patch(t,{},{headers:{"X-CSRF-TOKEN":d}}).then(e=>{e.data.success?(c(e.data.message,"success"),setTimeout(()=>window.location.reload(),1200)):c(e.data.message,"error")}).catch(e=>{c(e.response?.data?.message||"Error al aprobar el script.","error")})};window.openRejectModalShow=function(o,t){const e=document.getElementById("reject-modal-show"),n=document.getElementById("reject-script-name-show"),a=document.getElementById("rejection-reason-show");e&&(n&&(n.textContent=t),a&&(a.value=""),e.classList.remove("hidden"))};window.closeRejectModalShow=function(){const o=document.getElementById("reject-modal-show");o&&o.classList.add("hidden")};window.submitRejectShow=function(){const o=document.querySelector('meta[name="reject-url"]')?.content,t=document.getElementById("rejection-reason-show")?.value.trim();if(!t){c("Debes indicar el motivo del rechazo.","warning");return}s.patch(o,{rejection_reason:t},{headers:{"X-CSRF-TOKEN":d}}).then(e=>{e.data.success?(window.closeRejectModalShow(),c(e.data.message,"success"),setTimeout(()=>window.location.reload(),1200)):c(e.data.message,"error")}).catch(e=>{c(e.response?.data?.message||"Error al rechazar el script.","error")})};window.approveScript=function(o,t){confirm(`¿Confirmas que deseas aprobar "${t}"?`)&&s.patch(`/scripts/${o}/approve`,{},{headers:{"X-CSRF-TOKEN":d}}).then(e=>{e.data.success?(c(e.data.message,"success"),setTimeout(()=>window.location.reload(),1200)):c(e.data.message,"error")}).catch(e=>{c(e.response?.data?.message||"Error al aprobar el script.","error")})};let l=null;window.openRejectModal=function(o,t){l=o;const e=document.getElementById("reject-modal"),n=document.getElementById("reject-script-name"),a=document.getElementById("rejection-reason");e&&(n&&(n.textContent=t),a&&(a.value=""),e.classList.remove("hidden"))};window.closeRejectModal=function(){const o=document.getElementById("reject-modal");o&&o.classList.add("hidden"),l=null};window.submitReject=function(){if(!l)return;const o=document.getElementById("rejection-reason")?.value.trim();if(!o){c("Debes indicar el motivo del rechazo.","warning");return}s.patch(`/scripts/${l}/reject`,{rejection_reason:o},{headers:{"X-CSRF-TOKEN":d}}).then(t=>{t.data.success?(window.closeRejectModal(),c(t.data.message,"success"),setTimeout(()=>window.location.reload(),1200)):c(t.data.message,"error")}).catch(t=>{c(t.response?.data?.message||"Error al rechazar el script.","error")})};window.confirmDeleteScript=function(o,t){if(!confirm(`¿Estás seguro de que deseas eliminar "${t}"?
Esta acción no se puede deshacer.`))return;const e=document.querySelector('meta[name="delete-url"]')?.content||`/scripts/${o}`,n=document.querySelector('meta[name="scripts-index-url"]')?.content||"/scripts";s.delete(e,{headers:{"X-CSRF-TOKEN":d}}).then(a=>{a.data.success?(c(a.data.message,"success"),setTimeout(()=>{window.location.href=n},1200)):c(a.data.message,"error")}).catch(a=>{c(a.response?.data?.message||"Error al eliminar el script.","error")})};function c(o,t="info"){if(window.__notify){window.__notify(o,t);return}const e={success:"#16a34a",error:"#dc2626",warning:"#d97706",info:"#2563eb"},n=document.createElement("div");n.style.cssText=`position:fixed;top:20px;right:20px;z-index:9999;background:${e[t]||e.info};color:white;padding:12px 20px;border-radius:8px;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.15);max-width:360px;`,n.textContent=o,document.body.appendChild(n),setTimeout(()=>n.remove(),3500)}
