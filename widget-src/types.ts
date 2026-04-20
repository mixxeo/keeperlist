export type Domain = 'Commerce' | 'Account' | 'Monitoring' | 'Employment';
export type Service = 'Owner' | 'Installer' | 'Admin' | 'Partners';

export interface ChecklistItem {
  id: string;
  text: string;
  domain: Domain;
  services: Service[];
  children?: Omit<ChecklistItem, 'domain' | 'services' | 'children'>[];
}
