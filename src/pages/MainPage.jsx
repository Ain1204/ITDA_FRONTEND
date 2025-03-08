import styled from "styled-components";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

// Main Page Container
const PageContainer = styled.div`
  height: auto;
  min-height: 146rem;
  padding-top: 5.5rem;
  background: var(--Colors-GrayScale-White, #fcfcff);
`;

const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6rem;
  flex-direction: column;
  margin-bottom: 4.5rem;
`;

const TilteText = styled.a`
  color: var(--Colors-GrayScale-G600, #1a1a23);
  text-align: center;
  white-space: nowrap;
  /* Header/H1 */
  font-family: "SUIT Variable";
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: 150%;
  letter-spacing: -0.05rem;

  @media (max-width: 768px) {
    padding: 2rem;
    font-size: 1rem;
  }
`;

const SubText = styled.a`
  padding: 1.25rem;
  color: var(--Colors-GrayScale-G400, #949bad);
  text-align: center;
  white-space: nowrap;
  /* Header/H5 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const MainPage = () => {
  return (
    <PageContainer>
      <NavBar />
      <Banner />
      <MainTitleContainer>
        <TilteText>대학생 단체와 기업의 성공적인 협업 매칭 플랫폼</TilteText>
        <SubText>
          대학생 마케팅의 새로운 기준 <br />
          Beyond Promotion
        </SubText>
      </MainTitleContainer>
      <SearchBar />
      <Footer />
    </PageContainer>
  );
};

export default MainPage;
