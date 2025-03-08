import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
    display: flex;
    width: ${props => props.width};
    padding: 10px 16px;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    background: var(--Colors-GrayScale-G200, #F3F5F8);
    box-shadow: 0px 0px 4px 0px rgba(26, 26, 35, 0.16) inset;
    border: none;
    outline: none;

    &::placeholder {
        color: var(--Colors-GrayScale-G400, #949BAD);
        font-family: "SUIT Variable";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;
        letter-spacing: -0.4px;
        vertical-align: middle;
        transform: translateY(1px);
    }
`;

const RegisterInput = ({ width, placeholder, ...props }) => {
    return (
        <StyledInput 
            width={width}
            placeholder={placeholder}
            {...props}
        />
    );
};

RegisterInput.propTypes = {
    width: PropTypes.string.isRequired,
    placeholder: PropTypes.string
};

export default RegisterInput;
