import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import BlueButton from '../../components/BlueButton';
import SignupPage5_enterprise from './SignupPage5_enterprise';
import SignupPage5_business from './SignupPage5_business';
import SignupPage5_institution from './SignupPage5_institution';
import { useSignup } from '../../services/SignupContext';

// 버튼 컨테이너
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
`;

// 타입 버튼
const TypeButton = styled.button`
    display: flex;
    height: 48px;
    padding: 16px 12px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 12px;
    border: 2px solid ${({ active }) => active ? 'var(--Colors-Primary-B400, #3D85FF)' : 'transparent'};
    background: ${({ active }) => active ? 'var(--Colors-Primary-B400, #3D85FF)' : 'var(--Colors-GrayScale-White, #FCFCFF)'};
    box-shadow: 0px 0px 4px 0px rgba(26, 26, 35, 0.32);
    color: ${({ active }) => active ? 'var(--Colors-GrayScale-White, #FCFCFF)' : 'var(--Colors-GrayScale-G400, #949BAD)'};
    cursor: pointer;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.4px;
`;

// 공통 스타일 컴포넌트들

// 애니메이션을 위한 트랜지션 래퍼
export const TransitionWrapper = styled.div`
    max-height: ${props => props.show ? '1000px' : '0'};
    overflow: hidden;
    transition: max-height 0.5s ease-in-out, opacity 0.3s ease-in-out;
    opacity: ${props => props.show ? '1' : '0'};
`;

// 입력 섹션
export const InputSection = styled.div`
    margin-top: 32px;
`;

// 입력 래퍼
export const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

// 라벨
export const Label = styled.label`
    display: block;
    align-self: stretch;
    color: var(--Colors-GrayScale-G500, #4F5462);
    font-family: "SUIT Variable";
    font-size: 14px;
    font-weight: 500;
    line-height: 168%;
    letter-spacing: -0.35px;
    margin-top : 20px;
`;

// 입력 컨테이너
export const InputContainer = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    margin-top: 8px;
`;

// 입력 필드
export const SignupInput = styled.input`
    display: flex;
    height: 48px;
    padding: 12px 16px;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-width: 0;
    flex: 1 0 0;
    border: none;
    border-radius: 12px;
    background: var(--Colors-GrayScale-G200, #F3F5F8);
    box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
    color: var(--Colors-GrayScale-G400, #949BAD);
    font-family: "SUIT Variable";
    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.4px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    opacity: ${props => props.disabled ? '0.7' : '1'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'text'};
`;

// 인증 버튼
export const SignupVerifyButton = styled.button`
    display: flex;
    width: 92px;
    height: 48px;
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: none;
    box-shadow: 0px 0px 4px 0px rgba(26, 26, 35, 0.32);
    text-align: center;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.4px;
    cursor: ${props => (props.disabled || props.$status === 'timer') ? 'default' : 'pointer'};
    pointer-events: ${props => (props.disabled || props.$status === 'timer') ? 'none' : 'auto'};
    opacity: ${props => props.disabled ? '0.7' : '1'};
    
    ${props => {
        switch (props.$status) {
            case 'success':
                return css`
                    background-color: #F3F5F8;
                    color: #949BAD;
                `;
            case 'error':
                return css`
                    background-color: #EF5D58;
                    color: #FCFCFF;
                `;
            case 'timer':
                return css`
                    background: var(--Colors-GrayScale-G200, #F3F5F8);
                    box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
                    color: ${props.isExpired ? '#EF5D58' : 'var(--Colors-Primary-B500, #0051FF)'};
                    font-size: 20px;
                    font-weight: 600;
                    line-height: 150%;
                    letter-spacing: 2px;
                `;
            default:
                return css`
                    background-color: #3D85FF;
                    color: #FCFCFF;
                `;
        }
    }}
`;

// 재전송 컨테이너
export const ResendContainer = styled.div`
    display: flex;
    margin-top: 8px;
`;

// 재전송 텍스트
export const ResendText = styled.span`
    font-family: "SUIT Variable";
    font-size: 12px;
    font-weight: 500;
    line-height: 132%;
    letter-spacing: -0.3px;
    color: var(--Colors-Primary-B500, #0051FF);
`;

// 재전송 버튼
export const ResendButton = styled.button`
    background: none;
    border: none;
    font-family: "SUIT Variable";
    font-size: 12px;
    font-weight: 500;
    line-height: 132%;
    letter-spacing: -0.3px;
    color: var(--Colors-Primary-B500, #0051FF);
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    text-decoration-line: underline;
    padding: 0 4px;
    opacity: ${props => props.disabled ? '0.5' : '1'};
`;

// 가이드 텍스트
export const GuideText = styled.p`
    margin-top: 8px;
    font-family: "SUIT Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 132%;
    letter-spacing: -0.3px;
    
    ${props => {
        switch (props.$status) {
            case 'error':
                return css`
                    color: #FF4444;  // 실패 시 빨간색
                `;
            case 'success':
                return css`
                    color: #01B777;  // 성공 시 초록색
                `;
            default:
                return css`
                    color: #666666;  // 기본 회색
                `;
        }
    }}
`;

// 비밀번호 토글 버튼
export const PasswordToggleButton = styled.button`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.disabled ? '0.5' : '1'};
    
    img {
        width: 12px;
        height: 8px;
    }
`;

// 회원가입 버튼
export const SignupButton = styled(BlueButton)`
    margin-top: 32px;
`;



// 유효성 검사 함수들
export const validators = {
    validateUserId: (id) => {
        // 한글, 영문, 숫자, 공백을 허용하고 길이는 2~50자로 제한
        const regex = /^[가-힣A-Za-z0-9\s]{2,50}$/;
        return regex.test(id);
    },
    validatePassword: (password) => {
        // 비밀번호 규칙: 최소 8자, 대소문자, 숫자, 특수문자 포함
        const lengthRegex = /.{8,}/;                   // 최소 8자
        const upperRegex = /[A-Z]/;                    // 대문자
        const lowerRegex = /[a-z]/;                    // 소문자
        const numberRegex = /[0-9]/;                   // 숫자
        const specialRegex = /[!@#$%^&*(),.?":{}|<>]/; // 특수문자
        
        return lengthRegex.test(password) && 
               upperRegex.test(password) && 
               lowerRegex.test(password) && 
               numberRegex.test(password) && 
               specialRegex.test(password);
    },
    validateBusinessNumber: (number) => {
        return /^\d{10}$/.test(number);
    }
};

// 인증 상태 관리 커스텀 훅
export const useAuthState = () => {
    const [emailVerified, setEmailVerified] = useState(false);
    const [showEmailVerification, setShowEmailVerification] = useState(false);
    const [verificationFailed, setVerificationFailed] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [userId, setUserId] = useState('');
    const [userIdVerified, setUserIdVerified] = useState(false);
    const [userIdVerificationFailed, setUserIdVerificationFailed] = useState(false);
    const [emailDuplicateChecked, setEmailDuplicateChecked] = useState(false);

    return {
        emailVerified,
        setEmailVerified,
        showEmailVerification,
        setShowEmailVerification,
        verificationFailed,
        setVerificationFailed,
        verificationCode,
        setVerificationCode,
        userId,
        setUserId,
        userIdVerified,
        setUserIdVerified,
        userIdVerificationFailed,
        setUserIdVerificationFailed,
        emailDuplicateChecked,
        setEmailDuplicateChecked
    };
};

// 비밀번호 상태 관리 커스텀 훅
export const usePasswordState = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    return {
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
        passwordError,
        setPasswordError,
        passwordConfirmError,
        setPasswordConfirmError,
        showPassword,
        setShowPassword,
        showPasswordConfirm,
        setShowPasswordConfirm,
        showPasswordInput,
        setShowPasswordInput
    };
};

// 타이머 커스텀 훅
export const useTimer = () => {
    const [remainingTime, setRemainingTime] = useState(300);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (!isTimerRunning) return;

        const newTimer = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 1) {
                    setIsTimerRunning(false);
                    clearInterval(newTimer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        setTimer(newTimer);

        return () => clearInterval(newTimer);
    }, [isTimerRunning]);

    const startTimer = () => {
        setRemainingTime(300);
        setIsTimerRunning(true);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return { 
        remainingTime, 
        timer, 
        startTimer, 
        formatTime,
        isTimerRunning
    };
};

const SignupPage5Main = ({ setStep }) => {
    const [showEmailInput, setShowEmailInput] = useState(true);
    const [showBusinessInput, setShowBusinessInput] = useState(false);
    const [showInstitutionInput, setShowInstitutionInput] = useState(false);
    const { signupData, updateSignupData } = useSignup();
    const [authMethod, setAuthMethod] = useState('email');
    
    // 계정 유형에 따른 UI 텍스트 변경
    const isUniversity = signupData.accountType === 'university';
    const emailButtonText = isUniversity ? '학교 메일' : '기업 메일';
    const secondOptionText = isUniversity ? '기관 코드' : '사업자등록번호 (준비중)';
    const secondOptionDisabled = isUniversity ? false : true;
    const secondOptionMethod = isUniversity ? 'institution' : 'business';
    
    // 비즈니스 페이지에서 발생한 이벤트를 감지하는 이벤트 리스너 추가
    useEffect(() => {
        const handleSwitchToEmailAuth = () => {
            setAuthMethod('email');
        };
        
        window.addEventListener('switchToEmailAuth', handleSwitchToEmailAuth);
        
        return () => {
            window.removeEventListener('switchToEmailAuth', handleSwitchToEmailAuth);
        };
    }, []);
    
    // 인증 방식 변경 핸들러
    const handleAuthMethodChange = (method) => {
        if (!isUniversity && method === 'business') {
            alert('사업자등록번호 인증은 현재 준비 중인 서비스입니다.\n기업 메일을 통한 회원가입만 가능합니다.');
            return;
        }
        
        setAuthMethod(method);
        updateSignupData({ authMethod: method });
        setShowBusinessInput(method === 'business');
        setShowEmailInput(method === 'email');
        setShowInstitutionInput(method === 'institution');
    };

    return (
        <div>
            <ButtonContainer>
                <TypeButton 
                    active={showEmailInput}
                    onClick={() => handleAuthMethodChange('email')}
                >
                    {emailButtonText}
                </TypeButton>
                <TypeButton 
                    active={isUniversity ? showInstitutionInput : showBusinessInput}
                    onClick={() => handleAuthMethodChange(secondOptionMethod)}
                    style={secondOptionDisabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}} // 비활성화된 스타일 조건부 적용
                >
                    {secondOptionText}
                </TypeButton>
            </ButtonContainer>

            {showEmailInput && <SignupPage5_enterprise setStep={setStep} />}
            {showBusinessInput && <SignupPage5_business setStep={setStep} />}
            {showInstitutionInput && <SignupPage5_institution setStep={setStep} />}
        </div>
    );
};

export default SignupPage5Main;
