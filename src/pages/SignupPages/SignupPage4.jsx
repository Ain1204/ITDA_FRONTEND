import styled from 'styled-components';
import SignupNextButton from '../../components/SignupBlueButton';
import { useState, useEffect } from 'react';

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

const TimerText = styled.div`
	display: flex;
	width: 92px;
	height: 48px;
	padding: 12px 16px;
	justify-content: center;
	align-items: center;
	gap: 4px;
	border-radius: 12px;
	background: var(--Colors-GrayScale-G200, #F3F5F8);
	box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
	
	color: ${props => props.isExpired ? '#EF5D58' : 'var(--Colors-Primary-B500, #0051FF)'};
	font-family: "SUIT Variable";
	font-size: 20px;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: 2px;
`;

const InputContainer = styled.div`
	position: relative;
	display: flex;
	gap: 8px;
	align-items: center;
`;

const VerificationMessage = styled.p`
	margin: 8px 0 4px 0;
	color: ${props => {
		if (props.timeExpired) return '#EF5D58';
		return props.isValid ? '#01B777' : '#EF5D58';
	}};
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 132%;
	letter-spacing: -0.3px;
`;

const ResendText = styled.span`
	color: var(--Colors-Primary-B500, #0051FF);
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 132%;
	letter-spacing: -0.3px;
`;

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

const SignupPage4 = ({ setStep, verificationStatus, setVerificationStatus }) => {
	const [timeLeft, setTimeLeft] = useState(300); // 5분 = 300초
	const [isTimerRunning, setIsTimerRunning] = useState(true);

	// 타이머 실행
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

		return () => clearInterval(timer);
	}, [isTimerRunning]);

	// 타이머 포맷
	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

	// 다시 보내기 버튼 클릭 함수
	const handleResend = () => {
		setTimeLeft(300);
		setIsTimerRunning(true);
	};

	return (
		<div>
			<div>
				{/* 인증번호 라벨 */}
				<InputLabel htmlFor="verificationCode">인증번호</InputLabel>

				{/* 인증번호 입력 컨테이너 */}
				<InputContainer>
					<StyledInput 
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
					<TimerText isExpired={timeLeft === 0}>{formatTime(timeLeft)}</TimerText>
				</InputContainer>

				{/* 인증 결과 표시 */}
				<VerificationMessage 
					isValid={verificationStatus} 
					timeExpired={timeLeft === 0}
				>
					{timeLeft === 0 
						? "시간이 초과되었어요. 다시 시도해주세요." 
						: verificationStatus 
							? '코드가 일치해요' 
							: '코드가 일치하지 않아요'
					}
				</VerificationMessage>
				
				{/* 다시 보내기 버튼 */}
				<ResendText>문제가 있나요? </ResendText>
				<ResendButton onClick={handleResend}>
					다시 보내기.
				</ResendButton>
				
			</div>
				
			{/* 인증하기 버튼 */}
			<SignupNextButton 
				onClick={() => verificationStatus && setStep(5)}
				disabled={!verificationStatus}
				style={{
					color: verificationStatus ? '#007bff' : '#cccccc',
					cursor: verificationStatus ? 'pointer' : 'not-allowed'
				}}
			>
				인증하기
			</SignupNextButton>
		</div>
	);
};

export default SignupPage4;
