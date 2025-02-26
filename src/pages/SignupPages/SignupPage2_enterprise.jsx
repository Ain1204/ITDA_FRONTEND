import styled from 'styled-components';
import NextButton from '../../components/ArrowBlueButton';
import { useState } from 'react';

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

	// 산업 분야 변경 함수
	const handleIndustryChange = (e) => {
		setIndustry(e.target.value);
	};

	// 다음 버튼 클릭 핸들러
	const handleNextClick = () => {
		setStep(2); // 다음 단계인 약관 동의 페이지로 이동
	};

	return (
		<div>
			<form>
				{/* 산업 분야 선택 컨테이너 */}
				<div>
					<SelectIndustry 
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
