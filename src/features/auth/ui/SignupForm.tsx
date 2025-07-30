'use client';

import { useActionState } from 'react';
import { signupAction } from '../api/signup';

export default function SignupForm() {
    const [state, formAction, isPending] = useActionState(signupAction, {
        success: '',
        error: '',
    });

    return (
        <form action={formAction}>
            <input name="name" placeholder="이름" />
            <input name="email" placeholder="이메일" />
            <input name="password" type="password" placeholder="비밀번호" />
            <input name="confirm" type="password" placeholder="비밀번호 확인" />
            <button type="submit" disabled={isPending}>
                {isPending ? '처리 중...' : '회원가입'}
            </button>
            {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
            {state.success && <p style={{ color: 'green' }}>{state.success}</p>}
        </form>
    );
}
