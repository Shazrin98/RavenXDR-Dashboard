import { format } from 'date-fns';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatNumber(number) {
  return Number.isInteger(number)
    ? number.toLocaleString()
    : number.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
}

export function formatDate(date) {
  return format(date, 'yyyy-MM-dd');
}
