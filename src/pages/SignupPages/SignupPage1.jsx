import styled from 'styled-components';
import CategoryButton from '../../components/ArrowWhiteButton';
import WhiteArrowIcon from '../../assets/loginIcon/signButtonArrow_white.svg';
import { useSignup } from '../../services/SignupContext';

// 버튼 래퍼 컴포넌트 - 호버 효과만 추가
const ButtonWrapper = styled.div`
	width: 400px;
	transition: all 0.2s ease-in-out;
	
	&:hover button {
		background: var(--Colors-Primary-B400, #3D85FF);
		box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.32);
	}
	
	&:hover span {
		color: var(--Colors-GrayScale-White, #FCFCFF);
	}
	
	&:hover img {
		content: url(${WhiteArrowIcon});
	}
`;

const SignupPage1 = ({ setStep }) => {
	const { updateSignupData } = useSignup();

	// 계정 유형 선택 함수
	const handleAccountTypeSelect = (type) => {
		// 컨텍스트에 선택한 계정 유형 저장
		updateSignupData({ accountType: type });
		
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
				<ButtonWrapper>
					<CategoryButton
						onClick={() => handleAccountTypeSelect('business')}
					>
						기업
					</CategoryButton>
				</ButtonWrapper>

				{/* 대학생 단체 버튼 */}
				<ButtonWrapper>
					<CategoryButton
						onClick={() => handleAccountTypeSelect('university')}
					>
						대학 단체
					</CategoryButton>
				</ButtonWrapper>
			</div>
		</div>
	);
};

export default SignupPage1;
