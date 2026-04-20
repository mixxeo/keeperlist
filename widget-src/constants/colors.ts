import { Domain, Service } from '../types';

export const COLORS = {
  // Base
  bg: '#FFFFFF',
  bgHover: '#F7F6F3',
  border: '#E9E9E7',
  borderLight: '#F0EFED',

  // Text
  textPrimary: '#37352F',
  textSecondary: '#787774',
  textPlaceholder: '#C3C2BF',

  // Tags
  tagCommerce: '#E8DEEE',
  tagCommerceText: '#6940A5',
  tagAccount: '#D3E5EF',
  tagAccountText: '#2E6B8A',
  tagMonitoring: '#DBEDDB',
  tagMonitoringText: '#2B7B2B',
  tagEmployment: '#FDECC8',
  tagEmploymentText: '#9F6B16',

  tagOwner: '#FFE2DD',
  tagOwnerText: '#93342A',
  tagInstaller: '#E8DEEE',
  tagInstallerText: '#6940A5',
  tagAdmin: '#D3E5EF',
  tagAdminText: '#2E6B8A',
  tagPartners: '#DBEDDB',
  tagPartnersText: '#2B7B2B',

  // Accent
  checkboxChecked: '#2383E2',
  checkboxUnchecked: '#D4D4D4',
  filterActive: '#2383E2',
  filterActiveBg: '#EBF3FE',
  filterInactive: '#787774',
  filterInactiveBg: '#F7F6F3',

  // Header
  headerBg: '#F7F6F3',
  headerText: '#787774',

  // Chevron
  chevron: '#B4B4B0',

  // Title
  titleBg: '#FFFFFF',
};

export const DOMAIN_COLORS: Record<Domain, { bg: string; text: string }> = {
  Commerce: { bg: COLORS.tagCommerce, text: COLORS.tagCommerceText },
  Account: { bg: COLORS.tagAccount, text: COLORS.tagAccountText },
  Monitoring: { bg: COLORS.tagMonitoring, text: COLORS.tagMonitoringText },
  Employment: { bg: COLORS.tagEmployment, text: COLORS.tagEmploymentText },
};

export const SERVICE_COLORS: Record<Service, { bg: string; text: string }> = {
  Owner: { bg: COLORS.tagOwner, text: COLORS.tagOwnerText },
  Installer: { bg: COLORS.tagInstaller, text: COLORS.tagInstallerText },
  Admin: { bg: COLORS.tagAdmin, text: COLORS.tagAdminText },
  Partners: { bg: COLORS.tagPartners, text: COLORS.tagPartnersText },
};

export const SERVICE_LABELS: Record<Service, string> = {
  Owner: '자영업자 앱',
  Installer: '설치기사 앱',
  Admin: '어드민 웹',
  Partners: '파트너스',
};
