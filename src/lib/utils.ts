import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatter for Nigerian Naira
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Convert USD to NGN (approximate rate: 1 USD = 800 NGN)
export function convertUSDToNGN(usdAmount: string): number {
  const amount = parseFloat(usdAmount.replace('$', ''))
  return Math.round(amount * 800) // Converting at 800 NGN per USD
}
