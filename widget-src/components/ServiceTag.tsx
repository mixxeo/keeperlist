import { AutoLayout, Text } from '../widget';
import { SERVICE_COLORS, SERVICE_LABELS } from '../constants/colors';
import { Service } from '../types';

export function ServiceTag({ service }: { service: Service }) {
  const colors = SERVICE_COLORS[service];
  return (
    <AutoLayout padding={{ horizontal: 8, vertical: 3 }} cornerRadius={4} fill={colors.bg}>
      <Text fontSize={11} fontWeight={500} fill={colors.text} fontFamily="Inter">
        {SERVICE_LABELS[service]}
      </Text>
    </AutoLayout>
  );
}
