export function formatDate(date) {
    const d = new Date(date);
    const utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

    const formatted = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(utcDate);

    return formatted
        .replace(/ de /g, " ")
        .replace(/^(\d{2}) (\w)/, (_, day, firstLetter) => `${day} ${firstLetter.toUpperCase()}`);
}