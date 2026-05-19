const s={success:{bg:"#f0fdf4",border:"#86efac",color:"#166534",icon:"ri-checkbox-circle-line"},error:{bg:"#fef2f2",border:"#fca5a5",color:"#991b1b",icon:"ri-error-warning-line"},warning:{bg:"#fffbeb",border:"#fcd34d",color:"#92400e",icon:"ri-alert-line"},info:{bg:"#eff6ff",border:"#93c5fd",color:"#1e40af",icon:"ri-information-line"}};function c(){let e=document.getElementById("notification-container");return e||(e=document.createElement("div"),e.id="notification-container",e.style.cssText=`
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            max-width: 28rem;
            width: calc(100% - 2rem);
            pointer-events: none;
        `,document.body.appendChild(e)),e}function f(e,o="info"){const i=s[o]??s.info,r=c(),t=document.createElement("div");t.style.cssText=`
        background-color: ${i.bg};
        border: 1px solid ${i.border};
        color: ${i.color};
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 280px;
        pointer-events: auto;
        word-wrap: break-word;
        font-size: 0.875rem;
        font-family: inherit;
        animation: notifSlideIn 0.3s ease-out;
    `,t.innerHTML=`
        <div style="display:flex;align-items:center;gap:0.75rem;flex:1;">
            <i class="${i.icon}" style="font-size:1.25rem;flex-shrink:0;"></i>
            <span style="flex:1;line-height:1.4;font-weight:500;">${e}</span>
        </div>
        <button style="background:none;border:none;cursor:pointer;padding:0;opacity:0.6;flex-shrink:0;color:inherit;display:flex;align-items:center;align-self:center;" class="notif-close">
            <i class="ri-close-line" style="font-size:1.1rem;line-height:1;display:block;"></i>
        </button>
    `;const n=t.querySelector(".notif-close");n.addEventListener("mouseenter",()=>{n.style.opacity="1"}),n.addEventListener("mouseleave",()=>{n.style.opacity="0.6"}),n.addEventListener("click",()=>a(t,r)),r.appendChild(t),l(),setTimeout(()=>a(t,r),5e3)}function a(e,o){e.style.animation="notifSlideOut 0.3s ease-in forwards",setTimeout(()=>{e.remove(),o.children.length===0&&o.remove()},300)}function l(){if(document.getElementById("notif-keyframes"))return;const e=document.createElement("style");e.id="notif-keyframes",e.textContent=`
        @keyframes notifSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);   opacity: 1; }
        }
        @keyframes notifSlideOut {
            from { transform: translateX(0);   opacity: 1; }
            to   { transform: translateX(100%); opacity: 0; }
        }
    `,document.head.appendChild(e)}export{f as s};
