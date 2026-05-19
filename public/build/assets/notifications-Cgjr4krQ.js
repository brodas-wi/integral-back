const c={success:{cls:"notif-success",icon:"ri-checkbox-circle-line"},error:{cls:"notif-error",icon:"ri-error-warning-line"},warning:{cls:"notif-warning",icon:"ri-alert-line"},info:{cls:"notif-info",icon:"ri-information-line"}};function r(){let n=document.getElementById("notification-container");return n||(n=document.createElement("div"),n.id="notification-container",n.className="notif-container",document.body.appendChild(n)),n}function a(n,e="info"){const t=c[e]??c.info,o=r(),i=document.createElement("div");i.className=`notif-toast ${t.cls}`,i.innerHTML=`
        <div class="notif-body">
            <i class="${t.icon} notif-icon"></i>
            <span class="notif-message">${n}</span>
        </div>
        <button class="notif-close" aria-label="Cerrar">
            <i class="ri-close-line"></i>
        </button>
    `,i.querySelector(".notif-close").addEventListener("click",()=>s(i,o)),o.appendChild(i),setTimeout(()=>s(i,o),5e3)}function s(n,e){n.classList.add("notif-exit"),setTimeout(()=>{n.remove(),e.children.length===0&&e.remove()},300)}export{a as s};
