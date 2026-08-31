export const ROLE_FILTER_OPTIONS = [
    { value: "coordinator", label: "Coordenadores" },
    { value: "professor", label: "Professores" },
    { value: "student", label: "Alunos" },
    { value: "alumni", label: "Ex-Alunos" },
    { value: "collaborator", label: "Colaboradores" },
];

export const ROLE_OPTIONS = [
    { value: "coordinator", label: "Coordenador(a)" },
    { value: "professor", label: "Professor(a)" },
    { value: "student", label: "Aluno(a)" },
    { value: "alumni", label: "Ex-Aluno(a)" },
    { value: "collaborator", label: "Colaborador(a)" },
];

export const OCCUPATION_OPTIONS = [
    { value: "researcher", label: "Pesquisador(a)" },
    { value: "frontend_developer", label: "Desenvolvedor(a) Front-end" },
    { value: "backend_developer", label: "Desenvolvedor(a) Back-end" },
    { value: "fullstack_developer", label: "Desenvolvedor(a) Full-stack" },
    { value: "software_engineer", label: "Engenheiro(a) de Software" },
    { value: "designer", label: "Designer / UX-UI" },
];

export const roleLabel = Object.fromEntries(ROLE_OPTIONS.map((o) => [o.value, o.label]));
export const occupationLabel = Object.fromEntries(OCCUPATION_OPTIONS.map((o) => [o.value, o.label]));
