import styled from "styled-components";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

// Main Page Container
const PageContainer = styled.div`
  background: var(--Colors-GrayScale-White, #fcfcff);
  margin-top: 4rem;
  height: 146rem;
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

  /* Header/H1 */
  font-family: "SUIT Variable";
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: 150%; /* 3rem */
  letter-spacing: -0.05rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const SubText = styled.a`
  padding: 1.25rem;
  color: var(--Colors-GrayScale-G400, #949bad);
  text-align: center;

  /* Header/H5 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;
`;

const MainPage = () => {
  return (
    <PageContainer>
      <NavBar />
      <Banner />
      <MainTitleContainer>
        <TilteText>
          대학생이 기다리는 대학 단체 - 기업의 AI 제휴 매칭 플랫폼
        </TilteText>
        <SubText>
          대학생이 기다리는 대학 단체 - 기업의 AI 제휴 매칭 플랫폼 <br />
          대학생이 기다리는 대학 단체 - 기업의 AI 제휴 매칭 플랫폼
        </SubText>
      </MainTitleContainer>
      <SearchBar />
      <Footer />
    </PageContainer>
  );
};

export default MainPage;
