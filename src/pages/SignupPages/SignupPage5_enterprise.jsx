import { useState } from 'react';
import styled from 'styled-components';
import BlueButton from '../../components/BlueButton';

const Label = styled.label`
	display: block;
	align-self: stretch;
	color: var(--Colors-GrayScale-G500, #4F5462);
	font-family: "SUIT Variable";
	font-size: 14px;
	font-weight: 500;
	line-height: 168%;
	letter-spacing: -0.35px;
	margin: 20px 0 8px 0;
`;

const InputContainer = styled.div`
	display: flex;
	gap: 8px;
	width: 100%;
	margin-bottom: 12px;
`;

const SignupInput = styled.input`
	display: flex;
	width: 300px;
	height: 48px;
	padding: 12px 16px;
	padding-right: 64px;
	align-items: center;
	gap: 8px;
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
`;

const SignupVerifyButton = styled.button`
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

	${props => props.$status === 'success' ? `
		color: var(--Colors-GrayScale-G400, #949BAD);
		background: var(--Colors-GrayScale-White, #FCFCFF);
	` : `
		color: var(--Colors-GrayScale-White, #FCFCFF);
		background: var(--Colors-Primary-B400, #3D85FF);
	`}
`;

const InputSection = styled.div`
	margin-top: 2rem;
`;

const InputWrapper = styled.div`
	position: relative;
	width: 100%;
`;

const PasswordToggleButton = styled.button`
	position: absolute;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	cursor: pointer;
	padding: 4px;
	color: var(--Colors-GrayScale-G400, #949BAD);
	font-family: "SUIT Variable";
	font-size: 14px;
	font-weight: 500;
`;

const SignupButton = styled(BlueButton)`
	margin-top: 32px;
`;

const SignupPage5_enterprise = ({ setStep }) => {
	// 상태 관리
	const [emailVerified, setEmailVerified] = useState(false);
	const [showEmailVerification, setShowEmailVerification] = useState(false);
	const [verificationFailed, setVerificationFailed] = useState(false);
	const [remainingTime, setRemainingTime] = useState(300);
	const [timer, setTimer] = useState(null);
	const [userId, setUserId] = useState('');
	const [userIdVerified, setUserIdVerified] = useState(false);
	const [userIdVerificationFailed, setUserIdVerificationFailed] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirmError, setPasswordConfirmError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [showPasswordInput, setShowPasswordInput] = useState(false);

	// 타이머 함수
	const startTimer = () => {
		setRemainingTime(300);
		const newTimer = setInterval(() => {
			setRemainingTime((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(newTimer);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);
		setTimer(newTimer);
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

	// 유효성 검사 함수들
	const validateUserId = (id) => {
		const regex = /^[A-Za-z0-9]{4,20}$/;
		return regex.test(id);
	};

	const validatePassword = (password) => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return regex.test(password);
	};

	return (
		<InputSection>
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
					$status={emailVerified ? 'success' : 'default'}
				>
					{emailVerified 
						? '인증 완료' 
						: showEmailVerification
							? formatTime(remainingTime) 
							: '메일 인증'
					}
				</SignupVerifyButton>
			</InputContainer>

			{showEmailVerification && !emailVerified && (
				<InputContainer>
					<SignupInput
						type="text"
						maxLength="6"
						placeholder="인증번호 6자리 입력"
					/>
					<SignupVerifyButton
						onClick={() => {
							const code = "1234"; // 임시 코드
							if (code === "1234") {
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
						{verificationFailed ? '인증실패' : '인증하기'}
					</SignupVerifyButton>
				</InputContainer>
			)}

			{emailVerified && (
				<>
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
								if (validateUserId(userId)) {
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

					{showPasswordInput && (
						<>
							<Label>비밀번호</Label>
							<InputContainer>
								<InputWrapper>
									<SignupInput
										type={showPassword ? "text" : "password"}
										placeholder="비밀번호를 입력해주세요"
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
											setPasswordError(!validatePassword(e.target.value));
										}}
									/>
									<PasswordToggleButton
										type="button"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? '숨기기' : '보기'}
									</PasswordToggleButton>
								</InputWrapper>
							</InputContainer>

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
										{showPasswordConfirm ? '숨기기' : '보기'}
									</PasswordToggleButton>
								</InputWrapper>
							</InputContainer>

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
						</>
					)}
				</>
			)}
		</InputSection>
	);
};

export default SignupPage5_enterprise;