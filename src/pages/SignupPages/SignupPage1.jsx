import CategoryButton from '../../components/ArrowWhiteButton';


const SignupPage1 = ({ setStep }) => {

	// 계정 유형 선택 함수
	const handleAccountTypeSelect = (type) => {
		if (type === 'business') {
			setStep(1.1); // 기업 산업 분야 선택 페이지로 이동
		} else if (type === 'university') {
			setStep(1.2); // 대학생 단체 구분과 전공 계열 선택 페이지로 이동
		}
	};

	return (
		<div>
			<div>
				{/* 기업 버튼 */}
				<CategoryButton
					onClick={() => handleAccountTypeSelect('business')}
				>
					기업
				</CategoryButton>

				{/* 대학생 단체 버튼 */}
				<CategoryButton
					onClick={() => handleAccountTypeSelect('university')}
				>
					대학 단체
				</CategoryButton>
			</div>
		</div>
	);
};

export default SignupPage1;
