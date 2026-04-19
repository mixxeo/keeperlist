# Keeper Commerce Checklist Widget

커머스 기획 시 일반적인 시나리오를 놓치지 않도록 도와주는 Figma 위젯입니다.  
기획서 작성 시 Figma 캔버스에 위젯을 삽입하고, 체크리스트를 확인하며 기획 리뷰를 진행할 수 있습니다.

---

## 기능

- **Notion 스타일 테이블 UI**: Checkbox, 체크리스트, Domain, Service 컬럼
- **Domain / Service 필터**: 선택한 필터에 해당하는 항목만 테이블에 표시
- **하위 체크리스트**: 드롭다운(chevron)으로 펼쳐서 확인 & 체크
- **진행률 표시**: 전체 대비 체크된 항목 비율
- **멀티플레이어 안전**: `useSyncedMap` 사용으로 여러 사용자가 동시에 체크 가능

## 내장된 체크리스트 카테고리

| 카테고리 | 항목 예시 |
|----------|----------|
| 주문 생성 흐름 | 기본 CCTV 주문, 수기등록, 링크결제, 현장추가결제, 추가비용 청구 |
| 주문 취소 | 자영업자 앱 취소, 어드민 취소, 환불 처리 |
| 주문 정보 노출 | 목록/상세, 이메일 템플릿, 어드민 주문관리 |
| 제약사항 | 최소 결제금액, 상태별 액션, 노출 여부 |
| 예외 케이스 | 회원 탈퇴, 매장 삭제, 에러 우선순위, 동시성, 결제 실패 |
| 설치 관련 | 일정 관리, 설치 완료 처리 |
| 모니터링 연동 | 구독 활성화, 취소 시 비활성화 |
| 공통 UX | 로딩, Empty State, 페이지네이션, 딥링크 |

---

## 개발 환경 세팅

### 사전 준비

1. **Figma Desktop App** 설치 (위젯 개발은 데스크톱 앱에서만 가능)
2. **Node.js** 18+ 설치
3. **VS Code** (권장)

### 프로젝트 설정

```bash
# 1. 프로젝트 폴더로 이동
cd keeper-checklist-widget

# 2. 의존성 설치
npm install

# 3. 빌드 (한 번)
npm run build

# 4. 또는 watch 모드 (코드 변경 시 자동 빌드)
npm run watch
```

### Figma에서 위젯 실행

1. Figma Desktop App에서 파일 열기
2. 메뉴 → **Widgets** → **Development** → **Import widget from manifest...**
3. 이 프로젝트의 `manifest.json` 파일 선택
4. 캔버스에 위젯이 삽입됨!

> ⚠️ 코드 수정 후에는 위젯을 우클릭 → **Widgets** → **Re-render widget** 으로 새로고침

---

## 프로젝트 구조

```
keeper-checklist-widget/
├── manifest.json          # Figma 위젯 매니페스트
├── package.json           # npm 설정
├── tsconfig.json          # TypeScript 설정
├── widget-src/
│   └── code.tsx           # 위젯 메인 코드
└── dist/
    └── code.js            # 빌드 결과 (npm run build 후 생성)
```

---

## 체크리스트 커스터마이징

### 항목 추가

`widget-src/code.tsx`의 `CHECKLIST_DATA` 배열에 항목을 추가하세요:

```tsx
{
  id: 'unique-id',
  text: '새로운 체크리스트 항목',
  domain: 'Commerce',           // Commerce | Account | Monitoring | Employment
  services: ['Owner', 'Admin'], // Owner | Installer | Admin | Partners
  children: [                   // 선택사항: 하위 항목
    { id: 'unique-id-1', text: '하위 항목 1' },
    { id: 'unique-id-2', text: '하위 항목 2' },
  ],
},
```

### Domain / Service 추가

1. `Domain` 또는 `Service` 타입에 새 값 추가
2. `DOMAIN_COLORS` 또는 `SERVICE_COLORS`에 색상 추가
3. `SERVICE_LABELS`에 한글 라벨 추가
4. `ALL_DOMAINS` 또는 `ALL_SERVICES` 배열에 추가

---

## Figma Widget 개발 핵심 개념 (백엔드 개발자용)

### React와의 차이점

| 개념 | React | Figma Widget |
|------|-------|-------------|
| 렌더링 대상 | DOM (HTML) | Figma Canvas (벡터) |
| 상태 관리 | `useState` | `useSyncedState` / `useSyncedMap` |
| 레이아웃 | CSS Flexbox | `AutoLayout` 컴포넌트 |
| 이벤트 | `onClick`, `onChange` | `onClick` only |
| 스타일링 | CSS | Props (fill, stroke, fontSize 등) |
| 텍스트 입력 | `<input>` | `<Input>` 컴포넌트 |

### 주의사항

- **순수 함수**: 위젯 함수는 사이드이펙트 없이 렌더링만 수행
- **동기적 렌더링**: `onClick` 핸들러 내에서만 비동기 작업 가능
- **제한된 폰트**: Google Fonts만 사용 가능
- **useSyncedMap**: 멀티플레이어 환경에서 안전한 상태 관리 (개별 키 업데이트)
- **useSyncedState**: 단일 값 상태 관리 (필터 등)

---

## 참고 자료

- [Figma Widget API 공식 문서](https://www.figma.com/widget-docs/)
- [Widget API Reference](https://www.figma.com/widget-docs/api/api-reference/)
- [Widget Samples (GitHub)](https://github.com/figma/widget-samples)
- [Setup Guide](https://www.figma.com/widget-docs/setup-guide/)
