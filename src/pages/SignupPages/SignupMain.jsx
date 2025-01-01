import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SignupBackground from '../../components/SignupBackground';
import SignupPage1 from './SignupPage1';
import SignupPage2 from './SignupPage2';
import SignupPage3 from './SignupPage3';
import SignupPage4 from './SignupPage4';
import SignupPage5Main from './SignupPage5Main';
import SignupPage6 from './SignupPage6';

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
	flex-direction: column;
	align-items: center;
`;

const SignupContainer = styled.div`
	flex-direction: column;
	align-items: center;
	width: 400px;
`;

const Title = styled.h1`
	align-self: stretch;
	color: #1A1A23;
	font-family: "SUIT Variable";
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%;
	letter-spacing: -0.8px;
`;

const Subtitle = styled.p`
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

// 회원가입 페이지 스텝
const SIGNUP_STEPS = {
	1: {
		header: "반가워요!",
		subtitle: "계정 유형을 선택해 주세요.",
		component: (props) => <SignupPage1 {...props} />
	},
	2: {
		header: "반가워요!",
		subtitle: "이용 약관에 동의해 주세요.",
		component: (props) => <SignupPage2 {...props} />
	},
	3: {
		header: "당신에 대해 알려주세요!",
		subtitle: "회원 정보를 입력해주세요.",
		component: (props) => <SignupPage3 {...props} />
	},
	4: {
		header: "휴대폰으로 인증할게요.",
		subtitle: "문자로 받은 6자리 인증 코드를 입력해 주세요.",
		component: (props) => <SignupPage4 {...props} />
	},
	5: {
		header: "거의 다 왔어요!",
		subtitle: "서비스에서 이용할 정보를 입력해주세요.",
		component: (props) => <SignupPage5Main {...props} />
	},
	6: {
		header: "회원가입을 완료했어요!",
		subtitle: "이제 비즈모와 함께 제휴라이프를 즐길 수 있어요.",
		component: (props) => <SignupPage6 {...props} />
	}
};

const SignupPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [step, setStep] = useState(1);
	const [verificationStatus, setVerificationStatus] = useState(false);

	// 회원가입 페이지 스텝 변경
	useEffect(() => {
		// 초기 스텝 설정
		window.history.replaceState({ step: 1 }, '', location.pathname);

		// 뒤로 가기 이벤트 핸들러
		const handlePopState = (event) => {
			if (step === 1) {
				if (window.confirm('회원가입을 취소하시겠습니까?')) {
					navigate('/login');
				} else {
					window.history.pushState({ step: 1 }, '', location.pathname);
				}
			} else {
				setStep(prev => prev - 1);
			}
		};

		// 뒤로 가기 이벤트 리스너
		window.addEventListener('popstate', handlePopState);

		// 이벤트 리스너 제거
		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [step, navigate, location.pathname]);

	// 회원가입 페이지 스텝 변경 함수
	const handleSetStep = (newStep) => {
		window.history.pushState({ step: newStep }, '', location.pathname);
		setStep(newStep);
	};

	// 현재 스텝 설정
	const currentStep = SIGNUP_STEPS[step] || SIGNUP_STEPS[1];
	const componentProps = {
		setStep: handleSetStep,
		...(step === 4 && { verificationStatus, setVerificationStatus }),
		...(step === 6 && { navigate })
	};

	return (
		<PageContainer>
			<SignupBackground />
			<SignupSection>
				{/* 회원가입 제목, 부제목 */}
				<SignupContainer>
					<Title>{currentStep.header}</Title>
					<Subtitle>{currentStep.subtitle}</Subtitle>
					{currentStep.component(componentProps)}
				</SignupContainer>
			</SignupSection>
		</PageContainer>
	);
};

export default SignupPage;