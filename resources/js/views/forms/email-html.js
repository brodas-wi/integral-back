const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const RESERVED = ["form_title", "submission_id", "date", "correlative"];
const VARIABLE = /\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g;

export const EXAMPLES = {
    notify: `<h2 style="margin:0 0 12px;color:#0d3f6a;font-size:20px;">Nueva solicitud {{correlative}}</h2>
<p style="margin:0 0 16px;color:#6b7280;font-size:14px;">Se recibió una nueva respuesta en {{form_title}} el {{date}}.</p>
<div>{{answers}}</div>
<p style="margin:24px 0 0;"><a href="{{admin_url}}" style="display:inline-block;background-color:#f0872a;color:#ffffff;text-decoration:none;padding:10px 22px;font-size:14px;font-weight:bold;">Ver respuesta en el CMS</a></p>`,
    confirmation: `<h2 style="margin:0 0 12px;color:#0d3f6a;font-size:20px;">¡Gracias por escribirnos!</h2>
<p style="margin:0 0 12px;">Hemos recibido tu información y nos pondremos en contacto contigo pronto.</p>
<p style="margin:0;">Tu número de solicitud es <strong>{{correlative}}</strong>.</p>`,
};

export function variablesFor(mode, fields) {
    const keys = fields
        .filter((field) => field.type !== "note")
        .map((field) => field.key)
        .filter(Boolean);

    return [...RESERVED, "answers", ...(mode === "notify" ? ["admin_url"] : []), ...keys];
}

function structureIssue(html) {
    const stripped = html.replace(/<!--[\s\S]*?-->/g, "");
    const stack = [];

    for (const match of stripped.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g)) {
        const tag = match[2].toLowerCase();

        if (VOID_TAGS.has(tag) || match[0].endsWith("/>")) continue;

        if (match[1] === "") {
            stack.push(tag);
            continue;
        }

        const open = stack.pop();

        if (open === undefined) return `Hay una etiqueta </${tag}> sin su apertura.`;
        if (open !== tag) return `La etiqueta <${open}> debe cerrarse con </${open}> antes de </${tag}>.`;
    }

    return stack.length ? `La etiqueta <${stack[stack.length - 1]}> no se cierra.` : null;
}

export function htmlIssues(html, mode, fields) {
    const issues = [];
    const structure = structureIssue(html);

    if (structure) issues.push(structure);

    const allowed = variablesFor(mode, fields);
    const unknown = [...new Set([...html.matchAll(VARIABLE)].map((match) => match[1]))].filter(
        (name) => !allowed.includes(name),
    );
    unknown.forEach((name) => issues.push(`La variable {{${name}}} no existe en este formulario.`));

    const attributeSafe = [...RESERVED, ...(mode === "notify" ? ["admin_url"] : [])];
    const inTags = new Set();

    for (const tag of html.matchAll(/<[^>]*\{\{[^>]*>/g)) {
        for (const match of tag[0].matchAll(VARIABLE)) {
            if (!attributeSafe.includes(match[1])) inTags.add(match[1]);
        }
    }

    inTags.forEach((name) =>
        issues.push(`La variable {{${name}}} no puede ir dentro de una etiqueta (por ejemplo en un enlace); úsala como texto.`),
    );

    if (html.length > 20000) issues.push("El contenido supera 20000 caracteres.");

    return issues;
}

const escapeHtml = (value) =>
    String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildPreviewDocument(html, mode, fields) {
    const samples = {
        form_title: "Solicitud de productos",
        submission_id: "128",
        date: "18/11/2026 10:30",
        correlative: "SOL-202611-00042",
        admin_url: "#",
    };

    const rows = fields
        .filter((field) => field.type !== "note")
        .map(
            (field) =>
                `<tr><td style="padding:10px 12px 10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;width:40%;vertical-align:top;">${escapeHtml(field.label || field.type)}</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:bold;color:#0d3f6a;vertical-align:top;">Respuesta de ejemplo</td></tr>`,
        )
        .join("");

    const answers = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">${rows}</table>`;

    const body = html.replace(VARIABLE, (_, name) => {
        if (name === "answers") return answers;
        if (name === "admin_url" && mode !== "notify") return "";
        if (name in samples) return escapeHtml(samples[name]);

        const field = fields.find((item) => item.key === name);
        return escapeHtml(field ? `[${field.label || name}]` : "");
    });

    return `<!DOCTYPE html><html lang="es"><body style="margin:0;padding:24px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;"><div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:28px;font-size:15px;line-height:1.6;">${body}</div></body></html>`;
}