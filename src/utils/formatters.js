import { format, parseISO, startOfMonth, endOfMonth, subMonths, isWithinInterval } from 'date-fns';

// Format currency in INR
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format number with commas (Indian system)
export function formatNumber(num) {
  return new Intl.NumberFormat('en-IN').format(num);
}

// Format date
export function formatDate(dateStr) {
  return format(parseISO(dateStr), 'dd MMM yyyy');
}

// Short date
export function formatDateShort(dateStr) {
  return format(parseISO(dateStr), 'dd MMM');
}

// Month-Year
export function formatMonthYear(dateStr) {
  return format(parseISO(dateStr), 'MMM yyyy');
}

// Format percentage
export function formatPercent(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

// Get month name
export function getMonthName(dateStr) {
  return format(parseISO(dateStr), 'MMM');
}
