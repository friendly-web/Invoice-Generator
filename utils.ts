import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { addDays, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return format(date, 'yyyy-MM-dd');
}

export function calculateDueDate(issueDate: string, paymentTerms: string): string {
  const issueDateObj = new Date(issueDate);
  
  let daysToAdd = 0;
  switch (paymentTerms) {
    case 'receipt':
      daysToAdd = 0;
      break;
    case 'net7':
      daysToAdd = 7;
      break;
    case 'net15':
      daysToAdd = 15;
      break;
    case 'net30':
      daysToAdd = 30;
      break;
    case 'net45':
      daysToAdd = 45;
      break;
    case 'net60':
      daysToAdd = 60;
      break;
    default:
      daysToAdd = 0;
  }
  
  const dueDate = addDays(issueDateObj, daysToAdd);
  return formatDate(dueDate);
}

export function getFormattedCurrency(currency: string): string {
  switch (currency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'CAD':
      return 'CA$';
    case 'AUD':
      return 'A$';
    case 'JPY':
      return '¥';
    case 'CNY':
      return '¥';
    case 'INR':
      return '₹';
    default:
      return '$';
  }
}

export function generateInvoiceNumber(prefix = 'INV', num = 1): string {
  return `${prefix}-${String(num).padStart(3, '0')}`;
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
