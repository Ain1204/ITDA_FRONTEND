import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 0rem 2rem;
  gap: 1.25rem;
  align-self: stretch;
  padding-bottom: 6.25rem;
  background-color: #fefeff;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FooterDivider = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  margin-bottom: 1.5rem;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: var(--Colors-GrayScale-G300, #e5eaf2);
  }
`;

const FooterContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLinksContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const FooterButton = styled.a`
  background: none;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  padding: 0.5rem 1rem;
  color: var(--Colors-GrayScale-G400, #949bad);
  text-align: center;

  &:hover {
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    background: var(--Colors-Secondary-B100, #ebf2ff);
    color: var(--Colors-Primary-B500, #0051ff);
  }

  /* Header/H5 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const FooterText = styled.p`
  text-align: left;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.625rem;
  color: var(--Colors-GrayScale-G400, #949bad);

  /* Body/S500 */
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%; /* 0.99rem */
  letter-spacing: -0.01875rem;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 0.45rem;
  }
`;

const RightLinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const LegalButton = styled(FooterButton)`
  font-size: 1rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterDivider />
      <FooterContentWrapper>
        <FooterLinksContainer>
          <FooterButton onClick={() => alert("서비스소개로 이동")}>
            서비스소개
          </FooterButton>
          <FooterButton onClick={() => alert("공지사항으로 이동")}>
            공지사항
          </FooterButton>
          <FooterButton onClick={() => alert("FAQ으로 이동")}>FAQ</FooterButton>
          <FooterButton onClick={() => alert("1:1문의로 이동")}>
            1:1문의
          </FooterButton>
        </FooterLinksContainer>

        <RightLinksContainer>
          <LegalButton onClick={() => alert("서비스이용약관으로 이동")}>
            서비스이용약관
          </LegalButton>
          <LegalButton onClick={() => alert("개인정보처리방침으로 이동")}>
            개인정보처리방침
          </LegalButton>
        </RightLinksContainer>
      </FooterContentWrapper>

      <FooterText>
        와니코퍼레이션 경기도 안산시 상록구 한양대학2길 34, 203호 대표 이재완
        사업자등록번호 639-13-02505
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
