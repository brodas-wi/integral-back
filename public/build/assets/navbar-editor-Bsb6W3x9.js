import{i as G,I as V,t as W,d as X,f as Y,e as K,s as Q,g as Z,c as ee,E as ne,j as te,h as oe}from"./editor-commands-C7f79RQP.js";import{o as ae}from"./media-picker-CiKJ1Agb.js";import"./_commonjsHelpers-CqkleIqs.js";function re(){return G()}const ie=`(function(){
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
})();`,D=`
<style>
.nb-wrapper{background:#fff;width:100%;box-shadow:0 2px 8px rgba(0,0,0,0.08);position:fixed;top:0;left:0;right:0;z-index:1000;font-family:'Poppins',sans-serif;}
.nb-top{display:flex;align-items:center;justify-content:space-between;padding:0.75rem 4rem;border-bottom:1px solid #f1f5f9;gap:1.5rem;}
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
.nb-nav-link{display:inline-flex;align-items:center;gap:0;padding:0.875rem 1.125rem;color:#E97300;text-decoration:none;font-size:0.9375rem;font-weight:600;transition:color 0.15s;white-space:nowrap;cursor:pointer;background:none;border:none;font-family:inherit;}
.nb-nav-link:hover,.nb-nav-item.nb-open>.nb-nav-link{color:#003B71;}
.nb-mega{display:none;position:absolute;top:calc(100% + 3px);left:0;right:0;background:#fff;border-top:2px solid #E97300;box-shadow:0 8px 32px rgba(0,0,0,0.1);z-index:200;padding:1rem 4rem;}
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
.nb-mega-cta-btn{display:inline-flex;align-items:center;justify-content:center;padding:0.625rem 1.75rem;border-radius:9999px;font-size:0.875rem;font-weight:700;text-decoration:none;cursor:pointer;border:none;font-family:inherit;transition:opacity 0.15s;}
.nb-mega-cta-btn:hover{opacity:0.88;}
.nb-bottom-cta{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;padding:0.5rem 1.25rem;border-radius:9999px;font-size:0.8125rem;font-weight:700;text-decoration:none;cursor:pointer;border:none;font-family:inherit;transition:opacity 0.15s;text-align:center;word-break:break-word;white-space:normal;min-width:120px;max-width:180px;line-height:1.25;margin-left:1.25rem;flex-shrink:0;align-self:center;margin-top:0.375rem;margin-bottom:0.375rem;}
.nb-bottom-cta:hover{opacity:0.88;}
.nb-bottom-cta-line1{text-transform:uppercase;letter-spacing:0.04em;}
.nb-bottom-cta-line2{font-size:0.6875rem;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;opacity:0.85;}
.nb-cta-blue{background:#003B71;color:#fff;}
.nb-cta-orange{background:#E97300;color:#fff;}
.nb-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:0.5rem;border-radius:0.375rem;transition:background 0.15s;flex-shrink:0;}
.nb-hamburger:hover{background:rgba(0,59,113,0.06);}
.nb-hamburger span{display:block;width:24px;height:2px;background:#003B71;border-radius:2px;transition:all 0.25s;}
.nb-mobile-bar{display:none;align-items:center;justify-content:space-between;padding:0.625rem 1.25rem;border-bottom:3px solid #E97300;}
.nb-mobile-menu{display:none;flex-direction:column;background:#fff;border-top:1px solid #f1f5f9;padding:0.75rem 1.25rem;gap:0;max-height:calc(100vh - 64px);overflow-y:auto;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
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
.nb-mobile-submenu{display:none;flex-direction:row;flex-wrap:wrap;padding:0.5rem 0 0.75rem 0;gap:0.75rem;border-bottom:1px solid #f1f5f9;}
.nb-mobile-item.nb-open>.nb-mobile-submenu{display:flex;}
.nb-mobile-sub-col{display:flex;flex-direction:column;gap:0.25rem;flex:1 1 140px;min-width:130px;}
.nb-mobile-sub-badge{display:inline-flex;align-items:center;justify-content:center;padding:0.3rem 0.875rem;border-radius:9999px;font-size:0.75rem;font-weight:700;margin-bottom:0.25rem;cursor:default;white-space:nowrap;}
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
</style>`;function le(r){return r?r.split(" ").filter(o=>o.length>0).map((o,a)=>`<span style="color:${a%2===0?"#E97300":"#003B71"};">${o}</span>`).join(" "):""}function R(r,o){o=o||"nb"+Math.random().toString(36).slice(2,7);const a=r.logo_href||"/",c=r.logo_url?`<img src="${r.logo_url}" alt="${r.logo_alt||"Logo"}">`:`<span class="nb-logo-text">${r.logo_text||"Logo"}</span>`,k=`<a href="${a}" class="nb-logo-link">${c}</a>`,z=(r.top_actions||[]).map(d=>{const C=d.icon?`<i class="${d.icon}"></i>`:"";return`<a href="${d.href||"#"}" class="nb-top-action">${C}${d.label||""}</a>`}).join(""),q=r.banking_btn||{},w=q.color==="orange"?"nb-banking-orange":"nb-banking-blue",y=`<a href="${q.href||"#"}" class="nb-banking-btn ${w}">${q.label||"Banca en Línea"}</a>`,m=(r.nav_links||[]).map(d=>{if(d.type==="submenu"&&d.columns?.length){const C=!!(d.cta_column&&(d.cta_column.text||d.cta_column.btn_label)),$=d.columns.slice(0,3),_=$.map(E=>{const I=E.badge_color==="orange"?"nb-badge-orange":"nb-badge-blue",n=E.badge?`<span class="nb-mega-badge ${I}">${E.badge}</span>`:"",e=(E.items||[]).map(l=>{const i=l.desc?`<span class="nb-mega-item-desc">${l.desc}</span>`:"";return`<a href="${l.href||"#"}" class="nb-mega-item"><span class="nb-mega-item-title">${l.label||""}</span>${i}</a>`}).join("");return`<div class="nb-mega-col">${n}${e}</div>`}).join("");let B="";if(C){const E=d.cta_column,I=E.btn_color==="blue"?"nb-badge-blue":"nb-badge-orange";B=`<div class="nb-mega-cta-col">
                        <p class="nb-mega-cta-text">${le(E.text||"")}</p>
                        <a href="${E.btn_href||"#"}" class="nb-mega-cta-btn ${I}">${E.btn_label||"Ver más"}</a>
                    </div>`}const A=C?"grid-template-columns:1fr 1fr 1fr minmax(200px,260px);":`grid-template-columns:repeat(${$.length},minmax(0,280px));justify-content:start;`;return`<li class="nb-nav-item nb-has-submenu">
                    <button class="nb-nav-link nb-nav-trigger" type="button">${d.label||"Menú"}</button>
                    <div class="nb-mega"><div class="nb-mega-grid" style="${A}">${_}${B}</div></div>
                </li>`}return`<li class="nb-nav-item"><a href="${d.href||"#"}" class="nb-nav-link">${d.label||""}</a></li>`}).join(""),f=r.bottom_cta||{},x=f.color==="blue"?"nb-cta-blue":"nb-cta-orange",S=f.sublabel?`<span class="nb-bottom-cta-line2">${f.sublabel}</span>`:"",t=f.label?`<a href="${f.href||"#"}" class="nb-bottom-cta ${x}"><span class="nb-bottom-cta-line1">${f.label}</span>${S}</a>`:"",T=(r.top_actions||[]).map(d=>{const C=d.icon?`<i class="${d.icon}"></i>`:"";return`<a href="${d.href||"#"}" class="nb-mobile-top-action">${C}${d.label||""}</a>`}).join(""),O=(r.nav_links||[]).map(d=>{if(d.type==="submenu"&&d.columns?.length){const C=d.columns.slice(0,3).map($=>{const _=$.badge_color==="orange"?"nb-badge-orange":"nb-badge-blue",B=$.badge?`<span class="nb-mobile-sub-badge ${_}">${$.badge}</span>`:"",A=($.items||[]).map(E=>{const I=E.desc?`<span class="nb-mobile-sub-desc">${E.desc}</span>`:"";return`<a href="${E.href||"#"}" class="nb-mobile-sub-link"><span class="nb-mobile-sub-title">${E.label||""}</span>${I}</a>`}).join("");return`<div class="nb-mobile-sub-col">${B}${A}</div>`}).join("");return`<div class="nb-mobile-item">
                    <button class="nb-mobile-link" type="button">${d.label||"Menú"}<i class="ri-arrow-down-s-line"></i></button>
                    <div class="nb-mobile-submenu">${C}</div>
                </div>`}return`<a href="${d.href||"#"}" class="nb-mobile-link">${d.label||""}</a>`}).join(""),H=[y,f.label?`<a href="${f.href||"#"}" class="nb-bottom-cta ${x}"><span class="nb-bottom-cta-line1">${f.label}</span>${S}</a>`:""].filter(Boolean).join("");return`<div id="nb-root-${o}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="nb-top">
            <div class="nb-logo">${k}</div>
            <div class="nb-top-actions">${z}</div>
            ${y}
        </div>
        <div class="nb-bottom">
            <ul class="nb-nav-list">${m}</ul>
            ${t}
        </div>
        <div class="nb-mobile-bar">
            ${k}
            <button class="nb-hamburger" type="button" id="nb-toggle-${o}" aria-label="Menú"><span></span><span></span><span></span></button>
        </div>
        <div class="nb-mobile-menu" id="nb-mobile-${o}">
            <div class="nb-mobile-top-actions">${T}</div>
            <div class="nb-mobile-banking">${H}</div>
            ${O}
        </div>
    </div>`}const U={logo_url:"",logo_alt:"Logo",logo_text:"Logo",logo_href:"/",top_actions:[{label:"Contáctanos",href:"#",icon:"ri-phone-line"},{label:"Sucursales",href:"#",icon:"ri-building-line"},{label:"Preguntas Frecuentes",href:"#",icon:"ri-question-answer-line"}],banking_btn:{label:"Mi Banca Integral",href:"#",color:"blue"},nav_links:[{type:"link",label:"Inicio",href:"/"},{type:"submenu",label:"Créditos",columns:[{badge:"Tus créditos",badge_color:"blue",items:[{label:"Microcrédito",desc:"Financiamiento para tu negocio",href:"#"},{label:"Crédito Personal",desc:"Para tus necesidades personales",href:"#"}]}],cta_column:{text:"Solicita tu Crédito Online",btn_label:"Solicitar",btn_href:"#",btn_color:"orange"}},{type:"link",label:"Ahorros e Inversión",href:"#"},{type:"link",label:"Servicios y seguro",href:"#"}],bottom_cta:{label:"Programa Surge",sublabel:"Formación Empresarial",href:"#",color:"orange"}};function P(r,o){const a=document.getElementById("navbar-config-modal");if(a&&a.remove(),!document.getElementById("nb-modal-styles")){const n=document.createElement("style");n.id="nb-modal-styles",n.textContent=`
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
        `,document.head.appendChild(n)}const c=(()=>{try{return JSON.parse(o.getAttributes()["data-navbar-config"]||"{}")}catch{return{}}})(),k=c.logo_url||"",z=c.logo_alt||"",q=c.logo_text||"Logo",w=c.logo_href||"/",y=JSON.parse(JSON.stringify(c.top_actions||U.top_actions)),m=JSON.parse(JSON.stringify(c.banking_btn||U.banking_btn)),f=JSON.parse(JSON.stringify(c.nav_links||U.nav_links)),x=JSON.parse(JSON.stringify(c.bottom_cta||U.bottom_cta)),S=document.createElement("div");S.id="navbar-config-modal",S.className="nb-overlay";const t=document.createElement("div");t.className="nb-modal",t.innerHTML=`
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
        </div>
        <div class="nb-modal-body">
            <div class="nb-tab-panel active" id="nb-panel-logo">
                <div class="nb-card">
                    <label class="nb-label">Imagen del logo</label>
                    <div class="nb-row" style="align-items:flex-start;flex-wrap:wrap;gap:0.75rem;">
                        <div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:0.5rem;">
                            ${k?`<img id="nb-logo-preview" src="${k}" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;">`:'<div id="nb-logo-preview" style="display:none;"></div>'}
                            <input id="nb-logo-url" type="text" placeholder="URL del logo" value="${k}" class="nb-input">
                        </div>
                        <button id="nb-logo-pick" class="nb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Enlace del logo</label>
                    <div style="position:relative;">
                        <input id="nb-logo-href" type="text" placeholder="Ej: / o https://..." value="${w}" class="nb-input">
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Texto alternativo / Logo de texto</label>
                    <div class="nb-row">
                        <input id="nb-logo-alt"  type="text" placeholder="Texto alternativo"      value="${z}"  class="nb-input">
                        <input id="nb-logo-text" type="text" placeholder="Texto si no hay imagen" value="${q}" class="nb-input">
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
                            <input id="nb-banking-label" type="text" placeholder="Mi Banca Integral" value="${m.label||""}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-banking-href" type="text" placeholder="URL o buscar página..." value="${m.href||"#"}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="nb-color-toggle">
                                <button class="nb-color-opt nb-color-opt-blue ${m.color!=="orange"?"":"nb-color-inactive"}" data-color="blue" id="nb-banking-blue">Azul</button>
                                <button class="nb-color-opt nb-color-opt-orange ${m.color==="orange"?"":"nb-color-inactive"}" data-color="orange" id="nb-banking-orange">Naranja</button>
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
                            <input id="nb-bcta-label" type="text" placeholder="Programa Surge" value="${x.label||""}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Subtexto (opcional)</label>
                            <input id="nb-bcta-sublabel" type="text" placeholder="Formación Empresarial" value="${x.sublabel||""}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-bcta-href" type="text" placeholder="URL o buscar página..." value="${x.href||"#"}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="nb-color-toggle">
                                <button class="nb-color-opt nb-color-opt-blue ${x.color==="blue"?"":"nb-color-inactive"}" data-color="blue" id="nb-bcta-blue">Azul</button>
                                <button class="nb-color-opt nb-color-opt-orange ${x.color!=="blue"?"":"nb-color-inactive"}" data-color="orange" id="nb-bcta-orange">Naranja</button>
                            </div>
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
        </div>`,S.appendChild(t),document.body.appendChild(S);const T=new V;t.querySelectorAll(".nb-tab-btn").forEach(n=>{n.addEventListener("click",()=>{t.querySelectorAll(".nb-tab-btn").forEach(e=>e.classList.remove("active")),t.querySelectorAll(".nb-tab-panel").forEach(e=>e.classList.remove("active")),n.classList.add("active"),t.querySelector(`#nb-panel-${n.dataset.tab}`).classList.add("active")})}),t.querySelector("#nb-logo-pick").addEventListener("click",()=>{ae({type:"image",title:"Seleccionar logo",onSelect:n=>{t.querySelector("#nb-logo-url").value=n;let e=t.querySelector("#nb-logo-preview");if(!e||e.tagName==="DIV"){const l=document.createElement("img");l.id="nb-logo-preview",l.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;",e?.replaceWith(l)??t.querySelector("#nb-logo-url").before(l),e=l}e.src=n,e.style.display="block"}})});const H=`${document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??""}/api/pages/search`;function d(n){if(n.dataset.autocompleteAttached)return;n.dataset.autocompleteAttached="true";const e=n.parentNode;(!e.style.position||e.style.position==="static")&&(e.style.position="relative");const l=document.createElement("ul");l.style.cssText="position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;max-height:200px;overflow-y:auto;display:none;",e.appendChild(l);let i=null;async function u(g){if(g.length<1){l.style.display="none";return}try{const L=await(await fetch(`${H}?q=${encodeURIComponent(g)}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json();p(L,g)}catch{l.style.display="none"}}function b(g,s){return s?g.replace(new RegExp(`(${s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi"),'<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>'):g}function p(g,s){if(l.innerHTML="",!g.length){l.style.display="none";return}g.forEach(L=>{const h=document.createElement("li");h.style.cssText="padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;",h.innerHTML=`<span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${b(L.title,s)}</span><span style="font-size:0.7rem;color:#64748b;">/${L.slug}</span>`,h.addEventListener("mouseenter",()=>h.style.background="#f1f5f9"),h.addEventListener("mouseleave",()=>h.style.background=""),h.addEventListener("mousedown",j=>{j.preventDefault(),n.value="/"+L.slug,n.dispatchEvent(new Event("input")),l.style.display="none"}),l.appendChild(h)}),l.style.display="block"}n.addEventListener("input",()=>{clearTimeout(i),i=setTimeout(()=>u(n.value.trim()),220)}),n.addEventListener("focus",()=>{n.select(),n.value.trim()&&u(n.value.trim())}),n.addEventListener("blur",()=>{setTimeout(()=>{l.style.display="none"},150)}),n.addEventListener("keydown",g=>{if(l.style.display==="none")return;const s=l.querySelectorAll("li"),L=l.querySelector("li.nb-ac-active");let h=Array.from(s).indexOf(L);if(g.key==="ArrowDown"){g.preventDefault(),L?.classList.remove("nb-ac-active");const j=s[h+1]||s[0];j?.classList.add("nb-ac-active"),j&&(j.style.background="#f1f5f9")}else if(g.key==="ArrowUp"){g.preventDefault(),L?.classList.remove("nb-ac-active");const j=s[h-1]||s[s.length-1];j?.classList.add("nb-ac-active"),j&&(j.style.background="#f1f5f9")}else g.key==="Enter"&&L?(g.preventDefault(),L.dispatchEvent(new MouseEvent("mousedown"))):g.key==="Escape"&&(l.style.display="none")})}function C(n,e,l){let i=null;n.querySelectorAll("[data-drag-idx]").forEach(u=>{u.setAttribute("draggable","true"),u.addEventListener("dragstart",b=>{i=parseInt(u.dataset.dragIdx),setTimeout(()=>u.classList.add("nb-dragging"),0),b.dataTransfer.effectAllowed="move"}),u.addEventListener("dragend",()=>{u.classList.remove("nb-dragging"),n.querySelectorAll(".nb-drag-over").forEach(b=>b.classList.remove("nb-drag-over"))}),u.addEventListener("dragover",b=>{b.preventDefault(),b.dataTransfer.dropEffect="move",parseInt(u.dataset.dragIdx)!==i&&u.classList.add("nb-drag-over")}),u.addEventListener("dragleave",()=>u.classList.remove("nb-drag-over")),u.addEventListener("drop",b=>{b.preventDefault();const p=parseInt(u.dataset.dragIdx);if(i!==null&&p!==i){const[g]=e.splice(i,1);e.splice(p,0,g),l()}i=null})})}function $(){const n=t.querySelector("#nb-top-actions-list");n.innerHTML="",y.forEach((e,l)=>{const i=document.createElement("div");i.className="nb-action-card",i.dataset.dragIdx=l;const u=e.icon||"";i.innerHTML=`
                <div class="nb-row">
                    <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                    <div class="nb-icon-preview"><i class="${u||"ri-star-line"}"></i></div>
                    <input class="nb-input-sm" style="width:130px;flex-shrink:0;" placeholder="Clase del icono" value="${u}" data-field="icon" readonly>
                    <button class="nb-pick-btn nb-pick-icon-btn" type="button"><i class="ri-emotion-happy-line"></i> Icono</button>
                    <button class="nb-btn-remove nb-remove-action"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="nb-row">
                    <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${e.label||""}" data-field="label">
                </div>
                <div style="position:relative;">
                    <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${e.href||"#"}" data-field="href">
                </div>`,i.querySelector(".nb-pick-icon-btn").addEventListener("click",()=>{T.open(p=>{e.icon=p,i.querySelector("[data-field='icon']").value=p,i.querySelector(".nb-icon-preview i").className=p})}),i.querySelector(".nb-remove-action").onclick=()=>{y.splice(l,1),$()},i.querySelectorAll("[data-field]").forEach(p=>{p.addEventListener("input",()=>{e[p.dataset.field]=p.value})});const b=i.querySelector(".nb-url-input");if(b){const p=document.createElement("div");p.style.position="relative",b.parentNode.insertBefore(p,b),p.appendChild(b),d(b)}n.appendChild(i)}),C(n,y,$)}function _(){const n=t.querySelector("#nb-nav-list");n.innerHTML="",f.forEach((e,l)=>{const i=document.createElement("div");i.className="nb-link-card",i.dataset.dragIdx=l;const u=`<span class="nb-type-badge ${e.type==="submenu"?"nb-type-submenu":"nb-type-link"}" data-toggle-type title="Clic para cambiar tipo">${e.type==="submenu"?"Submenú":"Link"} ↕</span>`;if(e.type==="submenu"){let g=function(){p.innerHTML="",(e.columns||[]).forEach((s,L)=>{const h=document.createElement("div");h.className="nb-col-card";const j=(s.items||[]).map((v,N)=>`
                            <div class="nb-col-item" data-item-idx="${N}">
                                <div class="nb-col-item-row">
                                    <input class="nb-input-sm" style="flex:1;" placeholder="Título del item" value="${v.label||""}" data-item-field="label">
                                    <button class="nb-btn-remove nb-remove-item" style="padding:0.2rem;"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                <input class="nb-input-sm" style="width:100%;box-sizing:border-box;" placeholder="Descripción (opcional)" value="${v.desc||""}" data-item-field="desc">
                                <div style="position:relative;">
                                    <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL" value="${v.href||"#"}" data-item-field="href">
                                </div>
                            </div>`).join("");h.innerHTML=`
                            <div class="nb-col-card-header">
                                <span style="font-size:0.75rem;font-weight:700;color:#475569;">Columna ${L+1}</span>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Badge (ej: Tus ahorros)" value="${s.badge||""}" data-col-field="badge">
                                <div class="nb-color-toggle" style="gap:0.25rem;">
                                    <button class="nb-color-opt nb-color-opt-blue ${(s.badge_color||"blue")==="blue"?"":"nb-color-inactive"}" data-col-color="blue" style="padding:0.2rem 0.5rem;font-size:0.65rem;">Azul</button>
                                    <button class="nb-color-opt nb-color-opt-orange ${(s.badge_color||"blue")==="orange"?"":"nb-color-inactive"}" data-col-color="orange" style="padding:0.2rem 0.5rem;font-size:0.65rem;">Naranja</button>
                                </div>
                                <button class="nb-btn-remove nb-remove-col"><i class="ri-delete-bin-line"></i></button>
                            </div>
                            <div class="nb-col-items">${j}</div>
                            <div class="nb-add-row" style="margin-top:0.375rem;">
                                <button class="nb-btn-add nb-btn-add-item nb-add-item-btn" style="font-size:0.7rem;padding:0.25rem 0.5rem;"><i class="ri-add-line"></i> Agregar item</button>
                            </div>`,h.querySelector("[data-col-field='badge']").addEventListener("input",v=>{s.badge=v.target.value}),h.querySelectorAll("[data-col-color]").forEach(v=>{v.addEventListener("click",()=>{s.badge_color=v.dataset.colColor,h.querySelectorAll("[data-col-color]").forEach(N=>{N.classList.toggle("nb-color-inactive",N.dataset.colColor!==v.dataset.colColor)})})}),h.querySelector(".nb-remove-col").onclick=()=>{e.columns.splice(L,1),g();const v=i.querySelector(".nb-add-col-btn");v&&(v.disabled=!1,v.style.opacity="",v.style.cursor="")},h.querySelectorAll("[data-item-field]").forEach(v=>{const N=parseInt(v.closest("[data-item-idx]").dataset.itemIdx);v.addEventListener("input",()=>{s.items[N][v.dataset.itemField]=v.value})}),h.querySelectorAll(".nb-url-input").forEach(v=>{const N=document.createElement("div");N.style.position="relative",v.parentNode.insertBefore(N,v),N.appendChild(v),d(v)}),h.querySelectorAll(".nb-remove-item").forEach(v=>{v.onclick=()=>{const N=parseInt(v.closest("[data-item-idx]").dataset.itemIdx);s.items.splice(N,1),g()}}),h.querySelector(".nb-add-item-btn").onclick=()=>{s.items=s.items||[],s.items.push({label:"Nuevo item",desc:"",href:"#"}),g()},p.appendChild(h)})};i.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${u}
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
                                <input class="nb-input-sm" style="flex:1;" placeholder="Texto alternado naranja/azul" value="${e.cta_column?.text||""}" data-cta-field="text">
                            </div>
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;width:80px;">Btn texto</label>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Solicitar" value="${e.cta_column?.btn_label||""}" data-cta-field="btn_label">
                            </div>
                            <div style="position:relative;">
                                <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL del botón CTA" value="${e.cta_column?.btn_href||"#"}" data-cta-field="btn_href">
                            </div>
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;width:80px;">Color btn</label>
                                <div class="nb-color-toggle">
                                    <button class="nb-color-opt nb-color-opt-blue ${(e.cta_column?.btn_color||"orange")==="blue"?"":"nb-color-inactive"}" data-cta-color="blue">Azul</button>
                                    <button class="nb-color-opt nb-color-opt-orange ${(e.cta_column?.btn_color||"orange")==="orange"?"":"nb-color-inactive"}" data-cta-color="orange">Naranja</button>
                                </div>
                            </div>
                        </div>
                    </div>`,i.querySelector("[data-toggle-type]").onclick=()=>{e.type="link",e.href="#",delete e.columns,delete e.cta_column,_()},i.querySelector(".nb-remove-link").onclick=()=>{f.splice(l,1),_()},i.querySelector("[data-field='label']").addEventListener("input",s=>{e.label=s.target.value}),i.querySelectorAll("[data-cta-field]").forEach(s=>{s.addEventListener("input",()=>{e.cta_column||(e.cta_column={}),e.cta_column[s.dataset.ctaField]=s.value})});const b=i.querySelector("[data-cta-field='btn_href']");if(b){const s=document.createElement("div");s.style.position="relative",b.parentNode.insertBefore(s,b),s.appendChild(b),d(b)}i.querySelectorAll("[data-cta-color]").forEach(s=>{s.addEventListener("click",()=>{e.cta_column||(e.cta_column={}),e.cta_column.btn_color=s.dataset.ctaColor,i.querySelectorAll("[data-cta-color]").forEach(L=>{L.classList.toggle("nb-color-inactive",L.dataset.ctaColor!==s.dataset.ctaColor)})})});const p=i.querySelector(".nb-columns-list");g(),i.querySelector(".nb-add-col-btn").onclick=()=>{if(!((e.columns||[]).length>=3)&&(e.columns=e.columns||[],e.columns.push({badge:"Nueva columna",badge_color:"blue",items:[{label:"Nuevo item",desc:"",href:"#"}]}),g(),e.columns.length>=3)){const s=i.querySelector(".nb-add-col-btn");s.disabled=!0,s.style.opacity="0.4",s.style.cursor="not-allowed"}}}else{i.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${u}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${e.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div style="position:relative;">
                            <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${e.href||""}" data-field="href">
                        </div>
                    </div>`,i.querySelector("[data-toggle-type]").onclick=()=>{e.type="submenu",e.columns=[{badge:"Columna 1",badge_color:"blue",items:[{label:"Enlace",desc:"",href:"#"}]}],e.cta_column={text:"",btn_label:"Ver más",btn_href:"#",btn_color:"orange"},delete e.href,_()},i.querySelector(".nb-remove-link").onclick=()=>{f.splice(l,1),_()},i.querySelectorAll("[data-field]").forEach(p=>{p.addEventListener("input",()=>{e[p.dataset.field]=p.value})});const b=i.querySelector(".nb-url-input");if(b){const p=document.createElement("div");p.style.position="relative",b.parentNode.insertBefore(p,b),p.appendChild(b),d(b)}}n.appendChild(i)}),C(n,f,_)}t.querySelectorAll("#nb-banking-blue, #nb-banking-orange").forEach(n=>{n.addEventListener("click",()=>{m.color=n.dataset.color,t.querySelector("#nb-banking-blue").classList.toggle("nb-color-inactive",m.color!=="blue"),t.querySelector("#nb-banking-orange").classList.toggle("nb-color-inactive",m.color!=="orange")})}),t.querySelectorAll("#nb-bcta-blue, #nb-bcta-orange").forEach(n=>{n.addEventListener("click",()=>{x.color=n.dataset.color,t.querySelector("#nb-bcta-blue").classList.toggle("nb-color-inactive",x.color!=="blue"),t.querySelector("#nb-bcta-orange").classList.toggle("nb-color-inactive",x.color!=="orange")})});const B=t.querySelector("#nb-banking-href");if(B){const n=document.createElement("div");n.style.position="relative",B.parentNode.insertBefore(n,B),n.appendChild(B),d(B)}const A=t.querySelector("#nb-bcta-href");if(A){const n=document.createElement("div");n.style.position="relative",A.parentNode.insertBefore(n,A),n.appendChild(A),d(A)}const E=t.querySelector("#nb-logo-href");if(E){const n=document.createElement("div");n.style.position="relative",E.parentNode.insertBefore(n,E),n.appendChild(E),d(E)}t.querySelector("#nb-add-top-action").onclick=()=>{y.push({label:"Nueva acción",href:"#",icon:"ri-star-line"}),$(),t.querySelector("#nb-top-actions-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},t.querySelector("#nb-add-nav-link").onclick=()=>{f.push({type:"link",label:"Nuevo enlace",href:"#"}),_(),t.querySelector("#nb-nav-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},t.querySelector("#nb-add-nav-submenu").onclick=()=>{f.push({type:"submenu",label:"Nuevo menú",columns:[{badge:"Columna 1",badge_color:"blue",items:[{label:"Enlace",desc:"",href:"#"}]}],cta_column:{text:"",btn_label:"Ver más",btn_href:"#",btn_color:"orange"}}),_(),t.querySelector("#nb-nav-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},$(),_(),t.querySelector("#nb-modal-backup").onclick=()=>{const n={logo_url:t.querySelector("#nb-logo-url").value.trim(),logo_alt:t.querySelector("#nb-logo-alt").value.trim(),logo_text:t.querySelector("#nb-logo-text").value.trim(),logo_href:t.querySelector("#nb-logo-href").value.trim()||"/",top_actions:JSON.parse(JSON.stringify(y)),banking_btn:{label:t.querySelector("#nb-banking-label").value.trim(),href:t.querySelector("#nb-banking-href").value.trim()||"#",color:m.color||"blue"},nav_links:JSON.parse(JSON.stringify(f)),bottom_cta:{label:t.querySelector("#nb-bcta-label").value.trim(),sublabel:t.querySelector("#nb-bcta-sublabel").value.trim(),href:t.querySelector("#nb-bcta-href").value.trim()||"#",color:x.color||"orange"}},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),l=URL.createObjectURL(e),i=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),u=document.createElement("a");u.href=l,u.download=`navbar-backup-${i}.json`,document.body.appendChild(u),u.click(),u.remove(),URL.revokeObjectURL(l)},t.querySelector("#nb-modal-restore-input").onchange=n=>{const e=n.target.files?.[0];if(!e)return;const l=new FileReader;l.onload=i=>{let u;try{u=JSON.parse(i.target.result)}catch{const p=document.createElement("div");p.className="nb-confirm-overlay",p.innerHTML='<div class="nb-confirm-modal"><div class="nb-confirm-header"><i class="ri-error-warning-line" style="color:#ef4444;"></i><h3>Archivo inválido</h3></div><div class="nb-confirm-body"><p>El archivo seleccionado no es un JSON válido.</p></div><div class="nb-confirm-footer"><button class="nb-confirm-ok" style="background:#ef4444;">Cerrar</button></div></div>',document.body.appendChild(p),p.querySelector(".nb-confirm-ok").onclick=()=>p.remove(),n.target.value="";return}const b=document.createElement("div");b.className="nb-confirm-overlay",b.innerHTML=`
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
                </div>`,document.body.appendChild(b),b.querySelector(".nb-confirm-cancel").onclick=()=>{b.remove(),n.target.value=""},b.querySelector(".nb-confirm-ok").onclick=()=>{b.remove(),n.target.value="";const g=o.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||"nb"+Math.random().toString(36).slice(2,7);o.addAttributes({"data-navbar-config":JSON.stringify(u)}),o.components(R(u,g)+D),I(),P(r,o)}},l.readAsText(e)};const I=()=>{T.close(),S.remove()};t.querySelector("#nb-modal-close").onclick=I,t.querySelector("#nb-modal-cancel").onclick=I,S.onclick=n=>{n.target===S&&I()},t.querySelector("#nb-modal-save").onclick=()=>{const n={logo_url:t.querySelector("#nb-logo-url").value.trim(),logo_alt:t.querySelector("#nb-logo-alt").value.trim(),logo_text:t.querySelector("#nb-logo-text").value.trim(),logo_href:t.querySelector("#nb-logo-href").value.trim()||"/",top_actions:y,banking_btn:{label:t.querySelector("#nb-banking-label").value.trim(),href:t.querySelector("#nb-banking-href").value.trim()||"#",color:m.color||"blue"},nav_links:f,bottom_cta:{label:t.querySelector("#nb-bcta-label").value.trim(),sublabel:t.querySelector("#nb-bcta-sublabel").value.trim(),href:t.querySelector("#nb-bcta-href").value.trim()||"#",color:x.color||"orange"}},l=o.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||"nb"+Math.random().toString(36).slice(2,7);o.addAttributes({"data-navbar-config":JSON.stringify(n)}),o.components(R(n,l)+D),I()}}function se(r){const o="navbar-component";r.DomComponents.addType(o,{isComponent:a=>a.getAttribute?.("data-gjs-type")===o?{type:o}:!1,model:{defaults:{name:"Navbar",tagName:"nav",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":o,class:"nb-wrapper","data-navbar-config":JSON.stringify(U)},components:R(U)+D,script:function(){(function(a){if(!a||typeof a.querySelector!="function"||a.__nbInit)return;a.__nbInit=!0;var c=a.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");if(!c)return;var k=!!window.__gjseditor||document.documentElement.hasAttribute("data-gjs-canvas");function z(){k||(document.body.style.paddingTop=a.offsetHeight+"px")}z(),window.addEventListener("resize",function(){if(z(),window.innerWidth>992){var y=document.getElementById("nb-mobile-"+c);y&&y.classList.contains("nb-open")&&y.classList.remove("nb-open"),a.querySelectorAll(".nb-mobile-item.nb-open").forEach(function(m){m.classList.remove("nb-open")})}});var q=document.getElementById("nb-toggle-"+c),w=document.getElementById("nb-mobile-"+c);q&&w&&q.addEventListener("click",function(){w.classList.toggle("nb-open"),z()}),a.querySelectorAll(".nb-nav-trigger").forEach(function(y){y.addEventListener("click",function(m){m.stopPropagation();var f=y.closest(".nb-nav-item"),x=f.classList.contains("nb-open");a.querySelectorAll(".nb-nav-item.nb-open").forEach(function(S){S.classList.remove("nb-open")}),x||f.classList.add("nb-open"),z()})}),a.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(y){y.addEventListener("click",function(){y.closest(".nb-mobile-item").classList.toggle("nb-open"),z()})}),document.addEventListener("click",function(y){a.contains(y.target)||a.querySelectorAll(".nb-nav-item.nb-open").forEach(function(m){m.classList.remove("nb-open")})})})(this)},"script-props":[],toolbar:[],traits:[{type:"button",label:"Navbar",text:"Administrar Navbar",full:!0,command:"open-navbar-config"}]},init(){this.set("type",o),this.addAttributes({"data-gjs-type":o})}}}),r.Commands.add("open-navbar-config",{run(a){const c=a.getSelected();c&&P(a,c)}}),r.BlockManager.add("navbar-block",{label:"Navbar",category:"Navbar",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,activate:!0,content:{type:o,attributes:{"data-gjs-type":o}}}),ce(r,o),de(r)}function ce(r,o){r.on("storage:end:load",()=>{setTimeout(()=>J(r,o),800)}),r.on("component:mount",a=>{const c=a.getEl();c?.getAttribute?.("data-gjs-type")===o&&(a.set("type",o),setTimeout(()=>F(r,c),400))}),r.on("canvas:render",()=>{setTimeout(()=>J(r,o),600)})}function F(r,o){if(o?.isConnected)try{const a=r.Canvas.getFrameEl()?.contentDocument;if(!a)return;o.__nbInit&&delete o.__nbInit;const c=a.createElement("script");c.textContent=`(function(){
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
        })();`,a.head.appendChild(c),c.remove()}catch(a){console.warn("[Navbar] Error inyectando script en canvas:",a)}}function J(r,o){r.getWrapper().find(`[data-gjs-type="${o}"]`).forEach(a=>{a.set("type",o);const c=a.getEl();c?.isConnected&&F(r,c)})}function de(r){r.on("load",()=>{const o=r.Canvas.getFrameEl();if(!o)return;const a=o.contentDocument,c=a?.head;if(c&&(a.documentElement?.setAttribute("data-gjs-canvas","true"),!c.querySelector("#navbar-component-css"))){const k=document.createElement("style");k.id="navbar-component-css",k.textContent=`
                [data-gjs-type="navbar-component"] {
                    outline: 2px dashed rgba(240,135,42,0.4);
                    outline-offset: 2px;
                    position: relative !important;
                    top: auto !important;
                }
                body { padding-top: 0 !important; }
            `,c.appendChild(k)}})}document.addEventListener("DOMContentLoaded",async()=>{const r=new ne;let o=document.getElementById("navbar-id")?.value||"",a=document.getElementById("navbar-name")?.value||"",c=document.getElementById("navbar-load-url")?.value||"",k=document.getElementById("navbar-store-url")?.value||"";const z=document.getElementById("navbar-is-active")?.value==="1";let q=!!o;const w=re();if(se(w),w.on("load",()=>{W(w),X(),Y(),K(w),Q(w),Z(w),ee(w),be(w),setTimeout(()=>{w.runCommand("sw-visibility"),w.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),q&&c)try{await r.loadPageContent(w,c),M("Navbar cargado correctamente","success")}catch{M("Error al cargar el navbar","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const m=document.getElementById("save-button");m.disabled=!0,m.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!q&&!a?te({title:"Nombre del Navbar",description:"Ingresa un nombre descriptivo para identificar este navbar.",placeholder:"Ej: Navbar Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async f=>{if(!f?.trim()){M("El nombre es obligatorio","error"),m.disabled=!1,m.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await y(f)}catch(x){M(x.message,"error")}finally{m.disabled=!1,m.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{m.disabled=!1,m.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await y(a),m.disabled=!1,m.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(f){M(f.message,"error"),m.disabled=!1,m.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function y(m){const f=q?"PUT":"POST",x=r.getEditorContent(w);(!x.js_content||x.js_content.trim()==="")&&(x.js_content=ie);const S=await r.savePage(w,{...x,name:m,is_active:z},k,f);if(S.success){if(r.markAsClean(),M(S.message,"success"),!q&&S.navbar){o=S.navbar.id,a=S.navbar.name,q=!0;const t=document.getElementById("navbar-id");t&&(t.value=o);const T=document.getElementById("navbar-name");T&&(T.value=a);const O=document.querySelector('meta[name="app-url"]'),H=O?O.content:"";k=k.endsWith("/navbars")?`${k}/${o}`:`${k.replace(/\/navbars\/?$/,"")}/navbars/${o}`;const C=document.getElementById("navbar-store-url");C&&(C.value=k),c=`${k}/load`;const $=document.getElementById("navbar-load-url");$&&($.value=c);const _=document.getElementById("editor-title");_&&(_.textContent=`Editando Navbar: ${a}`);const B=`/navbars/edit/${o}/edit`,A=H?`${H}${B}`:B;window.history.replaceState({path:A},"",A)}else if(m){a=m;const t=document.getElementById("navbar-name");t&&(t.value=a);const T=document.getElementById("editor-title");T&&(T.textContent=`Editando Navbar: ${a}`)}}}});function be(r){r.Commands.add("canvas-clear",{run:o=>{oe({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{o.DomComponents.clear(),o.CssComposer.clear()}})}})}function M(r,o="info"){typeof window.showNotification=="function"&&window.showNotification(r,o)}
