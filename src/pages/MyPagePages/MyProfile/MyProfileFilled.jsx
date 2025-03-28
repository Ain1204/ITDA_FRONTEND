import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ProfileImg from '../../../assets/MyPageIcon/Mypage_Profile.svg';
import LinkIcon from '../../../assets/MyPageIcon/Mypage_Link.svg';
import InstagramIcon from '../../../assets/MyPageIcon/Instagram_Icon.svg';
import InstagramConnect from '../../../assets/MyPageIcon/Instagram_Connect.svg';
import IRExample1 from '../../../assets/MyPageIcon/IR_Example_1.jpg';
import IRExample2 from '../../../assets/MyPageIcon/IR_Example_2.png';
import logger from '../../../utils/logger';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 2rem;
`;

const BackgroundImage = styled.div`
  height: 15.75rem;
  align-self: stretch;
  border-radius: var(--Shapes-Border-Round, 1rem);
  border: 2px solid rgba(18, 19, 24, 0.04);
  background: var(--Colors-Secondary-B100, #EBF2FF);
  position: relative;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(18, 19, 24, 0.32) 0%, rgba(18, 19, 24, 0.32) 100%);
  border-radius: var(--Shapes-Border-Round, 1rem);
  display: none;
  pointer-events: none;
`;

const EditBackgroundButton = styled.button`
  width: 6.5rem;
  height: 2.5rem;
  display: none;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--Colors-Secondary-B100, #EBF2FF);
  color: var(--Colors-Primary-B500, #0051FF);
  text-align: center;
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  
  &:hover {
    background: var(--Colors-Secondary-B200, #D6E4FF);
  }
`;

const ProfileImageContainer = styled.div`
  position: absolute;
  left: 2.5rem;
  bottom: -5.125rem;
  width: 10.25rem;
  height: 10.25rem;
  z-index: 2;
`;

const ProfileImage = styled.div`
  width: 10.25rem;
  height: 10.25rem;
  border-radius: 10.25rem;
  background: url(${props => props.src}) lightgray 50% / cover no-repeat;
  box-shadow: 0px 0px 16px 0px rgba(26, 26, 35, 0.32);
`;

const EditProfileButton = styled.button`
  width: 6.5rem;
  height: 2rem;
  display: none;
  padding: 0.25rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--Colors-Secondary-B100, #EBF2FF);
  color: var(--Colors-Primary-B500, #0051FF);
  text-align: center;
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.025rem;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  &:hover {
    background: var(--Colors-Secondary-B200, #D6E4FF);
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.25rem;
  padding-left: 14rem;
`;

const UserName = styled.h2`
  color: var(--Colors-GrayScale-G600, #1A1A23);
  font-family: "SUIT Variable";
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 156%;
  letter-spacing: -0.04375rem;
`;

const ConnectButton = styled.button`
  display: inline-flex;
  padding: 0.5rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--Shapes-Border-Hard, 0.5rem);
  background: transparent;
  border: none;
  color: var(--Colors-Primary-B500, #0051FF);
  font-family: "SUIT Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 168%;
  letter-spacing: -0.02188rem;
  cursor: pointer;
  margin-right: 2.5rem;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    background: var(--Colors-GrayScale-White, #FCFCFF);
    box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
  }
  
  &:active {
    background: linear-gradient(0deg, var(--Colors-Overlay-OD100, rgba(18, 19, 24, 0.10)) 0%, var(--Colors-Overlay-OD100, rgba(18, 19, 24, 0.10)) 100%), var(--Colors-GrayScale-White, #FCFCFF);
    box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
  }
`;

const IntroductionBox = styled.div`
  display: flex;
  padding: 0rem 3.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
  margin-top: 2rem;
  margin-bottom: 4rem;
  border-radius: 0.5rem;
  background: var(--Colors-GrayScale-G50, #FAFAFC);
`;

const IntroductionText = styled.p`
  color: var(--Colors-GrayScale-G600, #1A1A23);
  font-family: "SUIT Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 168%; /* 1.47rem */
  letter-spacing: -0.02188rem;
`;

// 포트폴리오 섹션 스타일 
const PortfolioSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2.5rem;
`;

const PortfolioTitleContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  position: relative;
`;

const PortfolioTitle = styled.button`
  color: ${(props) =>
    props.$active === "true"
      ? "var(--Colors-Primary-B500, #0051FF)"
      : "var(--Colors-GrayScale-G400, #949BAD)"};
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%;
  letter-spacing: -0.01875rem;
  padding: 0.75rem 0;
  border: none;
  background: none;
  cursor: pointer;
  transition: opacity 0.2s ease, color 0.3s ease;
  text-align: left;
  width: fit-content;
  position: relative;
  z-index: 1;

  &:hover {
    opacity: 0.8;
  }
`;

const PortfolioDivider = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 2px solid var(--Colors-GrayScale-G300, #e5eaf2);
  position: relative;
`;

const PortfolioUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: ${(props) => props.position}px;
  width: ${(props) => props.width}px;
  height: 2px;
  background-color: var(--Colors-Primary-B500, #0051FF);
  transition: all 0.3s ease-in-out;
  z-index: 2;
`;

const PortfolioContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2.5rem;
  opacity: ${(props) => (props.$active === "true" ? 1 : 0)};
  transform: translateY(
    ${(props) => (props.$active === "true" ? "0" : "20px")}
  );
  transition: all 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: ${(props) => (props.$active === "true" ? "all" : "none")};
  visibility: ${(props) => (props.$active === "true" ? "visible" : "hidden")};
`;

const PortfolioContentWrapper = styled.div`
  position: relative;
  height: 41.25rem;
  width: 100%;
  transition: height 0.3s ease;
`;

const PortfolioThumbnail = styled.div`
  width: 100%;
  height: 38.75rem;
  border-radius: 0.75rem;
  background-image: ${props => `url(${props.$bg})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: lightgray;
`;

const EditButton = styled.button`
  display: flex;
  width: 4.375rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--Colors-Primary-B400, #3D85FF);
  color: var(--Colors-GrayScale-White, #FCFCFF);
  text-align: center;
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%;
  letter-spacing: -0.01875rem;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: 2.5rem;
  
  &:hover, &:active {
    background: var(--Colors-Primary-B500, #0051FF);
  }
`;

const MyProfileFilled = ({ userType, onStateChange }) => {
  const [activePortfolio, setActivePortfolio] = useState("협업포트폴리오_1");
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlinePosition, setUnderlinePosition] = useState(0);
  const portfolioTabRefs = useRef({});
  const [profileData, setProfileData] = useState({
    name: '쿨티아 Cooltia',
    introduction: userType === 'company' 
      ? '안녕하세요, 빅데이터 분석 AI 기업 쿨티아입니다. 저희는 학생들의 프로젝트와 아이디어를 지원하고, 함께 성장할 수 있는 협업 파트너를 찾고 있습니다. 현재 AI 기반 교육 플랫폼 개발 프로젝트를 진행 중이며, 열정 있는 개발자와 디자이너분들의 참여를 기다립니다.'
      : '안녕하세요, UX/UI 디자인을 전공하고 있는 학생입니다. 사용자 경험에 중점을 둔 직관적인 인터페이스 디자인에 관심이 많으며, 최근에는 모바일 앱 디자인 프로젝트를 진행하고 있습니다. 다양한 분야의 개발자분들과 협업하여 실제 서비스를 개발해보고 싶습니다.',
    websiteLink: 'https://cooltia.com',
    instagramId: 'cooltia_design',
    portfolios: {
      '협업포트폴리오_1': IRExample1,
      '협업포트폴리오_2': IRExample2,
      '협업포트폴리오_3': IRExample1,
      '협업포트폴리오_4': IRExample2,
      '협업포트폴리오_5': IRExample1,
    }
  });
  
  useEffect(() => {
    // 실제 구현에서는 API를 통해 프로필 데이터를 가져오는 코드
    // 여기서는 userType에 따라 다른 예시 데이터 설정
    setProfileData(prev => ({
      ...prev,
      introduction: userType === 'company' 
        ? '안녕하세요, 빅데이터 분석 AI 기업 쿨티아입니다. 저희는 학생들의 프로젝트와 아이디어를 지원하고, 함께 성장할 수 있는 협업 파트너를 찾고 있습니다. 현재 AI 기반 교육 플랫폼 개발 프로젝트를 진행 중이며, 열정 있는 개발자와 디자이너분들의 참여를 기다립니다.'
        : '안녕하세요, UX/UI 디자인을 전공하고 있는 학생입니다. 사용자 경험에 중점을 둔 직관적인 인터페이스 디자인에 관심이 많으며, 최근에는 모바일 앱 디자인 프로젝트를 진행하고 있습니다. 다양한 분야의 개발자분들과 협업하여 실제 서비스를 개발해보고 싶습니다.'
    }));
  }, [userType]);
  
  // 언더라인 효과를 위한 useEffect
  useEffect(() => {
    if (portfolioTabRefs.current[activePortfolio]) {
      const tabElement = portfolioTabRefs.current[activePortfolio];
      const rect = tabElement.getBoundingClientRect();
      setUnderlineWidth(rect.width);
      setUnderlinePosition(tabElement.offsetLeft);
    }
  }, [activePortfolio]);
  
  const handleEditButtonClick = () => {
    // 프로필 수정 상태로 변경
    onStateChange('edit');
  };

  const handleConnectClick = () => {
    if (userType === 'company') {
      window.open(profileData.websiteLink, '_blank');
    } else {
      window.open(`https://instagram.com/${profileData.instagramId}`, '_blank');
    }
  };

  return (
    <ProfileContainer>
      <BackgroundImage>
        <ProfileImageContainer 
          className="profile-image-container" 
          src={ProfileImg}
        >
          <ProfileImage className="profile-image" src={ProfileImg} />
        </ProfileImageContainer>
      </BackgroundImage>
      
      <ProfileInfo>
        <UserName>{profileData.name}</UserName>
        {userType === 'company' ? (
          <ConnectButton onClick={handleConnectClick}>
            <img src={LinkIcon} alt="Link Icon" />
            Connect
          </ConnectButton>
        ) : (
          <ConnectButton onClick={handleConnectClick}>
            <img src={InstagramIcon} alt="Instagram Icon" />
            <img src={InstagramConnect} alt="Instagram Connect" />
          </ConnectButton>
        )}
      </ProfileInfo>
      
      <IntroductionBox>
        <IntroductionText>{profileData.introduction}</IntroductionText>
      </IntroductionBox>
      
      {/* 포트폴리오 섹션 추가 */}
      <PortfolioSection>
        <PortfolioTitleContainer>
          {Object.keys(profileData.portfolios).map((portfolio) => (
            <PortfolioTitle
              key={portfolio}
              type="button"
              onClick={() => setActivePortfolio(portfolio)}
              $active={(activePortfolio === portfolio).toString()}
              ref={(el) => (portfolioTabRefs.current[portfolio] = el)}
            >
              {portfolio}
            </PortfolioTitle>
          ))}
          <PortfolioUnderline 
            position={underlinePosition} 
            width={underlineWidth} 
          />
        </PortfolioTitleContainer>
        <PortfolioDivider />
        
        <PortfolioContentWrapper>
          {Object.keys(profileData.portfolios).map((portfolio) => (
            <PortfolioContent
              key={portfolio}
              $active={(activePortfolio === portfolio).toString()}
            >
              <PortfolioThumbnail $bg={profileData.portfolios[portfolio]} />
            </PortfolioContent>
          ))}
        </PortfolioContentWrapper>
      </PortfolioSection>
      
      <EditButton onClick={handleEditButtonClick}>수정하기</EditButton>
    </ProfileContainer>
  );
};

export default MyProfileFilled; 