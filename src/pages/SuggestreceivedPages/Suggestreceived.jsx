import { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/MyPageIcon/search.svg";
import SuggestItemWrapper from "../SuggestSentPage/SuggestItemWrapper";

const Suggestreceived = () => {
  const [suggestList, setSuggestList] = useState([
    {
      id: 1,
      brand: "아모레퍼시픽 Amorepacific",
      product: "UV 프로텍터 액티브 선 SPF 50+ / PA++++ 10g",
      date: "2024.12.31",
    },
    {
      id: 2,
      brand: "라네즈 LANEIGE",
      product: "워터뱅크 블루 히알루로닉 크림 50ml",
      date: "2024.11.15",
    },
    {
      id: 3,
      brand: "이니스프리 Innisfree",
      product: "그린티 씨드 세럼 80ml",
      date: "2024.10.10",
    },
    {
      id: 4,
      brand: "헤라 HERA",
      product: "블랙 쿠션 SPF34 PA++ 15g",
      date: "2024.09.01",
    },
    {
      id: 5,
      brand: "설화수 Sulwhasoo",
      product: "윤조에센스 90ml",
      date: "2024.08.20",
    },
    {
      id: 6,
      brand: "미샤 MISSHA",
      product: "타임 레볼루션 나이트 리페어 앰플 50ml",
      date: "2024.07.0",
    },
    {
      id: 7,
      brand: "닥터자르트 Dr.Jart+",
      product: "시카페어 리커버 크림 55ml",
      date: "2024.06.18",
    },
    {
      id: 8,
      brand: "프리메라 Primera",
      product: "알파인 베리 워터리 크림 50ml",
      date: "2024.05.22",
    },

    // ...
  ]);

  const [checkedItems, setCheckedItems] = useState([]);
  const handleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 한 페이지에 표시할 아이템 수

  const totalPages = Math.ceil(suggestList.length / itemsPerPage);

  // 현재 페이지에 맞는 데이터 슬라이스
  const paginatedList = suggestList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <PageContainer>
      <SuggestSuccessContainer>
        <SuggestScsTitle>
          <p>받은 제안 현황</p>
          <SuggestScsSearch>
            <img src={SearchIcon} />
            <Input type="text" placeholder="받은 제안 검색하기" />
          </SuggestScsSearch>
        </SuggestScsTitle>
        <SuggestDelete>
          <DeleteSelectedButton
            disabled={checkedItems.length === 0}
            onClick={() =>
              setSuggestList((prev) =>
                prev.filter((item) => !checkedItems.includes(item.id))
              )
            }
          >
            선택 삭제 ({checkedItems.length})
          </DeleteSelectedButton>

          <DeleteAllButton
            disabled={suggestList.length === 0}
            onClick={() => setSuggestList([])}
          >
            전체 삭제
          </DeleteAllButton>
        </SuggestDelete>
      </SuggestSuccessContainer>
      <SuggestSentList>
        {paginatedList.map((item, index) => (
          <SuggestItemWrapper
            key={item.id}
            id={item.id}
            brand={item.brand}
            product={item.product}
            date={item.date}
            checked={checkedItems.includes(item.id)}
            onCheck={() => handleCheck(item.id)}
            onDelete={() =>
              setSuggestList((prev) =>
                prev.filter(
                  (_, i) => i !== (currentPage - 1) * itemsPerPage + index
                )
              )
            }
          />
        ))}
      </SuggestSentList>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index + 1}
              isActive={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </Pagination>
      )}
    </PageContainer>
  );
};

export default Suggestreceived;

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
  padding: 1.75rem 2rem 1.25rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-top: 2px solid var(--Colors-GrayScale-White, #fcfcff);
  background: var(--Colors-GrayScale-White, #fcfcff);

  min-height: 8.75rem;
  overflow: visible;
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

const SuggestDelete = styled.div`
  display: flex;
  color: var(--Colors-GrayScale-G600, #1a1a23);
  width: 100%;
  min-height: 2rem;

  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;

  p {
    color: var(--Colors-GrayScale-G400, #949bad);
    text-align: center;

    /* Body/S500 */
    font-family: "SUIT Variable";
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 132%; /* 0.99rem */
    letter-spacing: -0.01875rem;
  }
`;
const DeleteSelectedButton = styled.button`
  padding: 0.5rem 1rem;
  color: ${({ disabled }) => (disabled ? "#ccc" : "#ef5d58")};
  background: none;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const DeleteAllButton = styled.button`
  padding: 0.5rem 1rem;
  color: ${({ disabled }) => (disabled ? "#ccc" : "#949bad")};
  background: none;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const SuggestSentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-left: 2rem;
  width: 69rem;
`;
const Pagination = styled.div`
  justify-content: center;
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  display: flex;
  width: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  background: ${(props) => (props.isActive ? "#D6E4FF" : "none")};
  color: ${(props) => (props.isActive ? "#3d85ff" : "#949BAD")};
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background: var(--Colors-Secondary-B200, #d6e4ff);
    color: var(--Colors-Primary-B500, #0051ff);
  }
`;
