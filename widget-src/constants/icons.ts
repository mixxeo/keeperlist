import { COLORS } from './colors';

export const ICON_CHECK_EMPTY = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="14" height="14" rx="3" stroke="${COLORS.checkboxUnchecked}" stroke-width="1.5" fill="none"/>
</svg>`;

export const ICON_CHECK_FILLED = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="15" height="15" rx="3" fill="${COLORS.checkboxChecked}"/>
  <path d="M4.5 8L7 10.5L11.5 5.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const ICON_CHEVRON_RIGHT = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.5 2.5L8 6L4.5 9.5" stroke="${COLORS.chevron}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const ICON_CHEVRON_DOWN = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="${COLORS.chevron}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
