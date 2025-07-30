import { rest } from 'msw';

export const handlers = [
    rest.post('/api/login', async (req, res, ctx) => {
        const { email, password } = await req.json();

        if (email === 'test@example.com' && password === '1234') {
            return res(ctx.status(200), ctx.json({ token: 'abc123' }));
        }

        return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }));
    }),
    // ✅ 회원가입 API
    rest.post('/api/signup', async (req, res, ctx) => {
        const { name, email, password } = await req.json();

        // 간단한 검증
        if (!name || !email || !password) {
            return res(ctx.status(400), ctx.json({ message: '모든 값을 입력해주세요.' }));
        }

        // 정상 응답
        return res(ctx.status(200), ctx.json({ message: '회원가입 성공', user: { name, email } }));
    }),

    // 로그아웃 API
    rest.post('/api/logout', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ message: '로그아웃 성공' }));
    }),
];
