import styled from 'styled-components';
import NextButton from '../../components/ArrowBlueButton';
import { useState, useEffect } from 'react';
import { useSignup } from '../../services/SignupContext';
import { useNavigate } from 'react-router-dom';
import logger from '../../utils/logger';

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
`;

const SelectIndustry = styled.select`
	display: flex;
	width: 400px;
	height: 48px;
	padding: 12px 16px;
	align-items: center;
	gap: 8px;
	align-self: stretch;
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
	color: var(--Colors-GrayScale-G400, #949BAD);
	cursor: pointer;
	appearance: none;
	background-image: url('/src/assets/loginIcon/arrow_down.svg');
	background-repeat: no-repeat;
	background-position: right 16px center;
	background-size: 16px;
	margin-top: 8px;

	&:not(:placeholder-shown) {
		color: var(--Colors-GrayScale-G900, #949BAD);
	}

	&:has(option[value]:checked:not([value=""])) {
		color: var(--Colors-GrayScale-G900, #1A1A23);
	}
`;

const SignupPage2_enterprise = ({ setStep }) => {
	const [industry, setIndustry] = useState('');
	const { signupData, updateSignupData } = useSignup();

	// 컴포넌트 마운트 시 accountType 설정 확인
	useEffect(() => {
		// accountType이 business가 아니면 설정
		if (signupData.accountType !== 'business') {
			logger.log('SignupPage2_enterprise - accountType 설정: business');
			updateSignupData({ accountType: 'business' });
		}
		
		// 이미 industry가 설정되어 있으면 로컬 상태에 반영
		if (signupData.industry) {
			setIndustry(signupData.industry);
		}
	}, []);

	// 산업 분야 변경 함수
	const handleIndustryChange = (e) => {
		const newIndustry = e.target.value;
		setIndustry(newIndustry);
		// 값이 변경될 때마다 컨텍스트에 즉시 반영
		updateSignupData({ industry: newIndustry });
	};

	// 다음 버튼 클릭 핸들러
	const handleNextClick = () => {
		// 선택한 산업 분야를 컨텍스트에 다시 저장하여 확실히 반영
		updateSignupData({ 
			accountType: 'business',
			industry: industry 
		});
		logger.log('산업 분야 선택:', industry);
		setStep(2); // 다음 단계인 약관 동의 페이지로 이동
	};

	return (
		<div>
			<form>
				{/* 산업 분야 선택 컨테이너 */}
				<div>
					<SelectIndustry 
						id="industry"
						value={industry} 
						onChange={handleIndustryChange}
						defaultValue=""
					>
						<option value="" disabled>산업 분야 선택</option>
						<option value="food">식품</option>
						<option value="fashion">패션</option>
						<option value="beauty">뷰티</option>
						<option value="lifestyle">라이프스타일</option>
						<option value="sports">스포츠</option>
						<option value="entertainment">엔터테인먼트</option>
						<option value="medical">의료·제약·복지</option>
						<option value="education">출판·교육</option>
						<option value="other">기타</option>
					</SelectIndustry>
				</div>
			</form>

			{/* 다음으로 버튼 */}
			<NextButton 
				onClick={handleNextClick} 
				disabled={!industry}
			>
				다음으로
			</NextButton>
		</div>
	);
};

export default SignupPage2_enterprise;
