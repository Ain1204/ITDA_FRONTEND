import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Button = styled.button`
    width: auto;
    min-width: fit-content;
    display: flex;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: ${props => props.$isActive 
        ? 'var(--Colors-Primary-B400, #3D85FF)'
        : 'var(--Colors-GrayScale-G200, #F3F5F8);'};
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
`;

const Text = styled.span`
    color: ${props => props.$isActive
        ? 'var(--Colors-GrayScale-White, #FCFCFF)'
        : 'var(--Colors-GrayScale-G400, #949BAD)'};
    text-align: center;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.4px;
    transition: color 0.2s ease;
    transform: translateY(1px);
`;

const RegisterButton = ({ onClick, text, $active }) => {
    const [isActive, setIsActive] = useState($active || false);

    const handleClick = () => {
        setIsActive(!isActive);
        if (onClick) onClick();
    };

    return (
        <Button $isActive={isActive} onClick={handleClick}>
            <Text $isActive={isActive}>{text}</Text>
        </Button>
    );
};

RegisterButton.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    $active: PropTypes.bool
};

export default RegisterButton;