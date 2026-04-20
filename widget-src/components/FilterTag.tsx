import { AutoLayout, Text } from '../widget';
import { COLORS } from '../constants/colors';

interface FilterTagProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterTag({ label, active, onClick }: FilterTagProps) {
  return (
    <AutoLayout
      padding={{ horizontal: 10, vertical: 5 }}
      cornerRadius={6}
      fill={active ? COLORS.filterActiveBg : COLORS.filterInactiveBg}
      stroke={active ? COLORS.filterActive : COLORS.border}
      strokeWidth={1}
      onClick={onClick}
      hoverStyle={{ opacity: 0.8 }}
    >
      <Text
        fontSize={12}
        fontWeight={500}
        fill={active ? COLORS.filterActive : COLORS.filterInactive}
        fontFamily="Inter"
      >
        {label}
      </Text>
    </AutoLayout>
  );
}
