import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SignupInput from '../../components/SignupInput';
import SignupVerifyButton from '../../components/SignupVerifyButton';
import SignupTypeButton from '../../components/SignupTypeButton';
import LoginBlueButton from '../../components/BlueButton';

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 1rem;
`;

const InputSection = styled.div`
	margin-top: 2rem;
`;

const SignupPage5 = ({ setStep }) => {
	const [showEmailInput, setShowEmailInput] = useState(false);
	const [showBusinessInput, setShowBusinessInput] = useState(false);
	const [emailVerified, setEmailVerified] = useState(false);
	const [showEmailVerification, setShowEmailVerification] = useState(false);
	const [verificationFailed, setVerificationFailed] = useState(false);
	const [businessVerified, setBusinessVerified] = useState(false);
	const [businessVerificationFailed, setBusinessVerificationFailed] = useState(false);
	const [showPasswordInput, setShowPasswordInput] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [remainingTime, setRemainingTime] = useState(300);
	const [timer, setTimer] = useState(null);
	const [userId, setUserId] = useState('');
	const [userIdVerificationFailed, setUserIdVerificationFailed] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirmError, setPasswordConfirmError] = useState(false);
	const [userIdVerified, setUserIdVerified] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

	const startTimer = () => {
		setRemainingTime(10); // 테스트를 위해 10으로 바꿈
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

	// 이메일 검증 모의 함수
	const mockEmailVerification = (email) => {
		return email.includes('@') && email.includes('.');
	};

	// 사업자번호 검증 모의 함수
	const mockBusinessNumberVerification = (number) => {
		return number.length === 10;
	};

	// 아이디 중복 검증 모의 함수
	const mockUserIdVerification = (userId) => {
		return userId.length >= 4;
	};

	// 비밀번호 규칙 검증 함수
	const validatePassword = (password) => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return regex.test(password);
	};

	// 아이디 검증 함수
	const validateUserId = (id) => {
		// 아이디 규칙: 영문, 숫자 조합 4~20자
		const regex = /^[A-Za-z0-9]{4,20}$/;
		return regex.test(id);
	};

	useEffect(() => {
		console.log("컴포넌트 리렌더링됨");
		console.log({
			showEmailInput,
			showBusinessInput,
			emailVerified,
			showEmailVerification,
			verificationFailed,
			remainingTime
		});
	}, [showEmailInput, showBusinessInput, emailVerified, showEmailVerification, verificationFailed, remainingTime]);

	return (
		<div>
			{console.log("렌더링 시작")}
			<div>
				{/* 임시 테스트용 버튼 추가 */}
				<ButtonContainer style={{ marginBottom: '1rem' }}>
					<LoginBlueButton onClick={() => setStep(6)}>
						다음 단계로 (임시)
					</LoginBlueButton>
				</ButtonContainer>

				{/* 기업 메일 / 사업자 등록 번호 선택 */}
				<ButtonContainer> 
					<SignupTypeButton 
						active={showEmailInput}
						onClick={() => {
							setShowEmailInput(true);
							setShowBusinessInput(false);
						}}
					>
						기업메일
					</SignupTypeButton>
					<SignupTypeButton 
						active={showBusinessInput}
						onClick={() => {
							setShowBusinessInput(true);
							setShowEmailInput(false);
						}}
					>
						사업자등록번호
					</SignupTypeButton>
				</ButtonContainer>

				{/* 기업 메일 회원가입 */}
				{/* 기업 메일 입력 */}
				{showEmailInput && (
					<InputSection>
						<SignupInput
							label="기업 메일"
							type="email"
							placeholder="기업 메일을 입력해주세요"
							$marginBottom={showEmailVerification && !emailVerified ? "0.25rem" : "1.25rem"}
							button={
								<SignupVerifyButton
									onClick={(e) => {
										e.preventDefault(); // 이벤트 전파 중단
										setShowEmailVerification(true);
										startTimer();
									}}
									// 이메일 인증 성공 또는 타이머가 작동 중이면 버튼 비활성화
									$disabled={emailVerified || (remainingTime > 0 && showEmailVerification)}
									$status={emailVerified ? 'success' : 'default'}
									$timing={remainingTime > 0 && showEmailVerification}
									$expired={remainingTime === 0 && showEmailVerification}
								>
									{emailVerified 
										? '인증 완료' 
										: showEmailVerification
											? formatTime(remainingTime) 
											: '메일 인증'
									}
								</SignupVerifyButton>
							}
						/>

						{/* 이메일 인증 입력 폼 */}
						{showEmailVerification && !emailVerified && (
							console.log("인증 입력폼 렌더링") ||
							<SignupInput
								type="text"
								maxLength="6"
								placeholder="인증번호 6자리 입력"
								$marginBottom={verificationFailed ? "0.25rem" : "1.25rem"}
								message={verificationFailed ? "코드가 일치하지 않아요." : null}
								messageStatus="error"
								showResend={verificationFailed}
								onResend={() => {
									startTimer();
									setVerificationFailed(false);
								}}
								button={
									<SignupVerifyButton
										onClick={(e) => {
											e.preventDefault(); // 이벤트 전파 중단
											const code = "1234"; // 임시 코드
											console.log("버튼 클릭됨");
											
											if (code === "1234") {
												console.log("인증 성공 처리 시작");
												setEmailVerified(true);
												setVerificationFailed(false);
												setShowEmailVerification(false);
												clearInterval(timer);
												console.log("인증 성공 처리 완료");
											} else {
												console.log("인증 실패 처리 시작");
												setVerificationFailed(true);
												console.log("verificationFailed 상태 변경됨");
											}
										}}
										$status={verificationFailed ? 'error' : 'default'}
									>
										{verificationFailed ? '인증실패' : '인증하기'}
									</SignupVerifyButton>
								}
							/>
						)}

						{/* 이메일 인증 완료 후 아이디/비밀번호 입력 */}
						{emailVerified && (
							<div>
								<SignupInput
									label="아이디"
									type="text"
									id="userId"
									placeholder="사용하실 아이디를 입력해주세요"
									value={userId}
									onChange={(e) => {
										setUserId(e.target.value);
										setUserIdVerificationFailed(false);
										setUserIdVerified(false);
									}}
									marginBottom={userIdVerificationFailed ? "0.25rem" : "1.25rem"}
									message={userIdVerificationFailed ? "사용할 수 없는 아이디에요." : null}
									messageStatus="error"
									button={
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
											$status={
												userIdVerified 
													? 'success' 
													: userIdVerificationFailed 
														? 'error' 
														: 'default'
											}
										>
											{userIdVerified ? '확인 완료' : '중복확인'}
										</SignupVerifyButton>
									}
								/>

								{showPasswordInput && (
									<>
										<SignupInput
											label="비밀번호"
											type="password"
											id="password"
											placeholder="비밀번호를 입력해주세요"
											value={password}
											onChange={(e) => {
												setPassword(e.target.value);
												setPasswordError(!validatePassword(e.target.value));
												// 비밀번호가 변경되면 확인 입력값 초기화
												setPasswordConfirm('');
											}}
											marginBottom={passwordError ? "0.25rem" : "1.25rem"}
											message="영문 대소문자, 숫자, 특수문자 포함 최소 8글자 이상을 입력해주세요."
											messageStatus={passwordError ? "error" : "default"}
										/>

										{/* 비밀번호가 규칙에 맞을 때만 비밀번호 확인 입력창 표시 */}
										{!passwordError && password && (
											<SignupInput
												label="비밀번호 확인"
												type="password"
												id="passwordConfirm"
												placeholder="비밀번호를 다시 입력해주세요"
												value={passwordConfirm}
												onChange={(e) => {
													setPasswordConfirm(e.target.value);
													setPasswordConfirmError(password !== e.target.value);
												}}
												marginBottom={passwordConfirmError ? "0.25rem" : "1.25rem"}
												message={
													passwordConfirmError
														? "패스워드가 일치하지 않아요."
														: "패스워드 확인을 위해 다시 한번 입력해주세요."
												}
												messageStatus={passwordConfirmError ? "error" : "default"}
											/>
										)}

										{/* 비밀번호 확인까지 입력되었을 때만 회원가입 버튼 표시 */}
										{!passwordError && password && passwordConfirm && (
											<SignupVerifyButton
												onClick={() => setStep(6)}
												$disabled={passwordError || passwordConfirmError}
												$status={passwordError || passwordConfirmError ? 'error' : 'default'}
											>
												회원가입
											</SignupVerifyButton>
										)}
									</>
								)}
							</div>
						)}
					</InputSection>
				)}

				{/* 사업자 등록 번호 회원가입 */}
				{showBusinessInput && (
					<InputSection>
						{/* 1. 사업자등록번호 확인 */}
						<SignupInput
							label="사업자등록번호"
							type="text"
							id="businessNumber"
							placeholder="사업자등록번호 10자리를 입력해주세요"
							maxLength="10"
							$marginBottom={businessVerificationFailed ? "0.25rem" : "1.25rem"}
							message={businessVerificationFailed ? "유효하지 않은 사업자등록번호입니다" : null}
							messageStatus="error"
							button={
								<SignupVerifyButton
									onClick={() => {
										const businessNumber = document.getElementById('businessNumber').value;
										if (businessNumber === "1234567890") {
											setBusinessVerified(true);
											setBusinessVerificationFailed(false);
										} else {
											setBusinessVerificationFailed(true);
											setBusinessVerified(false);
										}
									}}
									$disabled={businessVerified}
									$status={businessVerified ? 'success' : businessVerificationFailed ? 'error' : 'default'}
								>
									{businessVerified ? '검증 완료' : '검증하기'}
								</SignupVerifyButton>
							}
						/>

						{/* 2. 아이디 확인 (사업자등록번호 인증 완료 시) */}
						{businessVerified && (
							<SignupInput
								label="아이디"
								type="text"
								id="userId"
								placeholder="사용하실 아이디를 입력해주세요"
								value={userId}
								onChange={(e) => {
									setUserId(e.target.value);
									setUserIdVerificationFailed(false);
									setUserIdVerified(false);
								}}
								$marginBottom={userIdVerificationFailed ? "0.25rem" : "1.25rem"}
								message={userIdVerificationFailed ? "사용할 수 없는 아이디에요." : null}
								messageStatus="error"
								button={
									<SignupVerifyButton
										onClick={() => {
											if (validateUserId(userId)) {
												setUserIdVerified(true);
												setUserIdVerificationFailed(false);
											} else {
												setUserIdVerificationFailed(true);
												setUserIdVerified(false);
											}
										}}
										$status={
											userIdVerified 
												? 'success' 
												: userIdVerificationFailed 
													? 'error' 
													: 'default'
										}
									>
										{userIdVerified ? '확인 완료' : '중복확인'}
									</SignupVerifyButton>
								}
							/>
						)}

						{/* 3. 이메일 인증 (아이디 인증 완료 시) */}
						{userIdVerified && (
							<>
								<SignupInput
									label="이메일"
									type="email"
									id="corporateEmail"
									placeholder="이메일을 입력해주세요"
									$marginBottom={showEmailVerification && !emailVerified ? "0.25rem" : "1.25rem"}
									button={
										<SignupVerifyButton
											onClick={() => {
												setShowEmailVerification(true);
												startTimer();
											}}
											$disabled={emailVerified || (remainingTime > 0 && showEmailVerification)}
											$status={emailVerified ? 'success' : 'default'}
											$timing={remainingTime > 0 && showEmailVerification}
											$expired={remainingTime === 0 && showEmailVerification}
										>
											{emailVerified 
												? '인증 완료' 
												: showEmailVerification
													? formatTime(remainingTime) 
													: '메일 인증'
											}
										</SignupVerifyButton>
									}
								/>

								{/* 이메일 인증번호 입력 */}
								{showEmailVerification && !emailVerified && (
									<SignupInput
										type="text"
										maxLength="6"
										placeholder="인증번호 6자리 입력"
										$marginBottom={verificationFailed ? "0.25rem" : "1.25rem"}
										message={verificationFailed ? "코드가 일치하지 않아요." : null}
										messageStatus="error"
										showResend={verificationFailed}
										onResend={() => {
											startTimer();
											setVerificationFailed(false);
										}}
										button={
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
										}
									/>
								)}
							</>
						)}

						{/* 4, 5, 6. 비밀번호 입력, 확인 및 회원가입 (이메일 인증 완료 시) */}
						{emailVerified && (
							<>
								<SignupInput
									label="비밀번호"
									type="password"
									id="password"
									placeholder="비밀번호를 입력해주세요"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										setPasswordError(!validatePassword(e.target.value));
										setPasswordConfirm('');
									}}
									$marginBottom={passwordError ? "0.25rem" : "1.25rem"}
									message="영문 대소문자, 숫자, 특수문자 포함 최소 8글자 이상을 입력해주세요."
									messageStatus={passwordError ? "error" : "default"}
								/>

								{/* 비밀번호가 규칙에 맞을 때만 비밀번호 확인 표시 */}
								{!passwordError && password && (
									<SignupInput
										label="비밀번호 확인"
										type="password"
										id="passwordConfirm"
										placeholder="비밀번호를 다시 입력해주세요"
										value={passwordConfirm}
										onChange={(e) => {
											setPasswordConfirm(e.target.value);
											setPasswordConfirmError(password !== e.target.value);
										}}
										$marginBottom={passwordConfirmError ? "0.25rem" : "1.25rem"}
										message={
											passwordConfirmError
												? "패스워드가 일치하지 않아요."
												: "패스워드 확인을 위해 다시 한번 입력해주세요."
										}
										messageStatus={passwordConfirmError ? "error" : "default"}
									/>
								)}

								{/* 모든 조건이 만족되면 회원가입 버튼 표시 */}
								{!passwordError && password && passwordConfirm && !passwordConfirmError && (
									<SignupVerifyButton
										onClick={() => setStep(6)}
										$status="default"
									>
										회원가입
									</SignupVerifyButton>
								)}
							</>
						)}
					</InputSection>
				)}
			</div>
		</div>
	);
};

export default SignupPage5;
