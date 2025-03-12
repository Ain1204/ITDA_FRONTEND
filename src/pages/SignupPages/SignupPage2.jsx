import styled from 'styled-components';
import SignupNextButton from '../../components/ArrowBlueButton';
import BlueArrow from '../../assets/loginIcon/signButtonArrow_blue.svg';
import { useState } from 'react';
import { useSignup } from '../../services/SignupContext';

const Divider = styled.div`
	width: 400px;
	height: 1px;
	background: var(--Colors-GrayScale-G300, #E5EAF2);
	margin: 40px 0;
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
	gap: 8px;
`;

const StyledCheckbox = styled.input`
	width: 14px;
	height: 14px;
	cursor: pointer;
`;

const Label = styled.label`
	font-family: "SUIT Variable";
	font-style: normal;
	letter-spacing: -0.3px;
	color: var(--Colors-GrayScale-G500, #4F5462);
	font-size: 12px;
	font-weight: 400;
	line-height: 132%;
	cursor: pointer;
`;

const RequiredLabel = styled(Label)`
	color: var(--Colors-GrayScale-G600, #1A1A23);
	font-size: 14px;
	font-weight: 500;
	line-height: 168%;
	letter-spacing: -0.35px;
	transform: translateY(1px);
`;

const StyledBlueArrow = styled.img`
	cursor: pointer;
	transition: transform 0.2s ease;
	
	&:hover {
		transform: translateX(4px);
	}
`;

const SignupPage2 = ({ setStep }) => {
	const { updateSignupData } = useSignup();

	// 체크박스 상태
	const [checkboxes, setCheckboxes] = useState({
		all: false,
		terms: false,
		privacy: false,
		advertise: false
	});

	// 필수 항목이 모두 체크되었는지 확인하는 함수
	const isRequiredChecked = () => {
		return checkboxes.terms && checkboxes.privacy;
	};

	// 전체 동의 체크
	const handleAllCheck = (e) => {
		const { checked } = e.target;
		setCheckboxes({
			all: checked,
			terms: checked,
			privacy: checked,
			advertise: checked
		});
	};

	// 개별 동의 체크
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

	// 다음 단계로 이동
	const handleNextClick = () => {
		// 약관 동의 정보를 컨텍스트에 저장
		updateSignupData({
			termsAgreed: {
				service: checkboxes.terms,
				privacy: checkboxes.privacy,
				marketing: checkboxes.advertise
			}
		});
		
		setStep(3);
	};

	return (
		<div>

			{/* 약관 전체 동의 */}
			<CheckboxLabelGroup>
				<StyledCheckbox type="checkbox" id="all" checked={checkboxes.all} onChange={handleAllCheck}/>
				<Label htmlFor="all">약관 전체 동의</Label>	
			</CheckboxLabelGroup>

			<Divider />

			{/* 서비스 이용약관 동의 */}
			<CheckboxContainer>
				<CheckboxLabelGroup>
					<StyledCheckbox type="checkbox" id="terms" checked={checkboxes.terms} onChange={handleSingleCheck}/>
					<RequiredLabel htmlFor="terms">서비스 이용약관 동의 (필수)</RequiredLabel>
				</CheckboxLabelGroup>
				<StyledBlueArrow src={BlueArrow} alt="자세히보기" />
			</CheckboxContainer>

			{/* 개인 정보 수집 및 이용동의 */}
			<CheckboxContainer>
				<CheckboxLabelGroup>
					<StyledCheckbox type="checkbox" id="privacy" checked={checkboxes.privacy} onChange={handleSingleCheck}/>
					<RequiredLabel htmlFor="privacy">개인 정보 수집 및 이용동의 (필수)</RequiredLabel>
				</CheckboxLabelGroup>
				<StyledBlueArrow src={BlueArrow} alt="자세히보기" />
			</CheckboxContainer>

			{/* E-mail 광고성 정보 수신 동의 */}
			<CheckboxContainer>
				<CheckboxLabelGroup>
					<StyledCheckbox type="checkbox" id="advertise" checked={checkboxes.advertise} onChange={handleSingleCheck}/>
					<RequiredLabel htmlFor="advertise">E-mail 광고성 정보 수신 동의 (선택)</RequiredLabel>
				</CheckboxLabelGroup>
				<StyledBlueArrow src={BlueArrow} alt="자세히보기" />
			</CheckboxContainer>
			
			{/* 다음 버튼 */}
			<SignupNextButton 
				onClick={handleNextClick} 
				disabled={!isRequiredChecked()}
			>
				다음으로
			</SignupNextButton>
		</div>
	);
};

export default SignupPage2;
