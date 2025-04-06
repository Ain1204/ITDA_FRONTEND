import { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProfileImg from '../../../assets/MyPageIcon/Mypage_Profile.svg';
import RedCircle from '../../../assets/MyPageIcon/Red_Circle.svg';
import logger from '../../../utils/logger';
import UploadPortfolio from '../../../components/MyPageComponents/UploadPortfolio';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 2.5rem;
  position: relative;
`;

const BackgroundImage = styled.div`
  height: 15.75rem;
  align-self: stretch;
  border-radius: var(--Shapes-Border-Round, 1rem);
  border: 2px solid rgba(18, 19, 24, 0.04);
  background: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'var(--Colors-Secondary-B100, #EBF2FF)'};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
  
  &.active {
    display: block;
  }
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
  
  &.active {
    display: flex;
  }
  
  &:hover {
    background: var(--Colors-Secondary-B200, #D6E4FF);
  }
`;

const ContentWrapper = styled.div`
  padding: 0 2.5rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

const ProfileImageContainer = styled.div`
  width: 10.25rem;
  height: 10.25rem;
  z-index: 2;
`;

const ProfileImage = styled.div`
  width: 10.25rem;
  height: 10.25rem;
  border-radius: 10.25rem;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: lightgray;
  box-shadow: 0px 0px 16px 0px rgba(26, 26, 35, 0.32);
  position: relative;
  
  &:hover {
    .edit-profile-overlay {
      display: block;
    }
    
    .edit-profile-button {
      display: flex;
    }
  }
`;

const EditProfileOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(0deg, rgba(18, 19, 24, 0.32) 0%, rgba(18, 19, 24, 0.32) 100%);
  display: none;
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1.75rem;
  justify-content: center;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const NameInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`;

const NameInput = styled.input`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 0.5rem;
  flex: 1 0 0;
  border-radius: 0.5rem;
  background: var(--Colors-GrayScale-G200, #F3F5F8);
  box-shadow: 0px 0px 4px 0px rgba(26, 26, 35, 0.16) inset;
  color: var(--Colors-GrayScale-G500, #4F5462);
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.025rem;
  border: none;
  
  &:focus {
    outline: none;
  }
`;

const DuplicateCheckButton = styled.button`
  display: inline-flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: ${props => props.isActive ? 'var(--Colors-Secondary-B100, #EBF2FF)' : 'var(--Colors-GrayScale-G200, #F3F5F8)'};
  color: ${props => props.isActive ? 'var(--Colors-Primary-B500, #0051FF)' : 'var(--Colors-GrayScale-G400, #949BAD)'};
  text-align: center;
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: ${props => props.isActive ? '600' : '500'};
  line-height: 150%;
  letter-spacing: -0.025rem;
  border: none;
  cursor: ${props => props.isActive ? 'pointer' : 'default'};
  
  &:hover {
    background: ${props => props.isActive ? 'var(--Colors-Secondary-B100, #EBF2FF)' : 'var(--Colors-GrayScale-G200, #F3F5F8)'};
    color: ${props => props.isActive ? 'var(--Colors-Primary-B500, #0051FF)' : 'var(--Colors-GrayScale-G400, #949BAD)'};
    font-weight: ${props => props.isActive ? '500' : '500'};
  }
  
  &:active {
    background: ${props => props.isActive ? 'var(--Colors-Secondary-B200, #D6E4FF)' : 'var(--Colors-GrayScale-G200, #F3F5F8)'};
  }
`;

const CompanyLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LinkLabel = styled.label`
  color: var(--Colors-GrayScale-G500, #4F5462);
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.025rem;
  margin-bottom: 0.25rem;
`;

const LinkInput = styled.input`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  background: var(--Colors-GrayScale-G200, #F3F5F8);
  box-shadow: 0px 0px 4px 0px rgba(26, 26, 35, 0.16) inset;
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.025rem;
  border: none;
  
  &:focus {
    outline: none;
  }
`;

const InstagramContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  width: 100%;
`;

const InstagramInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FollowerCountGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const LabelContainerNoMargin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const SectionLabel = styled.span`
  color: var(--Colors-GrayScale-G600, #1A1A23);
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;
`;

const RequiredCircle = styled.img`
  width: 0.25rem;
  height: 0.25rem;
`;

const IntroTextAreaContainer = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
`;

const IntroTextArea = styled.textarea`
  display: flex;
  height: 15rem;
  min-height: 6rem;
  padding: 1rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  border-radius: 0.75rem;
  border: 1px solid var(--Colors-GrayScale-G200, #F3F5F8);
  background: var(--Colors-GrayScale-G100, #F8F9FC);
  box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
  color: var(--Colors-GrayScale-G400, #949BAD);
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;
  width: 100%;
  resize: none;
  
  &:focus {
    outline: none;
  }
`;

const CharCount = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: var(--Colors-GrayScale-G400, #949BAD);
  text-align: right;
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%;
  letter-spacing: -0.01875rem;
`;

const SaveButton = styled.button`
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
  margin-right: 0;
  
  &:hover, &:active {
    background: var(--Colors-Primary-B500, #0051FF);
  }
`;

const PortfolioWrapper = styled.div`
  margin-bottom: 3.75rem;
  width: 100%;
`;

const MyProfileEdit = ({ userType, onStateChange }) => {
  const [formData, setFormData] = useState({
    name: '쿨티아 Cooltia',
    introduction: '',
    websiteLink: '',
    instagramLink: '',
    followerCount: '',
    profileImage: null,
    backgroundImage: null
  });
  
  const [isBackgroundHovered, setIsBackgroundHovered] = useState(false);
  const [isNameDuplicateCheckActive, setIsNameDuplicateCheckActive] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [charCount, setCharCount] = useState(0);
  
  // 프로필 및 배경 이미지 미리보기 URL 상태 추가
  const [profileImagePreview, setProfileImagePreview] = useState(ProfileImg);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState(null);
  
  const profileImageInputRef = useRef(null);
  const backgroundImageInputRef = useRef(null);
  
  const MAX_CHAR_COUNT = 640;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 이름이 변경되면 중복확인 버튼 활성화
    if (name === 'name') {
      setIsNameDuplicateCheckActive(value.trim().length > 0);
    }
    
    // 소개글 글자수 카운트
    if (name === 'introduction') {
      setCharCount(value.length);
    }
  };
  
  const handleBackgroundMouseEnter = () => {
    setIsBackgroundHovered(true);
  };
  
  const handleBackgroundMouseLeave = () => {
    setIsBackgroundHovered(false);
  };
  
  const handleEditProfile = () => {
    profileImageInputRef.current.click();
  };

  const handleEditBackground = () => {
    backgroundImageInputRef.current.click();
  };
  
  // 프로필 이미지 선택 핸들러
  const handleProfileImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setProfileImagePreview(objectUrl);
      setFormData(prev => ({
        ...prev,
        profileImage: selectedFile
      }));
    }
    // 파일 선택 후 input 초기화
    e.target.value = '';
  };
  
  // 배경 이미지 선택 핸들러
  const handleBackgroundImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setBackgroundImagePreview(objectUrl);
      setFormData(prev => ({
        ...prev,
        backgroundImage: selectedFile
      }));
    }
    // 파일 선택 후 input 초기화
    e.target.value = '';
  };
  
  const handleDuplicateCheck = () => {
    if (isNameDuplicateCheckActive) {
      logger.log('중복확인 요청:', formData.name);
      // 중복확인 로직 구현
    }
  };
  
  const handleSave = () => {
    logger.log('저장된 프로필 데이터:', formData);
    logger.log('업로드된 파일:', uploadedFiles);
    // 저장 후 채워진 프로필 상태로 변경
    onStateChange('filled');
  };
  
  // 파일 변경 핸들러 추가
  const handleFilesChange = (files) => {
    setUploadedFiles(files);
  };

  return (
    <ProfileContainer>
      <BackgroundImage
        onMouseEnter={handleBackgroundMouseEnter}
        onMouseLeave={handleBackgroundMouseLeave}
        backgroundImage={backgroundImagePreview}
      >
        <BackgroundOverlay className={isBackgroundHovered ? 'active' : ''} />
        <EditBackgroundButton 
          className={isBackgroundHovered ? 'active' : ''}
          onClick={handleEditBackground}
        >
          이미지 수정
        </EditBackgroundButton>
        <input 
          type="file" 
          ref={backgroundImageInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleBackgroundImageChange}
        />
      </BackgroundImage>
      <ContentWrapper>
        <ContentContainer>
          <ProfileImageContainer>
            <ProfileImage src={profileImagePreview}>
              <EditProfileOverlay className="edit-profile-overlay" />
              <EditProfileButton className="edit-profile-button" onClick={handleEditProfile}>
                이미지 수정
              </EditProfileButton>
            </ProfileImage>
            <input 
              type="file" 
              ref={profileImageInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </ProfileImageContainer>
          
          <FormContainer>
            <NameContainer>
              <NameInputGroup>
                <NameInput 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="이름을 입력하세요"
                />
                <DuplicateCheckButton 
                  isActive={isNameDuplicateCheckActive}
                  onClick={handleDuplicateCheck}
                >
                  중복확인
                </DuplicateCheckButton>
              </NameInputGroup>
            </NameContainer>
            
            {userType === 'company' ? (
              <CompanyLinkContainer>
                <LinkLabel>공식사이트 주소</LinkLabel>
                <LinkInput 
                  type="text" 
                  name="websiteLink" 
                  value={formData.websiteLink} 
                  onChange={handleInputChange}
                  placeholder="www. 로 시작하는 전체 주소를 입력해주세요."
                />
              </CompanyLinkContainer>
            ) : (
              <InstagramContainer>
                <InstagramInputGroup>
                  <LabelContainerNoMargin>
                    <LinkLabel>공식 Instagram</LinkLabel>
                    <RequiredCircle src={RedCircle} alt="필수" />
                  </LabelContainerNoMargin>
                  <LinkInput 
                    type="text" 
                    name="instagramLink" 
                    value={formData.instagramLink} 
                    onChange={handleInputChange}
                    placeholder="@를 포함하여 입력해주세요."
                  />
                </InstagramInputGroup>
                <FollowerCountGroup>
                  <LinkLabel>팔로워 수</LinkLabel>
                  <LinkInput 
                    type="text" 
                    name="followerCount" 
                    value={formData.followerCount} 
                    onChange={handleInputChange}
                    placeholder="협업 매칭 확률이 올라가요."
                  />
                </FollowerCountGroup>
              </InstagramContainer>
            )}
          </FormContainer>
        </ContentContainer>
        
        <LabelContainer>
          <SectionLabel>소개글</SectionLabel>
          <RequiredCircle src={RedCircle} alt="필수" />
        </LabelContainer>
        
        <IntroTextAreaContainer>
          <IntroTextArea 
            name="introduction" 
            value={formData.introduction} 
            onChange={handleInputChange}
            placeholder="소개글을 입력해주세요."
            maxLength={MAX_CHAR_COUNT}
          />
          <CharCount>( {charCount} / {MAX_CHAR_COUNT} )</CharCount>
        </IntroTextAreaContainer>
        
        <PortfolioWrapper>
          <LabelContainer>
            <SectionLabel>협업 포트폴리오</SectionLabel>
          </LabelContainer>
          <UploadPortfolio 
            onFilesChange={handleFilesChange}
          />
        </PortfolioWrapper>
      </ContentWrapper>
      
      <SaveButton onClick={handleSave}>저장하기</SaveButton>
    </ProfileContainer>
  );
};

MyProfileEdit.propTypes = {
  userType: PropTypes.string,
  onStateChange: PropTypes.func.isRequired
};

export default MyProfileEdit; 