// src/features/auth/ui/LoginForm.tsx
'use client';

import { useState } from 'react';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'test@example.com') {
            setMessage('로그인 성공');
        } else {
            setMessage('로그인 실패');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">이메일</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 입력"
            />
            <button type="submit">로그인</button>
            {message && <p>{message}</p>}
        </form>
    );
}
