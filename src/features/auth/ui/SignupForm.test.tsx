import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/shared/mocks/server';
import SignupFormWithJest from './SignupFormWithJest';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SignupForm', () => {
    it('회원가입 성공 테스트', async () => {
        // 성공 응답 핸들러 추가
        server.use(
            rest.post('/api/signup', async (req, res, ctx) => {
                const { name } = await req.json();
                return res(ctx.status(200), ctx.json({ name }));
            })
        );

        render(<SignupFormWithJest />);

        fireEvent.change(screen.getByPlaceholderText('이름'), { target: { value: '박상욱' } });
        fireEvent.change(screen.getByPlaceholderText('이메일'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: '1234' } });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), { target: { value: '1234' } });

        fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

        await waitFor(() => {
            expect(screen.getByText(/회원가입 성공/)).toBeInTheDocument();
        });
    });

    it('비밀번호 불일치 실패 테스트', async () => {
        render(<SignupFormWithJest />);

        fireEvent.change(screen.getByPlaceholderText('이름'), { target: { value: '박상욱' } });
        fireEvent.change(screen.getByPlaceholderText('이메일'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: '1234' } });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), { target: { value: '5678' } });

        fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

        await waitFor(() => {
            expect(screen.getByText(/비밀번호가 일치하지 않습니다/)).toBeInTheDocument();
        });
    });
});
