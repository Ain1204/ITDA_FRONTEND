import styled from 'styled-components';
import ArrowIcon from '../assets/loginIcon/signButtonArrow_gray.svg';

const StyledButton = styled.button`
    display: flex;
    width: 400px;
    height: 48px;
    padding: 12px 16px;
    align-items: center;
    gap: 8px;
    border-radius: 12px;
    background: #FCFCFF;
    box-shadow: 0px 0px 4px 0px rgba(26, 26, 35, 0.32);
    border: none;
	margin-bottom: 24px;
    cursor: pointer;
`;

const ButtonText = styled.span`
	display: flex;
    flex: 1 0 0;
    color: #4F5462;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.4px;
`;

const SignupLongButton = ({ children, ...props }) => {
	return <StyledButton {...props}>
			<ButtonText>{children}</ButtonText>
			<img src={ArrowIcon} alt="회원가입 버튼화살표" />
		</StyledButton>;
};

export default SignupLongButton;
