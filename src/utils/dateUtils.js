//frontend/src/utils/dateUtils.js

export function formatDate(dateStr, short = false) {
  const options = short
    ? { timeZone: 'Europe/Warsaw', day: '2-digit', month: '2-digit', year: 'numeric' }
    : { timeZone: 'Europe/Warsaw', dateStyle: 'medium', timeStyle: 'short' };

  return new Date(dateStr).toLocaleString('pl-PL', options);
}
