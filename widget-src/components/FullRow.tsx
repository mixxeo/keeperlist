import { AutoLayout, Text, SVG } from '../widget';
import { COLORS } from '../constants/colors';
import { ICON_CHECK_EMPTY, ICON_CHECK_FILLED, ICON_CHEVRON_RIGHT, ICON_CHEVRON_DOWN } from '../constants/icons';
import { COL_CHECKBOX, COL_CHECKLIST, COL_DOMAIN, COL_SERVICE } from '../constants/layout';
import { ChecklistItem } from '../types';
import { DomainTag } from './DomainTag';
import { ServiceTag } from './ServiceTag';
import { ChecklistRow } from './ChecklistRow';

interface FullRowProps {
  item: ChecklistItem;
  isChecked: (id: string) => boolean;
  isExpanded: (id: string) => boolean;
  onToggleCheck: (id: string) => void;
  onToggleExpanded: (id: string) => void;
}

export function FullRow({ item, isChecked, isExpanded, onToggleCheck, onToggleExpanded }: FullRowProps) {
  const hasChildren = !!(item.children && item.children.length > 0);
  const expanded = isExpanded(item.id);
  const checked = isChecked(item.id);

  return (
    <AutoLayout direction="vertical" width="fill-parent">
      {/* Main row */}
      <AutoLayout
        width="fill-parent"
        verticalAlignItems="center"
        padding={{ vertical: 8, horizontal: 0 }}
        stroke={COLORS.borderLight}
        strokeWidth={1}
        strokeAlign="outside"
      >
        {/* Checkbox + Expand + Text */}
        <AutoLayout
          width={COL_CHECKBOX + COL_CHECKLIST}
          spacing={4}
          verticalAlignItems="center"
        >
          {/* Checkbox */}
          <AutoLayout
            width={COL_CHECKBOX}
            height={20}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            onClick={() => onToggleCheck(item.id)}
            hoverStyle={{ opacity: 0.7 }}
          >
            <SVG
              src={checked ? ICON_CHECK_FILLED : ICON_CHECK_EMPTY}
              width={16}
              height={16}
            />
          </AutoLayout>

          {/* Expand chevron (if has children) */}
          {hasChildren ? (
            <AutoLayout
              width={16}
              height={20}
              horizontalAlignItems="center"
              verticalAlignItems="center"
              onClick={() => onToggleExpanded(item.id)}
              hoverStyle={{ opacity: 0.7 }}
            >
              <SVG
                src={expanded ? ICON_CHEVRON_DOWN : ICON_CHEVRON_RIGHT}
                width={12}
                height={12}
              />
            </AutoLayout>
          ) : (
            <AutoLayout width={16} height={20} />
          )}

          {/* Text */}
          <Text
            fontSize={13}
            fill={checked ? COLORS.textSecondary : COLORS.textPrimary}
            fontFamily="Inter"
            width={COL_CHECKLIST - COL_CHECKBOX - 16}
            textDecoration={checked ? 'strikethrough' : 'none'}
            onClick={hasChildren ? () => onToggleExpanded(item.id) : undefined}
            hoverStyle={hasChildren ? { opacity: 0.7 } : undefined}
          >
            {item.text}
          </Text>
        </AutoLayout>

        {/* Domain */}
        <AutoLayout
          width={COL_DOMAIN}
          horizontalAlignItems="center"
          verticalAlignItems="center"
        >
          <DomainTag domain={item.domain} />
        </AutoLayout>

        {/* Services */}
        <AutoLayout
          width={COL_SERVICE}
          spacing={4}
          verticalAlignItems="center"
          padding={{ horizontal: 8 }}
        >
          {item.services.map((s) => (
            <ServiceTag key={s} service={s} />
          ))}
        </AutoLayout>
      </AutoLayout>

      {/* Children rows (expanded) */}
      {hasChildren && expanded && (
        <AutoLayout direction="vertical" width="fill-parent" fill="#FAFAF8">
          {item.children!.map((child) => (
            <AutoLayout
              key={child.id}
              width="fill-parent"
              verticalAlignItems="center"
              padding={{ vertical: 8, horizontal: 0, left: 28 }}
              stroke={COLORS.borderLight}
              strokeWidth={1}
              strokeAlign="outside"
            >
              <ChecklistRow
                item={child}
                isChild={true}
                checked={isChecked(child.id)}
                onToggle={() => onToggleCheck(child.id)}
              />
            </AutoLayout>
          ))}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}
