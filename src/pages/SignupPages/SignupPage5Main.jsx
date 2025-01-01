import { useState } from 'react';
import styled from 'styled-components';
import SignupPage5_enterprise from './SignupPage5_enterprise';
import SignupPage5_business from './SignupPage5_business';

const TypeButton = styled.button`
    display: flex;
    height: 48px;
    padding: 16px 12px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 12px;
    border: 2px solid ${({ active }) => active ? 'var(--Colors-Primary-B400, #3D85FF)' : 'transparent'};
    background: ${({ active }) => active ? 'var(--Colors-Primary-B400, #3D85FF)' : 'var(--Colors-GrayScale-White, #FCFCFF)'};
    box-shadow: 0px 0px 4px 0px rgba(26, 26, 35, 0.32);
    color: ${({ active }) => active ? 'var(--Colors-GrayScale-White, #FCFCFF)' : 'var(--Colors-GrayScale-G400, #949BAD)'};
    cursor: pointer;
    
    font-family: "SUIT Variable";
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.4px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const SignupPage5Main = ({ setStep }) => {
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [showBusinessInput, setShowBusinessInput] = useState(false);

    return (
        <div>
            <ButtonContainer>
                <TypeButton 
                    active={showEmailInput}
                    onClick={() => {
                        setShowEmailInput(true);
                        setShowBusinessInput(false);
                    }}
                >
                    기업
                </TypeButton>
                <TypeButton 
                    active={showBusinessInput}
                    onClick={() => {
                        setShowBusinessInput(true);
                        setShowEmailInput(false);
                    }}
                >
                    사업자등록번호
                </TypeButton>
            </ButtonContainer>

            {showEmailInput && <SignupPage5_enterprise setStep={setStep} />}
            {showBusinessInput && <SignupPage5_business setStep={setStep} />}
        </div>
    );
};

export default SignupPage5Main;
