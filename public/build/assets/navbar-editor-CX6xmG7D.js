import{i as Q,I as W,o as Z,t as ee,d as ne,f as te,e as oe,s as ae,g as re,c as ie,E as le,j as se,h as ce}from"./editor-commands-Bq37dEX4.js";import"./_commonjsHelpers-CqkleIqs.js";function de(){return Q()}const be=`(function(){
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
})();`,G=`
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
.nb-nav-link{display:inline-flex;align-items:center;gap:0;padding:0.875rem 1.125rem;color:#E97300;text-decoration:none;font-size:0.9375rem;font-weight:600;transition:color 0.15s;white-space:nowrap;cursor:pointer;background:none;border:none;font-family:inherit;}
.nb-nav-link:hover,.nb-nav-item.nb-open>.nb-nav-link{color:#003B71;}
.nb-mega{display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border-top:2px solid #E97300;box-shadow:0 8px 32px rgba(0,0,0,0.1);z-index:200;padding:1rem 4rem;}
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
</style>`;function me(r){return r?r.split(" ").filter(o=>o.length>0).map((o,i)=>`<span style="color:${i%2===0?"#E97300":"#003B71"};">${o}</span>`).join(" "):""}function V(r,o){o=o||"nb"+Math.random().toString(36).slice(2,7);const i=r.logo_href||"/",a=r.logo_url?`<img src="${r.logo_url}" alt="${r.logo_alt||"Logo"}">`:`<span class="nb-logo-text">${r.logo_text||"Logo"}</span>`,h=`<a href="${i}" class="nb-logo-link">${a}</a>`,C=(r.top_actions||[]).map(m=>{const E=m.icon?`<i class="${m.icon}"></i>`:"";return`<a href="${m.href||"#"}" class="nb-top-action">${E}${m.label||""}</a>`}).join(""),B=r.banking_btn||{},w=B.color==="orange"?"nb-banking-orange":"nb-banking-blue",y=`<a href="${B.href||"#"}" class="nb-banking-btn ${w}">${B.label||"Banca en Línea"}</a>`,b=(r.nav_links||[]).map(m=>{if(m.type==="submenu"&&m.columns?.length){const E=!!(m.cta_column&&(m.cta_column.text||m.cta_column.btn_label)),_=m.columns.slice(0,3),A=_.map(S=>{const M=S.badge_color==="orange"?"nb-badge-orange":"nb-badge-blue",F=S.badge?`<span class="nb-mega-badge ${M}">${S.badge}</span>`:"",D=(S.items||[]).map(H=>{const e=H.desc?`<span class="nb-mega-item-desc">${H.desc}</span>`:"";return`<a href="${H.href||"#"}" class="nb-mega-item"><span class="nb-mega-item-title">${H.label||""}</span>${e}</a>`}).join("");return`<div class="nb-mega-col">${F}${D}</div>`}).join("");let T="";if(E){const S=m.cta_column,M=S.btn_color==="blue"?"nb-badge-blue":"nb-badge-orange";T=`<div class="nb-mega-cta-col">
                        <p class="nb-mega-cta-text">${me(S.text||"")}</p>
                        <a href="${S.btn_href||"#"}" class="nb-mega-cta-btn ${M}">${S.btn_label||"Ver más"}</a>
                    </div>`}const $=E?"grid-template-columns:1fr 1fr 1fr minmax(200px,260px);":`grid-template-columns:repeat(${_.length},minmax(0,280px));justify-content:start;`;return`<li class="nb-nav-item nb-has-submenu">
                    <button class="nb-nav-link nb-nav-trigger" type="button">${m.label||"Menú"}</button>
                    <div class="nb-mega"><div class="nb-mega-grid" style="${$}">${A}${T}</div></div>
                </li>`}return`<li class="nb-nav-item"><a href="${m.href||"#"}" class="nb-nav-link">${m.label||""}</a></li>`}).join(""),f=r.bottom_cta||{},k=f.color==="blue"?"nb-cta-blue":"nb-cta-orange",L=f.sublabel?`<span class="nb-bottom-cta-line2">${f.sublabel}</span>`:"",n=f.label?`<a href="${f.href||"#"}" class="nb-bottom-cta ${k}"><span class="nb-bottom-cta-line1">${f.label}</span>${L}</a>`:"",N=r.icon_btn||{},R=N.enabled?`<a href="${N.href||"#"}" class="nb-icon-btn" title="${N.label||""}"><i class="${N.icon||"ri-search-line"}"></i></a>`:"",J=(r.top_actions||[]).map(m=>{const E=m.icon?`<i class="${m.icon}"></i>`:"";return`<a href="${m.href||"#"}" class="nb-mobile-top-action">${E}${m.label||""}</a>`}).join(""),z=(r.nav_links||[]).map(m=>{if(m.type==="submenu"&&m.columns?.length){const E=m.columns.slice(0,3).map(_=>{const A=_.badge_color==="orange"?"nb-badge-orange":"nb-badge-blue",T=_.badge?`<span class="nb-mobile-sub-badge ${A}">${_.badge}</span>`:"",$=(_.items||[]).map(S=>{const M=S.desc?`<span class="nb-mobile-sub-desc">${S.desc}</span>`:"";return`<a href="${S.href||"#"}" class="nb-mobile-sub-link"><span class="nb-mobile-sub-title">${S.label||""}</span>${M}</a>`}).join("");return`<div class="nb-mobile-sub-col">${T}${$}</div>`}).join("");return`<div class="nb-mobile-item">
                    <button class="nb-mobile-link" type="button">${m.label||"Menú"}<i class="ri-arrow-down-s-line"></i></button>
                    <div class="nb-mobile-submenu">${E}</div>
                </div>`}return`<a href="${m.href||"#"}" class="nb-mobile-link">${m.label||""}</a>`}).join(""),U=[y,f.label?`<a href="${f.href||"#"}" class="nb-bottom-cta ${k}"><span class="nb-bottom-cta-line1">${f.label}</span>${L}</a>`:""].filter(Boolean).join("");return`<div id="nb-root-${o}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="nb-top">
            <div class="nb-logo">${h}</div>
            <div class="nb-top-actions">${C}</div>
            ${y}
        </div>
        <div class="nb-bottom">
            <ul class="nb-nav-list">${b}</ul>
            ${n}
            <div class="nb-icon-btn-gap"></div>
            ${R}
        </div>
        <div class="nb-mobile-bar">
            ${h}
            <div style="display:flex;align-items:center;gap:0.5rem;">
                ${R}
                <button class="nb-hamburger" type="button" id="nb-toggle-${o}" aria-label="Menú"><span></span><span></span><span></span></button>
            </div>
        </div>
        <div class="nb-mobile-menu" id="nb-mobile-${o}">
            <div class="nb-mobile-top-actions">${J}</div>
            <div class="nb-mobile-banking">${U}</div>
            ${z}
        </div>
    </div>`}const O={icon_btn:{enabled:!1,icon:"ri-search-line",href:"#",label:"Buscar"},logo_url:"",logo_alt:"Logo",logo_text:"Logo",logo_href:"/",top_actions:[{label:"Contáctanos",href:"#",icon:"ri-phone-line"},{label:"Sucursales",href:"#",icon:"ri-building-line"},{label:"Preguntas Frecuentes",href:"#",icon:"ri-question-answer-line"}],banking_btn:{label:"Mi Banca Integral",href:"#",color:"blue"},nav_links:[{type:"link",label:"Inicio",href:"/"},{type:"submenu",label:"Créditos",columns:[{badge:"Tus créditos",badge_color:"blue",items:[{label:"Microcrédito",desc:"Financiamiento para tu negocio",href:"#"},{label:"Crédito Personal",desc:"Para tus necesidades personales",href:"#"}]}],cta_column:{text:"Solicita tu Crédito Online",btn_label:"Solicitar",btn_href:"#",btn_color:"orange"}},{type:"link",label:"Ahorros e Inversión",href:"#"},{type:"link",label:"Servicios y seguro",href:"#"}],bottom_cta:{label:"Programa Surge",sublabel:"Formación Empresarial",href:"#",color:"orange"}};function Y(r,o){const i=document.getElementById("navbar-config-modal");if(i&&i.remove(),!document.getElementById("nb-modal-styles")){const e=document.createElement("style");e.id="nb-modal-styles",e.textContent=`
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
        `,document.head.appendChild(e)}const a=(()=>{try{return JSON.parse(o.getAttributes()["data-navbar-config"]||"{}")}catch{return{}}})(),h=a.logo_url||"",C=a.logo_alt||"",B=a.logo_text||"Logo",w=a.logo_href||"/",y=JSON.parse(JSON.stringify(a.top_actions||O.top_actions)),b=JSON.parse(JSON.stringify(a.banking_btn||O.banking_btn)),f=JSON.parse(JSON.stringify(a.nav_links||O.nav_links)),k=JSON.parse(JSON.stringify(a.bottom_cta||O.bottom_cta)),L=document.createElement("div");L.id="navbar-config-modal",L.className="nb-overlay";const n=document.createElement("div");n.className="nb-modal",n.innerHTML=`
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
                            ${h?`<img id="nb-logo-preview" src="${h}" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;">`:'<div id="nb-logo-preview" style="display:none;"></div>'}
                            <input id="nb-logo-url" type="text" placeholder="URL del logo" value="${h}" class="nb-input">
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
                        <input id="nb-logo-alt"  type="text" placeholder="Texto alternativo"      value="${C}"  class="nb-input">
                        <input id="nb-logo-text" type="text" placeholder="Texto si no hay imagen" value="${B}" class="nb-input">
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
                            <input id="nb-banking-label" type="text" placeholder="Mi Banca Integral" value="${b.label||""}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-banking-href" type="text" placeholder="URL o buscar página..." value="${b.href||"#"}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="nb-color-toggle">
                                <button class="nb-color-opt nb-color-opt-blue ${b.color!=="orange"?"":"nb-color-inactive"}" data-color="blue" id="nb-banking-blue">Azul</button>
                                <button class="nb-color-opt nb-color-opt-orange ${b.color==="orange"?"":"nb-color-inactive"}" data-color="orange" id="nb-banking-orange">Naranja</button>
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
                                <div class="nb-icon-preview"><i id="nb-iconbtn-preview" class="${a.icon_btn?.icon||"ri-search-line"}"></i></div>
                                <input id="nb-iconbtn-icon" type="text" placeholder="ri-search-line" value="${a.icon_btn?.icon||"ri-search-line"}" class="nb-input" readonly>
                                <button class="nb-pick-btn" id="nb-iconbtn-pick"><i class="ri-emotion-happy-line"></i> Icono</button>
                            </div>
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Etiqueta (tooltip)</label>
                            <input id="nb-iconbtn-label" type="text" placeholder="Buscar" value="${a.icon_btn?.label||"Buscar"}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-iconbtn-href" type="text" placeholder="URL o buscar página..." value="${a.icon_btn?.href||"#"}" class="nb-input">
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
        </div>`,L.appendChild(n),document.body.appendChild(L);const N=new W;n.querySelectorAll(".nb-tab-btn").forEach(e=>{e.addEventListener("click",()=>{n.querySelectorAll(".nb-tab-btn").forEach(t=>t.classList.remove("active")),n.querySelectorAll(".nb-tab-panel").forEach(t=>t.classList.remove("active")),e.classList.add("active"),n.querySelector(`#nb-panel-${e.dataset.tab}`).classList.add("active")})}),n.querySelector("#nb-logo-pick").addEventListener("click",()=>{Z({type:"image",title:"Seleccionar logo",onSelect:e=>{n.querySelector("#nb-logo-url").value=e;let t=n.querySelector("#nb-logo-preview");if(!t||t.tagName==="DIV"){const c=document.createElement("img");c.id="nb-logo-preview",c.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;",t?.replaceWith(c)??n.querySelector("#nb-logo-url").before(c),t=c}t.src=e,t.style.display="block"}})});const J=`${document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??""}/api/pages/search`;function z(e){if(e.dataset.autocompleteAttached)return;e.dataset.autocompleteAttached="true";const t=e.parentNode;(!t.style.position||t.style.position==="static")&&(t.style.position="relative");const c=document.createElement("ul");c.style.cssText="position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;max-height:200px;overflow-y:auto;display:none;",t.appendChild(c);let l=null;async function u(g){if(g.length<1){c.style.display="none";return}try{const q=await(await fetch(`${J}?q=${encodeURIComponent(g)}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json();p(q,g)}catch{c.style.display="none"}}function d(g,s){return s?g.replace(new RegExp(`(${s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi"),'<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>'):g}function p(g,s){if(c.innerHTML="",!g.length){c.style.display="none";return}g.forEach(q=>{const x=document.createElement("li");x.style.cssText="padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;",x.innerHTML=`<span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${d(q.title,s)}</span><span style="font-size:0.7rem;color:#64748b;">/${q.slug}</span>`,x.addEventListener("mouseenter",()=>x.style.background="#f1f5f9"),x.addEventListener("mouseleave",()=>x.style.background=""),x.addEventListener("mousedown",j=>{j.preventDefault(),e.value="/"+q.slug,e.dispatchEvent(new Event("input")),c.style.display="none"}),c.appendChild(x)}),c.style.display="block"}e.addEventListener("input",()=>{clearTimeout(l),l=setTimeout(()=>u(e.value.trim()),220)}),e.addEventListener("focus",()=>{e.select(),e.value.trim()&&u(e.value.trim())}),e.addEventListener("blur",()=>{setTimeout(()=>{c.style.display="none"},150)}),e.addEventListener("keydown",g=>{if(c.style.display==="none")return;const s=c.querySelectorAll("li"),q=c.querySelector("li.nb-ac-active");let x=Array.from(s).indexOf(q);if(g.key==="ArrowDown"){g.preventDefault(),q?.classList.remove("nb-ac-active");const j=s[x+1]||s[0];j?.classList.add("nb-ac-active"),j&&(j.style.background="#f1f5f9")}else if(g.key==="ArrowUp"){g.preventDefault(),q?.classList.remove("nb-ac-active");const j=s[x-1]||s[s.length-1];j?.classList.add("nb-ac-active"),j&&(j.style.background="#f1f5f9")}else g.key==="Enter"&&q?(g.preventDefault(),q.dispatchEvent(new MouseEvent("mousedown"))):g.key==="Escape"&&(c.style.display="none")})}function U(e,t,c){let l=null;e.querySelectorAll("[data-drag-idx]").forEach(u=>{u.setAttribute("draggable","true"),u.addEventListener("dragstart",d=>{l=parseInt(u.dataset.dragIdx),setTimeout(()=>u.classList.add("nb-dragging"),0),d.dataTransfer.effectAllowed="move"}),u.addEventListener("dragend",()=>{u.classList.remove("nb-dragging"),e.querySelectorAll(".nb-drag-over").forEach(d=>d.classList.remove("nb-drag-over"))}),u.addEventListener("dragover",d=>{d.preventDefault(),d.dataTransfer.dropEffect="move",parseInt(u.dataset.dragIdx)!==l&&u.classList.add("nb-drag-over")}),u.addEventListener("dragleave",()=>u.classList.remove("nb-drag-over")),u.addEventListener("drop",d=>{d.preventDefault();const p=parseInt(u.dataset.dragIdx);if(l!==null&&p!==l){const[g]=t.splice(l,1);t.splice(p,0,g),c()}l=null})})}function m(){const e=n.querySelector("#nb-top-actions-list");e.innerHTML="",y.forEach((t,c)=>{const l=document.createElement("div");l.className="nb-action-card",l.dataset.dragIdx=c;const u=t.icon||"";l.innerHTML=`
                <div class="nb-row">
                    <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                    <div class="nb-icon-preview"><i class="${u||"ri-star-line"}"></i></div>
                    <input class="nb-input-sm" style="width:130px;flex-shrink:0;" placeholder="Clase del icono" value="${u}" data-field="icon" readonly>
                    <button class="nb-pick-btn nb-pick-icon-btn" type="button"><i class="ri-emotion-happy-line"></i> Icono</button>
                    <button class="nb-btn-remove nb-remove-action"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="nb-row">
                    <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${t.label||""}" data-field="label">
                </div>
                <div style="position:relative;">
                    <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${t.href||"#"}" data-field="href">
                </div>`,l.querySelector(".nb-pick-icon-btn").addEventListener("click",()=>{N.open(p=>{t.icon=p,l.querySelector("[data-field='icon']").value=p,l.querySelector(".nb-icon-preview i").className=p})}),l.querySelector(".nb-remove-action").onclick=()=>{y.splice(c,1),m()},l.querySelectorAll("[data-field]").forEach(p=>{p.addEventListener("input",()=>{t[p.dataset.field]=p.value})});const d=l.querySelector(".nb-url-input");if(d){const p=document.createElement("div");p.style.position="relative",d.parentNode.insertBefore(p,d),p.appendChild(d),z(d)}e.appendChild(l)}),U(e,y,m)}function E(){const e=n.querySelector("#nb-nav-list");e.innerHTML="",f.forEach((t,c)=>{const l=document.createElement("div");l.className="nb-link-card",l.dataset.dragIdx=c;const u=`<span class="nb-type-badge ${t.type==="submenu"?"nb-type-submenu":"nb-type-link"}" data-toggle-type title="Clic para cambiar tipo">${t.type==="submenu"?"Submenú":"Link"} ↕</span>`;if(t.type==="submenu"){let g=function(){p.innerHTML="",(t.columns||[]).forEach((s,q)=>{const x=document.createElement("div");x.className="nb-col-card";const j=(s.items||[]).map((v,I)=>`
                            <div class="nb-col-item" data-item-idx="${I}">
                                <div class="nb-col-item-row">
                                    <input class="nb-input-sm" style="flex:1;" placeholder="Título del item" value="${v.label||""}" data-item-field="label">
                                    <button class="nb-btn-remove nb-remove-item" style="padding:0.2rem;"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                <input class="nb-input-sm" style="width:100%;box-sizing:border-box;" placeholder="Descripción (opcional)" value="${v.desc||""}" data-item-field="desc">
                                <div style="position:relative;">
                                    <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL" value="${v.href||"#"}" data-item-field="href">
                                </div>
                            </div>`).join("");x.innerHTML=`
                            <div class="nb-col-card-header">
                                <span style="font-size:0.75rem;font-weight:700;color:#475569;">Columna ${q+1}</span>
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
                            </div>`,x.querySelector("[data-col-field='badge']").addEventListener("input",v=>{s.badge=v.target.value}),x.querySelectorAll("[data-col-color]").forEach(v=>{v.addEventListener("click",()=>{s.badge_color=v.dataset.colColor,x.querySelectorAll("[data-col-color]").forEach(I=>{I.classList.toggle("nb-color-inactive",I.dataset.colColor!==v.dataset.colColor)})})}),x.querySelector(".nb-remove-col").onclick=()=>{t.columns.splice(q,1),g();const v=l.querySelector(".nb-add-col-btn");v&&(v.disabled=!1,v.style.opacity="",v.style.cursor="")},x.querySelectorAll("[data-item-field]").forEach(v=>{const I=parseInt(v.closest("[data-item-idx]").dataset.itemIdx);v.addEventListener("input",()=>{s.items[I][v.dataset.itemField]=v.value})}),x.querySelectorAll(".nb-url-input").forEach(v=>{const I=document.createElement("div");I.style.position="relative",v.parentNode.insertBefore(I,v),I.appendChild(v),z(v)}),x.querySelectorAll(".nb-remove-item").forEach(v=>{v.onclick=()=>{const I=parseInt(v.closest("[data-item-idx]").dataset.itemIdx);s.items.splice(I,1),g()}}),x.querySelector(".nb-add-item-btn").onclick=()=>{s.items=s.items||[],s.items.push({label:"Nuevo item",desc:"",href:"#"}),g()},p.appendChild(x)})};l.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${u}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Título del menú" value="${t.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-section-title">Columnas del mega-menú (máx. 3)</div>
                        <div class="nb-columns-list" style="display:flex;flex-direction:column;gap:0.625rem;"></div>
                        <div class="nb-add-row">
                            <button class="nb-btn-add nb-btn-add-col nb-add-col-btn" ${(t.columns||[]).length>=3?"disabled style='opacity:0.4;cursor:not-allowed;'":""}><i class="ri-add-line"></i> Agregar columna</button>
                        </div>
                        <div class="nb-section-title" style="margin-top:0.5rem;">Columna CTA (opcional)</div>
                        <div class="nb-cta-section">
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;width:80px;">Texto CTA</label>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Texto alternado naranja/azul" value="${t.cta_column?.text||""}" data-cta-field="text">
                            </div>
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;width:80px;">Btn texto</label>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Solicitar" value="${t.cta_column?.btn_label||""}" data-cta-field="btn_label">
                            </div>
                            <div style="position:relative;">
                                <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL del botón CTA" value="${t.cta_column?.btn_href||"#"}" data-cta-field="btn_href">
                            </div>
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;width:80px;">Color btn</label>
                                <div class="nb-color-toggle">
                                    <button class="nb-color-opt nb-color-opt-blue ${(t.cta_column?.btn_color||"orange")==="blue"?"":"nb-color-inactive"}" data-cta-color="blue">Azul</button>
                                    <button class="nb-color-opt nb-color-opt-orange ${(t.cta_column?.btn_color||"orange")==="orange"?"":"nb-color-inactive"}" data-cta-color="orange">Naranja</button>
                                </div>
                            </div>
                        </div>
                    </div>`,l.querySelector("[data-toggle-type]").onclick=()=>{t.type="link",t.href="#",delete t.columns,delete t.cta_column,E()},l.querySelector(".nb-remove-link").onclick=()=>{f.splice(c,1),E()},l.querySelector("[data-field='label']").addEventListener("input",s=>{t.label=s.target.value}),l.querySelectorAll("[data-cta-field]").forEach(s=>{s.addEventListener("input",()=>{t.cta_column||(t.cta_column={}),t.cta_column[s.dataset.ctaField]=s.value})});const d=l.querySelector("[data-cta-field='btn_href']");if(d){const s=document.createElement("div");s.style.position="relative",d.parentNode.insertBefore(s,d),s.appendChild(d),z(d)}l.querySelectorAll("[data-cta-color]").forEach(s=>{s.addEventListener("click",()=>{t.cta_column||(t.cta_column={}),t.cta_column.btn_color=s.dataset.ctaColor,l.querySelectorAll("[data-cta-color]").forEach(q=>{q.classList.toggle("nb-color-inactive",q.dataset.ctaColor!==s.dataset.ctaColor)})})});const p=l.querySelector(".nb-columns-list");g(),l.querySelector(".nb-add-col-btn").onclick=()=>{if(!((t.columns||[]).length>=3)&&(t.columns=t.columns||[],t.columns.push({badge:"Nueva columna",badge_color:"blue",items:[{label:"Nuevo item",desc:"",href:"#"}]}),g(),t.columns.length>=3)){const s=l.querySelector(".nb-add-col-btn");s.disabled=!0,s.style.opacity="0.4",s.style.cursor="not-allowed"}}}else{l.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${u}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${t.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div style="position:relative;">
                            <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${t.href||""}" data-field="href">
                        </div>
                    </div>`,l.querySelector("[data-toggle-type]").onclick=()=>{t.type="submenu",t.columns=[{badge:"Columna 1",badge_color:"blue",items:[{label:"Enlace",desc:"",href:"#"}]}],t.cta_column={text:"",btn_label:"Ver más",btn_href:"#",btn_color:"orange"},delete t.href,E()},l.querySelector(".nb-remove-link").onclick=()=>{f.splice(c,1),E()},l.querySelectorAll("[data-field]").forEach(p=>{p.addEventListener("input",()=>{t[p.dataset.field]=p.value})});const d=l.querySelector(".nb-url-input");if(d){const p=document.createElement("div");p.style.position="relative",d.parentNode.insertBefore(p,d),p.appendChild(d),z(d)}}e.appendChild(l)}),U(e,f,E)}n.querySelectorAll("#nb-banking-blue, #nb-banking-orange").forEach(e=>{e.addEventListener("click",()=>{b.color=e.dataset.color,n.querySelector("#nb-banking-blue").classList.toggle("nb-color-inactive",b.color!=="blue"),n.querySelector("#nb-banking-orange").classList.toggle("nb-color-inactive",b.color!=="orange")})}),n.querySelectorAll("#nb-bcta-blue, #nb-bcta-orange").forEach(e=>{e.addEventListener("click",()=>{k.color=e.dataset.color,n.querySelector("#nb-bcta-blue").classList.toggle("nb-color-inactive",k.color!=="blue"),n.querySelector("#nb-bcta-orange").classList.toggle("nb-color-inactive",k.color!=="orange")})});const _=n.querySelector("#nb-banking-href");if(_){const e=document.createElement("div");e.style.position="relative",_.parentNode.insertBefore(e,_),e.appendChild(_),z(_)}const A=n.querySelector("#nb-bcta-href");if(A){const e=document.createElement("div");e.style.position="relative",A.parentNode.insertBefore(e,A),e.appendChild(A),z(A)}const T=n.querySelector("#nb-logo-href");if(T){const e=document.createElement("div");e.style.position="relative",T.parentNode.insertBefore(e,T),e.appendChild(T),z(T)}n.querySelector("#nb-add-top-action").onclick=()=>{y.push({label:"Nueva acción",href:"#",icon:"ri-star-line"}),m(),n.querySelector("#nb-top-actions-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},n.querySelector("#nb-add-nav-link").onclick=()=>{f.push({type:"link",label:"Nuevo enlace",href:"#"}),E(),n.querySelector("#nb-nav-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},n.querySelector("#nb-add-nav-submenu").onclick=()=>{f.push({type:"submenu",label:"Nuevo menú",columns:[{badge:"Columna 1",badge_color:"blue",items:[{label:"Enlace",desc:"",href:"#"}]}],cta_column:{text:"",btn_label:"Ver más",btn_href:"#",btn_color:"orange"}}),E(),n.querySelector("#nb-nav-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},m(),E();const $=JSON.parse(JSON.stringify(a.icon_btn||O.icon_btn)),S=n.querySelector("#nb-iconbtn-toggle-wrap"),M="nb-iconbtn-switch-"+Math.random().toString(36).slice(2,6);S.innerHTML=`
        <label style="position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;">
            <input type="checkbox" id="${M}" ${$.enabled!==!1?"checked":""} style="opacity:0;width:0;height:0;">
            <span style="position:absolute;inset:0;background:${$.enabled!==!1?"#003B71":"#cbd5e1"};border-radius:9999px;transition:background 0.2s;cursor:pointer;"></span>
            <span style="position:absolute;width:16px;height:16px;left:${$.enabled!==!1?"21px":"3px"};top:3px;background:#fff;border-radius:50%;transition:left 0.2s;pointer-events:none;"></span>
        </label>
        <span style="font-size:0.875rem;color:#475569;">${$.enabled!==!1?"Botón activo":"Botón desactivado"}</span>`,S.querySelector(`#${M}`).addEventListener("change",function(){$.enabled=this.checked;const e=S.querySelector("span:nth-child(2)"),t=S.querySelector("span:nth-child(3)"),c=S.querySelector("span:last-child");e&&(e.style.background=this.checked?"#003B71":"#cbd5e1"),t&&(t.style.left=this.checked?"21px":"3px"),c&&(c.textContent=this.checked?"Botón activo":"Botón desactivado")}),n.querySelector("#nb-iconbtn-icon").value=$.icon||"ri-search-line",n.querySelector("#nb-iconbtn-preview").className=$.icon||"ri-search-line",n.querySelector("#nb-iconbtn-label").value=$.label||"Buscar",n.querySelector("#nb-iconbtn-href").value=$.href||"#",n.querySelector("#nb-iconbtn-icon").addEventListener("input",e=>{$.icon=e.target.value,n.querySelector("#nb-iconbtn-preview").className=e.target.value}),n.querySelector("#nb-iconbtn-label").addEventListener("input",e=>{$.label=e.target.value}),n.querySelector("#nb-iconbtn-pick").addEventListener("click",()=>{new W().open(t=>{$.icon=t,n.querySelector("#nb-iconbtn-icon").value=t,n.querySelector("#nb-iconbtn-preview").className=t})});const D=n.querySelector("#nb-iconbtn-href");if(D){const e=document.createElement("div");e.style.position="relative",D.parentNode.insertBefore(e,D),e.appendChild(D),z(D)}n.querySelector("#nb-modal-backup").onclick=()=>{const e={icon_btn:{enabled:$.enabled!==!1,icon:n.querySelector("#nb-iconbtn-icon").value.trim()||"ri-search-line",label:n.querySelector("#nb-iconbtn-label").value.trim()||"Buscar",href:n.querySelector("#nb-iconbtn-href").value.trim()||"#"},logo_url:n.querySelector("#nb-logo-url").value.trim(),logo_alt:n.querySelector("#nb-logo-alt").value.trim(),logo_text:n.querySelector("#nb-logo-text").value.trim(),logo_href:n.querySelector("#nb-logo-href").value.trim()||"/",top_actions:JSON.parse(JSON.stringify(y)),banking_btn:{label:n.querySelector("#nb-banking-label").value.trim(),href:n.querySelector("#nb-banking-href").value.trim()||"#",color:b.color||"blue"},nav_links:JSON.parse(JSON.stringify(f)),bottom_cta:{label:n.querySelector("#nb-bcta-label").value.trim(),sublabel:n.querySelector("#nb-bcta-sublabel").value.trim(),href:n.querySelector("#nb-bcta-href").value.trim()||"#",color:k.color||"orange"}},t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),c=URL.createObjectURL(t),l=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),u=document.createElement("a");u.href=c,u.download=`navbar-backup-${l}.json`,document.body.appendChild(u),u.click(),u.remove(),URL.revokeObjectURL(c)},n.querySelector("#nb-modal-restore-input").onchange=e=>{const t=e.target.files?.[0];if(!t)return;const c=new FileReader;c.onload=l=>{let u;try{u=JSON.parse(l.target.result)}catch{const p=document.createElement("div");p.className="nb-confirm-overlay",p.innerHTML='<div class="nb-confirm-modal"><div class="nb-confirm-header"><i class="ri-error-warning-line" style="color:#ef4444;"></i><h3>Archivo inválido</h3></div><div class="nb-confirm-body"><p>El archivo seleccionado no es un JSON válido.</p></div><div class="nb-confirm-footer"><button class="nb-confirm-ok" style="background:#ef4444;">Cerrar</button></div></div>',document.body.appendChild(p),p.querySelector(".nb-confirm-ok").onclick=()=>p.remove(),e.target.value="";return}const d=document.createElement("div");d.className="nb-confirm-overlay",d.innerHTML=`
                <div class="nb-confirm-modal">
                    <div class="nb-confirm-header">
                        <i class="ri-refresh-line"></i>
                        <h3>Restaurar configuración</h3>
                    </div>
                    <div class="nb-confirm-body">
                        <p>¿Deseas restaurar la configuración del navbar desde el archivo de respaldo?</p>
                        <p>Esta acción reemplazará la configuración actual del formulario.</p>
                        <span class="nb-confirm-filename"><i class="ri-file-code-line"></i>${t.name}</span>
                    </div>
                    <div class="nb-confirm-footer">
                        <button class="nb-confirm-cancel">Cancelar</button>
                        <button class="nb-confirm-ok"><i class="ri-check-line"></i> Sí, restaurar</button>
                    </div>
                </div>`,document.body.appendChild(d),d.querySelector(".nb-confirm-cancel").onclick=()=>{d.remove(),e.target.value=""},d.querySelector(".nb-confirm-ok").onclick=()=>{d.remove(),e.target.value="";const g=o.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||"nb"+Math.random().toString(36).slice(2,7);o.addAttributes({"data-navbar-config":JSON.stringify(u)}),o.components(V(u,g)+G),H(),Y(r,o)}},c.readAsText(t)};const H=()=>{N.close(),L.remove()};n.querySelector("#nb-modal-close").onclick=H,n.querySelector("#nb-modal-cancel").onclick=H,L.onclick=e=>{e.target===L&&H()},n.querySelector("#nb-modal-save").onclick=()=>{const e={icon_btn:{enabled:$.enabled!==!1,icon:n.querySelector("#nb-iconbtn-icon").value.trim()||"ri-search-line",label:n.querySelector("#nb-iconbtn-label").value.trim()||"Buscar",href:n.querySelector("#nb-iconbtn-href").value.trim()||"#"},logo_url:n.querySelector("#nb-logo-url").value.trim(),logo_alt:n.querySelector("#nb-logo-alt").value.trim(),logo_text:n.querySelector("#nb-logo-text").value.trim(),logo_href:n.querySelector("#nb-logo-href").value.trim()||"/",top_actions:y,banking_btn:{label:n.querySelector("#nb-banking-label").value.trim(),href:n.querySelector("#nb-banking-href").value.trim()||"#",color:b.color||"blue"},nav_links:f,bottom_cta:{label:n.querySelector("#nb-bcta-label").value.trim(),sublabel:n.querySelector("#nb-bcta-sublabel").value.trim(),href:n.querySelector("#nb-bcta-href").value.trim()||"#",color:k.color||"orange"}},c=o.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||"nb"+Math.random().toString(36).slice(2,7);o.addAttributes({"data-navbar-config":JSON.stringify(e)}),o.components(V(e,c)+G),H()}}function pe(r){const o="navbar-component";r.DomComponents.addType(o,{isComponent:i=>i.getAttribute?.("data-gjs-type")===o?{type:o}:!1,model:{defaults:{name:"Navbar",tagName:"nav",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":o,class:"nb-wrapper","data-navbar-config":JSON.stringify(O)},components:V(O)+G,script:function(){(function(i){if(!i||typeof i.querySelector!="function"||i.__nbInit)return;i.__nbInit=!0;var a=i.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");if(!a)return;var h=!!window.__gjseditor||document.documentElement.hasAttribute("data-gjs-canvas");function C(){h||(document.body.style.paddingTop=i.offsetHeight+"px")}C(),window.addEventListener("resize",function(){if(C(),window.innerWidth>992){var y=document.getElementById("nb-mobile-"+a);y&&y.classList.contains("nb-open")&&y.classList.remove("nb-open"),i.querySelectorAll(".nb-mobile-item.nb-open").forEach(function(b){b.classList.remove("nb-open")})}});var B=document.getElementById("nb-toggle-"+a),w=document.getElementById("nb-mobile-"+a);B&&w&&B.addEventListener("click",function(){w.classList.toggle("nb-open"),C()}),i.querySelectorAll(".nb-nav-trigger").forEach(function(y){y.addEventListener("click",function(b){b.stopPropagation();var f=y.closest(".nb-nav-item"),k=f.classList.contains("nb-open");i.querySelectorAll(".nb-nav-item.nb-open").forEach(function(L){L.classList.remove("nb-open")}),k||f.classList.add("nb-open"),C()})}),i.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(y){y.addEventListener("click",function(){y.closest(".nb-mobile-item").classList.toggle("nb-open"),C()})}),document.addEventListener("click",function(y){i.contains(y.target)||i.querySelectorAll(".nb-nav-item.nb-open").forEach(function(b){b.classList.remove("nb-open")})})})(this)},"script-props":[],toolbar:[],traits:[{type:"button",label:"Navbar",text:"Administrar Navbar",full:!0,command:"open-navbar-config"}]},init(){this.set("type",o),this.addAttributes({"data-gjs-type":o})}}}),r.Commands.add("open-navbar-config",{run(i){const a=i.getSelected();a&&Y(i,a)}}),r.BlockManager.add("navbar-block",{label:"Navbar",category:"Navbar",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,activate:!0,content:{type:o,attributes:{"data-gjs-type":o}}}),ue(r,o),fe(r)}function ue(r,o){r.on("storage:end:load",()=>{setTimeout(()=>X(r,o),800)}),r.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===o&&(i.set("type",o),setTimeout(()=>K(r,a),400))}),r.on("canvas:render",()=>{setTimeout(()=>X(r,o),600)})}function K(r,o){if(o?.isConnected)try{const i=r.Canvas.getFrameEl()?.contentDocument;if(!i)return;o.__nbInit&&delete o.__nbInit;const a=i.createElement("script");a.textContent=`(function(){
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
        })();`,i.head.appendChild(a),a.remove()}catch(i){console.warn("[Navbar] Error inyectando script en canvas:",i)}}function X(r,o){r.getWrapper().find(`[data-gjs-type="${o}"]`).forEach(i=>{i.set("type",o);const a=i.getEl();a?.isConnected&&K(r,a)})}function fe(r){r.on("load",()=>{const o=r.Canvas.getFrameEl();if(!o)return;const i=o.contentDocument,a=i?.head;if(a&&(i.documentElement?.setAttribute("data-gjs-canvas","true"),!a.querySelector("#navbar-component-css"))){const h=document.createElement("style");h.id="navbar-component-css",h.textContent=`
                [data-gjs-type="navbar-component"] {
                    position: relative !important;
                    top: auto !important;
                }
                body { padding-top: 0 !important; }
            `,a.appendChild(h)}})}document.addEventListener("DOMContentLoaded",async()=>{const r=new le;let o=document.getElementById("navbar-id")?.value||"",i=document.getElementById("navbar-name")?.value||"",a=document.getElementById("navbar-load-url")?.value||"",h=document.getElementById("navbar-store-url")?.value||"";const C=document.getElementById("navbar-is-active")?.value==="1";let B=!!o;const w=de();if(pe(w),w.on("load",()=>{ee(w),ne(),te(),oe(w),ae(w),re(w),ie(w),ge(w),ve(w),setTimeout(()=>{w.runCommand("sw-visibility"),w.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),B&&a)try{await r.loadPageContent(w,a),P("Navbar cargado correctamente","success")}catch{P("Error al cargar el navbar","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const b=document.getElementById("save-button");b.disabled=!0,b.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!B&&!i?se({title:"Nombre del Navbar",description:"Ingresa un nombre descriptivo para identificar este navbar.",placeholder:"Ej: Navbar Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async f=>{if(!f?.trim()){P("El nombre es obligatorio","error"),b.disabled=!1,b.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await y(f)}catch(k){P(k.message,"error")}finally{b.disabled=!1,b.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{b.disabled=!1,b.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await y(i),b.disabled=!1,b.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(f){P(f.message,"error"),b.disabled=!1,b.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function y(b){const f=B?"PUT":"POST",k=r.getEditorContent(w);(!k.js_content||k.js_content.trim()==="")&&(k.js_content=be);const L=await r.savePage(w,{...k,name:b,is_active:C},h,f);if(L.success){if(r.markAsClean(),P(L.message,"success"),!B&&L.navbar){o=L.navbar.id,i=L.navbar.name,B=!0;const n=document.getElementById("navbar-id");n&&(n.value=o);const N=document.getElementById("navbar-name");N&&(N.value=i);const R=document.querySelector('meta[name="app-url"]'),J=R?R.content:"";h=h.endsWith("/navbars")?`${h}/${o}`:`${h.replace(/\/navbars\/?$/,"")}/navbars/${o}`;const U=document.getElementById("navbar-store-url");U&&(U.value=h),a=`${h}/load`;const m=document.getElementById("navbar-load-url");m&&(m.value=a);const E=document.getElementById("editor-title");E&&(E.textContent=`Editando Navbar: ${i}`);const _=`/navbars/edit/${o}/edit`,A=J?`${J}${_}`:_;window.history.replaceState({path:A},"",A)}else if(b){i=b;const n=document.getElementById("navbar-name");n&&(n.value=i);const N=document.getElementById("editor-title");N&&(N.textContent=`Editando Navbar: ${i}`)}}}});function ge(r){r.Commands.add("canvas-clear",{run:o=>{ce({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{o.DomComponents.clear(),o.CssComposer.clear()}})}})}function ve(r){const o=["set-device-desktop","set-device-tablet","set-device-mobile"];function i(a){o.forEach(h=>{r.Panels.getButton("devices-c",h)?.set("active",h===a)})}r.Commands.add("set-device-desktop",{run(a){a.setDevice("desktop"),i("set-device-desktop")}}),r.Commands.add("set-device-tablet",{run(a){a.setDevice("tablet"),i("set-device-tablet")}}),r.Commands.add("set-device-mobile",{run(a){a.setDevice("mobile"),i("set-device-mobile")}}),r.on("device:select",a=>{const h=a.get?a.get("id"):a.id,C={desktop:"set-device-desktop",tablet:"set-device-tablet",mobile:"set-device-mobile"};C[h]&&i(C[h])}),setTimeout(()=>{i("set-device-desktop")},200)}function P(r,o="info"){typeof window.showNotification=="function"&&window.showNotification(r,o)}
