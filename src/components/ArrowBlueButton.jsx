import styled from 'styled-components';
import WhiteArrowIcon from '../assets/loginIcon/signButtonArrow_white.svg';
import GrayArrowIcon from '../assets/loginIcon/signButtonArrow_gray.svg';

// 파란색 화살표 버튼
const StyledButton = styled.button`
	display: flex;
	width: 400px;
	height: 48px;
	padding: 12px 16px;
	align-items: center;
	gap: 8px;
	border-radius: 12px;
	background: ${props => props.disabled 
		? 'var(--Colors-GrayScale-G300, #E5EAF2)' 
		: 'var(--Colors-Primary-B400, #3D85FF)'};
	box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.32);
	border: none;
	cursor: ${props => props.disabled ? 'default' : 'pointer'};
	justify-content: space-between;
	margin-top: 60px;
`;

// 파란색 화살표 버튼 텍스트
const ButtonText = styled.span`
	color: ${props => props.disabled 
		? 'var(--Colors-GrayScale-G400, #949BAD)' 
		: 'var(--Colors-GrayScale-White, #FCFCFF)'};
	text-align: center;
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: -0.4px;
	transform: translateY(1px);
`;

const ArrowBlueButton = ({ children, onClick, disabled, ...props }) => {
	return (
		<StyledButton onClick={onClick} disabled={disabled} {...props}>

			<ButtonText disabled={disabled}>{children}</ButtonText>

			{/* 상황에 따른 화살표 이미지 */}
			<img src={disabled ? GrayArrowIcon : WhiteArrowIcon} alt="회원가입 버튼화살표" />
			
		</StyledButton>
	);
};

export default ArrowBlueButton;