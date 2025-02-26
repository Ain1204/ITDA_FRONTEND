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

const SelectInput = styled.select`
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

// 두 번째 선택 토글을 위한 컨테이너에 간격 추가
const SecondSelectContainer = styled.div`
	margin-top: 1.25rem; /* 20px */
`;

const SignupPage2_student = ({ setStep }) => {
	const [organization, setOrganization] = useState('');
	const [major, setMajor] = useState('');

	// 단체 구분 변경 함수
	const handleOrganizationChange = (e) => {
		setOrganization(e.target.value);
	};

	// 전공 계열 변경 함수
	const handleMajorChange = (e) => {
		setMajor(e.target.value);
	};

	// 다음 버튼 클릭 핸들러
	const handleNextClick = () => {
		setStep(2); // 다음 단계인 약관 동의 페이지로 이동
	};

	return (
		<div>
			<form>
				{/* 단체 구분 선택 컨테이너 */}
				<div>
					<SelectInput 
						value={organization} 
						onChange={handleOrganizationChange}
						defaultValue=""
					>
						<option value="" disabled>단체 구분 선택</option>
						<option value="총학생회">총학생회</option>
						<option value="단과대학 학생회">단과대학 학생회</option>
						<option value="과 학생회">과 학생회</option>
						<option value="학회">학회</option>
						<option value="총동아리연합회">총동아리연합회</option>
						<option value="동아리">동아리</option>
					</SelectInput>
				</div>

				{/* 전공 계열 선택 컨테이너 */}
				<SecondSelectContainer>
					<SelectInput 
						value={major} 
						onChange={handleMajorChange}
						defaultValue=""
					>
						<option value="" disabled>전공 계열 선택</option>
						<option value="인문계열">인문계열</option>
						<option value="사회계열">사회계열</option>
						<option value="교육계열">교육계열</option>
						<option value="공학계열">공학계열</option>
						<option value="자연계열">자연계열</option>
						<option value="의약계열">의약계열</option>
						<option value="예체능계열">예체능계열</option>
						<option value="전문대학">전문대학</option>
					</SelectInput>
				</SecondSelectContainer>
			</form>

			{/* 다음으로 버튼 */}
			<NextButton 
				onClick={handleNextClick} 
				disabled={!organization || !major}
			>
				다음으로
			</NextButton>
		</div>
	);
};

export default SignupPage2_student;
