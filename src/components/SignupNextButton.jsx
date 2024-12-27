import styled from 'styled-components';
import ArrowIcon from '../assets/loginIcon/signButtonArrow_white.svg';

const StyledButton = styled.button`
	display: flex;
	width: 400px;
	height: 48px;
	padding: 12px 16px;
	align-items: center;
	gap: 8px;
	border-radius: 12px;
	background: var(--Colors-Primary-B400, #3D85FF);
	box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.32);
	border: none;
	cursor: pointer;
	justify-content: space-between;
`;

const ButtonText = styled.span`
	color: var(--Colors-GrayScale-White, #FCFCFF);
	text-align: center;
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;
	letter-spacing: -0.4px;
`;

const SignupNextButton = ({ children, onClick, ...props }) => {
	return (
		<StyledButton onClick={onClick} {...props}>
			<ButtonText>{children}</ButtonText>
			<img src={ArrowIcon} alt="회원가입 버튼화살표" />
		</StyledButton>
	);
};

export default SignupNextButton;