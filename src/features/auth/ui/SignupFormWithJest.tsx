/**
원하는 방식이 useActionState 유지라면 e2e 테스트를 쓰는 쪽으로 가야 하고,
현재처럼 Jest + Testing Library 위주로 간다면 useState가 좋습니다.
 */
'use client';

import { useState } from 'react';

export default function SignupFormWithJest() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, password, confirm } = form;

        if (!name || !email || !password || !confirm) {
            setMessage('모든 값을 입력해주세요.');
            return;
        }

        if (password !== confirm) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
            setMessage('회원가입 실패');
        } else {
            const data = await res.json();
            setMessage(`회원가입 성공: ${data.name}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="이름" onChange={handleChange} />
            <input name="email" placeholder="이메일" onChange={handleChange} />
            <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
            <input name="confirm" type="password" placeholder="비밀번호 확인" onChange={handleChange} />
            <button type="submit">회원가입</button>
            {message && <p>{message}</p>}
        </form>
    );
}
