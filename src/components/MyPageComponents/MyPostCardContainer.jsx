import { useState } from "react";
import styled from "styled-components";

const ITEMS_PER_PAGE = 12;

const MyPostCardContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCards, setSelectedCards] = useState([]);

  // 카드 데이터 필터링: 공고 중만 보여줌 (탭 제거했으니 필터는 원하는 대로 고정)
  const filteredCards = cardData.filter((card) => card.status === "ongoing");

  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = filteredCards.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const toggleCardSelection = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  return (
    <Container>
      <CardList>
        {currentCards.length > 0 ? (
          currentCards.map((card) => (
            <Card key={card.id}>
              <CardImage
                src={card.image}
                className={selectedCards.includes(card.id) ? "selected" : ""}
              >
                <Checkbox
                  className="checkbox"
                  checked={selectedCards.includes(card.id)}
                  onChange={() => toggleCardSelection(card.id)}
                />
              </CardImage>
              <HashtagContainer>
                {card.hashtags.map((hashtag, index) => (
                  <Hashtag key={index}>{hashtag}</Hashtag>
                ))}
              </HashtagContainer>
              <CardContent>{card.content}</CardContent>
              <CardTitle>{card.title}</CardTitle>
            </Card>
          ))
        ) : (
          <NoData>해당하는 데이터가 없습니다.</NoData>
        )}
      </CardList>

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
    </Container>
  );
};

// 샘플 카드 데이터 (공고 중 & 기간 완료 구분 추가)
const cardData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `2024 '청춘소락' ${i + 1}`,
  content: `한양대학교 ERICA 소프트웨어융합대학 ${i + 1}`,
  image: `/src/assets/MainIcon/image3.png`,
  hashtags: [
    `단기 프로모션`,
    `#${i % 2 === 0 ? "기업" : "학생"}`,
    `#테스트${i % 5}`,
  ],
  status: i % 2 === 0 ? "ongoing" : "completed",
}));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80rem;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  gap: 3rem;
  padding: 0rem 0rem 6.25rem 2rem;
`;

const Card = styled.div`
  width: 15.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardTitle = styled.h3`
  overflow: hidden;
  color: var(--Colors-GrayScale-G600, #1a1a23);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 600;
`;

const CardContent = styled.p`
  white-space: nowrap;
  overflow: hidden;
  color: var(--Colors-GrayScale-G500, #4f5462);
  text-overflow: ellipsis;
  font-size: 0.75rem;
  font-weight: 500;
`;

const CardImage = styled.div`
  width: 15.75rem;
  height: 15.75rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.32);
  transition: all 0.3s ease-in-out;

  &:hover::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    background: linear-gradient(
      180deg,
      rgba(18, 19, 24, 0.72) 0%,
      rgba(18, 19, 24, 0) 90%
    );
    pointer-events: none;
  }

  &:hover .checkbox,
  &.selected .checkbox {
    opacity: 1;
  }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
  cursor: pointer;
  appearance: none;
  border: 1.5px solid #fcfcff;
  border-radius: 0.3rem;

  &:checked {
    background-color: #3d85ff;
    border-color: #3d85ff;
    /* ✅ border-radius 유지됨 */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 6L5 8.5L9 4' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }

  &:hover {
    border-color: #3d85ff;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const HashtagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.88rem;
`;

const Hashtag = styled.span`
  font-size: 0.75rem;
  border-radius: 0.5rem;
  background: var(--Colors-Secondary-B200, #d6e4ff);
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  color: var(--Colors-Primary-B500, #0051ff);
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

const NoData = styled.p`
  color: #888;
  font-size: 1rem;
  text-align: center;
  margin-top: 2rem;
`;

export default MyPostCardContainer;
