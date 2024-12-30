import styled from 'styled-components';
import SignupLongButton from '../../components/SignupLongButton';

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

const SignupPage1 = ({ setStep }) => {
	const handleAccountTypeSelect = (type) => {
		setStep(2);
	};

	return (
		<div>
			<Subtitle>계정 유형을 선택해 주세요.</Subtitle>
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
	);
};

export default SignupPage1;
