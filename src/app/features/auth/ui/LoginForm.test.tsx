import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('loginForm', () => {
    it('이메일을 입력하고 성공 메세지를 출력한다', () => {
        render(<LoginForm />); //컴포넌트를 가상으로 브라우저에 렌더링

        const input = screen.getByPlaceholderText('이메일 입력');
        const passwordInputs = screen.getAllByPlaceholderText('비밀번호 입력');
        const button = screen.getByRole('button', { name: '로그인' });

        fireEvent.change(input, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInputs[0], { target: { value: '1234' } });
        fireEvent.click(button);

        expect(screen.getByText('로그인 성공')).toBeInTheDocument();
    });

    it('틀린 이메일을 입력하면 실패 메시지를 출력한다', () => {
        render(<LoginForm />);

        const input = screen.getByPlaceholderText('이메일 입력');
        const passwordInputs = screen.getAllByPlaceholderText('비밀번호 입력');
        const button = screen.getByRole('button', { name: '로그인' });

        fireEvent.change(input, { target: { value: 'wrong@example.com' } });
        fireEvent.change(passwordInputs[0], { target: { value: 'wrong1234' } });
        fireEvent.click(button);

        expect(screen.getByText('로그인 실패')).toBeInTheDocument();
    });
});
