import styled from 'styled-components';
import { H5 } from '../styles/Typography';

const StyledButton = styled.button`
  display: flex;
  height: 3rem;
  padding: 1rem 0.75rem;
  justify-content: center;
  align-items: center;
  width: 12rem;
  
  border-radius: 0.75rem;
  border : ${({ active, theme }) => active ? theme.colors.B400 : `2px solid ${theme.colors.White}`};
  box-shadow: 0px 0px 4px 0px rgba(26, 26, 35, 0.32);

  cursor: pointer;
  background: ${({ active, theme }) => 
    active ? theme.colors.B400 : theme.colors.White};
  color: ${({ active, theme }) => 
    active ? theme.colors.White : theme.colors.G400};
  ${H5};
  font-family: "SUIT Variable";
  letter-spacing: -0.4px;
`;

const SignupTypeButton = ({ children, active, ...props }) => {
  return (
    <StyledButton active={active} {...props}>
      {children}
    </StyledButton>
  );
};

export default SignupTypeButton; 