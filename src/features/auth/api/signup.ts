'use server';

export type SignupFormState = {
    success?: string;
    error?: string;
};

export async function signupAction(prevState: SignupFormState, formData: FormData): Promise<SignupFormState> {
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const confirm = formData.get('confirm')?.toString();

    if (!name || !email || !password || !confirm) {
        return { error: '모든 값을 입력해주세요.' };
    }

    if (password !== confirm) {
        return { error: '비밀번호가 일치하지 않습니다.' };
    }

    // 여기에 실제 회원가입 로직 or fetch 요청 가능
    return { success: '회원가입 성공!' };
}
