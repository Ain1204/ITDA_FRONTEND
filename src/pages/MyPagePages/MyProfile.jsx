import React from 'react';
import styled from 'styled-components';
import ProfileImg from '../../assets/MyPageIcon/Mypage_Profile.svg';
import LinkIcon from '../../assets/MyPageIcon/Mypage_Link.svg';

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
  background: lightgray 50% / cover no-repeat;
  position: relative;
`;

const ProfileImage = styled.div`
  width: 10.25rem;
  height: 10.25rem;
  border-radius: 10.25rem;
  background: url(${props => props.src}) lightgray 50% / cover no-repeat;
  box-shadow: 0px 0px 16px 0px rgba(26, 26, 35, 0.32);
  position: absolute;
  left: 2.5rem;
  bottom: -5.125rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
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
`;

const IntroductionBox = styled.div`
  display: flex;
  height: 12.5rem;
  padding: 0.75rem 3.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  align-self: stretch;
  margin-top: 1.25rem;
  border-radius: 0.5rem;
`;

const NoIntroText = styled.p`
  align-self: stretch;
  color: var(--Colors-GrayScale-G600, #1A1A23);
  text-align: center;
  font-family: "SUIT Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 168%;
  letter-spacing: -0.02188rem;
`;

const IntroDescription = styled.p`
  color: var(--Colors-GrayScale-G600, #1A1A23);
  text-align: center;
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;
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
  line-height: 132%; /* 0.99rem */
  letter-spacing: -0.01875rem;
  border: none;
  cursor: pointer;
  margin-top: 3.75rem;
  margin-left: auto;
  margin-bottom: 20.75rem;
`;

const MyProfile = () => {
  return (
    <ProfileContainer>
      <BackgroundImage>
        <ProfileImage src={ProfileImg} />
      </BackgroundImage>
      
      <ProfileInfo>
        <UserName>쿨티아 Cooltia</UserName>
        <ConnectButton>
          <img src={LinkIcon} alt="Link Icon" />
          Connect
        </ConnectButton>
      </ProfileInfo>
      
      <IntroductionBox>
        <NoIntroText>소개글이 작성되지 않았어요.</NoIntroText>
        <IntroDescription>소개글을 작성하고, 협업 공고를 올려보세요!</IntroDescription>
      </IntroductionBox>
      
      <EditButton>수정하기</EditButton>
    </ProfileContainer>
  );
};

export default MyProfile; 