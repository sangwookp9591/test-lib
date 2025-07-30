import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { server } from '@/shared/mocks/server';
import { rest } from 'msw';
import SignupForm from './SignupForm';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/** 
 * 아주 좋은 질문이에요!
beforeAll, afterEach, afterAll은 Jest의 테스트 라이프사이클 함수들이고,
server.listen(), server.resetHandlers(), server.close()는 **MSW(Mock Service Worker)**를 사용해서 테스트 전에 mock 서버를 켜고 끄는 역할을 해요.
 */

describe('SignupForm', () => {
    it('회원가입 성공 테스트', async () => {
        render(<SignupForm />);

        const nameInput = screen.getByPlaceholderText('이름');
        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const confirmInput = screen.getByPlaceholderText('비밀번호 확인');

        fireEvent.change(nameInput, { target: { value: '박상욱' } });
        fireEvent.change(emailInput, { target: { value: 'sangwookp9591@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'qwert123' } });
        fireEvent.change(confirmInput, { target: { value: 'qwert123' } });

        await waitFor(() => {
            expect(screen.getByText(/성공/)).toBeInTheDocument();
        });
    });

    it('회원가입 실패 테스트', async () => {
        render(<SignupForm />);

        const nameInput = screen.getByPlaceholderText('이름');
        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const confirmInput = screen.getByPlaceholderText('비밀번호 확인');

        fireEvent.change(nameInput, { target: { value: '' } });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: 'qwert123' } });
        fireEvent.change(confirmInput, { target: { value: 'qwert123' } });

        await waitFor(() => {
            expect(screen.getByText(/실패/)).toBeInTheDocument();
        });
    });
});
