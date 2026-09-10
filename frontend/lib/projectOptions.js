export const PROJECT_STATUS_FILTER_OPTIONS = [
    { value: "inProcess", label: "Em Andamento" },
    { value: "completed", label: "Concluídos" },
];

export const PROJECT_STATUS_OPTIONS = [
    { value: "inProcess", label: "Em Andamento" },
    { value: "completed", label: "Concluído" },
];

export const projectStatusLabel = Object.fromEntries(PROJECT_STATUS_OPTIONS.map((o) => [o.value, o.label]));