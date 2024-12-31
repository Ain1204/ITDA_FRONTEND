import styled from 'styled-components';

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

	/* 버튼 텍스트 스타일 */
	color: var(--Colors-GrayScale-White, #FCFCFF);
	text-align: center;
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: -0.4px;
`;

const LoginBlueButton = ({ children, onClick, ...props }) => {
	return (
		<StyledButton onClick={onClick} {...props}>
			{children}
		</StyledButton>
	);
};

export default LoginBlueButton;