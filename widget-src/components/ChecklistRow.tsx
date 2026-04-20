import { AutoLayout, Text, SVG } from '../widget';
import { COLORS } from '../constants/colors';
import { ICON_CHECK_EMPTY, ICON_CHECK_FILLED } from '../constants/icons';
import { COL_CHECKBOX, COL_CHECKLIST } from '../constants/layout';

interface ChecklistRowProps {
  item: { id: string; text: string };
  isChild?: boolean;
  checked: boolean;
  onToggle: () => void;
}

export function ChecklistRow({ item, isChild, checked, onToggle }: ChecklistRowProps) {
  return (
    <AutoLayout
      width={isChild ? COL_CHECKBOX + COL_CHECKLIST - 28 : COL_CHECKBOX + COL_CHECKLIST}
      spacing={8}
      verticalAlignItems="center"
      padding={{ vertical: 0, horizontal: 0 }}
    >
      <AutoLayout
        width={isChild ? 28 : COL_CHECKBOX}
        height={20}
        horizontalAlignItems="center"
        verticalAlignItems="center"
        onClick={onToggle}
        hoverStyle={{ opacity: 0.7 }}
      >
        <SVG src={checked ? ICON_CHECK_FILLED : ICON_CHECK_EMPTY} width={16} height={16} />
      </AutoLayout>

      <Text
        fontSize={13}
        fill={checked ? COLORS.textSecondary : COLORS.textPrimary}
        fontFamily="Inter"
        width={isChild ? COL_CHECKLIST - 28 : COL_CHECKLIST - COL_CHECKBOX}
        textDecoration={checked ? 'strikethrough' : 'none'}
      >
        {item.text}
      </Text>
    </AutoLayout>
  );
}
