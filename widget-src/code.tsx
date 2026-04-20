// Figma Checklist Widget - Keeperlist
// Figma Widget for planning review — ensures planners don't miss common scenarios

/// <reference path="../node_modules/@figma/plugin-typings/index.d.ts" />
/// <reference path="../node_modules/@figma/widget-typings/index.d.ts" />

const { widget } = figma;
const {
  AutoLayout,
  Text,
  SVG,
  useSyncedState,
  useSyncedMap,
  usePropertyMenu,
  register,
  Fragment,
} = widget;

// ─── Types ───────────────────────────────────────────────────────────

type Domain = 'Commerce' | 'Account' | 'Monitoring' | 'Employment';
type Service = 'Owner' | 'Installer' | 'Admin' | 'Partners';

interface ChecklistItem {
  id: string;
  text: string;
  domain: Domain;
  services: Service[];
  children?: Omit<ChecklistItem, 'domain' | 'services' | 'children'>[];
}

// ─── Colors (Notion-inspired) ────────────────────────────────────────

const COLORS = {
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

// ─── Domain & Service color maps ─────────────────────────────────────

const DOMAIN_COLORS: Record<Domain, { bg: string; text: string }> = {
  Commerce: { bg: COLORS.tagCommerce, text: COLORS.tagCommerceText },
  Account: { bg: COLORS.tagAccount, text: COLORS.tagAccountText },
  Monitoring: { bg: COLORS.tagMonitoring, text: COLORS.tagMonitoringText },
  Employment: { bg: COLORS.tagEmployment, text: COLORS.tagEmploymentText },
};

const SERVICE_COLORS: Record<Service, { bg: string; text: string }> = {
  Owner: { bg: COLORS.tagOwner, text: COLORS.tagOwnerText },
  Installer: { bg: COLORS.tagInstaller, text: COLORS.tagInstallerText },
  Admin: { bg: COLORS.tagAdmin, text: COLORS.tagAdminText },
  Partners: { bg: COLORS.tagPartners, text: COLORS.tagPartnersText },
};

const SERVICE_LABELS: Record<Service, string> = {
  Owner: '자영업자 앱',
  Installer: '설치기사 앱',
  Admin: '어드민 웹',
  Partners: '파트너스',
};

// ─── SVG Icons ───────────────────────────────────────────────────────

const ICON_CHECK_EMPTY = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="14" height="14" rx="3" stroke="${COLORS.checkboxUnchecked}" stroke-width="1.5" fill="none"/>
</svg>`;

const ICON_CHECK_FILLED = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="15" height="15" rx="3" fill="${COLORS.checkboxChecked}"/>
  <path d="M4.5 8L7 10.5L11.5 5.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const ICON_CHEVRON_RIGHT = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.5 2.5L8 6L4.5 9.5" stroke="${COLORS.chevron}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const ICON_CHEVRON_DOWN = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="${COLORS.chevron}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// ─── Checklist Data ──────────────────────────────────────────────────

const CHECKLIST_DATA: ChecklistItem[] = [
  // ── 주문 생성 흐름 ──
  {
    id: 'ord-create-basic',
    text: '[기본 CCTV 주문] 정상 주문 생성 흐름',
    domain: 'Commerce',
    services: ['Owner'],
    children: [
      { id: 'ord-create-basic-1', text: '상품 선택 → 주문서 → 결제 → 주문 완료 기본 흐름' },
      { id: 'ord-create-basic-2', text: '주문서(Checkout) 화면 구성 확인 (상품정보, 설치주소, 결제수단)' },
      { id: 'ord-create-basic-3', text: '결제 수단별 처리 (카드/계좌이체 등)' },
      { id: 'ord-create-basic-4', text: '주문 완료 후 이메일 발송 확인' },
    ],
  },
  {
    id: 'ord-create-manual',
    text: '[주문수기등록] 관리자 수동 주문 생성 흐름',
    domain: 'Commerce',
    services: ['Admin'],
    children: [
      { id: 'ord-create-manual-1', text: '외부 결제건 등록 시 필수 입력 항목 확인' },
      { id: 'ord-create-manual-2', text: '등록 후 주문 상태 처리 (결제 완료로 바로 전환?)' },
      { id: 'ord-create-manual-3', text: '매장/사용자 연결 처리' },
    ],
  },
  {
    id: 'ord-create-link',
    text: '[비회원 주문 = 링크결제] 비회원 대상 주문 생성 흐름',
    domain: 'Commerce',
    services: ['Admin', 'Owner'],
    children: [
      { id: 'ord-create-link-1', text: '관리자가 링크 생성 → 비회원에게 전달하는 흐름' },
      { id: 'ord-create-link-2', text: '비회원 결제 페이지(Checkout) 화면 구성' },
      { id: 'ord-create-link-3', text: '결제 완료 후 회원가입 연동 여부' },
      { id: 'ord-create-link-4', text: '링크 만료/재발급 정책' },
    ],
  },
  {
    id: 'ord-create-onsite',
    text: '[현장추가결제] 설치기사 현장 추가 주문 흐름',
    domain: 'Commerce',
    services: ['Installer', 'Owner'],
    children: [
      { id: 'ord-create-onsite-1', text: '원(Origin) 주문과의 연결 관계 처리' },
      { id: 'ord-create-onsite-2', text: '설치기사 앱에서 주문 생성 → 자영업자 앱 결제 연동' },
      { id: 'ord-create-onsite-3', text: '현장추가 주문서 화면 구성' },
      { id: 'ord-create-onsite-4', text: '원 주문 취소 시 현장추가 주문 처리 정책' },
    ],
  },
  {
    id: 'ord-create-addcost',
    text: '[추가비용 청구] 설치이전비/추가장비 비용 청구 흐름',
    domain: 'Commerce',
    services: ['Admin', 'Owner'],
    children: [
      { id: 'ord-create-addcost-1', text: '관리자가 추가비용 생성하는 흐름' },
      { id: 'ord-create-addcost-2', text: '자영업자 앱에서 청구 확인 및 결제 흐름' },
      { id: 'ord-create-addcost-3', text: 'CCTV 주문 외 비용(설치이전비 등) 구분 표시' },
    ],
  },

  // ── 주문 취소 ──
  {
    id: 'ord-cancel-owner',
    text: '[자영업자 앱] 주문 취소 흐름',
    domain: 'Commerce',
    services: ['Owner'],
    children: [
      { id: 'ord-cancel-owner-1', text: '취소 가능 상태 조건 확인' },
      { id: 'ord-cancel-owner-2', text: '취소 사유 입력 여부' },
      { id: 'ord-cancel-owner-3', text: '환불 처리 흐름 (결제수단별)' },
      { id: 'ord-cancel-owner-4', text: '취소 완료 이메일 발송 확인' },
      { id: 'ord-cancel-owner-5', text: '부분 취소 가능 여부' },
    ],
  },
  {
    id: 'ord-cancel-admin',
    text: '[어드민 웹] 주문 취소 흐름',
    domain: 'Commerce',
    services: ['Admin'],
    children: [
      { id: 'ord-cancel-admin-1', text: '관리자 취소 시 환불 처리 정책' },
      { id: 'ord-cancel-admin-2', text: '수기등록 주문 취소 처리' },
      { id: 'ord-cancel-admin-3', text: '현장추가결제 주문 취소 처리' },
      { id: 'ord-cancel-admin-4', text: '취소 후 주문 목록 노출 여부 및 상태 표시' },
    ],
  },

  // ── 주문 정보 노출 화면 ──
  {
    id: 'ord-display-owner-list',
    text: '자영업자 앱 주문 목록/상세 화면',
    domain: 'Commerce',
    services: ['Owner'],
    children: [
      { id: 'ord-display-owner-list-1', text: '주문 목록 정렬/필터 기준' },
      { id: 'ord-display-owner-list-2', text: '주문 상태별 목록 노출 여부' },
      { id: 'ord-display-owner-list-3', text: '상세 화면 구성 항목 (상품, 결제, 설치 정보)' },
      { id: 'ord-display-owner-list-4', text: '현장추가 주문의 원 주문과의 관계 표시' },
    ],
  },
  {
    id: 'ord-display-email',
    text: '주문/취소 완료 이메일 템플릿',
    domain: 'Commerce',
    services: ['Owner'],
    children: [
      { id: 'ord-display-email-1', text: '주문완료 이메일 포함 정보 확인' },
      { id: 'ord-display-email-2', text: '취소완료 이메일 포함 정보 확인' },
      { id: 'ord-display-email-3', text: '링크결제 완료 시 이메일 발송 여부' },
    ],
  },
  {
    id: 'ord-display-admin',
    text: '어드민 웹 주문관리 화면',
    domain: 'Commerce',
    services: ['Admin'],
    children: [
      { id: 'ord-display-admin-1', text: '주문 목록 검색/필터/정렬 조건' },
      { id: 'ord-display-admin-2', text: '주문 유형별(기본/수기/링크/현장추가/추가비용) 구분 표시' },
      { id: 'ord-display-admin-3', text: '주문 상세 조회 화면 구성' },
      { id: 'ord-display-admin-4', text: '관리자 수행 가능 액션 (상태변경, 취소, 메모 등)' },
    ],
  },

  // ── 제약사항 (Constraints) ──
  {
    id: 'constraint-payment-min',
    text: '신용카드 최소 결제 금액 제약 (100원 이상)',
    domain: 'Commerce',
    services: ['Owner', 'Admin'],
  },
  {
    id: 'constraint-order-min',
    text: '주문 금액 최소 제약 (0원 초과)',
    domain: 'Commerce',
    services: ['Owner', 'Admin', 'Installer'],
  },
  {
    id: 'constraint-status-action',
    text: '주문 상태별 사용자/관리자 수행 가능 액션 정의',
    domain: 'Commerce',
    services: ['Owner', 'Admin'],
    children: [
      { id: 'constraint-status-action-1', text: '각 주문 상태별 자영업자에게 노출되는 버튼/액션' },
      { id: 'constraint-status-action-2', text: '각 주문 상태별 관리자에게 노출되는 버튼/액션' },
      { id: 'constraint-status-action-3', text: '상태 전이(Transition) 규칙 정의' },
    ],
  },
  {
    id: 'constraint-status-visibility',
    text: '주문 상태별 목록 노출 여부 정의',
    domain: 'Commerce',
    services: ['Owner', 'Admin'],
    children: [
      { id: 'constraint-status-visibility-1', text: '자영업자 앱에서 보이지 않아야 하는 상태' },
      { id: 'constraint-status-visibility-2', text: '어드민에서 필터링 가능한 상태 목록' },
    ],
  },

  // ── 예외 케이스 ──
  {
    id: 'edge-user-withdraw',
    text: '주문자 회원 탈퇴 시 주문 처리',
    domain: 'Account',
    services: ['Owner', 'Admin'],
    children: [
      { id: 'edge-user-withdraw-1', text: '진행 중 주문이 있는 상태에서 탈퇴 시도 시 처리' },
      { id: 'edge-user-withdraw-2', text: '탈퇴 완료 후 주문 데이터 노출 정책 (어드민)' },
      { id: 'edge-user-withdraw-3', text: '탈퇴 회원의 주문 목록 표시 (익명화 등)' },
    ],
  },
  {
    id: 'edge-store-delete',
    text: '주문 후 매장 삭제 시 처리',
    domain: 'Commerce',
    services: ['Owner', 'Admin'],
    children: [
      { id: 'edge-store-delete-1', text: '매장 삭제 시 설치 주소/정보 유지 여부' },
      { id: 'edge-store-delete-2', text: '매장 삭제 후 주문 상세 화면 표시' },
    ],
  },
  {
    id: 'edge-error-priority',
    text: '에러 UI 우선순위 (토스트/모달) 정의',
    domain: 'Commerce',
    services: ['Owner', 'Installer', 'Admin'],
    children: [
      { id: 'edge-error-priority-1', text: '네트워크 에러 vs 비즈니스 에러 구분' },
      { id: 'edge-error-priority-2', text: '결제 실패 시 에러 메시지 및 UI 타입' },
      { id: 'edge-error-priority-3', text: '동시 에러 발생 시 우선순위' },
    ],
  },
  {
    id: 'edge-concurrent-action',
    text: '동시 작업 충돌 케이스',
    domain: 'Commerce',
    services: ['Owner', 'Admin'],
    children: [
      { id: 'edge-concurrent-action-1', text: '자영업자 취소 중 관리자 상태 변경 시' },
      { id: 'edge-concurrent-action-2', text: '동일 주문 동시 결제 시도 방지' },
    ],
  },
  {
    id: 'edge-payment-fail',
    text: '결제 실패/타임아웃 처리',
    domain: 'Commerce',
    services: ['Owner'],
    children: [
      { id: 'edge-payment-fail-1', text: '결제 도중 앱 종료/네트워크 끊김 시 주문 상태' },
      { id: 'edge-payment-fail-2', text: 'PG사 타임아웃 시 재시도 정책' },
      { id: 'edge-payment-fail-3', text: '결제 승인 후 서버 응답 실패 시 복구 흐름' },
    ],
  },

  // ── 설치 관련 ──
  {
    id: 'install-schedule',
    text: '설치 일정 관리',
    domain: 'Commerce',
    services: ['Installer', 'Admin'],
    children: [
      { id: 'install-schedule-1', text: '설치 일정 배정/변경 흐름' },
      { id: 'install-schedule-2', text: '설치기사에게 주문 정보 전달 내용' },
    ],
  },
  {
    id: 'install-complete',
    text: '설치 완료 처리',
    domain: 'Commerce',
    services: ['Installer', 'Admin', 'Owner'],
    children: [
      { id: 'install-complete-1', text: '설치 완료 후 주문 상태 변경' },
      { id: 'install-complete-2', text: '설치 완료 확인 알림 (자영업자)' },
    ],
  },

  // ── 모니터링 연동 ──
  {
    id: 'monitoring-activate',
    text: 'CCTV 주문 완료 후 모니터링 서비스 연동',
    domain: 'Monitoring',
    services: ['Owner', 'Admin'],
    children: [
      { id: 'monitoring-activate-1', text: '구독(Subscription) 활성화 트리거 시점' },
      { id: 'monitoring-activate-2', text: '주문 취소 시 구독 비활성화 처리' },
    ],
  },

  // ── 공통 UX ──
  {
    id: 'ux-loading',
    text: '로딩/스켈레톤 UI',
    domain: 'Commerce',
    services: ['Owner', 'Installer', 'Admin'],
  },
  {
    id: 'ux-empty',
    text: '주문 없음(Empty State) 화면',
    domain: 'Commerce',
    services: ['Owner', 'Admin'],
  },
  {
    id: 'ux-pagination',
    text: '목록 페이지네이션/무한스크롤',
    domain: 'Commerce',
    services: ['Owner', 'Admin'],
  },
  {
    id: 'ux-deeplink',
    text: '알림 → 주문 상세 딥링크 연동',
    domain: 'Commerce',
    services: ['Owner', 'Installer'],
  },
];

const ALL_DOMAINS: Domain[] = ['Commerce', 'Account', 'Monitoring', 'Employment'];
const ALL_SERVICES: Service[] = ['Owner', 'Installer', 'Admin', 'Partners'];

// ─── Column widths ───────────────────────────────────────────────────

const COL_CHECKBOX = 40;
const COL_CHECKLIST = 460;
const COL_DOMAIN = 130;
const COL_SERVICE = 220;
const TABLE_WIDTH = COL_CHECKBOX + COL_CHECKLIST + COL_DOMAIN + COL_SERVICE;

// ─── Widget ──────────────────────────────────────────────────────────

function KeeperChecklist() {
  // State: filters
  const [activeDomains, setActiveDomains] = useSyncedState<Domain[]>('activeDomains', []);
  const [activeServices, setActiveServices] = useSyncedState<Service[]>('activeServices', []);

  // State: checkbox + expanded (using SyncedMap for multiplayer safety)
  const checkedMap = useSyncedMap<boolean>('checked');
  const expandedMap = useSyncedMap<boolean>('expanded');

  // ─── Filter logic ──────────────────────────────────────────────────

  const filteredItems = CHECKLIST_DATA.filter((item) => {
    const domainMatch = activeDomains.length === 0 || activeDomains.includes(item.domain);
    const serviceMatch =
      activeServices.length === 0 || item.services.some((s) => activeServices.includes(s));
    return domainMatch && serviceMatch;
  });

  // ─── Helpers ───────────────────────────────────────────────────────

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

  // ─── Progress ──────────────────────────────────────────────────────

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

  // ─── Render: Filter Tag ────────────────────────────────────────────

  function FilterTag({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) {
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

  // ─── Render: Domain Tag ────────────────────────────────────────────

  function DomainTag({ domain }: { domain: Domain }) {
    const colors = DOMAIN_COLORS[domain];
    return (
      <AutoLayout padding={{ horizontal: 8, vertical: 3 }} cornerRadius={4} fill={colors.bg}>
        <Text fontSize={11} fontWeight={500} fill={colors.text} fontFamily="Inter">
          {domain}
        </Text>
      </AutoLayout>
    );
  }

  // ─── Render: Service Tag ───────────────────────────────────────────

  function ServiceTag({ service }: { service: Service }) {
    const colors = SERVICE_COLORS[service];
    return (
      <AutoLayout padding={{ horizontal: 8, vertical: 3 }} cornerRadius={4} fill={colors.bg}>
        <Text fontSize={11} fontWeight={500} fill={colors.text} fontFamily="Inter">
          {SERVICE_LABELS[service]}
        </Text>
      </AutoLayout>
    );
  }

  // ─── Render: Checklist Row ─────────────────────────────────────────

  function ChecklistRow({
    item,
    isChild,
  }: {
    item: { id: string; text: string };
    isChild?: boolean;
    domain?: Domain;
    services?: Service[];
    hasChildren?: boolean;
    expanded?: boolean;
  }) {
    const checked = !!checkedMap.get(item.id);
    return (
      <AutoLayout
        width={isChild ? COL_CHECKBOX + COL_CHECKLIST - 28 : COL_CHECKBOX + COL_CHECKLIST}
        spacing={8}
        verticalAlignItems="center"
        padding={{ vertical: 0, horizontal: 0 }}
      >
        {/* Checkbox */}
        <AutoLayout
          width={isChild ? 28 : COL_CHECKBOX}
          height={20}
          horizontalAlignItems="center"
          verticalAlignItems="center"
          onClick={() => toggleCheck(item.id)}
          hoverStyle={{ opacity: 0.7 }}
        >
          <SVG src={checked ? ICON_CHECK_FILLED : ICON_CHECK_EMPTY} width={16} height={16} />
        </AutoLayout>

        {/* Text */}
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

  // ─── Render: Full Row (parent) ─────────────────────────────────────

  function FullRow({ item }: { item: ChecklistItem }) {
    const hasChildren = !!(item.children && item.children.length > 0);
    const expanded = !!expandedMap.get(item.id);
    const checked = !!checkedMap.get(item.id);

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
              onClick={() => toggleCheck(item.id)}
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
                onClick={() => toggleExpanded(item.id)}
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
              onClick={hasChildren ? () => toggleExpanded(item.id) : undefined}
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
                <ChecklistRow item={child} isChild={true} />
              </AutoLayout>
            ))}
          </AutoLayout>
        )}
      </AutoLayout>
    );
  }

  // ─── Render: Progress bar ──────────────────────────────────────────

  const progressBarWidth = TABLE_WIDTH - 40;
  const progressFillWidth = Math.max(2, (progressBarWidth * progressPercent) / 100);

  // ─── Main render ───────────────────────────────────────────────────

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
      <AutoLayout
        direction="vertical"
        width="fill-parent"
        spacing={4}
        padding={{ bottom: 16 }}
      >
        <Text fontSize={20} fontWeight={700} fill={COLORS.textPrimary} fontFamily="Inter">
          PRODUCT CHECKLIST
        </Text>
        <Text fontSize={13} fill={COLORS.textSecondary} fontFamily="Inter">
          기획 시나리오 체크리스트
        </Text>
      </AutoLayout>

      {/* ── Progress ── */}
      <AutoLayout
        direction="vertical"
        width="fill-parent"
        spacing={6}
        padding={{ bottom: 16 }}
      >
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
      <AutoLayout
        direction="vertical"
        width="fill-parent"
        spacing={8}
        padding={{ bottom: 12 }}
      >
        {/* Domain filters */}
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

        {/* Service filters */}
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
          filteredItems.map((item) => <FullRow key={item.id} item={item} />)
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

register(KeeperChecklist);
