import { AutoLayout, Text, useSyncedState, useSyncedMap } from './widget';
import { COLORS, SERVICE_LABELS } from './constants/colors';
import { CHECKLIST_DATA, ALL_DOMAINS, ALL_SERVICES } from './constants/data';
import { TABLE_WIDTH, COL_CHECKBOX, COL_CHECKLIST, COL_DOMAIN, COL_SERVICE } from './constants/layout';
import { Domain, Service } from './types';
import { FilterTag } from './components/FilterTag';
import { FullRow } from './components/FullRow';

export function KeeperChecklist() {
  const [activeDomains, setActiveDomains] = useSyncedState<Domain[]>('activeDomains', []);
  const [activeServices, setActiveServices] = useSyncedState<Service[]>('activeServices', []);
  const checkedMap = useSyncedMap<boolean>('checked');
  const expandedMap = useSyncedMap<boolean>('expanded');

  const filteredItems = CHECKLIST_DATA.filter((item) => {
    const domainMatch = activeDomains.length === 0 || activeDomains.includes(item.domain);
    const serviceMatch =
      activeServices.length === 0 || item.services.some((s) => activeServices.includes(s));
    return domainMatch && serviceMatch;
  });

  function toggleDomain(domain: Domain) {
    if (activeDomains.includes(domain)) {
      setActiveDomains(activeDomains.filter((d) => d !== domain));
    } else {
      setActiveDomains([...activeDomains, domain]);
    }
  }

  function toggleService(service: Service) {
    if (activeServices.includes(service)) {
      setActiveServices(activeServices.filter((s) => s !== service));
    } else {
      setActiveServices([...activeServices, service]);
    }
  }

  function toggleCheck(id: string) {
    checkedMap.set(id, !checkedMap.get(id));
  }

  function toggleExpanded(id: string) {
    expandedMap.set(id, !expandedMap.get(id));
  }

  let totalCount = 0;
  let checkedCount = 0;
  for (const item of filteredItems) {
    totalCount++;
    if (checkedMap.get(item.id)) checkedCount++;
    if (item.children) {
      for (const child of item.children) {
        totalCount++;
        if (checkedMap.get(child.id)) checkedCount++;
      }
    }
  }
  const progressPercent = totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100);

  const progressBarWidth = TABLE_WIDTH - 40;
  const progressFillWidth = Math.max(2, (progressBarWidth * progressPercent) / 100);

  return (
    <AutoLayout
      direction="vertical"
      width={TABLE_WIDTH + 40}
      padding={20}
      cornerRadius={12}
      fill={COLORS.bg}
      stroke={COLORS.border}
      strokeWidth={1}
      effect={[
        {
          type: 'drop-shadow',
          color: { r: 0, g: 0, b: 0, a: 0.06 },
          offset: { x: 0, y: 2 },
          blur: 12,
        },
      ]}
    >
      {/* ── Title ── */}
      <AutoLayout direction="vertical" width="fill-parent" spacing={4} padding={{ bottom: 16 }}>
        <Text fontSize={20} fontWeight={700} fill={COLORS.textPrimary} fontFamily="Inter">
          PRODUCT CHECKLIST
        </Text>
        <Text fontSize={13} fill={COLORS.textSecondary} fontFamily="Inter">
          기획 시나리오 체크리스트
        </Text>
      </AutoLayout>

      {/* ── Progress ── */}
      <AutoLayout direction="vertical" width="fill-parent" spacing={6} padding={{ bottom: 16 }}>
        <AutoLayout width="fill-parent" verticalAlignItems="center" spacing={8}>
          <Text fontSize={12} fill={COLORS.textSecondary} fontFamily="Inter">
            진행률
          </Text>
          <Text fontSize={12} fontWeight={600} fill={COLORS.checkboxChecked} fontFamily="Inter">
            {checkedCount}/{totalCount} ({progressPercent}%)
          </Text>
        </AutoLayout>
        <AutoLayout width={progressBarWidth} height={6} cornerRadius={3} fill="#EBEBEA">
          <AutoLayout
            width={progressFillWidth}
            height={6}
            cornerRadius={3}
            fill={COLORS.checkboxChecked}
          />
        </AutoLayout>
      </AutoLayout>

      {/* ── Filters ── */}
      <AutoLayout direction="vertical" width="fill-parent" spacing={8} padding={{ bottom: 12 }}>
        <AutoLayout spacing={6} verticalAlignItems="center">
          <Text fontSize={12} fontWeight={600} fill={COLORS.textSecondary} fontFamily="Inter" width={60}>
            Domain
          </Text>
          {ALL_DOMAINS.map((d) => (
            <FilterTag
              key={d}
              label={d}
              active={activeDomains.includes(d)}
              onClick={() => toggleDomain(d)}
            />
          ))}
        </AutoLayout>
        <AutoLayout spacing={6} verticalAlignItems="center">
          <Text fontSize={12} fontWeight={600} fill={COLORS.textSecondary} fontFamily="Inter" width={60}>
            Service
          </Text>
          {ALL_SERVICES.map((s) => (
            <FilterTag
              key={s}
              label={SERVICE_LABELS[s]}
              active={activeServices.includes(s)}
              onClick={() => toggleService(s)}
            />
          ))}
        </AutoLayout>
      </AutoLayout>

      {/* ── Table Header ── */}
      <AutoLayout
        width="fill-parent"
        fill={COLORS.headerBg}
        cornerRadius={{ topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 }}
        padding={{ vertical: 8 }}
        stroke={COLORS.border}
        strokeWidth={1}
      >
        <AutoLayout width={COL_CHECKBOX} horizontalAlignItems="center">
          <Text fontSize={11} fontWeight={600} fill={COLORS.headerText} fontFamily="Inter">
            ✓
          </Text>
        </AutoLayout>
        <AutoLayout width={COL_CHECKLIST}>
          <Text fontSize={11} fontWeight={600} fill={COLORS.headerText} fontFamily="Inter">
            체크리스트
          </Text>
        </AutoLayout>
        <AutoLayout width={COL_DOMAIN} horizontalAlignItems="center">
          <Text fontSize={11} fontWeight={600} fill={COLORS.headerText} fontFamily="Inter">
            Domain
          </Text>
        </AutoLayout>
        <AutoLayout width={COL_SERVICE} horizontalAlignItems="center">
          <Text fontSize={11} fontWeight={600} fill={COLORS.headerText} fontFamily="Inter">
            Service
          </Text>
        </AutoLayout>
      </AutoLayout>

      {/* ── Table Body ── */}
      <AutoLayout
        direction="vertical"
        width="fill-parent"
        stroke={COLORS.border}
        strokeWidth={1}
        cornerRadius={{ topLeft: 0, topRight: 0, bottomLeft: 6, bottomRight: 6 }}
      >
        {filteredItems.length === 0 ? (
          <AutoLayout
            width="fill-parent"
            padding={40}
            horizontalAlignItems="center"
            verticalAlignItems="center"
          >
            <Text fontSize={14} fill={COLORS.textPlaceholder} fontFamily="Inter">
              선택한 필터에 해당하는 항목이 없습니다
            </Text>
          </AutoLayout>
        ) : (
          filteredItems.map((item) => (
            <FullRow
              key={item.id}
              item={item}
              isChecked={(id) => !!checkedMap.get(id)}
              isExpanded={(id) => !!expandedMap.get(id)}
              onToggleCheck={toggleCheck}
              onToggleExpanded={toggleExpanded}
            />
          ))
        )}
      </AutoLayout>

      {/* ── Footer ── */}
      <AutoLayout padding={{ top: 12 }} width="fill-parent">
        <Text fontSize={11} fill={COLORS.textPlaceholder} fontFamily="Inter">
          💡 필터를 선택하면 해당 Domain/Service에 해당하는 항목만 표시됩니다. 필터 미선택 시 전체 표시.
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}
