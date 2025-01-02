import styled from 'styled-components';

// 파란색 버튼
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
	justify-content: center;
	cursor: pointer;
`;

// 파란색 버튼 텍스트
const ButtonText = styled.span`
	color: var(--Colors-GrayScale-White, #FCFCFF);
	text-align: center;
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: -0.4px;
	transform: translateY(1px);
`;

const BlueButton = ({ children, onClick, ...props }) => {
	return (
		<StyledButton onClick={onClick} {...props}>
			<ButtonText>{children}</ButtonText>
		</StyledButton>
	);
};

export default BlueButton;