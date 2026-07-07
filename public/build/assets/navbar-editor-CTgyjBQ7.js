import{i as te,I as Q,o as oe,t as ae,d as ie,f as re,e as le,s as se,g as ce,c as de,E as be,j as me,h as ue}from"./editor-commands-DULPa6UC.js";import"./_commonjsHelpers-CqkleIqs.js";function pe(){return te()}const fe="/bancaintegral",ge=`(function(){
function initNavbar(root){
    if(!root||root.__nbInit)return;
    root.__nbInit=true;
    var id=root.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");
    if(!id)return;
    function pad(){document.body.style.paddingTop=root.offsetHeight+"px";}
    pad();
    window.addEventListener("resize",function(){
        pad();
        if(window.innerWidth>992){
            var mob=document.getElementById("nb-mobile-"+id);
            if(mob&&mob.classList.contains("nb-open"))mob.classList.remove("nb-open");
            root.querySelectorAll(".nb-mobile-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
        }
    });
    var toggle=document.getElementById("nb-toggle-"+id);
    var mobile=document.getElementById("nb-mobile-"+id);
    if(toggle&&mobile){
        toggle.addEventListener("click",function(){mobile.classList.toggle("nb-open");pad();});
    }
    root.querySelectorAll(".nb-nav-trigger").forEach(function(btn){
        btn.addEventListener("click",function(e){
            e.stopPropagation();
            var item=btn.closest(".nb-nav-item");
            var open=item.classList.contains("nb-open");
            root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
            if(!open)item.classList.add("nb-open");
            pad();
        });
    });
    root.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(btn){
        btn.addEventListener("click",function(){
            btn.closest(".nb-mobile-item").classList.toggle("nb-open");
            pad();
        });
    });
    document.addEventListener("click",function(e){
        if(!root.contains(e.target)){
            root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
        }
    });
}
document.querySelectorAll("nav[data-gjs-type='navbar-component'], nav.nb-wrapper").forEach(function(el){initNavbar(el);});
if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",function(){
        document.querySelectorAll("nav[data-gjs-type='navbar-component'], nav.nb-wrapper").forEach(function(el){initNavbar(el);});
    });
}
})();`,X=`
<style>
.nb-icon-btn{display:inline-flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem;border-radius:9999px;background:#ffffff;color:#E97300;border:none;cursor:pointer;text-decoration:none;flex-shrink:0;transition:box-shadow 0.2s;align-self:center;}
.nb-icon-btn:hover{box-shadow:0 4px 14px rgba(0,0,0,0.15);}
.nb-icon-btn i{font-size:1.25rem;color:#E97300;line-height:1;}
.nb-icon-btn-gap{width:0.75rem;flex-shrink:0;}
.nb-wrapper{background:#fff;width:100%;box-shadow:0 2px 8px rgba(0,0,0,0.08);position:fixed;top:0;left:0;right:0;z-index:1000;font-family:'Poppins',sans-serif;}
.nb-top{display:flex;align-items:center;justify-content:space-between;padding:0.75rem 4rem;gap:1.5rem;position:relative;}
.nb-top::after{content:'';position:absolute;bottom:0;left:calc(4rem + 60px);right:calc(4rem + 180px);height:1px;background:#E97300;}
.nb-logo-link{display:flex;align-items:center;text-decoration:none;flex-shrink:0;}
.nb-logo-link img{height:40px;width:auto;display:block;}
.nb-logo-text{font-size:1.125rem;font-weight:800;color:#003B71;}
.nb-top-actions{display:flex;align-items:center;gap:1.5rem;flex:1;justify-content:center;}
.nb-top-action{display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:#003B71;font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;transition:color 0.15s;white-space:nowrap;}
.nb-top-action i{font-size:1.5rem;color:#E97300;}
.nb-top-action:hover{color:#E97300;}
.nb-banking-btn{display:inline-flex;align-items:center;justify-content:center;padding:0.625rem 1.5rem;border-radius:9999px;font-size:0.9375rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;transition:opacity 0.15s;white-space:nowrap;font-family:inherit;flex-shrink:0;}
.nb-banking-btn:hover{opacity:0.88;}
.nb-banking-blue{background:#003B71;color:#fff;}
.nb-banking-orange{background:#E97300;color:#fff;}
.nb-bottom{display:flex;align-items:stretch;padding:0 4rem;gap:0;position:relative;border-bottom:3px solid #E97300;}
.nb-nav-list{display:flex;align-items:center;justify-content:space-between;gap:0;list-style:none;margin:0;padding:0;flex:1;}
.nb-nav-item{position:static;}
.nb-nav-link{display:inline-flex;align-items:center;gap:0.375rem;padding:0.875rem 1.125rem;color:#E97300;text-decoration:none;font-size:0.9375rem;font-weight:600;transition:color 0.15s;white-space:nowrap;cursor:pointer;background:none;border:none;font-family:inherit;}
.nb-nav-link:hover,.nb-nav-item.nb-open>.nb-nav-link{color:#003B71;}
.nb-mega{display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border-top:2px solid #E97300;border-bottom:2px solid #E97300;box-shadow:0 8px 32px rgba(0,0,0,0.1);z-index:200;padding:1rem 4rem;}
.nb-nav-item.nb-open>.nb-mega{display:block;}
.nb-mega-grid{display:grid;gap:2rem;grid-template-columns:1fr 1fr 1fr minmax(200px,260px);}
.nb-mega-col{display:flex;flex-direction:column;gap:0.5rem;min-width:0;border-right:2px solid #E97300;padding-right:1.5rem;}
.nb-mega-col:last-of-type{border-right:2px solid #E97300;}
.nb-mega-badge{display:inline-flex;align-items:center;justify-content:center;padding:0.5rem 1.25rem;border-radius:9999px;font-size:0.875rem;font-weight:700;text-align:center;margin-bottom:0;cursor:default;}
.nb-badge-blue{background:#003B71;color:#fff;}
.nb-badge-orange{background:#E97300;color:#fff;}
.nb-mega-item{display:flex;flex-direction:column;gap:0.125rem;text-decoration:none;padding:0.375rem 0;border-bottom:1px solid transparent;transition:border-color 0.15s;}
.nb-mega-item:hover{border-bottom-color:#e2e8f0;}
.nb-mega-item-title{font-size:0.8125rem;font-weight:700;color:#003B71;text-transform:uppercase;letter-spacing:0.03em;line-height:1.3;}
.nb-mega-item-desc{font-size:0.8125rem;font-weight:400;color:#E97300;line-height:1.4;}
.nb-mega-cta-col{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.25rem;padding:1rem;}
.nb-mega-cta-text{font-size:1.125rem;font-weight:800;text-align:center;line-height:1.3;text-transform:uppercase;}
.nb-mega-cta-buttons{display:flex;flex-direction:column;gap:0.625rem;width:100%;align-items:center;}
.nb-mega-cta-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.375rem;padding:0.625rem 1.75rem;border-radius:9999px;font-size:0.875rem;font-weight:700;text-decoration:none;cursor:pointer;border:none;font-family:inherit;transition:opacity 0.15s;}
.nb-mega-cta-btn:hover{opacity:0.88;}
.nb-mega-cta-btn i{font-size:1rem;line-height:1;}
.nb-bottom-cta{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;padding:0.5rem 1.25rem;border-radius:9999px;font-size:0.8125rem;font-weight:700;text-decoration:none;cursor:pointer;border:none;font-family:inherit;transition:opacity 0.15s;text-align:center;word-break:break-word;white-space:normal;min-width:120px;max-width:180px;line-height:1.25;margin-left:1.25rem;flex-shrink:0;align-self:center;margin-top:0.375rem;margin-bottom:0.375rem;}
.nb-bottom-cta:hover{opacity:0.88;}
.nb-bottom-cta-line1{letter-spacing:0.04em;}
.nb-bottom-cta-line2{font-size:0.6875rem;font-weight:500;letter-spacing:0.06em;opacity:0.85;}
.nb-cta-blue{background:#003B71;color:#fff;}
.nb-cta-orange{background:#E97300;color:#fff;}
.nb-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:0.5rem;border-radius:0.375rem;transition:background 0.15s;flex-shrink:0;}
.nb-hamburger:hover{background:rgba(0,59,113,0.06);}
.nb-hamburger span{display:block;width:24px;height:2px;background:#003B71;border-radius:2px;transition:all 0.25s;}
.nb-mobile-bar{display:none;align-items:center;justify-content:space-between;padding:0.625rem 1.25rem;border-bottom:3px solid #E97300;}
.nb-mobile-menu{display:none;flex-direction:column;background:#fff;border-top:1px solid #f1f5f9;border-bottom:2px solid #E97300;padding:0.75rem 1.25rem;gap:0;max-height:calc(100vh - 64px);overflow-y:auto;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
.nb-mobile-menu::-webkit-scrollbar{width:4px;}
.nb-mobile-menu::-webkit-scrollbar-track{background:transparent;}
.nb-mobile-menu::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
.nb-mobile-menu::-webkit-scrollbar-thumb:hover{background:#94a3b8;}
.nb-mobile-menu.nb-open{display:flex;}
.nb-mobile-top-actions{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;gap:0.25rem 1rem;border-bottom:1px solid #f1f5f9;padding:0.25rem 0.75rem;}
.nb-mobile-top-action{display:flex;align-items:center;gap:0.5rem;padding:0.375rem 0.5rem;color:#003B71;text-decoration:none;font-size:0.8125rem;font-weight:600;white-space:nowrap;text-transform:uppercase;letter-spacing:0.04em;transition:color 0.15s;}
.nb-mobile-top-action:hover{color:#E97300;}
.nb-mobile-top-action i{font-size:1.125rem;color:#E97300;flex-shrink:0;}
.nb-mobile-banking{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center;gap:0.625rem;padding:0.625rem 0.5rem;border-bottom:1px solid #f1f5f9;}
.nb-mobile-banking .nb-banking-btn{width:auto;justify-content:center;}
.nb-mobile-banking .nb-bottom-cta{margin-left:0;margin-top:0;margin-bottom:0;align-self:auto;}
.nb-mobile-link{display:flex;align-items:center;justify-content:space-between;padding:0.75rem 0.5rem;color:#E97300;text-decoration:none;font-size:0.9375rem;font-weight:600;border-bottom:1px solid #f1f5f9;cursor:pointer;background:none;border-left:none;border-right:none;border-top:none;width:100%;text-align:left;font-family:inherit;transition:color 0.15s;}
.nb-mobile-link:hover,.nb-mobile-item.nb-open>.nb-mobile-link{color:#003B71;}
.nb-mobile-link i{color:#94a3b8;font-size:0.875rem;transition:transform 0.2s;}
.nb-mobile-item.nb-open>.nb-mobile-link i{transform:rotate(180deg);}
.nb-mobile-link-content{display:flex;align-items:center;gap:0.5rem;}
.nb-mobile-link-content i{color:#E97300;font-size:1rem;transition:none;}
.nb-mobile-submenu{display:none;flex-direction:row;flex-wrap:wrap;padding:0.5rem 0 0.75rem 0;gap:0.75rem;border-bottom:1px solid #f1f5f9;}
.nb-mobile-item.nb-open>.nb-mobile-submenu{display:flex;}
.nb-mobile-sub-col{display:flex;flex-direction:column;gap:0.25rem;flex:1 1 140px;min-width:200px;}
.nb-mobile-sub-badge{display:inline-flex;align-items:center;justify-content:center;padding:0.3rem 0.875rem;border-radius:9999px;font-size:0.75rem;font-weight:700;margin-bottom:0.25rem;cursor:default;white-space:normal;}
.nb-mobile-sub-link{display:flex;flex-direction:column;gap:0.125rem;padding:0.375rem 0.25rem;text-decoration:none;border-radius:0.375rem;transition:background 0.15s;}
.nb-mobile-sub-link:hover{background:rgba(0,59,113,0.04);}
.nb-mobile-sub-title{font-size:0.8rem;font-weight:700;color:#003B71;text-transform:uppercase;line-height:1.3;}
.nb-mobile-sub-desc{font-size:0.7rem;color:#E97300;line-height:1.3;}
@media(max-width:1280px){
    .nb-top{padding:0.75rem 2.5rem;}
    .nb-bottom{padding:0 2.5rem;}
    .nb-mega{padding:2rem 2.5rem;}
}
@media(max-width:992px){
    .nb-top{display:none;}
    .nb-bottom{display:none;}
    .nb-mobile-bar{display:flex;}
    .nb-hamburger{display:flex;}
}
</style>`;function ve(o){return o?o.split(" ").filter(a=>a.length>0).map((a,r)=>`<span style="color:${r%2===0?"#E97300":"#003B71"};">${a}</span>`).join(" "):""}function K(o){return o?Array.isArray(o.buttons)?{text:o.text||"",buttons:o.buttons.slice(0,2).map(a=>({label:a.label||"",href:a.href||"#",color:a.color==="blue"?"blue":"orange",icon:a.icon||""}))}:o.btn_label||o.btn_href||o.btn_color?{text:o.text||"",buttons:[{label:o.btn_label||"",href:o.btn_href||"#",color:o.btn_color==="blue"?"blue":"orange",icon:""}]}:{text:o.text||"",buttons:[]}:{text:"",buttons:[]}}function ye(o){return(o||[]).map(a=>a.type==="submenu"&&a.cta_column?{...a,cta_column:K(a.cta_column)}:a)}function Y(o,a){a=a||"nb"+Math.random().toString(36).slice(2,7);const r=o.logo_href||"/",i=o.logo_url?`<img src="${o.logo_url}" alt="${o.logo_alt||"Logo"}">`:`<span class="nb-logo-text">${o.logo_text||"Logo"}</span>`,v=`<a href="${r}" class="nb-logo-link">${i}</a>`,I=(o.top_actions||[]).map(b=>{const $=b.icon?`<i class="${b.icon}"></i>`:"";return`<a href="${b.href||"#"}" class="nb-top-action">${$}${b.label||""}</a>`}).join(""),A=o.banking_btn||{},E=A.color==="orange"?"nb-banking-orange":"nb-banking-blue",h=`<a href="${A.href||"#"}" class="nb-banking-btn ${E}">${A.label||"Banca en Línea"}</a>`,u=(o.nav_links||[]).map(b=>{if(b.type==="submenu"&&b.columns?.length){const C=b.cta_column?K(b.cta_column):null,B=!!(C&&(C.text||C.buttons.length)),M=b.columns.slice(0,3),_=M.map(O=>{const R=O.badge_color==="orange"?"nb-badge-orange":"nb-badge-blue",j=O.badge?`<span class="nb-mega-badge ${R}">${O.badge}</span>`:"",n=(O.items||[]).map(e=>{const c=e.desc?`<span class="nb-mega-item-desc">${e.desc}</span>`:"";return`<a href="${e.href||"#"}" class="nb-mega-item"><span class="nb-mega-item-title">${e.label||""}</span>${c}</a>`}).join("");return`<div class="nb-mega-col">${j}${n}</div>`}).join("");let U="";if(B){const O=ve(C.text||""),R=C.buttons.slice(0,2).map(j=>{const n=j.color==="blue"?"nb-badge-blue":"nb-badge-orange",e=j.icon?`<i class="${j.icon}"></i>`:"";return`<a href="${j.href||"#"}" class="nb-mega-cta-btn ${n}">${e}${j.label||"Ver más"}</a>`}).join("");U=`<div class="nb-mega-cta-col">
                        <p class="nb-mega-cta-text">${O}</p>
                        <div class="nb-mega-cta-buttons">${R}</div>
                    </div>`}const D=B?"grid-template-columns:1fr 1fr 1fr minmax(200px,260px);":`grid-template-columns:repeat(${M.length},minmax(0,280px));justify-content:start;`;return`<li class="nb-nav-item nb-has-submenu">
                    <button class="nb-nav-link nb-nav-trigger" type="button">${b.label||"Menú"}</button>
                    <div class="nb-mega"><div class="nb-mega-grid" style="${D}">${_}${U}</div></div>
                </li>`}const $=b.icon?`<i class="${b.icon}"></i>`:"";return`<li class="nb-nav-item"><a href="${b.href||"#"}" class="nb-nav-link">${$}${b.label||""}</a></li>`}).join(""),f=o.bottom_cta||{},k=f.color==="blue"?"nb-cta-blue":"nb-cta-orange",q=f.sublabel?`<span class="nb-bottom-cta-line2">${f.sublabel}</span>`:"",t=f.label?`<a href="${f.href||"#"}" class="nb-bottom-cta ${k}"><span class="nb-bottom-cta-line1">${f.label}</span>${q}</a>`:"",N=o.icon_btn||{},F=N.enabled?`<a href="${N.href||"#"}" class="nb-icon-btn" title="${N.label||""}"><i class="${N.icon||"ri-search-line"}"></i></a>`:"",G=(o.top_actions||[]).map(b=>{const $=b.icon?`<i class="${b.icon}"></i>`:"";return`<a href="${b.href||"#"}" class="nb-mobile-top-action">${$}${b.label||""}</a>`}).join(""),H=(o.nav_links||[]).map(b=>{if(b.type==="submenu"&&b.columns?.length){const C=b.columns.slice(0,3).map(B=>{const M=B.badge_color==="orange"?"nb-badge-orange":"nb-badge-blue",_=B.badge?`<span class="nb-mobile-sub-badge ${M}">${B.badge}</span>`:"",U=(B.items||[]).map(D=>{const O=D.desc?`<span class="nb-mobile-sub-desc">${D.desc}</span>`:"";return`<a href="${D.href||"#"}" class="nb-mobile-sub-link"><span class="nb-mobile-sub-title">${D.label||""}</span>${O}</a>`}).join("");return`<div class="nb-mobile-sub-col">${_}${U}</div>`}).join("");return`<div class="nb-mobile-item">
                    <button class="nb-mobile-link" type="button">${b.label||"Menú"}<i class="ri-arrow-down-s-line"></i></button>
                    <div class="nb-mobile-submenu">${C}</div>
                </div>`}const $=b.icon?`<i class="${b.icon}"></i>`:"";return`<a href="${b.href||"#"}" class="nb-mobile-link"><span class="nb-mobile-link-content">${$}${b.label||""}</span></a>`}).join(""),J=[h,f.label?`<a href="${f.href||"#"}" class="nb-bottom-cta ${k}"><span class="nb-bottom-cta-line1">${f.label}</span>${q}</a>`:""].filter(Boolean).join("");return`<div id="nb-root-${a}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="nb-top">
            <div class="nb-logo">${v}</div>
            <div class="nb-top-actions">${I}</div>
            ${h}
        </div>
        <div class="nb-bottom">
            <ul class="nb-nav-list">${u}</ul>
            ${t}
            <div class="nb-icon-btn-gap"></div>
            ${F}
        </div>
        <div class="nb-mobile-bar">
            ${v}
            <div style="display:flex;align-items:center;gap:0.5rem;">
                ${F}
                <button class="nb-hamburger" type="button" id="nb-toggle-${a}" aria-label="Menú"><span></span><span></span><span></span></button>
            </div>
        </div>
        <div class="nb-mobile-menu" id="nb-mobile-${a}">
            <div class="nb-mobile-top-actions">${G}</div>
            <div class="nb-mobile-banking">${J}</div>
            ${H}
        </div>
    </div>`}const P={icon_btn:{enabled:!1,icon:"ri-search-line",href:"#",label:"Buscar"},logo_url:"",logo_alt:"Logo",logo_text:"Logo",logo_href:"/",top_actions:[{label:"Contáctanos",href:"#",icon:"ri-phone-line"},{label:"Sucursales",href:"#",icon:"ri-building-line"},{label:"Preguntas Frecuentes",href:"#",icon:"ri-question-answer-line"}],banking_btn:{label:"Mi Banca Integral",href:"#",color:"blue"},nav_links:[{type:"link",label:"Inicio",href:"/"},{type:"submenu",label:"Créditos",columns:[{badge:"Tus créditos",badge_color:"blue",items:[{label:"Microcrédito",desc:"Financiamiento para tu negocio",href:"#"},{label:"Crédito Personal",desc:"Para tus necesidades personales",href:"#"}]}],cta_column:{text:"Solicita tu Crédito Online",buttons:[{label:"Solicitar",href:"#",color:"orange",icon:""}]}},{type:"link",label:"Ahorros e Inversión",href:"#"},{type:"link",label:"Servicios y seguro",href:"#"}],bottom_cta:{label:"Programa Surge",sublabel:"Formación Empresarial",href:"#",color:"orange"}};function ee(o,a){const r=document.getElementById("navbar-config-modal");if(r&&r.remove(),!document.getElementById("nb-modal-styles")){const n=document.createElement("style");n.id="nb-modal-styles",n.textContent=`
            .nb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .nb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:860px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .nb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .nb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .nb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .nb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .nb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .nb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .nb-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;overflow-x:auto;}
            .nb-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
            .nb-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .nb-tab-btn i{font-size:1rem;}
            .nb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .nb-modal-body::-webkit-scrollbar{width:5px;}
            .nb-modal-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
            .nb-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .nb-tab-panel.active{display:flex;}
            .nb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .nb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .nb-row{display:flex;gap:0.75rem;align-items:center;}
            .nb-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .nb-input:focus{border-color:#3b82f6;}
            .nb-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .nb-input-sm:focus{border-color:#3b82f6;}
            .nb-select{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;}
            .nb-list{display:flex;flex-direction:column;gap:0.625rem;}
            .nb-action-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-action-card.nb-dragging{opacity:0.4;}
            .nb-action-card.nb-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
            .nb-link-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;overflow:visible;}
            .nb-link-card.nb-dragging{opacity:0.4;}
            .nb-link-card.nb-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
            .nb-link-card-header{padding:0.625rem 0.875rem;background:#f8fafc;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:0.5rem;border-radius:0.5rem 0.5rem 0 0;}
            .nb-link-card-body{padding:0.75rem 0.875rem;display:flex;flex-direction:column;gap:0.75rem;}
            .nb-drag-handle{cursor:grab;color:#94a3b8;display:flex;align-items:center;padding:0 0.125rem;flex-shrink:0;}
            .nb-drag-handle:hover{color:#475569;}
            .nb-drag-handle:active{cursor:grabbing;}
            .nb-type-badge{font-size:0.65rem;font-weight:700;padding:2px 6px;border-radius:4px;text-transform:uppercase;letter-spacing:0.05em;cursor:pointer;transition:opacity 0.15s;user-select:none;}
            .nb-type-badge:hover{opacity:0.75;}
            .nb-type-link{background:#dbeafe;color:#1d4ed8;}
            .nb-type-submenu{background:#fef3c7;color:#b45309;}
            .nb-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:0.25rem;transition:background 0.15s;}
            .nb-btn-remove:hover{background:#fef2f2;}
            .nb-btn-sm-add{padding:0.25rem 0.625rem;background:#e8f0f8;border:none;border-radius:0.375rem;color:#003B71;font-size:0.7rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;}
            .nb-btn-sm-add:hover{background:#d1e3f5;}
            .nb-add-row{display:flex;gap:0.5rem;padding-top:0.25rem;flex-wrap:wrap;}
            .nb-btn-add{padding:0.375rem 0.75rem;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;}
            .nb-btn-add-link{background:#003B71;}
            .nb-btn-add-link:hover{background:#002a52;}
            .nb-btn-add-submenu{background:#b45309;}
            .nb-btn-add-submenu:hover{background:#92400e;}
            .nb-btn-add-action{background:#003B71;}
            .nb-btn-add-action:hover{background:#002a52;}
            .nb-btn-add-col{background:#0d9488;}
            .nb-btn-add-col:hover{background:#0f766e;}
            .nb-btn-add-item{background:#64748b;}
            .nb-btn-add-item:hover{background:#475569;}
            .nb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .nb-pick-btn:hover{background:#002a52;}
            .nb-icon-preview{display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;background:#f1f5f9;border-radius:0.375rem;flex-shrink:0;}
            .nb-icon-preview i{font-size:1.125rem;color:#003B71;}
            .nb-col-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-col-card-header{display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;}
            .nb-col-items{display:flex;flex-direction:column;gap:0.375rem;padding-left:0.5rem;border-left:2px solid #e2e8f0;}
            .nb-col-item{display:flex;flex-direction:column;gap:0.25rem;padding:0.375rem;background:#fff;border:1px solid #f1f5f9;border-radius:0.375rem;}
            .nb-col-item-row{display:flex;gap:0.375rem;align-items:center;}
            .nb-section-title{font-size:0.75rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0;border-bottom:1px solid #e2e8f0;margin-bottom:0.25rem;}
            .nb-cta-section{background:#fff3e0;border:1px solid #fed7aa;border-radius:0.5rem;padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .nb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .nb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-btn-save:hover{background:#d97821;}
            .nb-color-toggle{display:flex;gap:0.375rem;}
            .nb-color-opt{padding:0.375rem 0.875rem;border-radius:9999px;font-size:0.75rem;font-weight:700;cursor:pointer;border:2px solid transparent;transition:all 0.15s;font-family:inherit;}
            .nb-color-opt-blue{background:#003B71;color:#fff;}
            .nb-color-opt-orange{background:#E97300;color:#fff;}
            .nb-color-opt.nb-color-inactive{opacity:0.35;border-color:#e2e8f0;}
            .nb-color-opt.nb-color-inactive:hover{opacity:0.6;}
            .nb-btn-backup{padding:0.5rem 1rem;background:#fff;border:2px solid #003B71;border-radius:0.5rem;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;}
            .nb-btn-backup:hover{background:#003B71;color:#fff;}
            .nb-btn-restore{padding:0.5rem 1rem;background:#fff;border:2px solid #0d9488;border-radius:0.5rem;color:#0d9488;font-size:0.8125rem;font-weight:600;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;user-select:none;}
            .nb-btn-restore:hover{background:#0d9488;color:#fff;}
            .nb-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
            .nb-confirm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
            .nb-confirm-header{padding:1rem 1.25rem 0.75rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
            .nb-confirm-header i{font-size:1.25rem;color:#E97300;}
            .nb-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
            .nb-confirm-body{padding:1rem 1.25rem;}
            .nb-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
            .nb-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;background:#f1f5f9;border-radius:0.375rem;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
            .nb-confirm-footer{padding:0.75rem 1.25rem 1rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
            .nb-confirm-cancel{padding:0.5rem 1.125rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-confirm-cancel:hover{background:#f1f5f9;}
            .nb-confirm-ok{padding:0.5rem 1.125rem;background:#E97300;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-confirm-ok:hover{background:#d97821;}
            .icon-picker-overlay{z-index:1000000 !important;}
        `,document.head.appendChild(n)}const i=(()=>{try{return JSON.parse(a.getAttributes()["data-navbar-config"]||"{}")}catch{return{}}})(),v=i.logo_url||"",I=i.logo_alt||"",A=i.logo_text||"Logo",E=i.logo_href||"/",h=JSON.parse(JSON.stringify(i.top_actions||P.top_actions)),u=JSON.parse(JSON.stringify(i.banking_btn||P.banking_btn)),f=ye(JSON.parse(JSON.stringify(i.nav_links||P.nav_links))),k=JSON.parse(JSON.stringify(i.bottom_cta||P.bottom_cta)),q=document.createElement("div");q.id="navbar-config-modal",q.className="nb-overlay";const t=document.createElement("div");t.className="nb-modal",t.innerHTML=`
        <div class="nb-modal-header">
            <div class="nb-modal-header-left"><i class="ri-layout-top-line"></i><h2>Configurar Navbar</h2></div>
            <button id="nb-modal-close" class="nb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="nb-modal-tabs">
            <button class="nb-tab-btn active" data-tab="logo"><i class="ri-image-line"></i> Logo</button>
            <button class="nb-tab-btn" data-tab="top-actions"><i class="ri-links-line"></i> Acciones superiores</button>
            <button class="nb-tab-btn" data-tab="banking"><i class="ri-bank-card-line"></i> Banca en línea</button>
            <button class="nb-tab-btn" data-tab="nav"><i class="ri-menu-line"></i> Navegación</button>
            <button class="nb-tab-btn" data-tab="bottom-cta"><i class="ri-cursor-line"></i> CTA inferior</button>
            <button class="nb-tab-btn" data-tab="icon-btn"><i class="ri-search-line"></i> Botón icono</button>
        </div>
        <div class="nb-modal-body">
            <div class="nb-tab-panel active" id="nb-panel-logo">
                <div class="nb-card">
                    <label class="nb-label">Imagen del logo</label>
                    <div class="nb-row" style="align-items:flex-start;flex-wrap:wrap;gap:0.75rem;">
                        <div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:0.5rem;">
                            ${v?`<img id="nb-logo-preview" src="${v}" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;">`:'<div id="nb-logo-preview" style="display:none;"></div>'}
                            <input id="nb-logo-url" type="text" placeholder="URL del logo" value="${v}" class="nb-input">
                        </div>
                        <button id="nb-logo-pick" class="nb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Enlace del logo</label>
                    <div style="position:relative;">
                        <input id="nb-logo-href" type="text" placeholder="Ej: / o https://..." value="${E}" class="nb-input">
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Texto alternativo / Logo de texto</label>
                    <div class="nb-row">
                        <input id="nb-logo-alt"  type="text" placeholder="Texto alternativo"      value="${I}"  class="nb-input">
                        <input id="nb-logo-text" type="text" placeholder="Texto si no hay imagen" value="${A}" class="nb-input">
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-top-actions">
                <div class="nb-card" style="padding:0.75rem;">
                    <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem;">Botones de acción de la barra superior (Contáctanos, Sucursales, etc.). Puedes reordenarlos arrastrando.</p>
                    <div id="nb-top-actions-list" class="nb-list"></div>
                    <div class="nb-add-row" style="margin-top:0.75rem;">
                        <button id="nb-add-top-action" class="nb-btn-add nb-btn-add-action"><i class="ri-add-line"></i> Agregar acción</button>
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-banking">
                <div class="nb-card">
                    <label class="nb-label">Botón de Banca en Línea</label>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Texto del botón</label>
                            <input id="nb-banking-label" type="text" placeholder="Mi Banca Integral" value="${u.label||""}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-banking-href" type="text" placeholder="URL o buscar página..." value="${u.href||"#"}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="nb-color-toggle">
                                <button class="nb-color-opt nb-color-opt-blue ${u.color!=="orange"?"":"nb-color-inactive"}" data-color="blue" id="nb-banking-blue">Azul</button>
                                <button class="nb-color-opt nb-color-opt-orange ${u.color==="orange"?"":"nb-color-inactive"}" data-color="orange" id="nb-banking-orange">Naranja</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-nav">
                <div class="nb-card" style="padding:0.75rem;">
                    <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem;">Links de la barra inferior. Los submenús generan mega-menús con columnas.</p>
                    <div id="nb-nav-list" class="nb-list"></div>
                    <div class="nb-add-row" style="margin-top:0.75rem;">
                        <button id="nb-add-nav-link"    class="nb-btn-add nb-btn-add-link"><i class="ri-link"></i> Agregar link</button>
                        <button id="nb-add-nav-submenu" class="nb-btn-add nb-btn-add-submenu"><i class="ri-layout-grid-line"></i> Agregar submenú</button>
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-bottom-cta">
                <div class="nb-card">
                    <label class="nb-label">Botón CTA de la barra inferior</label>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Texto principal</label>
                            <input id="nb-bcta-label" type="text" placeholder="Programa Surge" value="${k.label||""}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Subtexto (opcional)</label>
                            <input id="nb-bcta-sublabel" type="text" placeholder="Formación Empresarial" value="${k.sublabel||""}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-bcta-href" type="text" placeholder="URL o buscar página..." value="${k.href||"#"}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="nb-color-toggle">
                                <button class="nb-color-opt nb-color-opt-blue ${k.color==="blue"?"":"nb-color-inactive"}" data-color="blue" id="nb-bcta-blue">Azul</button>
                                <button class="nb-color-opt nb-color-opt-orange ${k.color!=="blue"?"":"nb-color-inactive"}" data-color="orange" id="nb-bcta-orange">Naranja</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="nb-tab-panel" id="nb-panel-icon-btn">
                <div class="nb-card">
                    <label class="nb-label">Botón de acción con icono</label>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Activar botón</label>
                            <div class="nb-color-toggle" id="nb-iconbtn-toggle-wrap"></div>
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Clase del icono</label>
                            <div class="nb-row">
                                <div class="nb-icon-preview"><i id="nb-iconbtn-preview" class="${i.icon_btn?.icon||"ri-search-line"}"></i></div>
                                <input id="nb-iconbtn-icon" type="text" placeholder="ri-search-line" value="${i.icon_btn?.icon||"ri-search-line"}" class="nb-input" readonly>
                                <button class="nb-pick-btn" id="nb-iconbtn-pick"><i class="ri-emotion-happy-line"></i> Icono</button>
                            </div>
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Etiqueta (tooltip)</label>
                            <input id="nb-iconbtn-label" type="text" placeholder="Buscar" value="${i.icon_btn?.label||"Buscar"}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-iconbtn-href" type="text" placeholder="URL o buscar página..." value="${i.icon_btn?.href||"#"}" class="nb-input">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nb-modal-footer">
            <button id="nb-modal-cancel" class="nb-btn-cancel">Cancelar</button>
            <div style="display:flex;gap:0.5rem;margin-right:auto;">
                <button id="nb-modal-backup" class="nb-btn-backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <label id="nb-modal-restore-label" class="nb-btn-restore" title="Restaurar configuración desde JSON" style="cursor:pointer;"><i class="ri-upload-2-line"></i> Restaurar<input id="nb-modal-restore-input" type="file" accept=".json,application/json" style="display:none;"></label>
            </div>
            <button id="nb-modal-save"   class="nb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`,q.appendChild(t),document.body.appendChild(q),t.addEventListener("focusin",n=>{const e=n.target;e.tagName==="INPUT"&&e.type==="text"&&!e.readOnly&&!e.classList.contains("nb-url-input")&&e.select()});const N=new Q;t.querySelectorAll(".nb-tab-btn").forEach(n=>{n.addEventListener("click",()=>{t.querySelectorAll(".nb-tab-btn").forEach(e=>e.classList.remove("active")),t.querySelectorAll(".nb-tab-panel").forEach(e=>e.classList.remove("active")),n.classList.add("active"),t.querySelector(`#nb-panel-${n.dataset.tab}`).classList.add("active")})}),t.querySelector("#nb-logo-pick").addEventListener("click",()=>{oe({type:"image",title:"Seleccionar logo",onSelect:n=>{t.querySelector("#nb-logo-url").value=n;let e=t.querySelector("#nb-logo-preview");if(!e||e.tagName==="DIV"){const c=document.createElement("img");c.id="nb-logo-preview",c.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;",e?.replaceWith(c)??t.querySelector("#nb-logo-url").before(c),e=c}e.src=n,e.style.display="block"}})});const G=`${document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??""}/api/pages/search`;function H(n){if(n.dataset.autocompleteAttached)return;n.dataset.autocompleteAttached="true";const e=n.parentNode;(!e.style.position||e.style.position==="static")&&(e.style.position="relative");const c=document.createElement("ul");c.style.cssText="position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;max-height:200px;overflow-y:auto;display:none;",e.appendChild(c);let s=null;async function S(d){if(d.length<1){c.style.display="none";return}try{const L=await(await fetch(`${G}?q=${encodeURIComponent(d)}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json();l(L,d)}catch{c.style.display="none"}}function y(d,g){return g?d.replace(new RegExp(`(${g.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi"),'<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>'):d}function l(d,g){if(c.innerHTML="",!d.length){c.style.display="none";return}d.forEach(L=>{const m=document.createElement("li");m.style.cssText="padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;",m.innerHTML=`<span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${y(L.title,g)}</span><span style="font-size:0.7rem;color:#64748b;">/${L.slug}</span>`,m.addEventListener("mouseenter",()=>m.style.background="#f1f5f9"),m.addEventListener("mouseleave",()=>m.style.background=""),m.addEventListener("mousedown",w=>{w.preventDefault(),n.value=`${fe}/${L.slug}`,n.dispatchEvent(new Event("input")),c.style.display="none"}),c.appendChild(m)}),c.style.display="block"}n.addEventListener("input",()=>{clearTimeout(s),s=setTimeout(()=>S(n.value.trim()),220)}),n.addEventListener("focus",()=>{n.select(),n.value.trim()&&S(n.value.trim())}),n.addEventListener("blur",()=>{setTimeout(()=>{c.style.display="none"},150)}),n.addEventListener("keydown",d=>{if(c.style.display==="none")return;const g=c.querySelectorAll("li"),L=c.querySelector("li.nb-ac-active");let m=Array.from(g).indexOf(L);if(d.key==="ArrowDown"){d.preventDefault(),L?.classList.remove("nb-ac-active");const w=g[m+1]||g[0];w?.classList.add("nb-ac-active"),w&&(w.style.background="#f1f5f9")}else if(d.key==="ArrowUp"){d.preventDefault(),L?.classList.remove("nb-ac-active");const w=g[m-1]||g[g.length-1];w?.classList.add("nb-ac-active"),w&&(w.style.background="#f1f5f9")}else d.key==="Enter"&&L?(d.preventDefault(),L.dispatchEvent(new MouseEvent("mousedown"))):d.key==="Escape"&&(c.style.display="none")})}function J(n,e,c){let s=null;const S=Array.from(n.querySelectorAll("[data-drag-idx]")),y=()=>{S.forEach(l=>{l.draggable=!1})};document.addEventListener("mouseup",y,{once:!0}),S.forEach(l=>{l.draggable=!1;const d=l.querySelector(".nb-drag-handle");d&&d.addEventListener("mousedown",()=>{l.draggable=!0}),l.addEventListener("dragstart",g=>{s=parseInt(l.dataset.dragIdx),setTimeout(()=>l.classList.add("nb-dragging"),0),g.dataTransfer.effectAllowed="move"}),l.addEventListener("dragend",()=>{l.classList.remove("nb-dragging"),n.querySelectorAll(".nb-drag-over").forEach(g=>g.classList.remove("nb-drag-over")),l.draggable=!1}),l.addEventListener("dragover",g=>{g.preventDefault(),g.dataTransfer.dropEffect="move",parseInt(l.dataset.dragIdx)!==s&&l.classList.add("nb-drag-over")}),l.addEventListener("dragleave",()=>l.classList.remove("nb-drag-over")),l.addEventListener("drop",g=>{g.preventDefault();const L=parseInt(l.dataset.dragIdx);if(s!==null&&L!==s){const[m]=e.splice(s,1);e.splice(L,0,m),c()}s=null})})}function b(){const n=t.querySelector("#nb-top-actions-list");n.innerHTML="",h.forEach((e,c)=>{const s=document.createElement("div");s.className="nb-action-card",s.dataset.dragIdx=c;const S=e.icon||"";s.innerHTML=`
                <div class="nb-row">
                    <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                    <div class="nb-icon-preview"><i class="${S||"ri-star-line"}"></i></div>
                    <input class="nb-input-sm" style="width:130px;flex-shrink:0;" placeholder="Clase del icono" value="${S}" data-field="icon" readonly>
                    <button class="nb-pick-btn nb-pick-icon-btn" type="button"><i class="ri-emotion-happy-line"></i> Icono</button>
                    <button class="nb-btn-remove nb-remove-action"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="nb-row">
                    <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${e.label||""}" data-field="label">
                </div>
                <div style="position:relative;">
                    <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${e.href||"#"}" data-field="href">
                </div>`,s.querySelector(".nb-pick-icon-btn").addEventListener("click",()=>{N.open(l=>{e.icon=l,s.querySelector("[data-field='icon']").value=l,s.querySelector(".nb-icon-preview i").className=l})}),s.querySelector(".nb-remove-action").onclick=()=>{h.splice(c,1),b()},s.querySelectorAll("[data-field]").forEach(l=>{l.addEventListener("input",()=>{e[l.dataset.field]=l.value})});const y=s.querySelector(".nb-url-input");if(y){const l=document.createElement("div");l.style.position="relative",y.parentNode.insertBefore(l,y),l.appendChild(y),H(y)}n.appendChild(s)}),J(n,h,b)}function $(){const n=t.querySelector("#nb-nav-list");n.innerHTML="",f.forEach((e,c)=>{const s=document.createElement("div");s.className="nb-link-card",s.dataset.dragIdx=c;const S=`<span class="nb-type-badge ${e.type==="submenu"?"nb-type-submenu":"nb-type-link"}" data-toggle-type title="Clic para cambiar tipo">${e.type==="submenu"?"Submenú":"Link"} ↕</span>`;if(e.type==="submenu"){let d=function(){y.innerHTML="",e.cta_column.buttons.forEach((w,z)=>{const T=document.createElement("div");T.className="nb-action-card",T.innerHTML=`
                            <div class="nb-row">
                                <span style="font-size:0.7rem;font-weight:700;color:#92400e;flex-shrink:0;">Botón ${z+1}</span>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${w.label||""}" data-btn-field="label">
                                <button type="button" class="nb-btn-remove nb-remove-cta-btn"><i class="ri-delete-bin-line"></i></button>
                            </div>
                            <div style="position:relative;">
                                <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL del botón" value="${w.href||"#"}" data-btn-field="href">
                            </div>
                            <div class="nb-row">
                                <div class="nb-icon-preview"><i class="${w.icon||"ri-star-line"}"></i></div>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Sin icono (opcional)" value="${w.icon||""}" data-btn-field="icon">
                                <button type="button" class="nb-pick-btn nb-pick-cta-icon"><i class="ri-emotion-happy-line"></i> Icono</button>
                            </div>
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;">Color</label>
                                <div class="nb-color-toggle">
                                    <button type="button" class="nb-color-opt nb-color-opt-blue ${w.color==="blue"?"":"nb-color-inactive"}" data-btn-color="blue">Azul</button>
                                    <button type="button" class="nb-color-opt nb-color-opt-orange ${w.color!=="blue"?"":"nb-color-inactive"}" data-btn-color="orange">Naranja</button>
                                </div>
                            </div>`,T.querySelectorAll("[data-btn-field]").forEach(x=>{x.addEventListener("input",()=>{if(w[x.dataset.btnField]=x.value,x.dataset.btnField==="icon"){const W=T.querySelector(".nb-icon-preview i");W&&(W.className=x.value.trim()||"ri-star-line")}})});const p=T.querySelector(".nb-url-input");p&&H(p),T.querySelectorAll("[data-btn-color]").forEach(x=>{x.addEventListener("click",()=>{w.color=x.dataset.btnColor,T.querySelectorAll("[data-btn-color]").forEach(W=>{W.classList.toggle("nb-color-inactive",W.dataset.btnColor!==x.dataset.btnColor)})})}),T.querySelector(".nb-pick-cta-icon").addEventListener("click",()=>{N.open(x=>{w.icon=x,d()})}),T.querySelector(".nb-remove-cta-btn").addEventListener("click",()=>{e.cta_column.buttons.splice(z,1),d()}),y.appendChild(T)});const m=e.cta_column.buttons.length>=2;l.disabled=m,l.style.opacity=m?"0.4":"",l.style.cursor=m?"not-allowed":""},L=function(){g.innerHTML="",(e.columns||[]).forEach((m,w)=>{const z=document.createElement("div");z.className="nb-col-card";const T=(m.items||[]).map((p,x)=>`
                            <div class="nb-col-item" data-item-idx="${x}">
                                <div class="nb-col-item-row">
                                    <input class="nb-input-sm" style="flex:1;" placeholder="Título del item" value="${p.label||""}" data-item-field="label">
                                    <button class="nb-btn-remove nb-remove-item" style="padding:0.2rem;"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                <input class="nb-input-sm" style="width:100%;box-sizing:border-box;" placeholder="Descripción (opcional)" value="${p.desc||""}" data-item-field="desc">
                                <div style="position:relative;">
                                    <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL" value="${p.href||"#"}" data-item-field="href">
                                </div>
                            </div>`).join("");z.innerHTML=`
                            <div class="nb-col-card-header">
                                <span style="font-size:0.75rem;font-weight:700;color:#475569;">Columna ${w+1}</span>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Badge (ej: Tus ahorros)" value="${m.badge||""}" data-col-field="badge">
                                <div class="nb-color-toggle" style="gap:0.25rem;">
                                    <button class="nb-color-opt nb-color-opt-blue ${(m.badge_color||"blue")==="blue"?"":"nb-color-inactive"}" data-col-color="blue" style="padding:0.2rem 0.5rem;font-size:0.65rem;">Azul</button>
                                    <button class="nb-color-opt nb-color-opt-orange ${(m.badge_color||"blue")==="orange"?"":"nb-color-inactive"}" data-col-color="orange" style="padding:0.2rem 0.5rem;font-size:0.65rem;">Naranja</button>
                                </div>
                                <button class="nb-btn-remove nb-remove-col"><i class="ri-delete-bin-line"></i></button>
                            </div>
                            <div class="nb-col-items">${T}</div>
                            <div class="nb-add-row" style="margin-top:0.375rem;">
                                <button class="nb-btn-add nb-btn-add-item nb-add-item-btn" style="font-size:0.7rem;padding:0.25rem 0.5rem;"><i class="ri-add-line"></i> Agregar item</button>
                            </div>`,z.querySelector("[data-col-field='badge']").addEventListener("input",p=>{m.badge=p.target.value}),z.querySelectorAll("[data-col-color]").forEach(p=>{p.addEventListener("click",()=>{m.badge_color=p.dataset.colColor,z.querySelectorAll("[data-col-color]").forEach(x=>{x.classList.toggle("nb-color-inactive",x.dataset.colColor!==p.dataset.colColor)})})}),z.querySelector(".nb-remove-col").onclick=()=>{e.columns.splice(w,1),L();const p=s.querySelector(".nb-add-col-btn");p&&(p.disabled=!1,p.style.opacity="",p.style.cursor="")},z.querySelectorAll("[data-item-field]").forEach(p=>{const x=parseInt(p.closest("[data-item-idx]").dataset.itemIdx);p.addEventListener("input",()=>{m.items[x][p.dataset.itemField]=p.value})}),z.querySelectorAll(".nb-url-input").forEach(p=>{const x=document.createElement("div");x.style.position="relative",p.parentNode.insertBefore(x,p),x.appendChild(p),H(p)}),z.querySelectorAll(".nb-remove-item").forEach(p=>{p.onclick=()=>{const x=parseInt(p.closest("[data-item-idx]").dataset.itemIdx);m.items.splice(x,1),L()}}),z.querySelector(".nb-add-item-btn").onclick=()=>{m.items=m.items||[],m.items.push({label:"Nuevo item",desc:"",href:"#"}),L()},g.appendChild(z)})};e.cta_column=K(e.cta_column),s.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${S}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Título del menú" value="${e.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-section-title">Columnas del mega-menú (máx. 3)</div>
                        <div class="nb-columns-list" style="display:flex;flex-direction:column;gap:0.625rem;"></div>
                        <div class="nb-add-row">
                            <button class="nb-btn-add nb-btn-add-col nb-add-col-btn" ${(e.columns||[]).length>=3?"disabled style='opacity:0.4;cursor:not-allowed;'":""}><i class="ri-add-line"></i> Agregar columna</button>
                        </div>
                        <div class="nb-section-title" style="margin-top:0.5rem;">Columna CTA (opcional)</div>
                        <div class="nb-cta-section">
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;width:80px;">Texto CTA</label>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Texto alternado naranja/azul" value="${e.cta_column.text||""}" data-cta-field="text">
                            </div>
                            <div class="nb-cta-buttons-list" style="display:flex;flex-direction:column;gap:0.625rem;"></div>
                            <div class="nb-add-row">
                                <button type="button" class="nb-btn-add nb-btn-add-action nb-add-cta-btn"><i class="ri-add-line"></i> Agregar botón</button>
                            </div>
                        </div>`,s.querySelector("[data-toggle-type]").onclick=()=>{e.type="link",e.href="#",delete e.columns,delete e.cta_column,$()},s.querySelector(".nb-remove-link").onclick=()=>{f.splice(c,1),$()},s.querySelector("[data-field='label']").addEventListener("input",m=>{e.label=m.target.value}),s.querySelector("[data-cta-field='text']").addEventListener("input",m=>{e.cta_column.text=m.target.value});const y=s.querySelector(".nb-cta-buttons-list"),l=s.querySelector(".nb-add-cta-btn");d(),l.addEventListener("click",()=>{e.cta_column.buttons.length>=2||(e.cta_column.buttons.push({label:"Nuevo botón",href:"#",color:"orange",icon:""}),d())});const g=s.querySelector(".nb-columns-list");L(),s.querySelector(".nb-add-col-btn").onclick=()=>{if(!((e.columns||[]).length>=3)&&(e.columns=e.columns||[],e.columns.push({badge:"Nueva columna",badge_color:"blue",items:[{label:"Nuevo item",desc:"",href:"#"}]}),L(),e.columns.length>=3)){const m=s.querySelector(".nb-add-col-btn");m.disabled=!0,m.style.opacity="0.4",m.style.cursor="not-allowed"}}}else{s.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${S}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${e.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div style="position:relative;">
                            <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${e.href||""}" data-field="href">
                        </div>
                        <div class="nb-row">
                            <div class="nb-icon-preview"><i class="${e.icon||"ri-star-line"}"></i></div>
                            <input class="nb-input-sm" style="flex:1;" placeholder="Sin icono (opcional)" value="${e.icon||""}" data-field="icon">
                            <button type="button" class="nb-pick-btn nb-pick-link-icon"><i class="ri-emotion-happy-line"></i> Icono</button>
                        </div>
                    </div>`,s.querySelector("[data-toggle-type]").onclick=()=>{e.type="submenu",e.columns=[{badge:"Columna 1",badge_color:"blue",items:[{label:"Enlace",desc:"",href:"#"}]}],e.cta_column={text:"",buttons:[]},delete e.href,$()},s.querySelector(".nb-remove-link").onclick=()=>{f.splice(c,1),$()},s.querySelectorAll("[data-field]").forEach(d=>{d.addEventListener("input",()=>{e[d.dataset.field]=d.value})});const y=s.querySelector("[data-field='icon']");y&&y.addEventListener("input",()=>{const d=s.querySelector(".nb-icon-preview i");d&&(d.className=y.value.trim()||"ri-star-line")}),s.querySelector(".nb-pick-link-icon").addEventListener("click",()=>{N.open(d=>{e.icon=d,y&&(y.value=d);const g=s.querySelector(".nb-icon-preview i");g&&(g.className=d)})});const l=s.querySelector(".nb-url-input");if(l){const d=document.createElement("div");d.style.position="relative",l.parentNode.insertBefore(d,l),d.appendChild(l),H(l)}}n.appendChild(s)}),J(n,f,$)}t.querySelectorAll("#nb-banking-blue, #nb-banking-orange").forEach(n=>{n.addEventListener("click",()=>{u.color=n.dataset.color,t.querySelector("#nb-banking-blue").classList.toggle("nb-color-inactive",u.color!=="blue"),t.querySelector("#nb-banking-orange").classList.toggle("nb-color-inactive",u.color!=="orange")})}),t.querySelectorAll("#nb-bcta-blue, #nb-bcta-orange").forEach(n=>{n.addEventListener("click",()=>{k.color=n.dataset.color,t.querySelector("#nb-bcta-blue").classList.toggle("nb-color-inactive",k.color!=="blue"),t.querySelector("#nb-bcta-orange").classList.toggle("nb-color-inactive",k.color!=="orange")})});const C=t.querySelector("#nb-banking-href");if(C){const n=document.createElement("div");n.style.position="relative",C.parentNode.insertBefore(n,C),n.appendChild(C),H(C)}const B=t.querySelector("#nb-bcta-href");if(B){const n=document.createElement("div");n.style.position="relative",B.parentNode.insertBefore(n,B),n.appendChild(B),H(B)}const M=t.querySelector("#nb-logo-href");if(M){const n=document.createElement("div");n.style.position="relative",M.parentNode.insertBefore(n,M),n.appendChild(M),H(M)}t.querySelector("#nb-add-top-action").onclick=()=>{h.push({label:"Nueva acción",href:"#",icon:"ri-star-line"}),b(),t.querySelector("#nb-top-actions-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},t.querySelector("#nb-add-nav-link").onclick=()=>{f.push({type:"link",label:"Nuevo enlace",href:"#"}),$(),t.querySelector("#nb-nav-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},t.querySelector("#nb-add-nav-submenu").onclick=()=>{f.push({type:"submenu",label:"Nuevo menú",columns:[{badge:"Columna 1",badge_color:"blue",items:[{label:"Enlace",desc:"",href:"#"}]}],cta_column:{text:"",buttons:[]}}),$(),t.querySelector("#nb-nav-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},b(),$();const _=JSON.parse(JSON.stringify(i.icon_btn||P.icon_btn)),U=t.querySelector("#nb-iconbtn-toggle-wrap"),D="nb-iconbtn-switch-"+Math.random().toString(36).slice(2,6);U.innerHTML=`
        <label style="position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;">
            <input type="checkbox" id="${D}" ${_.enabled!==!1?"checked":""} style="opacity:0;width:0;height:0;">
            <span style="position:absolute;inset:0;background:${_.enabled!==!1?"#003B71":"#cbd5e1"};border-radius:9999px;transition:background 0.2s;cursor:pointer;"></span>
            <span style="position:absolute;width:16px;height:16px;left:${_.enabled!==!1?"21px":"3px"};top:3px;background:#fff;border-radius:50%;transition:left 0.2s;pointer-events:none;"></span>
        </label>
        <span style="font-size:0.875rem;color:#475569;">${_.enabled!==!1?"Botón activo":"Botón desactivado"}</span>`,U.querySelector(`#${D}`).addEventListener("change",function(){_.enabled=this.checked;const n=U.querySelector("span:nth-child(2)"),e=U.querySelector("span:nth-child(3)"),c=U.querySelector("span:last-child");n&&(n.style.background=this.checked?"#003B71":"#cbd5e1"),e&&(e.style.left=this.checked?"21px":"3px"),c&&(c.textContent=this.checked?"Botón activo":"Botón desactivado")}),t.querySelector("#nb-iconbtn-icon").value=_.icon||"ri-search-line",t.querySelector("#nb-iconbtn-preview").className=_.icon||"ri-search-line",t.querySelector("#nb-iconbtn-label").value=_.label||"Buscar",t.querySelector("#nb-iconbtn-href").value=_.href||"#",t.querySelector("#nb-iconbtn-icon").addEventListener("input",n=>{_.icon=n.target.value,t.querySelector("#nb-iconbtn-preview").className=n.target.value}),t.querySelector("#nb-iconbtn-label").addEventListener("input",n=>{_.label=n.target.value}),t.querySelector("#nb-iconbtn-pick").addEventListener("click",()=>{new Q().open(e=>{_.icon=e,t.querySelector("#nb-iconbtn-icon").value=e,t.querySelector("#nb-iconbtn-preview").className=e})});const R=t.querySelector("#nb-iconbtn-href");if(R){const n=document.createElement("div");n.style.position="relative",R.parentNode.insertBefore(n,R),n.appendChild(R),H(R)}t.querySelector("#nb-modal-backup").onclick=()=>{const n={icon_btn:{enabled:_.enabled!==!1,icon:t.querySelector("#nb-iconbtn-icon").value.trim()||"ri-search-line",label:t.querySelector("#nb-iconbtn-label").value.trim()||"Buscar",href:t.querySelector("#nb-iconbtn-href").value.trim()||"#"},logo_url:t.querySelector("#nb-logo-url").value.trim(),logo_alt:t.querySelector("#nb-logo-alt").value.trim(),logo_text:t.querySelector("#nb-logo-text").value.trim(),logo_href:t.querySelector("#nb-logo-href").value.trim()||"/",top_actions:JSON.parse(JSON.stringify(h)),banking_btn:{label:t.querySelector("#nb-banking-label").value.trim(),href:t.querySelector("#nb-banking-href").value.trim()||"#",color:u.color||"blue"},nav_links:JSON.parse(JSON.stringify(f)),bottom_cta:{label:t.querySelector("#nb-bcta-label").value.trim(),sublabel:t.querySelector("#nb-bcta-sublabel").value.trim(),href:t.querySelector("#nb-bcta-href").value.trim()||"#",color:k.color||"orange"}},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),c=URL.createObjectURL(e),s=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),S=document.createElement("a");S.href=c,S.download=`navbar-backup-${s}.json`,document.body.appendChild(S),S.click(),S.remove(),URL.revokeObjectURL(c)},t.querySelector("#nb-modal-restore-input").onchange=n=>{const e=n.target.files?.[0];if(!e)return;const c=new FileReader;c.onload=s=>{let S;try{S=JSON.parse(s.target.result)}catch{const l=document.createElement("div");l.className="nb-confirm-overlay",l.innerHTML='<div class="nb-confirm-modal"><div class="nb-confirm-header"><i class="ri-error-warning-line" style="color:#ef4444;"></i><h3>Archivo inválido</h3></div><div class="nb-confirm-body"><p>El archivo seleccionado no es un JSON válido.</p></div><div class="nb-confirm-footer"><button class="nb-confirm-ok" style="background:#ef4444;">Cerrar</button></div></div>',document.body.appendChild(l),l.querySelector(".nb-confirm-ok").onclick=()=>l.remove(),n.target.value="";return}const y=document.createElement("div");y.className="nb-confirm-overlay",y.innerHTML=`
                <div class="nb-confirm-modal">
                    <div class="nb-confirm-header">
                        <i class="ri-refresh-line"></i>
                        <h3>Restaurar configuración</h3>
                    </div>
                    <div class="nb-confirm-body">
                        <p>¿Deseas restaurar la configuración del navbar desde el archivo de respaldo?</p>
                        <p>Esta acción reemplazará la configuración actual del formulario.</p>
                        <span class="nb-confirm-filename"><i class="ri-file-code-line"></i>${e.name}</span>
                    </div>
                    <div class="nb-confirm-footer">
                        <button class="nb-confirm-cancel">Cancelar</button>
                        <button class="nb-confirm-ok"><i class="ri-check-line"></i> Sí, restaurar</button>
                    </div>
                </div>`,document.body.appendChild(y),y.querySelector(".nb-confirm-cancel").onclick=()=>{y.remove(),n.target.value=""},y.querySelector(".nb-confirm-ok").onclick=()=>{y.remove(),n.target.value="";const d=a.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||"nb"+Math.random().toString(36).slice(2,7);a.addAttributes({"data-navbar-config":JSON.stringify(S)}),a.components(Y(S,d)+X),j(),ee(o,a)}},c.readAsText(e)};const j=()=>{N.close(),q.remove()};t.querySelector("#nb-modal-close").onclick=j,t.querySelector("#nb-modal-cancel").onclick=j,q.onclick=n=>{n.target===q&&j()},t.querySelector("#nb-modal-save").onclick=()=>{const n={icon_btn:{enabled:_.enabled!==!1,icon:t.querySelector("#nb-iconbtn-icon").value.trim()||"ri-search-line",label:t.querySelector("#nb-iconbtn-label").value.trim()||"Buscar",href:t.querySelector("#nb-iconbtn-href").value.trim()||"#"},logo_url:t.querySelector("#nb-logo-url").value.trim(),logo_alt:t.querySelector("#nb-logo-alt").value.trim(),logo_text:t.querySelector("#nb-logo-text").value.trim(),logo_href:t.querySelector("#nb-logo-href").value.trim()||"/",top_actions:h,banking_btn:{label:t.querySelector("#nb-banking-label").value.trim(),href:t.querySelector("#nb-banking-href").value.trim()||"#",color:u.color||"blue"},nav_links:f,bottom_cta:{label:t.querySelector("#nb-bcta-label").value.trim(),sublabel:t.querySelector("#nb-bcta-sublabel").value.trim(),href:t.querySelector("#nb-bcta-href").value.trim()||"#",color:k.color||"orange"}},c=a.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||"nb"+Math.random().toString(36).slice(2,7);a.addAttributes({"data-navbar-config":JSON.stringify(n)}),a.components(Y(n,c)+X),j()}}function he(o){const a="navbar-component";o.DomComponents.addType(a,{isComponent:r=>r.getAttribute?.("data-gjs-type")===a?{type:a}:!1,model:{defaults:{name:"Navbar",tagName:"nav",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":a,class:"nb-wrapper","data-navbar-config":JSON.stringify(P)},components:Y(P)+X,script:function(){(function(r){if(!r||typeof r.querySelector!="function"||r.__nbInit)return;r.__nbInit=!0;var i=r.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");if(!i)return;var v=!!window.__gjseditor||document.documentElement.hasAttribute("data-gjs-canvas");function I(){v||(document.body.style.paddingTop=r.offsetHeight+"px")}I(),window.addEventListener("resize",function(){if(I(),window.innerWidth>992){var h=document.getElementById("nb-mobile-"+i);h&&h.classList.contains("nb-open")&&h.classList.remove("nb-open"),r.querySelectorAll(".nb-mobile-item.nb-open").forEach(function(u){u.classList.remove("nb-open")})}});var A=document.getElementById("nb-toggle-"+i),E=document.getElementById("nb-mobile-"+i);A&&E&&A.addEventListener("click",function(){E.classList.toggle("nb-open"),I()}),r.querySelectorAll(".nb-nav-trigger").forEach(function(h){h.addEventListener("click",function(u){u.stopPropagation();var f=h.closest(".nb-nav-item"),k=f.classList.contains("nb-open");r.querySelectorAll(".nb-nav-item.nb-open").forEach(function(q){q.classList.remove("nb-open")}),k||f.classList.add("nb-open"),I()})}),r.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(h){h.addEventListener("click",function(){h.closest(".nb-mobile-item").classList.toggle("nb-open"),I()})}),document.addEventListener("click",function(h){r.contains(h.target)||r.querySelectorAll(".nb-nav-item.nb-open").forEach(function(u){u.classList.remove("nb-open")})})})(this)},"script-props":[],traits:[{type:"button",label:"Navbar",text:"Administrar Navbar",full:!0,command:"open-navbar-config"}]},init(){this.set("type",a),this.addAttributes({"data-gjs-type":a})}}}),o.Commands.add("open-navbar-config",{run(r){const i=r.getSelected();i&&ee(r,i)}}),o.BlockManager.add("navbar-block",{label:"Navbar",category:"Navbar",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="4" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
            <rect x="17" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
            <rect x="22" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
            <rect x="24" y="3" width="6" height="5" rx="2.5" fill="#E97300"/>
            <rect x="2" y="15" width="4" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="8" y="15" width="4" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="14" y="15" width="5" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="21" y="15" width="5" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="24" y="13" width="6" height="5" rx="2.5" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:a,attributes:{"data-gjs-type":a}}}),xe(o,a),ke(o)}function xe(o,a){o.on("storage:end:load",()=>{setTimeout(()=>Z(o,a),800)}),o.on("component:mount",r=>{const i=r.getEl();i?.getAttribute?.("data-gjs-type")===a&&(r.set("type",a),setTimeout(()=>ne(o,i),400))}),o.on("canvas:render",()=>{setTimeout(()=>Z(o,a),600)})}function ne(o,a){if(a?.isConnected)try{const r=o.Canvas.getFrameEl()?.contentDocument;if(!r)return;a.__nbInit&&delete a.__nbInit;const i=r.createElement("script");i.textContent=`(function(){
            function initNavbar(root){
                if(!root||root.__nbInit)return;
                root.__nbInit=true;
                var id=root.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");
                if(!id)return;
                function pad(){document.body.style.paddingTop=root.offsetHeight+"px";}
                pad();
                window.addEventListener("resize",function(){pad();});
                var toggle=document.getElementById("nb-toggle-"+id);
                var mobile=document.getElementById("nb-mobile-"+id);
                if(toggle&&mobile){toggle.addEventListener("click",function(){mobile.classList.toggle("nb-open");pad();});}
                root.querySelectorAll(".nb-nav-trigger").forEach(function(btn){
                    btn.addEventListener("click",function(e){
                        e.stopPropagation();
                        var item=btn.closest(".nb-nav-item");
                        var open=item.classList.contains("nb-open");
                        root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
                        if(!open)item.classList.add("nb-open");
                        pad();
                    });
                });
                root.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(btn){
                    btn.addEventListener("click",function(){btn.closest(".nb-mobile-item").classList.toggle("nb-open");pad();});
                });
                document.addEventListener("click",function(e){
                    if(!root.contains(e.target)){root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});}
                });
            }
            document.querySelectorAll("nav[data-gjs-type='navbar-component']").forEach(function(nav){initNavbar(nav);});
        })();`,r.head.appendChild(i),i.remove()}catch(r){console.warn("[Navbar] Error inyectando script en canvas:",r)}}function Z(o,a){o.getWrapper().find(`[data-gjs-type="${a}"]`).forEach(r=>{r.set("type",a);const i=r.getEl();i?.isConnected&&ne(o,i)})}function ke(o){o.on("load",()=>{const a=o.Canvas.getFrameEl();if(!a)return;const r=a.contentDocument,i=r?.head;if(i&&(r.documentElement?.setAttribute("data-gjs-canvas","true"),!i.querySelector("#navbar-component-css"))){const v=document.createElement("style");v.id="navbar-component-css",v.textContent=`
                [data-gjs-type="navbar-component"] {
                    position: relative !important;
                    top: auto !important;
                }
                body { padding-top: 0 !important; }
            `,i.appendChild(v)}})}document.addEventListener("DOMContentLoaded",async()=>{const o=new be;let a=document.getElementById("navbar-id")?.value||"",r=document.getElementById("navbar-name")?.value||"",i=document.getElementById("navbar-load-url")?.value||"",v=document.getElementById("navbar-store-url")?.value||"";const I=document.getElementById("navbar-is-active")?.value==="1";let A=!!a;const E=pe();if(he(E),E.on("load",()=>{ae(E),ie(),re(),le(E),se(E),ce(E),de(E),we(E),Ee(E),setTimeout(()=>{E.runCommand("sw-visibility"),E.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),A&&i)try{await o.loadPageContent(E,i),V("Navbar cargado correctamente","success")}catch{V("Error al cargar el navbar","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const u=document.getElementById("save-button");u.disabled=!0,u.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!A&&!r?me({title:"Nombre del Navbar",description:"Ingresa un nombre descriptivo para identificar este navbar.",placeholder:"Ej: Navbar Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async f=>{if(!f?.trim()){V("El nombre es obligatorio","error"),u.disabled=!1,u.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await h(f)}catch(k){V(k.message,"error")}finally{u.disabled=!1,u.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{u.disabled=!1,u.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await h(r),u.disabled=!1,u.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(f){V(f.message,"error"),u.disabled=!1,u.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function h(u){const f=A?"PUT":"POST",k=o.getEditorContent(E);(!k.js_content||k.js_content.trim()==="")&&(k.js_content=ge);const q=await o.savePage(E,{...k,name:u,is_active:I},v,f);if(q.success){if(o.markAsClean(),V(q.message,"success"),!A&&q.navbar){a=q.navbar.id,r=q.navbar.name,A=!0;const t=document.getElementById("navbar-id");t&&(t.value=a);const N=document.getElementById("navbar-name");N&&(N.value=r);const F=document.querySelector('meta[name="app-url"]'),G=F?F.content:"";v=v.endsWith("/navbars")?`${v}/${a}`:`${v.replace(/\/navbars\/?$/,"")}/navbars/${a}`;const J=document.getElementById("navbar-store-url");J&&(J.value=v),i=`${v}/load`;const b=document.getElementById("navbar-load-url");b&&(b.value=i);const $=document.getElementById("editor-title");$&&($.textContent=`Editando Navbar: ${r}`);const C=`/navbars/edit/${a}/edit`,B=G?`${G}${C}`:C;window.history.replaceState({path:B},"",B)}else if(u){r=u;const t=document.getElementById("navbar-name");t&&(t.value=r);const N=document.getElementById("editor-title");N&&(N.textContent=`Editando Navbar: ${r}`)}}}});function we(o){o.Commands.add("canvas-clear",{run:a=>{ue({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{a.DomComponents.clear(),a.CssComposer.clear()}})}})}function Ee(o){const a=["set-device-desktop","set-device-tablet","set-device-mobile"];function r(i){a.forEach(v=>{o.Panels.getButton("devices-c",v)?.set("active",v===i)})}o.Commands.add("set-device-desktop",{run(i){i.setDevice("desktop"),r("set-device-desktop")}}),o.Commands.add("set-device-tablet",{run(i){i.setDevice("tablet"),r("set-device-tablet")}}),o.Commands.add("set-device-mobile",{run(i){i.setDevice("mobile"),r("set-device-mobile")}}),o.on("device:select",i=>{const v=i.get?i.get("id"):i.id,I={desktop:"set-device-desktop",tablet:"set-device-tablet",mobile:"set-device-mobile"};I[v]&&r(I[v])}),setTimeout(()=>{r("set-device-desktop")},200)}function V(o,a="info"){typeof window.showNotification=="function"&&window.showNotification(o,a)}
