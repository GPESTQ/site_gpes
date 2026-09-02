export const PAPER_TYPE_FILTER_OPTIONS = [
    { value: "article", label: "Artigos Científicos" },
    { value: "proceedings", label: "Anais de Evento" },
];

export const PAPER_TYPE_OPTIONS = [
    { value: "article", label: "Artigo Científico" },
    { value: "proceedings", label: "Anais de Evento" },
];

export const paperTypeLabel = Object.fromEntries(PAPER_TYPE_OPTIONS.map((o) => [o.value, o.label]));