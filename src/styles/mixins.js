// 버튼 컴포넌트에서 쉽게 재사용하기 위한 코드
import { css } from 'styled-components';

export const statusColors = css`
  &.error {
    color: ${({ theme }) => theme.colors.error};
  }
  
  &.success {
    color: ${({ theme }) => theme.colors.success};
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.active};
  }
`; 