import CategoryButton from '../../components/ArrowWhiteButton';


const SignupPage1 = ({ setStep }) => {

	// 계정 유형 선택 함수
	const handleAccountTypeSelect = (type) => {
		setStep(2);
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
					대학생 단체
				</CategoryButton>
			</div>
		</div>
	);
};

export default SignupPage1;
