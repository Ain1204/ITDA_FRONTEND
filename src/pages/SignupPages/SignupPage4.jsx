import styled from 'styled-components';
import NextButton from '../../components/ArrowBlueButton';
import { useState, useEffect, useRef } from 'react';
import { useSignup } from '../../services/SignupContext';
import { 
	RecaptchaVerifier,
	signInWithPhoneNumber, 
	PhoneAuthProvider,
	signInWithCredential
} from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import logger from '../../utils/logger';

// 인증번호 입력 필드 라벨 스타일
const InputLabel = styled.label`
	align-self: stretch;
	color: var(--Colors-GrayScale-G500, #4F5462);
	font-family: "SUIT Variable";
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 168%;
	letter-spacing: -0.35px;
	margin-top: 28px;
	display: block;
	margin-bottom: 8px;
`;

// 인증번호 입력 필드 스타일
const StyledInput = styled.input`
    display: flex;
    width: 300px;
    height: 48px;
    padding: 12px 16px;
    align-items: center;
    gap: 8px;
    border-radius: 12px;
    background: var(--Colors-GrayScale-G200, #F3F5F8);
    box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
    border: none;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.4px;
`;

// 타이머 텍스트 스타일 - 만료 시 색상 변경
const TimerText = styled.span`
	display: flex;
    width: 92px;
    height: 48px;
	padding: 12px 16px;
	height: 48px;
	justify-content: center;
	align-items: center;
	gap: 4px;
	border-radius: 12px;
	background: var(--Colors-GrayScale-G200, #F3F5F8);
	box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
	
	color: ${props => props.$isExpired ? '#EF5D58' : 'var(--Colors-Primary-B500, #0051FF)'};
	font-family: "SUIT Variable";
	font-size: 20px;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: 2px;
`;

// 인증번호 입력 필드와 타이머를 포함하는 컨테이너
const InputContainer = styled.div`
	position: relative;
	display: flex;
	gap: 8px;
	align-items: center;
`;

// 인증 메시지 스타일 - 인증 성공/실패/만료에 따라 색상 변경
const VerificationMessage = styled.p`
	margin: 8px 0 4px 0;
	color: ${props => {
		if (props.$timeExpired) return '#EF5D58';
		return props.$isValid ? '#01B777' : '#EF5D58';
	}};
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 132%;
	letter-spacing: -0.3px;
`;

// "문제가 있나요?" 텍스트 스타일
const ResendText = styled.span`
	color: var(--Colors-Primary-B500, #0051FF);
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 132%;
	letter-spacing: -0.3px;
`;

// 다시 보내기 버튼 스타일
const ResendButton = styled.button`
	color: var(--Colors-Primary-B500, #0051FF);
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 132%;
	letter-spacing: -0.3px;
	text-decoration-line: underline;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	
	&:disabled {
		cursor: default;
	}
`;

// 로딩 인디케이터 스타일
const LoadingIndicator = styled.div`
	display: inline-block;
	width: 16px;
	height: 16px;
	border: 2px solid #f3f3f3;
	border-radius: 50%;
	border-top: 2px solid #0051FF;
	animation: spin 1s linear infinite;
	margin-right: 8px;
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
`;

// 상태 메시지 컨테이너 스타일
const StatusMessage = styled.div`
	display: flex;
	align-items: center;
	margin: 8px 0;
	color: ${props => props.isSuccess ? '#01B777' : props.isError ? '#EF5D58' : '#949BAD'};
	font-family: "SUIT Variable";
	font-size: 12px;
	font-weight: 500;
	line-height: 132%;
`;

// reCAPTCHA 및 로딩 표시를 위한 컨테이너
const RecaptchaContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 20px 0;
	width: 100%;
`;

/**
 * 휴대폰 인증 페이지 컴포넌트
 * 
 * 로직 흐름:
 * 1. 컴포넌트 마운트 시 invisible reCAPTCHA(v3)가 자동으로 초기화됨
 * 2. reCAPTCHA 인증 성공 후 자동으로 인증번호가 사용자 휴대폰으로 전송됨
 * 3. 인증번호 입력 UI가 표시되고 사용자는 수신한 인증번호를 입력
 * 4. 타이머가 작동하며 제한 시간 내에 인증 필요
 * 5. 인증 실패 또는 문제 발생 시 '다시 보내기' 버튼으로 프로세스 재시작
 */
const SignupPage4 = ({ setStep, verificationStatus, setVerificationStatus }) => {
	// 상태 관리
	const [timeLeft, setTimeLeft] = useState(600); // 10분(600초) 타이머
	const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머 실행 상태
	const [verificationCode, setVerificationCode] = useState(''); // 사용자 입력 인증 코드
	const [verificationId, setVerificationId] = useState(''); // Firebase 인증 ID
	const [isLoading, setIsLoading] = useState(false); // 로딩 상태
	const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지
	const [isSending, setIsSending] = useState(false); // 인증번호 전송 중 상태
	const { signupData, updateSignupData } = useSignup(); // 회원가입 데이터 컨텍스트
	const [verificationSent, setVerificationSent] = useState(false); // 인증번호 전송 완료 상태
	const recaptchaVerifierRef = useRef(null); // reCAPTCHA 인스턴스 저장용 ref

	/**
	 * 타이머 로직
	 * - 인증번호 전송 후 10분(600초) 카운트다운
	 * - 시간 만료 시 타이머 중지 및 상태 업데이트
	 */
	useEffect(() => {
		if (!isTimerRunning) return;

		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime <= 1) {
					setIsTimerRunning(false);
					clearInterval(timer);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
	}, [isTimerRunning]);

	/**
	 * reCAPTCHA 초기화 및 인증번호 자동 전송 로직
	 * - 컴포넌트 마운트 시 자동 실행
	 * - 이미 인증 성공했거나 인증번호 전송 완료된 경우 실행 안함
	 */
	useEffect(() => {
		// 이미 인증 성공했거나 인증번호가 이미 전송된 경우 스킵
		if (verificationStatus || verificationSent) return;
		
		// reCAPTCHA 초기화 및 인증번호 전송 함수
		const initRecaptcha = async () => {
			try {
				setIsLoading(true);
				setErrorMessage('');
				
				// invisible reCAPTCHA(v3) 초기화 - 사용자에게 보이지 않음
				recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
					'size': 'invisible', // 보이지 않는 reCAPTCHA 사용
					'callback': () => {
						// reCAPTCHA 인증 성공 시 호출 (사용자는 이 과정을 인지하지 못함)
					},
					'expired-callback': () => {
						// reCAPTCHA 만료 시 호출
						setErrorMessage('보안 인증이 만료되었습니다. 페이지를 새로고침해 주세요.');
					}
				});
				
				// reCAPTCHA 초기화 후 자동으로 인증번호 전송 시작
				await handleSendVerificationCode(recaptchaVerifierRef.current);
			} catch (error) {
				logger.error('reCAPTCHA 초기화 실패:', error);
				setErrorMessage('보안 인증 초기화에 실패했습니다. 페이지를 새로고침해 주세요.');
			} finally {
				setIsLoading(false);
			}
		};
		
		// 초기화 함수 호출
		initRecaptcha();
		
	}, [verificationStatus, verificationSent]);

	/**
	 * 인증번호 전송 처리 함수
	 * - reCAPTCHA 인증 후 Firebase로 인증번호 전송 요청
	 * - 성공 시 타이머 시작 및 UI 상태 업데이트
	 * - 실패 시 에러 메시지 표시
	 */
	const handleSendVerificationCode = async (recaptchaVerifier) => {
		if (isLoading || isSending) return; // 이미 처리 중이면 중복 실행 방지
		
		try {
			setIsLoading(true);
			setIsSending(true);
			setErrorMessage('');
			
			// 회원가입 컨텍스트에서 전화번호 가져오기
			const phoneNumber = signupData.phoneNumber;
			
			// 전화번호 형식 변환 (국가 코드 추가)
			// - 한국 번호는 +82로 시작하도록 변환 (예: 010-1234-5678 → +821012345678)
			const formattedNumber = phoneNumber.startsWith('+') 
				? phoneNumber.replace(/-/g, '') 
				: `+82${phoneNumber.replace(/-/g, '').replace(/^0/, '')}`;
			
			// Firebase를 통해 SMS 인증번호 전송
			const confirmationResult = await signInWithPhoneNumber(
				auth, 
				formattedNumber, 
				recaptchaVerifier
			);
			
			// 인증 결과 저장 (나중에 인증번호 확인 시 사용)
			window.confirmationResult = confirmationResult;
			setVerificationId(confirmationResult.verificationId);
			
			// 인증번호 전송 성공 시 타이머 시작 및 상태 업데이트
			setIsTimerRunning(true);
			setTimeLeft(600); // 10분(600초) 타이머 리셋
			setVerificationSent(true); // 인증번호 전송 완료 표시
		} catch (error) {
			logger.error('인증번호 전송 실패:', error);
			
			// 에러 코드에 따른 사용자 친화적인 메시지 표시
			if (error.code === 'auth/invalid-phone-number') {
				setErrorMessage('유효하지 않은 전화번호입니다. 올바른 형식으로 입력해주세요.');
			} else if (error.code === 'auth/quota-exceeded') {
				setErrorMessage('너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.');
			} else if (error.code === 'auth/captcha-check-failed') {
				setErrorMessage('보안 인증에 실패했습니다. 페이지를 새로고침 후 다시 시도해주세요.');
			} else if (error.message) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
			}
		} finally {
			// 상태 업데이트
			setIsLoading(false);
			setIsSending(false);
		}
	};

	/**
	 * 타이머 시간 형식화 함수 (MM:SS 형식으로 변환)
	 */
	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

	/**
	 * '다시 보내기' 버튼 클릭 처리 함수
	 * - reCAPTCHA를 초기화하고 인증번호를 재전송
	 */
	const handleResend = async () => {
		try {
			setIsLoading(true);
			setErrorMessage('');
			
			// 기존 reCAPTCHA 인스턴스 정리
			if (recaptchaVerifierRef.current) {
				try {
					recaptchaVerifierRef.current.clear();
				} catch (error) {
					logger.debug('reCAPTCHA 정리 중 무시할 수 있는 오류:', error);
				}
			}
			
			// 인증 관련 상태 초기화
			setVerificationSent(false);
			setIsTimerRunning(false);
			setTimeLeft(600);
			setVerificationCode('');
			setVerificationId('');
			
			// DOM에서 reCAPTCHA 컨테이너 완전히 재생성
			const recaptchaContainer = document.getElementById('recaptcha-container');
			if (recaptchaContainer) {
				// 기존 컨테이너 제거
				const parentElement = recaptchaContainer.parentElement;
				if (parentElement) {
					recaptchaContainer.remove();
					
					// 새 컨테이너 생성
					const newContainer = document.createElement('div');
					newContainer.id = 'recaptcha-container';
					newContainer.style.display = 'none';
					parentElement.appendChild(newContainer);
				}
			}
			
			// 약간의 지연 후 새 reCAPTCHA 인스턴스 생성
			await new Promise(resolve => setTimeout(resolve, 500));
			
			// 새로운 reCAPTCHA 인스턴스 생성
			recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
				'size': 'invisible',
				'callback': () => {},
				'expired-callback': () => {}
			});
			
			// 전화번호 가져오기
			const phoneNumber = signupData.phoneNumber;
			// 전화번호 형식 변환
			const formattedNumber = phoneNumber.startsWith('+') 
				? phoneNumber.replace(/-/g, '') 
				: `+82${phoneNumber.replace(/-/g, '').replace(/^0/, '')}`;
			
			// 인증번호 재전송
			const confirmationResult = await signInWithPhoneNumber(
				auth, 
				formattedNumber, 
				recaptchaVerifierRef.current
			);
			
			// 확인 결과 저장
			window.confirmationResult = confirmationResult;
			setVerificationId(confirmationResult.verificationId);
			setIsTimerRunning(true);
			setTimeLeft(600); // 10분(600초) 타이머 리셋
			setVerificationSent(true);
			
		} catch (error) {
			logger.error('인증번호 재전송 실패:', error);
			
			if (error.code === 'auth/captcha-check-failed') {
				setErrorMessage('보안 인증에 실패했습니다. 페이지를 새로고침 후 다시 시도해주세요.');
			} else if (error.code === 'auth/quota-exceeded') {
				setErrorMessage('너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.');
			} else if (error.message && error.message.includes('reCAPTCHA')) {
				setErrorMessage('보안 인증 오류가 발생했습니다. 페이지를 새로고침해 주세요.');
			} else {
				setErrorMessage('인증번호 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * 인증번호 입력 처리 함수
	 */
	const handleCodeChange = (e) => {
		setVerificationCode(e.target.value);
		// 코드가 변경되면 인증 상태 초기화
		setVerificationStatus(false);
	};

	/**
	 * 인증번호 확인 처리 함수
	 * - 사용자가 입력한 인증번호를 Firebase로 검증
	 * - 성공 시 인증 상태 업데이트 및 회원가입 컨텍스트 업데이트
	 */
	const handleVerification = async () => {
		// 입력 값 검증
		if (!verificationCode || verificationCode.length !== 6) {
			setVerificationStatus(false);
			setErrorMessage('인증번호 6자리를 입력해주세요.');
			return;
		}

		try {
			setIsLoading(true);
			setErrorMessage('');

			// 1. window.confirmationResult 방식으로 인증 시도 (권장 방식)
			if (window.confirmationResult) {
				try {
					const result = await window.confirmationResult.confirm(verificationCode);
					
					// 인증 성공
					setVerificationStatus(true);
					setErrorMessage('');
					// 휴대폰 인증 상태를 컨텍스트에 저장
					updateSignupData({ phoneVerified: true });
					return; // 성공했으므로 함수 종료
				} catch (confirmError) {
					logger.error('window.confirmationResult 사용 중 오류:', confirmError);
					// window.confirmationResult 사용 실패 시 기존 방식으로 진행
				}
			}

			// 2. 대체 방식: verificationId와 PhoneAuthProvider.credential 사용
			if (!verificationId) {
				throw new Error('인증 정보가 유효하지 않습니다. 다시 인증번호를 요청해주세요.');
			}

			// Firebase 인증 확인
			const credential = PhoneAuthProvider.credential(
				verificationId, 
				verificationCode
			);

			await signInWithCredential(auth, credential);
			
			// 인증 성공
			setVerificationStatus(true);
			setErrorMessage('');
			// 휴대폰 인증 상태를 컨텍스트에 저장
			updateSignupData({ phoneVerified: true });
		} catch (error) {
			logger.error('인증 실패:', error);
			setVerificationStatus(false);
			
			// 에러 코드에 따른 사용자 친화적인 메시지 표시
			if (error.code === 'auth/invalid-verification-code') {
				setErrorMessage('코드가 일치하지 않아요.');
			} else if (error.code === 'auth/code-expired') {
				setErrorMessage('시간이 초과되었어요. 다시 시도해주세요.');
				setTimeLeft(0);
			} else if (error.message) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage('인증에 실패했습니다. 다시 시도해주세요.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * 다음 단계로 이동하는 함수
	 * - 인증 성공 상태에서만 다음 단계로 이동 가능
	 */
	const handleNextClick = () => {
		if (verificationStatus) {
			setStep(5);
		}
	};

	// 컴포넌트 언마운트 시 reCAPTCHA 정리
	useEffect(() => {
		return () => {
			try {
				// reCAPTCHA 리셋 (필요한 경우)
				if (window.grecaptcha && recaptchaVerifierRef.current) {
					window.grecaptcha.reset(recaptchaVerifierRef.current);
				}
			} catch (error) {
				logger.debug('reCAPTCHA 정리 중 무시할 수 있는 오류:', error);
			}
		};
	}, []);

	return (
		<div>
			{/* reCAPTCHA를 위한 보이지 않는 컨테이너 */}
			<div id="recaptcha-container" style={{ display: 'none' }}></div>
			
			{/* 로딩 중이고 인증번호가 아직 전송되지 않은 경우 로딩 표시 */}
			{isLoading && !verificationSent ? (
				<RecaptchaContainer>
					<StatusMessage>
						<LoadingIndicator /> 인증번호 전송 중...
					</StatusMessage>
				</RecaptchaContainer>
			) : (
				<div>
					{/* 인증번호 입력 UI */}
					<InputLabel htmlFor="verificationCode">인증번호</InputLabel>

					<InputContainer>
						<StyledInput 
							type="text" 
							id="verificationCode" 
							maxLength="6" 
							placeholder="인증번호 6자리 입력"
							value={verificationCode}
							onChange={handleCodeChange}
							disabled={isLoading || timeLeft === 0}
						/>
						<TimerText $isExpired={timeLeft === 0}>{formatTime(timeLeft)}</TimerText>
					</InputContainer>

					{/* 인증 결과 또는 에러 메시지 표시 */}
					{(errorMessage || verificationStatus) && (
						<VerificationMessage 
							$isValid={verificationStatus} 
							$timeExpired={timeLeft === 0}
						>
							{errorMessage ? errorMessage :
								verificationStatus ? '코드가 일치해요.' : ''
							}
						</VerificationMessage>
					)}
					
					{/* 다시 보내기 옵션 - 인증 성공 시 표시하지 않음 */}
					{!verificationStatus && (
						<>
							<ResendText>문제가 있나요? </ResendText>
							<ResendButton 
								onClick={handleResend} 
								disabled={isLoading}
							>
								다시 보내기.
							</ResendButton>
						</>
					)}
					
					{/* 인증 또는 다음 단계 버튼 */}
					<NextButton 
						onClick={verificationStatus ? handleNextClick : handleVerification}
						disabled={isLoading || (!verificationStatus && (verificationCode.length !== 6 || timeLeft === 0))}
						style={{
							color: (verificationStatus || verificationCode.length === 6) ? '#007bff' : '#cccccc',
							cursor: (isLoading || (!verificationStatus && (verificationCode.length !== 6 || timeLeft === 0))) ? 'not-allowed' : 'pointer'
						}}
					>
						{isLoading && !verificationStatus ? (
							<>
								<LoadingIndicator /> 처리 중...
							</>
						) : (
							verificationStatus ? '다음' : '인증하기'
						)}
					</NextButton>
				</div>
			)}
		</div>
	);
};

export default SignupPage4;
