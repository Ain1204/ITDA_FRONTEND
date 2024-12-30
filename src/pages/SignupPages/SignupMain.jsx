import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignupBackground from '../components/SignupBackground';
import SignupPage1 from './SignupPage1';
import SignupPage2 from './SignupPage2';
import SignupPage3 from './SignupPage3';
import SignupPage4 from './SignupPage4';
import SignupPage5 from './SignupPage5';
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

const SignupPage = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [verificationStatus, setVerificationStatus] = useState(false);

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

	const renderStep = () => {
		switch (step) {
			case 1:
				return <SignupPage1 setStep={setStep} />;
			case 2:
				return <SignupPage2 setStep={setStep} />;
			case 3:
				return <SignupPage3 setStep={setStep} />;
			case 4:
				return <SignupPage4 setStep={setStep} verificationStatus={verificationStatus} setVerificationStatus={setVerificationStatus} />;
			case 5:
				return <SignupPage5 setStep={setStep} />;
			case 6:
				return <SignupPage6 navigate={navigate} />;
			default:
				return null;
		}
	};

	return (
		<PageContainer>
			<SignupBackground />
			<SignupSection>
				<SignupContainer>
					<Title>{getHeaderText()}</Title>
					{renderStep()}
				</SignupContainer>
			</SignupSection>
		</PageContainer>
	);
};

export default SignupPage;