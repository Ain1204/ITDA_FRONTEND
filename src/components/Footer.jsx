import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: auto;
  padding: 0rem 2rem;
  gap: 1.25rem;
  align-self: stretch;
  padding-bottom: 6.25rem;

  background-color: #fefeff;
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    padding: 1rem;
  }
`;

const FooterLinksContainer = styled.div`
  gap: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
  text-align: center;

  /* Body/S500 */
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%; /* 0.99rem */
  letter-spacing: -0.01875rem;

  @media (max-width: 768px) {
    text-align: left;
    font-size: 0.45rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
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

      <FooterText>
        와니코퍼레이션 경기도 안산시 상록구 한양대학2길 34, 203호 대표 이재완
        사업자등록번호 639-13-02505
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
