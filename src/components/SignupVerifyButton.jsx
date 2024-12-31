import styled, { css } from 'styled-components';
import { M500, M600 } from '../styles/Typography';

const StyledButton = styled.button`
  /* Typography 스타일을 CSS로 직접 적용 */
  font-size: 16px;
  line-height: 150%;
  font-weight: ${({ $status }) => $status === 'success' ? '500' : '600'};
  font-family: "SUIT Variable";
  
  display: flex;
  width: 5.75rem;
  height: 3rem;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;

  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  
  /* 상태에 따른 스타일 적용 */
  background: ${({ $status, theme, $disabled, $timing, $expired }) => {
    // 타이밍이나 만료 상태가 우선
    if ($timing || $expired) return theme.colors.G200;
    // 비활성화 상태
    else if ($disabled) return theme.colors.G200;
    // 에러 상태
    else if ($status === 'error') return theme.colors.error;
    // 성공 상태
    else if ($status === 'success') return theme.colors.G200;
    // 기본 상태
    else return theme.colors.B400;
  }};
  
  color: ${({ $status, theme, $disabled, $timing, $expired }) => {
    // 만료 상태
    if ($expired) return theme.colors.error;
    // 타이밍 상태
    if ($timing) return theme.colors.B500;
    // 비활성화 상태
    if ($disabled) return theme.colors.G400;
    // 에러 상태
    if ($status === 'error') return theme.colors.White;
    // 성공 상태
    if ($status === 'success') return theme.colors.G400;
    // 기본 상태
    return theme.colors.White;
  }};
`;

const SignupVerifyButton = ({ children, $status, $disabled, $timing, $expired, ...props }) => {
  return (
    <StyledButton 
      $status={$status} 
      $disabled={$disabled}
      $timing={$timing}
      $expired={$expired}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default SignupVerifyButton; 