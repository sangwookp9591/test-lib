// __tests__/SignupFormWithValidation.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import * as utils from '../../../shared/utils/util';
import SignupFormWithValidation from './SignupFormWithValidation';

describe('SignupFormWithValidation', () => {
    it('올바르지 않은 이메일 입력 시 에러 메시지를 표시한다', () => {
        // 🧪 mock: 이메일 유효성 검사 함수를 무조건 false로
        jest.spyOn(utils, 'isValidEmail').mockReturnValue(false);

        render(<SignupFormWithValidation />);
        fireEvent.change(screen.getByPlaceholderText('이메일'), { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByRole('button', { name: '확인' }));

        expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    });

    it('이메일 유효성 검사 함수가 호출되었는지 확인한다', () => {
        const spy = jest.spyOn(utils, 'isValidEmail').mockReturnValue(true);

        render(<SignupFormWithValidation />);
        fireEvent.change(screen.getByPlaceholderText('이메일'), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: '확인' }));

        /**
         * spy는 isValidEmail() 함수를 감시(watch)하는 **"스파이 객체"**입니다.
        즉, spy는 이 함수가 실제로 호출되었는지, 어떤 인자(argument)로 호출되었는지를 추적할 수 있는 객체예요.
         */
        expect(spy).toHaveBeenCalledWith('test@example.com');
    });
});
