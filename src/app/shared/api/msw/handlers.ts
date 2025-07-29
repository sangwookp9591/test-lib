import { rest } from 'msw';

export const handlers = [
    rest.post('/api/login', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ token: 'abc123' }));
    }),
];
