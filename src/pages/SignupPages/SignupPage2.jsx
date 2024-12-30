import styled from 'styled-components';
import SignupNextButton from '../../components/SignupNextButton';
import BlueArrow from '../../assets/loginIcon/signButtonArrow_blue.svg';
import { useState } from 'react';

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

const Divider = styled.div`
	width: 400px;
	height: 1px;
	background: var(--Colors-GrayScale-G300, #E5EAF2);
	margin:40px 0;
`;

const StyledCheckbox = styled.input`
	width: 14px;
	height: 14px;
	cursor: pointer;
	margin-right: 8px;
	flex-shrink: 0;
	position: relative;
	top: 1px;
`;

const Label = styled.label`
	color: var(--Colors-GrayScale-G500, #4F5462);
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 132%;
	letter-spacing: -0.3px;
	// transform: translateY(2px);
`;

const RequiredLabel = styled.label`
	color: var(--Colors-GrayScale-G600, #1A1A23);
	font-family: "SUIT Variable";
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 168%;
	letter-spacing: -0.35px;
	display: flex;
	align-items: center;
`;

const CheckboxContainer = styled.div`
	margin-bottom: 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 24px;
`;

const CheckboxLabelGroup = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
`;

const StyledSignupNextButton = styled(SignupNextButton)`
	margin-top: 60px;
`;

const StyledBlueArrow = styled.img`
	cursor: pointer;
	transition: transform 0.2s ease;
	display: flex;
	align-items: center;
	
	&:hover {
		transform: translateX(4px);
	}
`;

const SignupPage2 = ({ setStep }) => {
	const [checkboxes, setCheckboxes] = useState({
		all: false,
		terms: false,
		privacy: false,
		advertise: false
	});

	const handleAllCheck = (e) => {
		const { checked } = e.target;
		setCheckboxes({
			all: checked,
			terms: checked,
			privacy: checked,
			advertise: checked
		});
	};

	const handleSingleCheck = (e) => {
		const { id, checked } = e.target;
		setCheckboxes(prev => {
			const newCheckboxes = { ...prev, [id]: checked };
			const allChecked = Object.keys(newCheckboxes)
				.filter(key => key !== 'all')
				.every(key => newCheckboxes[key]);
			
			return { ...newCheckboxes, all: allChecked };
		});
	};

	return (
		<div>
			<Subtitle>이용약관에 동의해 주세요.</Subtitle>
			<div>
				<div>
					<StyledCheckbox 
						type="checkbox" 
						id="all"
						checked={checkboxes.all}
						onChange={handleAllCheck}
					/>
					<Label htmlFor="all">약관 전체 동의</Label>	
				</div>
				<Divider />
				<div>
					<CheckboxContainer>
						<CheckboxLabelGroup>
							<StyledCheckbox 
								type="checkbox" 
								id="terms"
								checked={checkboxes.terms}
								onChange={handleSingleCheck}
							/>
							<RequiredLabel htmlFor="terms">서비스 이용약관 동의 (필수)</RequiredLabel>
						</CheckboxLabelGroup>
						<StyledBlueArrow src={BlueArrow} alt="다음으로" />
					</CheckboxContainer>
					<CheckboxContainer>
						<CheckboxLabelGroup>
							<StyledCheckbox 
								type="checkbox" 
								id="privacy"
								checked={checkboxes.privacy}
								onChange={handleSingleCheck}
							/>
							<RequiredLabel htmlFor="privacy">개인 정보 수집 및 이용동의 (필수)</RequiredLabel>
						</CheckboxLabelGroup>
						<StyledBlueArrow src={BlueArrow} alt="다음으로" />
					</CheckboxContainer>
					<CheckboxContainer>
						<CheckboxLabelGroup>
							<StyledCheckbox 
								type="checkbox" 
								id="advertise"
								checked={checkboxes.advertise}
								onChange={handleSingleCheck}
							/>
							<RequiredLabel htmlFor="advertise">E-mail 광고성 정보 수신 동의 (선택)</RequiredLabel>
						</CheckboxLabelGroup>
						<StyledBlueArrow src={BlueArrow} alt="다음으로" />
					</CheckboxContainer>
				</div>
			</div>
			<StyledSignupNextButton onClick={() => setStep(3)}>
				다음
			</StyledSignupNextButton>
		</div>
	);
};

export default SignupPage2;
