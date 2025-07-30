물론이죠! 기존 `README.md` 내용에 **테스트 환경 설명 + 실행 방법 + 예시** 등을 포함하여 업데이트해드릴게요. 아래는 `Jest`, `React Testing Library`, `MSW`까지 포함한 **Next.js 15 기준의 테스트 설명이 추가된 README**입니다:

---

````md
# test-lib

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🚀 Getting Started

Start the development server:

```bash
npm run dev
# or
yarn dev
```
````

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🧪 Testing Setup

This project uses the following testing tools:

-   ✅ [**Jest**](https://jestjs.io) - JavaScript testing framework
-   ✅ [**React Testing Library**](https://testing-library.com/docs/react-testing-library/intro/) - for component testing
-   ✅ [**MSW**](https://mswjs.io/) - for mocking API requests in tests

---

## 🧰 How to Run Tests

Run all tests:

```bash
npm run test
```

Run in watch mode (auto-restart on file change):

```bash
npm run test -- --watch
```

Run with coverage report:

```bash
npm run test -- --coverage
```

> After running with `--coverage`, open `coverage/lcov-report/index.html` in your browser to view test coverage visually.

---

## 🔍 Example Test

Here is a sample test using `@testing-library/react` and `jest`:

```tsx
// src/widgets/LoginForm/ui/LoginForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
    it('logs in with correct credentials', () => {
        render(<LoginForm />);
        fireEvent.change(screen.getByPlaceholderText('이메일 입력'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 입력'), {
            target: { value: '1234' },
        });
        fireEvent.click(screen.getByRole('button', { name: '로그인' }));

        expect(screen.getByText('로그인 성공')).toBeInTheDocument();
    });
});
```

---

## 📦 File Structure (Testing)

```
src/
├── widgets/
│   └── LoginForm/
│       ├── ui/
│       │   ├── LoginForm.tsx
│       │   └── LoginForm.test.tsx   ← ✅ Test file
│
├── shared/
│   └── providers/
│       └── MockServiceWorker/       ← ✅ MSW 설정
│           ├── MockServiceWorkerProvider.tsx
│           └── index.ts
├── mocks/
│   ├── handlers.ts                  ← ✅ MSW 핸들러 정의
│   ├── server.ts                    ← ✅ Node 환경용 서버
│   └── browser.ts                   ← ✅ 브라우저 환경용
```

---

## 🧪 Mocking API with MSW

We use [MSW](https://mswjs.io) to mock external API calls in tests and development:

1. `handlers.ts` – Define mock APIs
2. `server.ts` – Setup server for test environment
3. `browser.ts` – Setup browser mock for dev
4. `MockServiceWorkerProvider.tsx` – Initializes MSW on app load (if enabled)

To enable API mocking in development:

```env
# .env.local
NEXT_PUBLIC_API_MOCKING=enabled
```

---

## 📚 Learn More

-   [Jest Docs](https://jestjs.io/docs/getting-started)
-   [React Testing Library Docs](https://testing-library.com/docs/)
-   [MSW Docs](https://mswjs.io/docs/)
-   [Next.js Testing Best Practices](https://nextjs.org/docs/pages/building-your-application/testing)

---

## ✅ Deploy on Vercel

You can deploy your Next.js app on [Vercel](https://vercel.com/new?utm_source=create-next-app&utm_medium=readme&utm_campaign=create-next-app) — creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

---

필요하다면 아래 항목도 추가 가능해요:

- 테스트 실패 예제 보기
- 비동기 API 테스트 (with `msw`)
- CI에서 테스트 실행 방법 (GitHub Actions 등)

원하는 스타일로 맞춰서 더 정리해드릴까요? 😊
```
