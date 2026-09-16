# 🦁 ZOOLEAF

---

## 📌 프로젝트 소개

동물원 이커머스 서비스 — 입장권·패키지 구매, 굿즈 샵, 체험 프로그램 예약을 한 곳에서 구매할 수 있는 사이트

## 🎯 서비스 콘셉트

'직접 작성'

## 👥 팀원 및 역할

| 이름 | 역할 |
| --- | --- |
| 박형우 | 장바구니 / 마이페이지 / 404 |
| 박근영 | 메인페이지 / 상세페이지 / Header / Footer |
| 황상빈 | 로그인 / 회원가입 / API명세 |
| 정현우 | 카테고리 / 프로덕트 / 굿즈 페이지 |
| 송유림 | 디자인 / 제휴 & 할인 / 동물원 소개 / 보유 동물 / 체험 프로그램 |

## 📅 개발 기간

2026-08-25 ~ 2026-09-17

## ✨ 주요 기능

- 회원가입 / 로그인 (세션 기반 토큰 인증)
- 마이페이지 (회원정보 조회·수정, 배송지 관리, 주문 내역/취소)
- 메인 페이지 (추천 입장권·패키지, 동물원 지도, 추천 굿즈, 방문 후기)
- 입장권 & 패키지 목록 · 상세
- Shop (굿즈) 목록 · 상세
- 체험 프로그램 목록 · 상세
- 동물 이야기 콘텐츠
- 장바구니 (담기 · 수량 변경 · 선택 삭제)
- 제휴 할인
- 커스텀 404 (일반 404 / 상품 · 굿즈 미존재 404)


## 🛠 기술 스택

**Frontend**
- React 19
- Vite
- React Router 7
- Zustand 5 (전역 상태 관리)
- Emotion (`@emotion/styled`, `@emotion/react`)
- ESLint


## 📂 프로젝트 파일 구조

```
src/
├─ api/          # 서버 통신 (auth, product, goods, experience, cart, animalStory)
├─ assets/
│  ├─ icons/
│  └─ images/
├─ components/
│  ├─ auth/       # 로그인·회원가입 폼
│  ├─ cart/       # 장바구니
│  ├─ common/     # Breadcrumb, Modal, LoadingSpinner 등 공용
│  ├─ detail/     # 상품/체험 상세 가격·옵션
│  ├─ experience/
│  ├─ goods/
│  ├─ layout/     # Header, Footer, Layout
│  ├─ main/       # 메인 페이지 섹션들
│  ├─ mypage/     # 마이페이지(프로필, 배송지, 주문내역)
│  ├─ product/
│  └─ review/
├─ constants/
├─ hooks/         # useAuth, useCart, useMarqueeDistance 등
├─ pages/         # 라우트별 페이지
├─ routes/        # AppRouter
├─ store/         # zustand 스토어 (auth, cart, toast, order, address)
├─ styles/        # theme, GlobalStyle (전역 전용 — 페이지별 스타일은 pages/에 짝지어 위치)
└─ utils/         # validation 등
```

## 🚀 실행 방법

-


## 🔐 환경 변수 안내

프로젝트 루트에 `.env` 파일을 생성하고 아래 값을 채워주세요.

```
VITE_API_BASE_URL=https://api.mylecture.kr/api/14/team2
```


## 🖼 주요 화면

-


## 🔌 API 사용 방법

Base URL: `https://api.mylecture.kr/api/14/team2`

인증이 필요한 요청은 헤더에 토큰을 실어 보냅니다.

```
Authorization: Bearer <token>
```

공통 응답 형식은 `{ success, data, message }`이며, **로그인 응답만 예외적으로** `token`, `userInfo`가 최상위로 내려옵니다.

| 도메인 | 메서드 | 엔드포인트 | 설명 |
| --- | --- | --- | --- |
| 인증 | POST | `/auth/login` | 로그인 |
| 인증 | POST | `/auth/check-id` | 아이디 중복 확인 |
| 인증 | POST | `/auth/signup` | 회원가입 |
| 인증 | GET | `/auth/me` | 로그인 상태 복원 / 회원정보 조회 |
| 인증 | PATCH | `/auth/me` | 회원정보 수정 |
| 인증 | POST | `/auth/logout` | 로그아웃 |
| 배송지 | GET | `/addresses` | 배송지 목록 |
| 배송지 | POST | `/addresses` | 배송지 추가 |
| 배송지 | PATCH | `/addresses/:addressId` | 배송지 수정 · 기본 배송지 설정 |
| 배송지 | DELETE | `/addresses/:addressId` | 배송지 삭제 |
| 주문 | POST | `/orders` | 장바구니 구매 확정 → 주문 저장 |
| 주문 | GET | `/orders` | 주문 내역 조회 |
| 주문 | POST | `/orders/:orderId/cancel` | 주문 취소 |
| 메인 | GET | `/main` | 추천 입장권/패키지, 동물원 지도, 추천 굿즈, 방문 후기 |
| 입장권/패키지 | GET | `/products` | 목록 |
| 입장권/패키지 | GET | `/products/:productId` | 상세 |
| Shop/굿즈 | GET | `/goods` | 목록 |
| Shop/굿즈 | GET | `/goods/:goodsId` | 상세 |
| 체험 프로그램 | GET | `/experiences` | 목록 |
| 체험 프로그램 | GET | `/experiences/:experienceId` | 상세 |
| 동물 이야기 | GET | `/animals` | 목록 |
| 장바구니 | POST | `/cart` | 담기 |
| 장바구니 | GET | `/cart` | 조회 |
| 장바구니 | PATCH | `/cart/:cartItemId` | 수량 변경 |
| 장바구니 | DELETE | `/cart/:cartItemId` | 개별 삭제 |
| 장바구니 | DELETE | `/cart` | 선택/전체 삭제 |


## 🐛 트러블슈팅

-


## 💭 프로젝트 회고

-

