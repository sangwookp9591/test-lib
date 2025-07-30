import { rest } from 'msw';

export const handlers = [
    rest.post('/api/login', async (req, res, ctx) => {
        const { email, password } = await req.json();

        if (email === 'test@example.com' && password === '1234') {
            return res(ctx.status(200), ctx.json({ token: 'abc123' }));
        }

        return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }));
    }),
    // 회원정보 조회 API
    rest.get('/api/user', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ id: 1, name: '상욱', email: 'sangwook@example.com' }));
    }),

    // 로그아웃 API
    rest.post('/api/logout', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ message: '로그아웃 성공' }));
    }),
];
