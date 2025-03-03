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
import { useSignup } from '../../services/SignupContext';
import { useState, useEffect } from 'react';
import { registerWithEmail, checkUserIdExists, checkEmailExists, sendEmailVerificationCode } from '../../services/authService';

// 기업 회원가입 페이지
const SignupPage5_enterprise = ({ setStep }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { signupData, updateSignupData } = useSignup();

	// 타이머 관련 상태 및 함수
	const { remainingTime, timer, startTimer, formatTime, isTimerRunning } = useTimer();

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
		setUserIdVerificationFailed,
		emailDuplicateChecked,
		setEmailDuplicateChecked
	} = useAuthState();

	// 이메일 중복 확인 상태 추가
	const [emailDuplicateError, setEmailDuplicateError] = useState(false);
	
	// 서버로부터 받은 실제 인증 코드 저장 (개발 환경용)
	const [serverVerificationCode, setServerVerificationCode] = useState("");
	
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

	// 타이머 만료 감지를 위한 useEffect 추가
	useEffect(() => {
		if (remainingTime === 0 && showEmailVerification && !emailVerified) {
			// 타이머가 만료되면 안내 메시지 표시
			setErrorMsg('인증 시간이 만료되었습니다. 이메일 인증을 다시 요청해주세요.');
		}
	}, [remainingTime, showEmailVerification, emailVerified]);

	// 이메일 변경 처리
	const handleEmailChange = (e) => {
		updateSignupData({ email: e.target.value });
		// 이메일이 변경되면 이전 인증 결과 초기화
		setEmailDuplicateError(false);
		setEmailVerified(false);
		setEmailDuplicateChecked(false);
		setShowEmailVerification(false);
		setErrorMsg(''); // 이메일이 변경되면 이전 오류 메시지 제거
	};

	// 이메일 중복 확인 (인증 단계 제거)
	const handleRequestEmailVerification = async () => {
		const email = signupData.email;
		
		// 이메일 유효성 검사
		if (!email || !email.includes('@') || !email.includes('.')) {
			setErrorMsg('유효한 이메일 주소를 입력해 주세요.');
			return;
		}

		setIsLoading(true);
		setErrorMsg('');
		setEmailDuplicateChecked(true);

		try {
			// 이메일 중복 확인
			const isDuplicate = await checkEmailExists(email);
			
			if (isDuplicate) {
				setEmailDuplicateError(true);
				setEmailVerified(false);
				setErrorMsg('이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.');
				setIsLoading(false);
				return;
			}
			
			// 중복이 아니면 이메일 확인 완료로 처리
			setEmailVerified(true);
			updateSignupData({ 
				email: email,
				emailVerified: true // 중복 확인만 통과한 상태
			});
			setEmailDuplicateError(false);
			setShowEmailVerification(false); // 인증 입력창 표시하지 않음
			setErrorMsg('');
			console.log('이메일 중복 확인 완료:', email);
			
		} catch (error) {
			console.error("이메일 확인 중 오류:", error);
			setErrorMsg('이메일 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
			setEmailVerified(false);
		} finally {
			setIsLoading(false);
		}
	};

	// 이메일 인증 코드 확인 (현재는 사용하지 않지만 유지)
	const handleVerifyEmailCode = () => {
		// 인증 코드 확인 로직 - UI 호환성 위해 기존 코드 유지
		// 실제 인증은 이메일 링크를 통해 이루어집니다
		if (verificationCode === serverVerificationCode || verificationCode === "1234") {
			setEmailVerified(true);
			updateSignupData({ emailVerified: true });
			setVerificationFailed(false);
			setShowEmailVerification(false);
			setErrorMsg(''); // 인증 성공 시 오류 메시지 제거
			clearInterval(timer);
		} else {
			setVerificationFailed(true);
			setErrorMsg('올바르지 않은 인증 코드입니다. 다시 확인해 주세요.');
		}
	};

	// 아이디 중복 확인
	const handleCheckUserId = async () => {
		if (!validators.validateUserId(userId)) {
			setUserIdVerificationFailed(true);
			setUserIdVerified(false);
			return;
		}

		try {
			setIsLoading(true); // 로딩 상태 설정
			
			// 아이디 중복 확인 API
			const isDuplicate = await checkUserIdExists(userId);
			
			if (isDuplicate) {
				setUserIdVerificationFailed(true);
				setUserIdVerified(false);
			} else {
				setShowPasswordInput(true);
				setUserIdVerificationFailed(false);
				setUserIdVerified(true);
				updateSignupData({ 
					userId, 
					userIdVerified: true 
				});
			}
		} catch (error) {
			console.error("아이디 중복 확인 중 오류:", error);
			setUserIdVerificationFailed(true);
			setUserIdVerified(false);
		} finally {
			setIsLoading(false); // 로딩 상태 해제
		}
	};

	// 회원가입 제출 처리
	const handleSignup = async () => {
		// 필수 확인 체크
		if (!emailVerified || !emailDuplicateChecked) {
			setErrorMsg('이메일 중복 확인이 완료되지 않았습니다.');
			return;
		}
		
		if (!userIdVerified) {
			setErrorMsg('아이디 중복 확인이 필요합니다.');
			return;
		}
		
		// 비밀번호 유효성 검증
		if (!validators.validatePassword(password)) {
			setPasswordError(true);
			setErrorMsg('비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.');
			return;
		}
		
		// 비밀번호 일치 여부 확인
		if (password !== passwordConfirm) {
			setPasswordConfirmError(true);
			setErrorMsg('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
			return;
		}

		setIsLoading(true);
		setErrorMsg('');

		try {
			// 회원가입 데이터 준비
			const userData = {
				...signupData,
				email: signupData.email,
				userId,
				password,
				emailVerified: false // 아직 이메일 인증을 받지 않음
			};

			// Firebase Auth로 회원가입 처리
			const result = await registerWithEmail(userData);
			
			if (result.success) {
				// 이메일 인증 URL의 응답 확인을 위한 로깅 추가
				console.log("회원가입 성공, 인증 이메일이 발송되었습니다.");
				console.log("인증 이메일 상태:", result.emailSent ? "발송됨" : "발송 실패");
				
				if (result.verificationResult) {
					console.log("이메일 인증 반환 값:", result.verificationResult);
				}
				
				// 이메일 인증 모니터링 시작 여부 확인
				if (result.monitoringStarted) {
					console.log("이메일 인증 상태 모니터링이 시작되었습니다.");
				}
				
				// 이메일 인증 URL 클릭 시 반환되는 값을 확인하기 위한 안내
				alert(`회원가입이 완료되었습니다!\n\n이메일 인증 링크가 ${userData.email}로 발송되었습니다.\n\n1. 이메일을 확인하여 인증 링크를 클릭해주세요.\n2. 브라우저를 닫지 말고 기다려주세요.\n3. 인증 상태를 30초마다 확인하고 있습니다.\n4. 이메일 인증이 완료되면 자동으로 알림이 표시됩니다.\n\n이메일 인증을 완료해야 서비스를 이용할 수 있습니다.`);
				
				// 마지막 단계로 이동
				setStep(6);
			} else if (result.error) {
				setErrorMsg(result.error);
				
				// 이메일 중복 오류가 발생한 경우 이메일 인증 상태 초기화
				if (result.error.includes('이미 사용 중인 이메일')) {
					setEmailVerified(false);
					setEmailDuplicateError(true);
				}
			}
		} catch (error) {
			console.error("회원가입 중 오류:", error);
			setErrorMsg(error.message || '회원가입 중 오류가 발생했습니다.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<InputSection>
			{/* 기업 메일 입력 */}
			<Label>기업 메일</Label>
			<InputContainer>
				<SignupInput
					type="email"
					placeholder="기업 메일을 입력해주세요"
					value={signupData.email || ''}
					onChange={handleEmailChange}
					disabled={isLoading}
				/>
				<SignupVerifyButton
					onClick={handleRequestEmailVerification}
					$status={emailVerified 
						? 'success' 
						: emailDuplicateError
							? 'error'
							: 'default'
					}
					disabled={isLoading || emailVerified} // 이미 인증 완료된 경우 버튼 비활성화
				>
					{emailVerified 
						? '확인 완료' 
						: emailDuplicateError
							? '사용 불가'
							: '중복 확인'
					}
				</SignupVerifyButton>
			</InputContainer>
			{errorMsg && (
				<GuideText $status="error">
					{errorMsg}
				</GuideText>
			)}

			{/* 아이디 입력 */}
			<TransitionWrapper show={emailVerified}>
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
						disabled={isLoading}
					/>
					<SignupVerifyButton
						onClick={handleCheckUserId}
						$status={userIdVerified ? 'success' : userIdVerificationFailed ? 'error' : 'default'}
						disabled={isLoading}
					>
						{userIdVerified 
							? '확인 완료' 
							: isLoading 
								? '확인 중...' 
								: '중복 확인'}
					</SignupVerifyButton>
				</InputContainer>
				<GuideText $status={userIdVerified ? 'success' : userIdVerificationFailed ? 'error' : 'default'}>
					{userIdVerificationFailed 
						? "사용할 수 없는 아이디에요" 
						: userIdVerified
							? "사용할 수 있는 아이디에요"
							: "기업 명을 입력해주세요"}
				</GuideText>

				{/* 비밀번호 입력 */}
				<TransitionWrapper show={showPasswordInput}>
					<Label>비밀번호</Label>
					<InputContainer>
						<InputWrapper>
							<SignupInput
								type={showPassword ? "text" : "password"}
								placeholder="비밀번호를 입력해주세요"
								value={password}
								onChange={(e) => {
									const newPassword = e.target.value;
									setPassword(newPassword);
									// 비밀번호 유효성 검증
									const isValid = validators.validatePassword(newPassword);
									setPasswordError(!isValid);
									
									// 비밀번호가 변경되면 비밀번호 확인 필드와의 일치 여부 검증
									if (passwordConfirm) {
										setPasswordConfirmError(newPassword !== passwordConfirm);
									}
								}}
								disabled={isLoading}
							/>
							<PasswordToggleButton
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								disabled={isLoading}
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
									const newPasswordConfirm = e.target.value;
									setPasswordConfirm(newPasswordConfirm);
									// 비밀번호와 비밀번호 확인이 일치하는지만 검증 (비밀번호 유효성은 이미 passwordError로 체크)
									setPasswordConfirmError(password !== newPasswordConfirm);
								}}
								disabled={isLoading}
							/>
							<PasswordToggleButton
								type="button"
								onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
								disabled={isLoading}
							>
								<img src={PasswordEyeIcon} alt={showPasswordConfirm ? '숨기기' : '보기'} />
							</PasswordToggleButton>
						</InputWrapper>
					</InputContainer>
					<GuideText $status={passwordConfirmError ? 'error' : password === passwordConfirm && passwordConfirm ? 'success' : 'default'}>
						{passwordConfirmError 
							? "패스워드가 일치하지 않아요." 
							: password === passwordConfirm && passwordConfirm
								? "패스워드가 일치합니다."
								: "패스워드 확인을 위해 다시 한번 입력해주세요."}
					</GuideText>

					{/* 회원가입 버튼 */}
					{emailVerified && 
						userIdVerified && 
						password && 
						passwordConfirm && 
						!passwordError && 
						!passwordConfirmError && (
						<SignupButton
							onClick={handleSignup}
							$disabled={isLoading}
						>
							{isLoading ? '처리 중...' : '회원가입'}
						</SignupButton>
					)}
				</TransitionWrapper>
			</TransitionWrapper>
		</InputSection>
	);
};

export default SignupPage5_enterprise;