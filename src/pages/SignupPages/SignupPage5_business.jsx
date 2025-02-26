import { useState } from 'react';
import {
    Label,
    InputContainer,
    SignupInput,
    SignupVerifyButton,
    InputSection,
    InputWrapper,
    PasswordToggleButton,
    SignupButton,
    GuideText,
    ResendContainer,
    ResendText,
    ResendButton,
    useTimer,
    useAuthState,
    usePasswordState,
    validators,
    TransitionWrapper
} from './SignupPage5Main';
import PasswordEyeIcon from '../../assets/loginIcon/passwordEye.svg';

// 비즈니스 회원가입 페이지
const SignupPage5_business = ({ setStep }) => {

    // 타이머 관련 상태 및 함수
    const { remainingTime, timer, startTimer, formatTime } = useTimer();

    // 이메일 인증 관련 상태 및 함수
    const {
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
        setUserIdVerificationFailed
    } = useAuthState();

    // 비밀번호 관련 상태 및 함수
    const {
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
    } = usePasswordState();

    // 사업자등록번호 관련 상태 및 함수
    const [businessNumber, setBusinessNumber] = useState('');
    const [businessVerified, setBusinessVerified] = useState(false);
    const [businessVerificationFailed, setBusinessVerificationFailed] = useState(false);

    return (
        <InputSection>
            {/* 사업자등록번호 입력 */}
            <Label>사업자등록번호</Label>
            <InputContainer>
                <SignupInput
                    type="text"
                    maxLength="10"
                    placeholder="사업자등록번호 10자리를 입력해주세요"
                    value={businessNumber}
                    onChange={(e) => {
                        setBusinessNumber(e.target.value.replace(/[^0-9]/g, ''));
                        setBusinessVerificationFailed(false);
                        setBusinessVerified(false);
                    }}
                />
                <SignupVerifyButton
                    onClick={() => {
                        if (validators.validateBusinessNumber(businessNumber)) {
                            setBusinessVerified(true);
                            setBusinessVerificationFailed(false);
                        } else {
                            setBusinessVerificationFailed(true);
                            setBusinessVerified(false);
                        }
                    }}
                    $status={businessVerified ? 'success' : businessVerificationFailed ? 'error' : 'default'}
                >
                    {businessVerified ? '검증 완료' : '검증하기'}
                </SignupVerifyButton>
            </InputContainer>

            {/* 아이디 입력 */}
            <TransitionWrapper show={businessVerified}>
                <Label>아이디</Label>
                <InputContainer>
                    <SignupInput
                        type="text"
                        placeholder="사용하실 아이디를 입력해주세요"
                        value={userId}
                        onChange={(e) => {
                            setUserId(e.target.value);
                            setUserIdVerificationFailed(false);
                            setUserIdVerified(false);
                        }}
                    />
                    <SignupVerifyButton
                        onClick={() => {
                            if (validators.validateUserId(userId)) {
                                setUserIdVerified(true);
                                setUserIdVerificationFailed(false);
                            } else {
                                setUserIdVerificationFailed(true);
                                setUserIdVerified(false);
                            }
                        }}
                        $status={userIdVerified ? 'success' : userIdVerificationFailed ? 'error' : 'default'}
                    >
                        {userIdVerified ? '확인 완료' : '중복확인'}
                    </SignupVerifyButton>
                </InputContainer>
                <GuideText $status={userIdVerified ? 'success' : userIdVerificationFailed ? 'error' : 'default'}>
                    {userIdVerificationFailed 
                        ? "사용할 수 없는 아이디에요" 
                        : userIdVerified
                            ? "사용할 수 있는 아이디에요"
                            : "사업자명을 입력해주세요"}
                </GuideText>

                {/* 메일 입력 */}
                <TransitionWrapper show={userIdVerified}>
                    <Label>이메일</Label>
                    <InputContainer>
                        <SignupInput
                            type="email"
                            placeholder="이메일을 입력해주세요"
                        />
                        <SignupVerifyButton
                            onClick={() => {
                                setShowEmailVerification(true);
                                startTimer();
                            }}
                            $status={emailVerified 
                                ? 'success' 
                                : showEmailVerification 
                                    ? 'timer' 
                                    : 'default'
                            }
                            isExpired={remainingTime === 0}
                        >
                            {emailVerified 
                                ? '인증 완료' 
                                : showEmailVerification
                                    ? formatTime(remainingTime) 
                                    : '메일 인증'
                            }
                        </SignupVerifyButton>
                    </InputContainer>

                    {/* 인증번호 입력 */}
                    <TransitionWrapper show={showEmailVerification && !emailVerified}>
                        <InputContainer>
                            <SignupInput
                                type="text"
                                maxLength="6"
                                placeholder="인증번호 6자리 입력"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <SignupVerifyButton
                                onClick={() => {
                                    if (verificationCode === "1234") {
                                        setEmailVerified(true);
                                        setVerificationFailed(false);
                                        setShowEmailVerification(false);
                                        clearInterval(timer);
                                        setShowPasswordInput(true);
                                    } else {
                                        setVerificationFailed(true);
                                    }
                                }}
                                $status={verificationFailed ? 'error' : 'default'}
                            >
                                인증하기
                            </SignupVerifyButton>
                        </InputContainer>
                        <ResendContainer>
                            <ResendText>문제가 있나요? </ResendText>
                            <ResendButton 
                                onClick={() => {
                                    startTimer();
                                    setVerificationCode('');
                                    setVerificationFailed(false);
                                }}
                            >
                                다시 보내기
                            </ResendButton>
                        </ResendContainer>
                    </TransitionWrapper>

                    {/* 비밀번호 입력 */}
                    <TransitionWrapper show={emailVerified && showPasswordInput}>
                        <Label>비밀번호</Label>
                        <InputContainer>
                            <InputWrapper>
                                <SignupInput
                                    type={showPassword ? "text" : "password"}
                                    placeholder="비밀번호를 입력해주세요"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError(!validators.validatePassword(e.target.value));
                                    }}
                                />
                                <PasswordToggleButton
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <img src={PasswordEyeIcon} alt={showPassword ? '숨기기' : '보기'} />
                                </PasswordToggleButton>
                            </InputWrapper>
                        </InputContainer>
                        <GuideText $status={passwordError ? 'error' : 'default'}>
                            영문 대소문자, 숫자, 특수문자 포함 최소 8글자 이상을 입력해주세요.
                        </GuideText>

                        <Label>비밀번호 확인</Label>
                        <InputContainer>
                            <InputWrapper>
                                <SignupInput
                                    type={showPasswordConfirm ? "text" : "password"}
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    value={passwordConfirm}
                                    onChange={(e) => {
                                        setPasswordConfirm(e.target.value);
                                        setPasswordConfirmError(password !== e.target.value);
                                    }}
                                />
                                <PasswordToggleButton
                                    type="button"
                                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                >
                                    <img src={PasswordEyeIcon} alt={showPasswordConfirm ? '숨기기' : '보기'} />
                                </PasswordToggleButton>
                            </InputWrapper>
                        </InputContainer>
                        <GuideText $status={passwordConfirmError ? 'error' : 'default'}>
                            {passwordConfirmError 
                                ? "패스워드가 일치하지 않아요." 
                                : "패스워드 확인을 위해 다시 한번 입력해주세요."}
                        </GuideText>

                        {/* 회원가입 버튼 */}
                        {businessVerified && 
                            userIdVerified && 
                            emailVerified &&
                            password && 
                            passwordConfirm && 
                            !passwordError && 
                            !passwordConfirmError && (
                            <SignupButton
                                onClick={() => setStep(6)}
                                $disabled={false}
                            >
                                회원가입
                            </SignupButton>
                        )}
                    </TransitionWrapper>
                </TransitionWrapper>
            </TransitionWrapper>
        </InputSection>
    );
};

export default SignupPage5_business;