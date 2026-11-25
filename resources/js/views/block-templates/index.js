const MODAL_ID = "bt-confirm-modal";

function confirmDelete(name) {
    return new Promise((resolve) => {
        document.getElementById(MODAL_ID)?.remove();

        const overlay = document.createElement("div");
        overlay.id = MODAL_ID;
        overlay.className = "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4";
        overlay.innerHTML = `
<div class="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true">
    <div class="mb-4 flex items-start gap-3">
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <i class="ri-delete-bin-line text-xl"></i>
        </div>
        <div>
            <h3 class="text-base font-bold text-secondary">Eliminar plantilla</h3>
            <p class="mt-1 text-sm text-gray-600">
                ¿Eliminar <strong data-name></strong>? Dejará de aparecer en el editor, pero las páginas que ya la usan conservarán su contenido.
            </p>
        </div>
    </div>
    <div class="flex justify-end gap-3">
        <button type="button" class="btn-outline" data-choice="cancel">Cancelar</button>
        <button type="button" class="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700" data-choice="confirm">Eliminar</button>
    </div>
</div>`;
        overlay.querySelector("[data-name]").textContent = name;
        document.body.appendChild(overlay);

        const finish = (result) => {
            document.removeEventListener("keydown", onKey);
            overlay.remove();
            resolve(result);
        };

        const onKey = (event) => {
            if (event.key === "Escape") finish(false);
        };

        overlay.addEventListener("click", (event) => {
            const choice = event.target.closest("[data-choice]")?.dataset.choice;
            if (choice) finish(choice === "confirm");
            else if (event.target === overlay) finish(false);
        });

        document.addEventListener("keydown", onKey);
        overlay.querySelector('[data-choice="cancel"]').focus();
    });
}

function lockAndSubmit(form) {
    form.submit();
    form.querySelectorAll("button").forEach((button) => {
        button.disabled = true;
    });
}

document.addEventListener("submit", async (event) => {
    const form = event.target.closest("form[data-bt-action]");
    if (!form) return;

    event.preventDefault();

    if (form.dataset.btAction === "delete") {
        const confirmed = await confirmDelete(form.dataset.name || "esta plantilla");
        if (!confirmed) return;
    }

    lockAndSubmit(form);
});