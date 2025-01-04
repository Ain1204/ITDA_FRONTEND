import styled from "styled-components";
import NavBar from "../components/NavBar";

const PageContainer = styled.div`
  width: 90rem;
  height: 164.5rem;
  background: var(--Colors-GrayScale-White, #fcfcff);
`;
const MainPage = () => {
  return (
    <PageContainer>
      <NavBar />
    </PageContainer>
  );
};

export default MainPage;
