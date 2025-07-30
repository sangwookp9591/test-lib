import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { server } from '@/shared/mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LoginForm', () => {
    it('로그인 성공 시 메시지를 보여준다', async () => {
        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText('이메일 입력'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 입력'), {
            target: { value: '1234' },
        });
        fireEvent.click(screen.getByRole('button', { name: '로그인' }));

        await waitFor(() => {
            expect(screen.getByText(/로그인 성공/)).toBeInTheDocument();
        });
    });

    it('로그인 실패 시 에러 메시지를 보여준다', async () => {
        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText('이메일 입력'), {
            target: { value: 'wrong@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('비밀번호 입력'), {
            target: { value: 'wrongpass' },
        });
        fireEvent.click(screen.getByRole('button', { name: '로그인' }));

        await waitFor(() => {
            expect(screen.getByText(/잘못되었습니다/)).toBeInTheDocument();
        });
    });
});
