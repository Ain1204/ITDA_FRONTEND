import { useState } from 'react';
import styled from 'styled-components';

const Subtitle = styled.h4`
	display: flex;
	align-self: stretch;
	color: #4F5462;
	text-align: center;
	font-family: "SUIT Variable";
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%;
	letter-spacing: -0.5px;
	margin-bottom: 60px;
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

	return (
		<div>
			<Subtitle>서비스에 이용할 정보를 입력해주세요.</Subtitle>
			<div>
				<div>
					<button onClick={() => {
						setShowEmailInput(true);
						setShowBusinessInput(false);
					}}>
						기업메일
					</button>

					<button onClick={() => {
						setShowBusinessInput(true);
						setShowEmailInput(false);
					}}>
						사업자등록번호
					</button>
				</div>
				
				{showEmailInput && (
					<div>
						<label htmlFor="corporateEmail">기업 메일</label>
						<input 
							type="email" 
							id="corporateEmail" 
							placeholder="기업 메일을 입력해주세요" 
						/>
						<button 
							onClick={() => {
								setShowEmailVerification(true);
								startTimer();
							}}
							disabled={emailVerified || (remainingTime > 0)}
						>
							{emailVerified 
								? '인증 완료' 
								: remainingTime > 0 
									? formatTime(remainingTime) 
									: '메일 인증'
							}
						</button>

						{/* 이메일 인증 입력 폼 */}
						{showEmailVerification && !emailVerified && (
							<div>
								<label htmlFor="emailVerificationCode">인증번호</label>
								<input 
									type="text" 
									id="emailVerificationCode" 
									maxLength="6" 
									placeholder="인증번호 4자리 입력"
								/>
								<button 
									onClick={() => {
										const code = document.getElementById('emailVerificationCode').value;
										if (code === "1234") {
											setEmailVerified(true);
											setShowEmailVerification(false);
											setVerificationFailed(false);
											clearInterval(timer);
										} else {
											setVerificationFailed(true);
										}
									}}
								>
									{verificationFailed ? '인증실패' : '인증하기'}
								</button>
							</div>
						)}

						{/* 이메일 인증 완료 후 아이디/비밀번호 입력 */}
						{emailVerified && (
							<div>
								<label htmlFor="userId">아이디</label>
								<input 
									type="text" 
									id="userId" 
									placeholder="사용하실 아이디를 입력해주세요" 
								/>
								<button 
									onClick={() => setShowPasswordInput(true)}
									style={{
										color: '#007bff',
										cursor: 'pointer'
									}}
								>
									중복확인
								</button>

								{showPasswordInput && (
									<div>
										<div>
											<label htmlFor="password">비밀번호</label>
											<input 
												type="password" 
												id="password" 
												placeholder="비밀번호를 입력해주세요" 
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
										<div>
											<label htmlFor="passwordConfirm">비밀번호 확인</label>
											<input 
												type="password" 
												id="passwordConfirm" 
												placeholder="비밀번호를 다시 입력해주세요" 
												value={passwordConfirm}
												onChange={(e) => setPasswordConfirm(e.target.value)}
											/>
										</div>
										{password && passwordConfirm && (
											<button 
												onClick={() => setStep(6)}
												disabled={password !== passwordConfirm}
												style={{
													color: password === passwordConfirm ? '#007bff' : '#cccccc',
													cursor: password === passwordConfirm ? 'pointer' : 'not-allowed'
												}}
											>
												회원가입
											</button>
										)}
									</div>
								)}
							</div>
						)}
					</div>
				)}

				{showBusinessInput && (
					<div>
						<label htmlFor="businessNumber">사업자등록번호</label>
						<input 
							type="text" 
							id="businessNumber" 
							placeholder="사업자등록번호를 입력해주세요" 
							maxLength="10"
						/>
						<button 
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
							disabled={businessVerified}
						>
							{businessVerified ? '인증 완료' : '인증하기'}
						</button>
						{businessVerificationFailed && (
							<p style={{ color: '#D32F2F', margin: '4px 0' }}>
								유효하지 않은 사업자등록번호입니다
							</p>
						)}

						{businessVerified && (
							<div>
								<label htmlFor="corporateEmail">이메일</label>
								<input 
									type="email" 
									id="corporateEmail" 
									placeholder="이메일을 입력해주세요" 
								/>
								<button 
									onClick={() => {
										setShowEmailVerification(true);
										startTimer();
									}}
									disabled={emailVerified}
								>
									{emailVerified ? '인증 완료' : '메일 인증'}
								</button>

								{showEmailVerification && !emailVerified && (
									<div>
										<label htmlFor="emailVerificationCode">인증번호</label>
										<input 
											type="text" 
											id="emailVerificationCode" 
											maxLength="6" 
											placeholder="인증번호 4자리 입력"
										/>
										<button 
											onClick={() => {
												const code = document.getElementById('emailVerificationCode').value;
												if (code === "1234") {
													setEmailVerified(true);
													setShowEmailVerification(false);
													setVerificationFailed(false);
													clearInterval(timer);
												} else {
													setVerificationFailed(true);
												}
											}}
										>
											{verificationFailed ? '인증실패' : '인증하기'}
										</button>
									</div>
								)}

								{emailVerified && (
									<div>
										<label htmlFor="userId">아이디</label>
										<input 
											type="text" 
											id="userId" 
											placeholder="사용하실 아이디를 입력해주세요" 
										/>
										<button 
											onClick={() => setShowPasswordInput(true)}
											style={{
												color: '#007bff',
												cursor: 'pointer'
											}}
										>
											중복확인
										</button>

										{showPasswordInput && (
											<div>
												<div>
													<label htmlFor="password">비밀번호</label>
													<input 
														type="password" 
														id="password" 
														placeholder="비밀번호를 입력해주세요" 
														value={password}
														onChange={(e) => setPassword(e.target.value)}
													/>
												</div>
												<div>
													<label htmlFor="passwordConfirm">비밀번호 확인</label>
													<input 
														type="password" 
														id="passwordConfirm" 
														placeholder="비밀번호를 다시 입력해주세요" 
														value={passwordConfirm}
														onChange={(e) => setPasswordConfirm(e.target.value)}
													/>
												</div>
												{password && passwordConfirm && (
													<button 
														onClick={() => setStep(6)}
														disabled={password !== passwordConfirm}
														style={{
															color: password === passwordConfirm ? '#007bff' : '#cccccc',
															cursor: password === passwordConfirm ? 'pointer' : 'not-allowed'
														}}
													>
														회원가입
													</button>
												)}
											</div>
										)}
									</div>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default SignupPage5;
