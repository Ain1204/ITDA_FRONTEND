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

// 기업 회원가입 페이지
const SignupPage5_enterprise = ({ setStep }) => {

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

	return (
		<InputSection>
			{/* 기업 메일 입력 */}
			<Label>기업 메일</Label>
			<InputContainer>
				<SignupInput
					type="email"
					placeholder="기업 메일을 입력해주세요"
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

			{/* 이메일 인증 코드 입력 */}
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
					/>
					<SignupVerifyButton
						onClick={() => {
							if (validators.validateUserId(userId)) {
								setShowPasswordInput(true);
								setUserIdVerificationFailed(false);
								setUserIdVerified(true);
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
					{emailVerified && 
						userIdVerified && 
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
		</InputSection>
	);
};

export default SignupPage5_enterprise;