import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1.5rem;
  padding: 1rem 2rem;
  height: auto;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    padding: 1rem;
  }
`;

const FooterLinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const FooterLinksContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 1rem;
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
  width: 90%;
  margin: 0 auto;

  color: var(--Colors-GrayScale-G400, #949bad);

  /* Body/S500 */
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%;
  letter-spacing: -0.01875rem;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 0.7rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinksWrapper>
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

        <FooterLinksContainer>
          <FooterButton onClick={() => alert("서비스 이용약관으로 이동")}>
            서비스 이용약관
          </FooterButton>
          <FooterButton onClick={() => alert("개인정보처리방침으로 이동")}>
            개인정보처리방침
          </FooterButton>
        </FooterLinksContainer>
      </FooterLinksWrapper>

      <FooterText>
        © 와니코퍼레이션 경기도 안산시 상록구 한양대학2길 34, 203호 대표 이재완
        사업자등록번호 639-13-02505
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
