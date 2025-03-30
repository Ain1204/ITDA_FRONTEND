import styled from 'styled-components';
import councilImage from '../../assets/ProfileIcon/councilProfile.svg';
import enterImage from '../../assets/ProfileIcon/enterProfile.svg';
import InstagramIcon from '../../assets/ProfileIcon/InstagramIcon.svg';
import InstagramPlus from '../../assets/ProfileIcon/InstagramPlus.svg';
import LinkIcon from '../../assets/ProfileIcon/link.svg';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SidebarContainer = styled.div`
    display: flex;
    width: 340px;
    height: auto;
    min-height: 890px;
    padding: 32px 20px;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    border-radius: 16px;
    background: var(--Colors-GrayScale-White, #FCFCFF);
    box-shadow: 0px 8px 24px 0px rgba(79, 84, 98, 0.24);
    position: relative;
    padding-top: 92px; 
`;

const ProfileSection = styled.div`
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 22px;
`;

const ProfileImageContainer = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 120px;
    border: 2px solid var(--Colors-GrayScale-White, #FCFCFF);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const SocialContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    bottom: 0;
    right: 20px;
    padding: 8px 12px;
    transition: transform 0.2s;
    cursor: pointer;

    &:hover {
        transform: scale(1.04);
    }
`;

const IconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
`;

const PlusIconWrapper = styled.span`
    margin-left: 2px;
    transform: translateY(-1px);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LinkContent = styled.span`
    font-family: "SUIT Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 168%; /* 23.52px */
    letter-spacing: -0.35px;
    color:var(--Colors-Primary-B500, #0051FF);
    display: flex;
    align-items: center;
    transform: translateY(1px);
`;

const ProfileName = styled.h4`
    color: var(--Colors-GrayScale-G600, #1A1A23);
    font-family: "SUIT Variable";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 28px */
    letter-spacing: -0.5px;
    text-align: left;
    align-self: flex-start;
`;

const NavigationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

const NavButton = styled.button`
    display: flex;
    padding: 7px 16px;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    border: none;
    background-color: ${props => props.active 
        ? 'var(--Colors-Secondary-B100, #EBF2FF)' 
        : 'var(--Colors-GrayScale-G100, #FCFCFF)'};
    cursor: pointer;
    color: ${props => props.active 
        ? 'var(--Colors-Primary-B500, #0051FF)' 
        : 'var(--Colors-GrayScale-G400, #949BAD)'};
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: -0.4px;
    text-align: left;

    &:hover {
        background-color: ${props => props.active 
            ? 'var(--Colors-Secondary-B100, #EBF2FF)' 
            : 'var(--Colors-GrayScale-G200, #EBEBF0)'};
    }
`;

const ButtonText = styled.span`
    transform: translateY(1px);
    display: inline-block;
`;

const ProfileSidebar = ({ type = 'council', onTabChange, activeTab }) => {
    const [activeButton, setActiveButton] = useState(activeTab || 0);

    const handleButtonClick = (index) => {
        setActiveButton(index);
        if (onTabChange) {
            onTabChange(index);
        }
    };

    useEffect(() => {
        if (activeTab !== undefined && activeTab !== activeButton) {
            setActiveButton(activeTab);
        }
    }, [activeTab]);

    const handleSocialClick = () => {
        if (type === 'council') {
            window.open('https://www.instagram.com/hyerica_sw', '_blank');
        } else {
            window.open('https://www.amorepacific.com', '_blank');
        }
    };

    return (
        <SidebarContainer>
            <ProfileSection>
                <ProfileImageContainer>
                    {type === 'council' ? (
                        <ProfileImg src={councilImage} alt="Council Profile" />
                    ) : (
                        <ProfileImg src={enterImage} alt="Enterprise Profile" />
                    )}
                </ProfileImageContainer>
                <SocialContainer>
                    <IconButton onClick={handleSocialClick}>
                        {type === 'council' ? (
                            <img src={InstagramIcon} alt="Instagram" />
                        ) : (
                            <img src={LinkIcon} alt="Link" />
                        )}
                    </IconButton>
                    <IconButton onClick={handleSocialClick}>
                        <LinkContent>
                            {type === 'council' ? (
                                <>
                                    2,000
                                    <PlusIconWrapper>
                                        <img src={InstagramPlus} alt="InstagramPlus" />
                                    </PlusIconWrapper>
                                </>
                            ) : (
                                'Official'
                            )}
                        </LinkContent>
                    </IconButton>
                </SocialContainer>
            </ProfileSection>
            <ProfileName>
            {type === 'council' ? (
                    <>
                        한양대학교 ERICA<br />
                        소프트웨어융합대학 학생회 SW:ING
                    </>
                ) : (
                    <>
                        아모레퍼시픽 Amorepacific
                    </>
                )}
            </ProfileName>
            
            <NavigationContainer>
                <NavButton 
                    active={activeButton === 0} 
                    onClick={() => handleButtonClick(0)}
                >
                    <ButtonText>소개</ButtonText>
                </NavButton>
                <NavButton 
                    active={activeButton === 1} 
                    onClick={() => handleButtonClick(1)}
                >
                    <ButtonText>협업 포트폴리오_1</ButtonText>
                </NavButton>
                <NavButton 
                    active={activeButton === 2} 
                    onClick={() => handleButtonClick(2)}
                >
                    <ButtonText>협업 포트폴리오_2</ButtonText>
                </NavButton>
                <NavButton 
                    active={activeButton === 3} 
                    onClick={() => handleButtonClick(3)}
                >
                    <ButtonText>협업 포트폴리오_3</ButtonText>
                </NavButton>
                <NavButton 
                    active={activeButton === 4} 
                    onClick={() => handleButtonClick(4)}
                >
                    <ButtonText>협업 포트폴리오_4</ButtonText>
                </NavButton>
                <NavButton 
                    active={activeButton === 5} 
                    onClick={() => handleButtonClick(5)}
                >
                    <ButtonText>협업 포트폴리오_5</ButtonText>
                </NavButton>
            </NavigationContainer>
        </SidebarContainer>
    );
};

ProfileSidebar.propTypes = {
    type: PropTypes.oneOf(['council', 'enter']),
    onTabChange: PropTypes.func,
    activeTab: PropTypes.number
};

export default ProfileSidebar;
