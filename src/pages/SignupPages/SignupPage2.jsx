import styled from 'styled-components';
import SignupNextButton from '../components/SignupNextButton';

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

const SignupPage2 = ({ setStep }) => {
	return (
		<div>
			<Subtitle>이용약관에 동의해 주세요.</Subtitle>
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
			<SignupNextButton onClick={() => setStep(3)}>
				다음으로
			</SignupNextButton>
		</div>
	);
};

export default SignupPage2;
