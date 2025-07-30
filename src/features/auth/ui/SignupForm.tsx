'use client';

import { useActionState } from 'react';

export type SignupFormState = {
    success?: string;
    error?: string;
};

async function signupAction(prevState: SignupFormState, formData: FormData): Promise<SignupFormState> {
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const confirm = formData.get('confirm')?.toString();

    // if (!name || !email || !password || !confirm) {
    //     return { error: '모든 값을 입력해주세요.' };
    // }

    if (password !== confirm) {
        return { error: '비밀번호가 일치하지 않습니다.' };
    }

    // 실제 서버 API 호출
    const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
        return { error: '회원가입 실패' };
    }

    return { success: '회원가입 성공!' };
}

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
