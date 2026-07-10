# 🧭 What's your MBTI? — MBTI 성격 유형 테스트

20개의 질문으로 1~2분 만에 알아보는 나의 MBTI 성격 유형 테스트 웹사이트입니다.
결과로 16가지 유형 중 하나와 함께 축별 성향 백분율, 강점·약점, 추천 직업, 잘 맞는 유형을 보여주고
이미지 저장·카카오톡 공유까지 지원합니다.

🔗 **라이브 사이트**: https://whats-your-mbti.vercel.app

---

## ✨ 주요 기능

- **이름 입력** — 시작 화면에서 이름을 입력하면 결과에 "○○님의 성격 유형" 으로 표시
- **20문항 테스트** — E/I · S/N · T/F · J/P 4개 축을 각 5문항으로 판별
- **선택지 랜덤 배치** — 문항마다 선택지 순서를 무작위로 섞어, 한쪽만 눌러 결과를 조작할 수 없음
- **진행률 바** — 현재 진행 상황(n/20, %)을 시각적으로 표시
- **결과 페이지**
  - 유형 코드 · 별명 · 한 줄 요약
  - 📊 축별 성향 백분율 (예: 외향 80% / 내향 20%)
  - 💪 강점 · ⚠️ 약점 · 💼 추천 직업
  - 🤝 나와 잘 맞는 유형 (성향 설명 포함)
- **결과 이미지 저장** — 결과 카드를 PNG 이미지로 다운로드
- **공유 기능**
  - 카카오톡 공유 (Kakao SDK, 카드형 메시지)
  - 네이티브 공유 시트 / 링크 복사

---

## 🛠 기술 스택

| 구분 | 사용 기술 |
|------|-----------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 |
| 이미지 생성 | html-to-image |
| 공유 | Kakao JavaScript SDK, Web Share API |
| 배포 | Vercel |

---

## 📁 프로젝트 구조

```
src/
├─ app/
│  ├─ page.tsx              # 시작 화면 (이름 입력)
│  ├─ test/page.tsx         # 테스트 진행 (20문항 + 프로그레스 바)
│  ├─ result/[type]/page.tsx# 결과 페이지 (16유형)
│  ├─ layout.tsx            # 공통 레이아웃 · 메타데이터
│  └─ globals.css           # 전역 스타일 (Light 모드 고정)
├─ components/
│  ├─ ProgressBar.tsx       # 진행률 바
│  └─ ResultView.tsx        # 결과 카드 + 공유/저장 버튼
└─ lib/
   ├─ questions.ts          # 20문항 데이터
   ├─ types.ts              # 16유형 해설 데이터
   └─ scoring.ts            # 채점 로직 (성향 기반)
```

---

## 🚀 로컬에서 실행하기

```bash
# 1) 의존성 설치
npm install

# 2) 환경변수 설정 (.env.local)
#    카카오톡 공유를 쓰려면 카카오 JavaScript 키가 필요합니다.
echo "NEXT_PUBLIC_KAKAO_JS_KEY=여기에_JavaScript_키" > .env.local

# 3) 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 접속

> 카카오 키가 없어도 사이트는 정상 작동하며, 카카오톡 공유 버튼만 표시되지 않습니다.

---

## 🔑 카카오톡 공유 설정 (선택)

1. [카카오 개발자 콘솔](https://developers.kakao.com)에서 앱 생성
2. **앱 설정 > 앱 키**에서 **JavaScript 키** 복사 → `.env.local`에 등록
3. 도메인 등록 (필수):
   - **플랫폼 키 > JavaScript SDK 도메인**
   - **제품 링크 관리 > 웹 도메인**
   - 두 곳 모두 배포 도메인(예: `https://whats-your-mbti.vercel.app`) 추가

---

## 📦 빌드 & 배포

```bash
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행

vercel --prod   # Vercel 프로덕션 배포
```

---

## ⚠️ 안내

본 테스트는 재미와 자기 이해를 위한 **비공식 간이 테스트**이며, 공식 MBTI 검사와는 무관합니다.
