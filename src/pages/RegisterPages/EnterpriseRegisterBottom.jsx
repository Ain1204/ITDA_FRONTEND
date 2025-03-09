import styled from "styled-components";
import { useState } from "react";
import dummyProfile from "../../assets/registerIcon/profile_enter.svg";
import RegisterInput from "../../components/RegisterInput";
import RegisterDetailButton from "../../components/RegisterButton";
import necessaryDot from "../../assets/registerIcon/necessaryDot.svg";
import Modal from "../../components/Modal";

const BottomContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 36px auto 0;
  padding: 0 32px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h5`
  color: var(--Colors-GrayScale-G600, #1A1A23);
  font-family: "SUIT Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.4px;
  margin: 0;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
`;

const ProfileInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.span`
  overflow: hidden;
  color: var(--Colors-GrayScale-G600, #1A1A23);
  text-overflow: ellipsis;
  font-family: "SUIT Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 168%;
  letter-spacing: -0.35px;
  margin-bottom: -4px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const ProfileURL = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--Colors-Primary-B500, #0051FF);
  text-overflow: ellipsis;
  font-family: "SUIT Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 132%;
  letter-spacing: -0.3px;
`;

const RequestBody = styled.div`
  margin-top: 36px;
`;

const RequestTitle = styled.button`
  color: var(--Colors-Primary-B500, #0051FF);
  font-family: "SUIT Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 132%;
  letter-spacing: -0.3px;
  padding: 12px 0;
  border: none;
  background: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  text-align: left;
  width: fit-content;
  border-bottom: 2px solid var(--Colors-Primary-B500, #0051FF);
  margin-bottom: -2px;
  position: relative;
  z-index: 1;

  &:hover {
    opacity: 0.8;
  }
`;

const RequestDivider = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 24px;
  border-bottom: 2px solid var(--Colors-GrayScale-G300, #E5EAF2);
  position: relative;
`;

const RequestDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const RequestDetailTitle = styled.span` 
  color: var(--Colors-Primary-B500, #0051FF);
  font-family: "SUIT Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 168%;
  letter-spacing: -0.35px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NecessaryDot = styled.img`
  width: 4px;
  height: 4px;
  transform: translateY(-2px);
`;

const RequestWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 40px;
`;

const PeriodDivider = styled.span`
  color: var(--Colors-GrayScale-G600, #1A1A23);
  font-family: "SUIT Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.4px;
  transform: translateY(6px);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const RegisterButton = styled.button`
  display: flex;
  width: 116px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: none;
  background: var(--Colors-Primary-B400, #3D85FF);
  color:var(--Colors-GrayScale-White, #FCFCFF);
  text-align: right;
  font-family: "SUIT Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.4px;
  cursor: pointer;
  transform: translateY(1px);
  margin-bottom: 48px;

  &:hover {
		background: var(--Colors-Primary-Blue600, #2461D9);
	}

  &:disabled {
		background: var(--Colors-GrayScale-G200, rgba(243, 245, 248, 1));
		color: var(--Colors-GrayScale-G400, rgba(148, 155, 173, 1));
		cursor: default;
	}
`;

const FooterDivider = styled.div`
  display: flex;ㄴ
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  align-items: center;
  gap: 24px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 32px;
    right: 32px;
    bottom: 0;
    height: 2px;
    background-color: var(--Colors-GrayScale-G300, #E5EAF2);
  }
`;

const StyledRegisterInput = styled(RegisterInput)`
  text-align: left;
  
  &::placeholder {
    text-align: right;
  }
`;

const ErrorMessage = styled.span`
  margin-top: 4px;
  position: absolute;
  bottom: -20px;
  color: var(--Colors-Colors-Style-Error, #EF5D58);
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 132%;
	letter-spacing: -0.3px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const RegisterBottom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInitialCategory, setSelectedInitialCategory] = useState("인스타그램");
  const [errors, setErrors] = useState({
    primaryContact: '',
    secondaryContact: ''
  });
  const [formData, setFormData] = useState({
    noticeStartDate: '',
    noticeEndDate: '',
    collaborationType: '',
    productType: [],
    quantity: '',
    promotionMethods: [],
    primaryContact: '',
    secondaryContact: ''
  });

  const validateOpenKakao = (url) => {
    return url.startsWith('https://open.kakao.com/');
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = () => {
    return formData.noticeStartDate && 
          formData.noticeEndDate && 
          formData.collaborationType && 
          formData.productType.length > 0 && 
          formData.quantity &&
          formData.promotionMethods.length > 0 && 
          formData.primaryContact;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'primaryContact') {
      if (value && !validateOpenKakao(value)) {
        setErrors(prev => ({
          ...prev,
          primaryContact: '올바른 형식이 아닙니다'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          primaryContact: ''
        }));
      }
    }

    if (field === 'secondaryContact') {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({
          ...prev,
          secondaryContact: '올바른 형식이 아닙니다'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          secondaryContact: ''
        }));
      }
    }
  };

  const handleArrayInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handlePromotionButtonClick = (method) => {
    setSelectedInitialCategory(method);
    setIsModalOpen(true);
  };

  const handlePromotionMethodsChange = (selectedLabels) => {
    const allSelectedMethods = Object.values(selectedLabels).flat();
    setFormData(prev => ({
      ...prev,
      promotionMethods: allSelectedMethods
    }));
  };

  const handleRegister = () => {
    if (!isFormValid()) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    alert('등록이 완료되었습니다.');
  };

  return (
    <BottomContainer>
      <ProfileContainer>
        <Title>프로필</Title>
        <ProfileWrapper>
          <ProfileImage src={dummyProfile} alt="프로필 이미지" />
          <ProfileInformation>
            <ProfileName>쿨티아 Cooltia</ProfileName>
            <ProfileURL>https://cooltia.com</ProfileURL>
          </ProfileInformation>
        </ProfileWrapper>
      </ProfileContainer>
      
      <RequestBody>
        <RequestTitle type="button">제안 사항</RequestTitle>
        <RequestDivider type="button" />

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSelect={handlePromotionMethodsChange}
          initialCategory={selectedInitialCategory}
        />

        <RequestDetail>
          <RequestDetailTitle>
            공고 기간
            <NecessaryDot src={necessaryDot} alt="필수" />
          </RequestDetailTitle>
          <RequestWrapper>
            <RegisterInput 
              width="150px" 
              placeholder="YYMMDD"
              value={formData.noticeStartDate}
              onChange={(e) => handleInputChange('noticeStartDate', e.target.value)}
            />
            <PeriodDivider>-</PeriodDivider>
            <RegisterInput 
              width="150px" 
              placeholder="YYMMDD"
              value={formData.noticeEndDate}
              onChange={(e) => handleInputChange('noticeEndDate', e.target.value)}
            />
          </RequestWrapper>

          <RequestDetailTitle>
            협업 방식
            <NecessaryDot src={necessaryDot} alt="필수" />
          </RequestDetailTitle>
          <RequestWrapper>
            <RegisterDetailButton 
              text="광고"
              $active={formData.collaborationType === "광고"}
              onClick={() => handleInputChange('collaborationType', '광고')}
            />
            <RegisterDetailButton 
              text="프로모션"
              $active={formData.collaborationType === "프로모션"}
              onClick={() => handleInputChange('collaborationType', '프로모션')}
            />
          </RequestWrapper>

          <RequestDetailTitle>
            제품군
            <NecessaryDot src={necessaryDot} alt="필수" />
          </RequestDetailTitle>
          <RequestWrapper>
            {["식품/간식", "음료", "주류", "뷰티", "패션", "의료/제약", "문구/소품", "쿠폰/바우처", "기타"].map((product) => (
              <RegisterDetailButton 
                key={product}
                text={product}
                $active={formData.productType.includes(product)}
                onClick={() => handleArrayInputChange('productType', product)}
              />
            ))}
          </RequestWrapper>

          <RequestDetailTitle>
            수량
            <NecessaryDot src={necessaryDot} alt="필수" />
          </RequestDetailTitle>
          <RequestWrapper>
            <PeriodDivider>약</PeriodDivider>
            <RegisterInput 
              width="111px" 
              placeholder="최대 10,000"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
            />
          </RequestWrapper>

          <RequestDetailTitle>
            홍보 조건
            <NecessaryDot src={necessaryDot} alt="필수" />
          </RequestDetailTitle>
          <RequestWrapper>
            {["인스타그램", "블로그", "유튜브", "오프라인", "기타"].map((method) => (
              <RegisterDetailButton 
                key={method}
                text={method}
                $active={formData.promotionMethods.includes(method)}
                onClick={() => handlePromotionButtonClick(method)}
              />
            ))}
          </RequestWrapper>

          <RequestDetailTitle>
            1차 연락 수단
            <NecessaryDot src={necessaryDot} alt="필수" />
          </RequestDetailTitle>
          <RequestWrapper>
            <InputWrapper>
              <RegisterInput 
                width="300px" 
                placeholder="https://open.kakao.com/"
                value={formData.primaryContact}
                onChange={(e) => handleInputChange('primaryContact', e.target.value)}
              />
              {errors.primaryContact && <ErrorMessage>{errors.primaryContact}</ErrorMessage>}
            </InputWrapper>
          </RequestWrapper>

          <RequestDetailTitle>
            2차 연락 수단
          </RequestDetailTitle>
          <RequestWrapper>
            <InputWrapper>
              <StyledRegisterInput 
                width="300px" 
                placeholder="@email.com"
                value={formData.secondaryContact}
                onChange={(e) => handleInputChange('secondaryContact', e.target.value)}
              />
              {errors.secondaryContact && <ErrorMessage>{errors.secondaryContact}</ErrorMessage>}
            </InputWrapper>
          </RequestWrapper>
          
        </RequestDetail>
        <ButtonContainer>
          <RegisterButton 
            onClick={handleRegister}
            disabled={!isFormValid()}
          >
            등록하기
          </RegisterButton>
        </ButtonContainer>
      </RequestBody>
      <FooterDivider />
    </BottomContainer>
  );
};

export default RegisterBottom; 