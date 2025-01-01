import styled from 'styled-components';
import ArrowGrayIcon from '../assets/loginIcon/signButtonArrow_gray.svg';
import ArrowBlueIcon from '../assets/loginIcon/signButtonArrow_blue.svg';

// 사용방법
// 텍스트만 파란색
//<SignupLongButton textBlue>다음</SignupLongButton>

// 화살표만 파란색
//<SignupLongButton isBlue>다음</SignupLongButton>

// 둘 다 파란색
//<SignupLongButton isBlue textBlue>다음</SignupLongButton>


// 회원가입 버튼
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

// 회원가입 버튼 텍스트
const ButtonText = styled.span`
	display: flex;
    flex: 1 0 0;
    color: ${props => props.textBlue ? 'var(--Colors-Primary-B500, #0051FF)' : 'var(--Colors-GrayScale-G500, #4F5462);'}; // 텍스트 색상 선택적으로 사용
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.4px;
    transform: translateY(1px);
`;

const SignupWhiteButton = ({ children, isArrowBlue = false, textBlue = false, ...props }) => {
	return <StyledButton {...props}>

            {/* 텍스트 색상 선택적으로 사용 */}
			<ButtonText textBlue={textBlue}>{children}</ButtonText>

            {/* 화살표 색상 선택적으로 사용 */}
			<img src={isArrowBlue ? ArrowBlueIcon : ArrowGrayIcon} alt="회원가입 버튼화살표" />

		</StyledButton>;
};

export default SignupWhiteButton;
