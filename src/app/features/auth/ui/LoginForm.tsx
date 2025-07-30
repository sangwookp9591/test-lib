// src/widgets/LoginForm/ui/LoginForm.tsx
'use client';

import { useState } from 'react';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === 'test@example.com' && password === '1234') {
            setMessage('로그인 성공');
        } else {
            setMessage('이메일 또는 비밀번호가 잘못되었습니다');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">이메일</label>
            <input id="email" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">비밀번호</label>
            <input
                id="password"
                placeholder="비밀번호 입력"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">로그인</button>

            {message && <p>{message}</p>}
        </form>
    );
}
