const MODAL_ID = "bt-confirm-modal";

const TONES = {
    danger: {
        badge: "bg-red-50 text-red-600",
        button: "rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700",
    },
    warning: {
        badge: "bg-amber-50 text-amber-600",
        button: "btn-primary",
    },
    success: {
        badge: "bg-emerald-50 text-emerald-600",
        button: "btn-primary",
    },
};

function describe(form) {
    const name = form.dataset.name || "esta plantilla";

    if (form.dataset.btAction === "delete") {
        return {
            name,
            tone: "danger",
            icon: "ri-delete-bin-line",
            title: "Eliminar plantilla",
            before: "¿Eliminar ",
            after: "? Dejará de aparecer en el editor, pero las páginas que ya la usan conservarán su contenido.",
            confirm: "Eliminar",
        };
    }

    if (form.dataset.active === "1") {
        return {
            name,
            tone: "warning",
            icon: "ri-eye-off-line",
            title: "Desactivar plantilla",
            before: "¿Desactivar ",
            after: "? Dejará de aparecer en el editor, pero las páginas que ya la usan no cambiarán.",
            confirm: "Desactivar",
        };
    }

    return {
        name,
        tone: "success",
        icon: "ri-eye-line",
        title: "Activar plantilla",
        before: "¿Activar ",
        after: "? Estará disponible en el editor de páginas.",
        confirm: "Activar",
    };
}

function confirmAction(config) {
    return new Promise((resolve) => {
        document.getElementById(MODAL_ID)?.remove();

        const tone = TONES[config.tone];
        const overlay = document.createElement("div");
        overlay.id = MODAL_ID;
        overlay.className = "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4";
        overlay.innerHTML = `
<div class="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true">
    <div class="mb-5 flex items-start gap-3">
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" data-badge>
            <i class="text-xl" data-icon></i>
        </div>
        <div>
            <h3 class="text-base font-bold text-secondary" data-title></h3>
            <p class="mt-1 text-sm text-gray-600">
                <span data-before></span><strong data-name></strong><span data-after></span>
            </p>
        </div>
    </div>
    <div class="flex justify-end gap-3">
        <button type="button" class="btn-outline" data-choice="cancel">Cancelar</button>
        <button type="button" data-choice="confirm"></button>
    </div>
</div>`;

        overlay.querySelector("[data-badge]").className += ` ${tone.badge}`;
        overlay.querySelector("[data-icon]").className += ` ${config.icon}`;
        overlay.querySelector("[data-title]").textContent = config.title;
        overlay.querySelector("[data-before]").textContent = config.before;
        overlay.querySelector("[data-name]").textContent = config.name;
        overlay.querySelector("[data-after]").textContent = config.after;

        const confirmButton = overlay.querySelector('[data-choice="confirm"]');
        confirmButton.className = tone.button;
        confirmButton.textContent = config.confirm;

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

    const confirmed = await confirmAction(describe(form));
    if (!confirmed) return;

    lockAndSubmit(form);
});