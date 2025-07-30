// src/widgets/SignupFormWithValidation.tsx
'use client';

import { isValidEmail } from '@/shared/utils/util';
import { useState } from 'react';

export default function SignupFormWithValidation() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setMessage('올바른 이메일 형식이 아닙니다.');
            return;
        }

        setMessage('이메일이 유효합니다!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">확인</button>
            {message && <p>{message}</p>}
        </form>
    );
}
