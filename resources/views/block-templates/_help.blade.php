<dialog id="bt-help" class="w-full max-w-2xl overflow-hidden rounded-xl p-0 shadow-2xl backdrop:bg-slate-900/50" onclick="if (event.target === this) this.close()">
    <div class="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 class="text-base font-semibold text-slate-900">Cómo usar las plantillas de bloques</h2>
        <button type="button" onclick="document.getElementById('bt-help').close()" class="flex !h-9 !w-9 !min-w-0 flex-shrink-0 items-center justify-center rounded-full !p-0 leading-none text-slate-400 hover:bg-slate-100"><i class="ri-close-line text-lg"></i></button>
    </div>
    <div class="max-h-[70vh] space-y-5 overflow-y-auto px-5 py-4 text-sm leading-relaxed text-slate-700">
        @verbatim
        <section>
            <h3 class="mb-1 font-semibold text-slate-900">1. Tipos de plantilla</h3>
            <p><strong>Estática:</strong> el HTML y CSS se insertan tal cual, como un bloque normal. Cada página queda con su propia copia.</p>
            <p class="mt-1"><strong>Administrable:</strong> el bloque queda como un solo componente. Al seleccionarlo, el botón <em>Administrar plantilla</em> abre un modal con los campos que definas. La configuración se conserva cada vez que la página se vuelve a editar.</p>
        </section>

        <section>
            <h3 class="mb-1 font-semibold text-slate-900">2. Placeholders (solo administrables)</h3>
            <pre class="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">&lt;section class="hero"&gt;
  &lt;h2&gt;{{title}}&lt;/h2&gt;
  {{#if show_image}}&lt;img src="{{image_url}}" alt=""&gt;{{/if}}
  &lt;div id="hero-{{uid}}"&gt;&lt;/div&gt;
&lt;/section&gt;</pre>
            <ul class="mt-2 list-disc space-y-1 pl-5">
                <li><code>{{campo}}</code> inserta el valor, siempre escapado.</li>
                <li><code>{{#if campo}}...{{/if}}</code> muestra el contenido si el campo tiene valor o está activado. No admite anidación.</li>
                <li><code>{{uid}}</code> es un identificador único por bloque, útil para ids y JS.</li>
                <li>Las claves usan minúsculas, números y guion bajo. Ejemplo: <code>image_url</code>.</li>
            </ul>
        </section>

        <section>
            <h3 class="mb-1 font-semibold text-slate-900">3. Campos</h3>
            <p>Pulsa <em>Detectar campos HTML</em> para generar el JSON y luego ajusta etiquetas y valores por defecto.</p>
            <pre class="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">[
  { "key": "title", "label": "Título", "type": "text", "default": "Hola" },
  { "key": "align", "label": "Alineación", "type": "select", "options": ["left", "center"] },
  { "key": "show_image", "label": "Mostrar imagen", "type": "toggle", "default": true }
]</pre>
            <p class="mt-2">Tipos: <code>text</code>, <code>textarea</code>, <code>url</code>, <code>image</code>, <code>video</code>, <code>color</code>, <code>number</code>, <code>select</code>, <code>toggle</code>. Opcional: <code>hint</code>. Los tipos <code>image</code> y <code>video</code> abren el selector de medios.</p>
        </section>

        <section>
            <h3 class="mb-1 font-semibold text-slate-900">4. CSS</h3>
            <p>En plantillas administrables el CSS se limita automáticamente a la plantilla, así que no choca con otros bloques. En las estáticas se aplica tal cual, por eso conviene usar un prefijo propio en las clases.</p>
        </section>

        <section>
            <h3 class="mb-1 font-semibold text-slate-900">5. JavaScript</h3>
            <p>Solo en administrables y solo para usuarios con permiso. Dentro del código, <code>this</code> es el contenedor del bloque.</p>
            <pre class="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">const title = this.querySelector("h2");
title.addEventListener("click", () =&gt; title.classList.toggle("active"));</pre>
        </section>

        <section>
            <h3 class="mb-1 font-semibold text-slate-900">6. Icono y actualizaciones</h3>
            <ul class="list-disc space-y-1 pl-5">
                <li>Puedes subir un SVG para el icono del bloque. Si no hay, se usa uno por defecto.</li>
                <li>Cada cambio en HTML, CSS, JS o campos sube la versión. Las páginas que usen la plantilla se actualizan al abrirlas en el editor, conservando su configuración.</li>
                <li>Si desactivas una plantilla, deja de aparecer en el editor, pero las páginas que ya la usan no cambian.</li>
                <li>No se permiten <code>&lt;script&gt;</code>, eventos en línea (<code>onclick</code>) ni enlaces <code>javascript:</code> en el HTML.</li>
            </ul>
        </section>
        @endverbatim
    </div>
</dialog>