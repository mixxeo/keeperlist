import { Domain, Service, ChecklistItem } from "../types";

export const CHECKLIST_DATA: ChecklistItem[] = [
  // ── 주문 생성 흐름 ──
  {
    id: "ord-create-basic",
    text: "[회원 CCTV 주문] 주문 생성 흐름",
    domain: "Commerce",
    services: ["Owner"],
    children: [
      {
        id: "ord-create-basic-1",
        text: "상품 선택 → 주문서 → 결제 → 주문 완료 기본 흐름",
      },
      {
        id: "ord-create-basic-2",
        text: "주문서(Checkout) 화면 구성 확인 (상품정보, 설치주소, 결제수단)",
      },
      { id: "ord-create-basic-3", text: "결제 수단별 처리 (카드/간편결제)" },
      { id: "ord-create-basic-4", text: "주문 완료 후 이메일 발송 확인" },
    ],
  },
  {
    id: "ord-create-manual",
    text: "[수기 주문 등록] 관리자 수동 주문 생성 흐름",
    domain: "Commerce",
    services: ["Admin"],
    children: [
      {
        id: "ord-create-manual-1",
        text: "외부 결제건 등록 시 필수 입력 항목 확인",
      },
      {
        id: "ord-create-manual-2",
        text: "등록 후 주문 상태 처리 (주문관리로 바로 등록)",
      },
      {
        id: "ord-create-manual-3",
        text: "이메일 발송, 알림 발송, 혜택 제공 여부 확인",
      },
    ],
  },
  {
    id: "ord-create-link",
    text: "[비회원 주문 = 링크결제] 비회원 대상 주문 생성 흐름",
    domain: "Commerce",
    services: ["Admin", "Owner"],
    children: [
      {
        id: "ord-create-link-1",
        text: "관리자가 링크 생성 → 비회원에게 전달하는 흐름",
      },
      {
        id: "ord-create-link-2",
        text: "비회원 결제 페이지(Checkout) 화면 구성",
      },
      { id: "ord-create-link-3", text: "결제 완료 후 회원가입 연동 여부" },
      {
        id: "ord-create-link-4",
        text: "이메일 발송, 알림 발송, 혜택 제공 여부 확인",
      },
    ],
  },
  {
    id: "ord-create-onsite",
    text: "[현장 추가결제] 설치기사 현장 추가 주문 흐름",
    domain: "Commerce",
    services: ["Installer", "Owner"],
    children: [
      { id: "ord-create-onsite-1", text: "원(Origin) 주문과의 연결 관계 처리" },
      {
        id: "ord-create-onsite-2",
        text: "설치기사 앱에서 주문 생성 → 자영업자 앱 결제 연동",
      },
      {
        id: "ord-create-onsite-3",
        text: "현장추가 주문서 화면 구성(매니저앱)",
      },
      {
        id: "ord-create-onsite-4",
        text: "원 주문 취소 시 현장추가 주문 처리 정책",
      },
    ],
  },
  {
    id: "ord-create-addcost",
    text: "[추가비용 청구] 설치이전비/추가장비 비용 청구 흐름",
    domain: "Commerce",
    services: ["Admin", "Owner"],
    children: [
      { id: "ord-create-addcost-1", text: "관리자가 추가비용 생성하는 흐름" },
      {
        id: "ord-create-addcost-2",
        text: "자영업자 앱에서 청구 확인 및 결제 흐름",
      },
      {
        id: "ord-create-addcost-3",
        text: "CCTV 주문 외 비용(설치이전비 등) 구분 표시",
      },
    ],
  },

  // ── 주문 취소 ──
  {
    id: "ord-cancel-owner",
    text: "[자영업자 앱] 주문 취소 흐름",
    domain: "Commerce",
    services: ["Owner"],
    children: [
      { id: "ord-cancel-owner-1", text: "취소 가능 상태 조건 확인" },
      { id: "ord-cancel-owner-4", text: "취소 완료 이메일, 알림톡 발송 확인" },
      { id: "ord-cancel-owner-2", text: "취소 시 혜택 처리 정책" },
    ],
  },
  {
    id: "ord-cancel-admin",
    text: "[어드민 웹] 주문 취소 흐름",
    domain: "Commerce",
    services: ["Admin"],
    children: [
      { id: "ord-cancel-admin-1", text: "관리자 취소 시 환불 처리 정책" },
      { id: "ord-cancel-admin-2", text: "취소 완료 이메일, 알림톡 발송 확인" },
      { id: "ord-cancel-admin-3", text: "취소 시 혜택 처리 정책" },
      { id: "ord-cancel-admin-4", text: "설치 전 취소/설치 후 취소 구분 정책" },
    ],
  },

  // ── 주문 정보 노출 화면 ──
  {
    id: "ord-display-owner-list",
    text: "자영업자 앱 주문 목록/상세 화면",
    domain: "Commerce",
    services: ["Owner"],
    children: [
      {
        id: "ord-display-owner-list-2",
        text: "주문 상태/종류별 목록 노출 여부",
      },
      {
        id: "ord-display-owner-list-3",
        text: "상세 화면 구성 항목 (상품, 결제, 설치 정보)",
      },
      {
        id: "ord-display-owner-list-4",
        text: "현장추가 주문의 원 주문과의 관계 표시",
      },
    ],
  },
  {
    id: "ord-display-email",
    text: "주문/취소 완료 이메일 템플릿",
    domain: "Commerce",
    services: ["Owner"],
    children: [
      { id: "ord-display-email-1", text: "주문완료 템플릿 구성 확인" },
      { id: "ord-display-email-2", text: "취소완료 템플릿 구성 확인" },
      { id: "ord-display-email-3", text: "이메일 템플릿 구성" },
    ],
  },
  {
    id: "ord-display-admin",
    text: "어드민 웹 주문관리 화면",
    domain: "Commerce",
    services: ["Admin"],
    children: [
      { id: "ord-display-admin-1", text: "주문 목록 검색/필터/정렬 조건" },
      {
        id: "ord-display-admin-2",
        text: "주문 유형별(기본/수기/링크/현장추가/추가비용) 구분 표시",
      },
      { id: "ord-display-admin-3", text: "주문 상세 조회 화면 구성" },
      {
        id: "ord-display-admin-4",
        text: "관리자 수행 가능 액션 (상태변경, 취소, 메모 등)",
      },
    ],
  },
  {
    id: "constraint-status-action",
    text: "주문 상태별 사용자/관리자 수행 가능 액션 정의",
    domain: "Commerce",
    services: ["Owner", "Admin"],
    children: [
      {
        id: "constraint-status-action-1",
        text: "각 주문 상태별 자영업자에게 노출되는 버튼/액션",
      },
      {
        id: "constraint-status-action-2",
        text: "각 주문 상태별 관리자에게 노출되는 버튼/액션",
      },
      {
        id: "constraint-status-action-3",
        text: "상태 전이(Transition) 규칙 정의",
      },
    ],
  },
  {
    id: "constraint-status-visibility",
    text: "주문 상태별 목록 노출 여부 정의",
    domain: "Commerce",
    services: ["Owner", "Admin"],
    children: [
      {
        id: "constraint-status-visibility-1",
        text: "자영업자 앱에서 보이지 않아야 하는 상태",
      },
      {
        id: "constraint-status-visibility-2",
        text: "어드민에서 필터링 가능한 상태 목록",
      },
    ],
  },

  // ── 예외 케이스 ──
  {
    id: "edge-user-withdraw",
    text: "주문자 회원 탈퇴 시 주문 처리",
    domain: "Account",
    services: ["Owner", "Admin"],
    children: [
      {
        id: "edge-user-withdraw-1",
        text: "진행 중 주문이 있는 상태에서 탈퇴 시도 시 처리",
      },
      {
        id: "edge-user-withdraw-2",
        text: "탈퇴 완료 후 주문 데이터 노출 정책 (어드민)",
      },
      {
        id: "edge-user-withdraw-3",
        text: "탈퇴 회원의 주문 목록 표시 (익명화 등)",
      },
    ],
  },
  {
    id: "edge-store-delete",
    text: "주문 후 매장 삭제 시 처리",
    domain: "Commerce",
    services: ["Owner", "Admin"],
    children: [
      {
        id: "edge-store-delete-1",
        text: "매장 삭제 시 설치 주소/정보 유지 여부",
      },
      { id: "edge-store-delete-2", text: "매장 삭제 후 주문 상세 화면 표시" },
    ],
  },

  // ── 설치 관련 ──
  {
    id: "install-schedule",
    text: "설치 일정 관리",
    domain: "Commerce",
    services: ["Installer", "Admin"],
    children: [
      { id: "install-schedule-1", text: "설치 일정 배정/변경 흐름" },
      { id: "install-schedule-2", text: "설치기사에게 주문 정보 전달 내용" },
    ],
  },
  {
    id: "install-complete",
    text: "설치 완료 처리",
    domain: "Commerce",
    services: ["Installer", "Admin", "Owner"],
    children: [
      { id: "install-complete-1", text: "설치 완료 후 주문 상태 변경" },
      { id: "install-complete-2", text: "설치 완료 확인 알림 (자영업자)" },
    ],
  },
];

export const ALL_DOMAINS: Domain[] = [
  "Commerce",
  "Account",
  "Monitoring",
  "Employment",
];
export const ALL_SERVICES: Service[] = [
  "Owner",
  "Installer",
  "Admin",
  "Partners",
];
