import styled from 'styled-components';
import { R500, M500, S500 } from '../styles/Typography';

// 입력 컨테이너
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: ${props => props.$marginBottom || '1.25rem'};
`;

// 라벨
const Label = styled(R500)`
  color: ${({ theme }) => theme.colors.G500};
  letter-spacing: -0.35px;
`;

// 입력 컨테이너
const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

// 입력 필드
const StyledInput = styled.input`
  display: flex;
  height: 3rem;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 0.5rem;
  flex: 1 0 0;

  border-radius: 0.75rem;
  background: ${({ theme }) => theme.colors.G200};
  box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;

  border: none;
  outline: none;

  color : ${({ theme }) => theme.colors.G600};
  font-family: "SUIT Variable";
  ${M500};
  letter-spacing: -0.025rem;
`;

// 메시지
const Message = styled(S500)`
  color: ${({ status, theme }) => {
    switch (status) {
      case 'error':
        return theme.colors.error;
      case 'success':
        return theme.colors.success;
      default:
        return theme.colors.G400;
    }
  }};
  margin-top: 0.25rem;
`;

// 추가 메시지
const AdditionalMessage = styled(S500)`
  color: ${({ theme }) => theme.colors.B500};
  ${S500};

  span {
    text-decoration: underline;
    cursor: pointer;
    margin-left: 0.25rem;
  }
`;

const SignupInput = ({ 
  label, 
  message, 
  messageStatus,
  button,
  $marginBottom,
  onResend,
  showResend,
  ...inputProps 
}) => {
  return (
    <InputWrapper $marginBottom={$marginBottom}>
      <Label>{label}</Label>
      <InputContainer>
        <StyledInput {...inputProps} />
        {button}
      </InputContainer>
      {message && <Message status={messageStatus}>{message}</Message>}
      {showResend && (
        <AdditionalMessage>
          문제가 있나요?
          <span onClick={onResend}>다시 보내기</span>
        </AdditionalMessage>
      )}
    </InputWrapper>
  );
};

export default SignupInput; 