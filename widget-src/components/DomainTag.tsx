import { AutoLayout, Text } from '../widget';
import { DOMAIN_COLORS } from '../constants/colors';
import { Domain } from '../types';

export function DomainTag({ domain }: { domain: Domain }) {
  const colors = DOMAIN_COLORS[domain];
  return (
    <AutoLayout padding={{ horizontal: 8, vertical: 3 }} cornerRadius={4} fill={colors.bg}>
      <Text fontSize={11} fontWeight={500} fill={colors.text} fontFamily="Inter">
        {domain}
      </Text>
    </AutoLayout>
  );
}
