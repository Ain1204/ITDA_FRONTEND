import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignupBackground from '../components/SignupBackground';
import SignupLongButton from '../components/SignupLongButton';
import SignupNextButton from '../components/SignupNextButton';

const PageContainer = styled.div`
	display: flex;
	min-height: 100vh;
`;

const SignupSection = styled.div`
	position: relative;
	width: 47.92%;
	margin-left: 52.08%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SignupContainer = styled.div`
	flex-direction: column;
	align-items: center;
	width: 400px;
`;

const Title = styled.h1`{
	alignSelf: 'stretch',
	color: '#1A1A23',
	fontFamily: '"SUIT Variable"',
	fontSize: '32px',
	fontStyle: 'normal',
	fontWeight: 700,
	lineHeight: '150%',
	letterSpacing: '-0.8px'
}`;

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

const SignupPage = () => {
	const navigate = useNavigate();
	const [accountType, setAccountType] = useState(null);
	const [step, setStep] = useState(1);
	const [verificationStatus, setVerificationStatus] = useState(false);
	const [showEmailInput, setShowEmailInput] = useState(false);
	const [showEmailVerification, setShowEmailVerification] = useState(false);
	const [emailVerified, setEmailVerified] = useState(false);
	const [showPasswordInput, setShowPasswordInput] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [showBusinessInput, setShowBusinessInput] = useState(false);
	const [businessVerified, setBusinessVerified] = useState(false);
	const [timer, setTimer] = useState(null);
	const [remainingTime, setRemainingTime] = useState(300); // 5분 = 300초
	const [verificationFailed, setVerificationFailed] = useState(false);
	const [businessVerificationFailed, setBusinessVerificationFailed] = useState(false);

	const handleAccountTypeSelect = (type) => {
		setAccountType(type);
		setStep(2);
	};

	const getHeaderText = () => {
		switch (step) {
			case 1:
			case 2:
				return "반가워요!";
			case 3:
				return "당신에 대해 알려주세요!";
			case 4:
				return "휴대폰으로 인증할게요.";
			case 5:
				return "거의 다 왔어요!";
			case 6:
				return "회원가입을 완료했어요!";
			default:
				return "";
		}
	};

	const getSubtitleText = () => {
		switch (step) {
			case 1:
				return "계정 유형을 선택해 주세요.";
			case 2:
				return "이용약관에 동의해 주세요.";
			case 3:
				return "회원 정보를 입력해 주세요.";
			case 4:
				return "인증번호를 입력해 주세요";
			case 5:
				return "서비스에 이용할 정보를 입력해주세요.";
			default:
				return "";
		}
	};

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
		<PageContainer>
			<SignupBackground />
			<SignupSection>
				<SignupContainer>
					<Title>{getHeaderText()}</Title>
					
					{step === 1 && (
						<div>
							<Subtitle>{getSubtitleText()}</Subtitle>
							<div>
								<SignupLongButton
									onClick={() => handleAccountTypeSelect('business')}
								>
									기업
								</SignupLongButton>
								<SignupLongButton
									onClick={() => handleAccountTypeSelect('university')}
								>
									대학생 단체
								</SignupLongButton>
							</div>
						</div>
					)}

					{step === 2 && (
						<div>
							<Subtitle>{getSubtitleText()}</Subtitle>
							<div>
								<div>
									<input type="checkbox" id="terms" />
									<label htmlFor="terms">약관 전체 동의</label>
								</div>
								<div>
									<input type="checkbox" id="terms" />
									<label htmlFor="terms">서비스 이용약관 동의 (필수)</label>
								</div>
								<div>
									<input type="checkbox" id="privacy" />
									<label htmlFor="privacy">개인 정보 수집 및 이용동의 (필수)</label>
								</div>
								<div>
									<input type="checkbox" id="privacy" />
									<label htmlFor="privacy">E-mail 광고성 정보 수신 동의 (선택)</label>
								</div>
							</div>
							<SignupNextButton 
								onClick={() => setStep(3)} 
							>
								다음으로
							</SignupNextButton>
						</div>
					)}

					{step === 3 && (
						<div>
							<Subtitle>{getSubtitleText()}</Subtitle>
							<div>
								<div>
									<label htmlFor="name">이름</label>
									<input type="text" id="name" placeholder="이름을 입력하세요" />
								</div>
								
								<div>
									<label htmlFor="ssn">주민등록번호</label>
									<div>
										<input type="text" id="ssn1" maxLength="6" placeholder="앞 6자리" /> -
										<input type="password" id="ssn2" maxLength="7" placeholder="뒤 7자리" />
									</div>
								</div>

								<div>
									<label>통신사</label>
									<select>
										<option value="">통신사 선택</option>
										<option value="SKT">SKT</option>
										<option value="KT">KT</option>
										<option value="LGU+">LGU+</option>
										<option value="알뜰폰">알뜰폰</option>
									</select>
								</div>

								<div>
									<label htmlFor="phone">휴대폰 번호</label>
									<input type="tel" id="phone" placeholder="'-' 없이 입력하세요" maxLength="11" />
								</div>
							</div>
							<button onClick={() => setStep(4)}>
								인증하기
							</button>
						</div>
					)}

					{step === 4 && (
						<div>
							<Subtitle>{getSubtitleText()}</Subtitle>
							<div>
								<div>
									<label htmlFor="verificationCode">인증번호</label>
									<input 
										type="text" 
										id="verificationCode" 
										maxLength="6" 
										placeholder="인증번호 6자리 입력"
										onChange={(e) => {
											if (e.target.value === "123456") {
												setVerificationStatus(true);
											} else {
												setVerificationStatus(false);
											}
										}}
									/>
									{verificationStatus ? (
										<p style={{ color: '#2E7D32', margin: '4px 0' }}>
											코드가 일치해요
										</p>
									) : (
										<p style={{ color: '#D32F2F', margin: '4px 0' }}>
											코드가 일치하지 않아요
										</p>
									)}
									<button>재전송</button>
								</div>
								<div>
									<span>남은 시간: 3:00</span>
								</div>
							</div>
							<button 
								onClick={() => verificationStatus && setStep(5)}
								disabled={!verificationStatus}
								style={{
									color: verificationStatus ? '#007bff' : '#cccccc',
									cursor: verificationStatus ? 'pointer' : 'not-allowed'
								}}
							>
								다음으로
							</button>
						</div>
					)}

					{step === 5 && (
						<div>
							<Subtitle>{getSubtitleText()}</Subtitle>
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
												{verificationFailed && (
													<p style={{ color: '#D32F2F', margin: '4px 0' }}>
														코드가 일치하지 않습니다
													</p>
												)}
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
															<p style={{ 
																color: '#666666', 
																fontSize: '12px',
																margin: '4px 0'
															}}>
																영문 대소문자, 숫자, 특수문자 포함 최소 8글자 이상을 입력해주세요
															</p>
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
															<p style={{ 
																color: '#666666', 
																fontSize: '12px',
																margin: '4px 0'
															}}>
																패스워드 확인을 위해 다시 한번 입력해주세요.
															</p>
														</div>
														{passwordConfirm && (
															<p style={{ 
																color: password === passwordConfirm ? '#2E7D32' : '#D32F2F',
																margin: '4px 0' 
															}}>
																{password === passwordConfirm 
																	? '비밀번호가 일치합니다' 
																	: '비밀번호가 일치하지 않습니다'}
															</p>
														)}
														{password && passwordConfirm && password === passwordConfirm && (
															<button 
																onClick={() => setStep(6)}
																style={{
																	color: '#007bff',
																	cursor: 'pointer',
																	marginTop: '10px'
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
												if (businessNumber === "1234567890") { // 임시 검증 로직
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
														<button 
															onClick={() => {
																clearInterval(timer);
																startTimer();
																setVerificationFailed(false);
															}}
															disabled={remainingTime > 0}
														>
															{remainingTime > 0 ? formatTime(remainingTime) : '재전송'}
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
																	<p style={{ 
																		color: '#666666', 
																		fontSize: '12px',
																		margin: '4px 0'
																	}}>
																		영문 대소문자, 숫자, 특수문자 포함 최소 8글자 이상을 입력해주세요
																	</p>
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
																{passwordConfirm && (
																	<p style={{ 
																		color: password === passwordConfirm ? '#2E7D32' : '#D32F2F',
																		margin: '4px 0' 
																	}}>
																		{password === passwordConfirm 
																			? '비밀번호가 일치합니다' 
																			: '비밀번호가 일치하지 않습니다'}
																	</p>
																)}
																{password && passwordConfirm && password === passwordConfirm && (
																	<button 
																		onClick={() => setStep(6)}
																		style={{
																			color: '#007bff',
																			cursor: 'pointer',
																			marginTop: '10px'
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
					)}

					{step === 6 && (
						<div>
							<Subtitle>{getSubtitleText()}</Subtitle>
							<div>
								<button onClick={() => navigate('/')}>
									메인 페이지로 이동
									</button>
							</div>
						</div>
					)}
				</SignupContainer>
			</SignupSection>
		</PageContainer>
	);
};

export default SignupPage;
