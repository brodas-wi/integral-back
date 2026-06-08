import{L as e}from"./leaflet-DrSzxzmd.js";function d(){const t=document.getElementById("agency-map");if(!t)return;const a=parseFloat(t.dataset.latitude),o=parseFloat(t.dataset.longitude),s=t.dataset.name,i=t.dataset.municipality,r=t.dataset.department;if(!a||!o){console.error("Invalid coordinates for map");return}const n=e.map("agency-map").setView([a,o],16);e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:19}).addTo(n);const c=e.divIcon({className:"custom-marker",html:`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="36" height="36">
                <path fill="#f0872a" stroke="#fff" stroke-width="1.5" d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 16 8 16s8-10.5 8-16c0-4.42-3.58-8-8-8z"/>
                <circle cx="12" cy="8" r="3" fill="#fff"/>
            </svg>
        `,iconSize:[36,36],iconAnchor:[18,36],popupAnchor:[0,-36]});e.marker([a,o],{icon:c}).addTo(n).bindPopup(`
            <div class="text-center p-2">
                <strong class="block mb-1 text-secondary">${s}</strong>
                <span class="text-xs text-gray-600">${i}, ${r}</span>
            </div>
        `).openPopup(),setTimeout(()=>{n.invalidateSize()},100)}export{d as i};
