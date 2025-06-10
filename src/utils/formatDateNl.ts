export function formatDateNl(dateInput: string | number | Date): string {
  const date = new Date(dateInput);
  return date.toLocaleDateString("nl", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formatLongDateNl(dateInput: string | number | Date): string {
  const date = new Date(dateInput);
  return date.toLocaleDateString("nl", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}
