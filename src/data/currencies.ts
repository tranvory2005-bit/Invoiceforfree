import { Currency } from '../types';

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar (USD)', placement: 'before' },
  { code: 'EUR', symbol: '€', name: 'Euro (EUR)', placement: 'before' },
  { code: 'GBP', symbol: '£', name: 'British Pound (GBP)', placement: 'before' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CAD)', placement: 'before' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar (AUD)', placement: 'before' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen (JPY)', placement: 'before' },
  { code: 'CHF', symbol: 'CHF ', name: 'Swiss Franc (CHF)', placement: 'before' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan (CNY)', placement: 'before' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (INR)', placement: 'before' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real (BRL)', placement: 'before' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso (MXN)', placement: 'before' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar (SGD)', placement: 'before' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar (NZD)', placement: 'before' },
  { code: 'SEK', symbol: 'kr ', name: 'Swedish Krona (SEK)', placement: 'after' },
  { code: 'NOK', symbol: 'kr ', name: 'Norwegian Krone (NOK)', placement: 'after' },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham (AED)', placement: 'before' },
];

export const DEFAULT_CURRENCY = CURRENCIES[0];
