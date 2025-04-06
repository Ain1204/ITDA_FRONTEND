import styled from "styled-components";
import SearchIcon from "../../assets/MyPageIcon/search.svg";
import MyPostCardContainer from "../../components/MyPageComponents/MyPostCardContainer";

const MyPageMyPost = () => {
  return (
    <PageContainer>
      <SuggestSuccessContainer>
        <SuggestScsTitle>
          <p>나의 공고 모아보기</p>
          <SuggestScsSearch>
            <img src={SearchIcon} />

            <Input type="text" placeholder="공고 검색하기" />
          </SuggestScsSearch>
        </SuggestScsTitle>
      </SuggestSuccessContainer>
      <MyPostCardContainer />
    </PageContainer>
  );
};
// Suggest Main Page Container
const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 1.75rem;
  background: var(--Colors-GrayScale-White, #fcfcff);
  width: 100%;
  margin-bottom: 3rem;
  overflow-x: hidden;
`;

const SuggestSuccessContainer = styled.div`
  display: flex;
  width: 73rem;
  height: 6.75rem;
  padding: 1.75rem 2rem 1.25rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-top: 2px solid var(--Colors-GrayScale-White, #fcfcff);
  background: var(--Colors-GrayScale-White, #fcfcff);
`;
const SuggestScsTitle = styled.div`
  display: flex;
  color: var(--Colors-GrayScale-G600, #1a1a23);
  width: 100%;

  p {
    width: 100%;
    /* Header/H2 */
    font-family: "SUIT Variable";
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 156%; /* 2.73rem */
    letter-spacing: -0.04375rem;
  }
`;

const SuggestScsSearch = styled.div`
  display: flex;
  width: 20rem;
  padding: 0.5rem 1rem 0.5rem 0.75rem;
  align-items: center;
  gap: 0.5rem;

  border-radius: 0.5rem;
  background: var(--Colors-GrayScale-G200, #f3f5f8);

  /* IS050 */
  box-shadow: 0px 0px 4px 0px rgba(26, 26, 35, 0.16) inset;

  color: var(--Colors-GrayScale-G400, #949bad);

  /* Body/R500 */
  font-family: "SUIT Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 168%; /* 1.47rem */
  letter-spacing: -0.02188rem;
`;
const Input = styled.input`
  display: flex;

  justify-content: left;
  align-items: center;
  background: none;
  border: none;
  outline: none;
`;

export default MyPageMyPost;
