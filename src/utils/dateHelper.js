// Helper Functions

export function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // Sunday - Saturday : 0 - 6
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  return new Date(d.setDate(diff));
}

export function getEndOfWeek(date) {
  const startOfWeek = getStartOfWeek(date);
  return new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6, 23, 59, 59, 999);
}

export function getStartOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getEndOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function parseEventDate(event) {
  return event.date ? new Date(event.date) : null;
}
