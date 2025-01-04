import React, { useState } from "react";
import styled from "styled-components";
import Line from "../assets/images/Mainimg/line.svg";
import Search from "../assets/images/Mainimg/Icon_Search.svg";
import ArrowDown from "../assets/images/Mainimg/arrow_down.svg";
import Filter from "../assets/images/Mainimg/filter.svg";

const cardData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `카드 ${i + 1}`,
  content: `내용 ${i + 1}`,
  category: i % 2 === 0 ? "기업" : "학생", // 짝수는 "기업", 홀수는 "학생"
  image: `/src/assets/images/Mainimg/image1.png`, // 1~12번 이미지를 순환
  hashtags: [
    `#해시태그${i + 1}`,
    `#카테고리${i % 2 === 0 ? "기업" : "학생"}`,
    `#테스트${i % 5}`, // 0~4번 해시태그를 순환
  ],
}));

// Styled components
const PageContainer = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.25rem;
`;

const Button = styled.button`
  background: var(--Colors-GrayScale-White, #fcfcff);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? "#3d85ff" : "#949BAD")};
`;

const SearchBarContainer = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  height: 3.5rem;
  padding: 0.5rem 1.5rem;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: var(--Shapes-Border-Round, 1rem);
  background: var(--Colors-GrayScale-G200, #f3f5f8);
  border: none;

  /* IS100 */
  box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
`;

const Input = styled.input`
  display: flex;
  width: 40rem;
  height: 3.5rem;

  justify-content: left;
  align-items: center;
  background: none;
  border: none;
  outline: none;
`;

const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  margin-left: 0.5rem;
  background: none;
`;

const FilterSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 1rem auto;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #000;
  gap: 0.5rem;
  background: var(--Colors-GrayScale-White, #fcfcff);
  border: none;
`;
const FilterContainer = styled.div`
  width: 100%;
  background: var(--Colors-GrayScale-G200, #f3f5f8);
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FilterTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #000;
  gap: 0.5rem;
  background: var(--Colors-GrayScale-White, #fcfcff);
  border: none;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 0;
  background: var(--Colors-GrayScale-G200, #f3f5f8);
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: #3d85ff;
    color: #fff;
  }
`;
/*Card*/
const CardContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  align-self: center;
  margin: 0 auto;
`;

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
`;

const Card = styled.div`
  flex: 1 1 calc(25% - 1rem); /* 기본적으로 4개씩 배치 */
  max-width: calc(25% - 1rem);
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex: 1 1 100%; /* 화면 너비 768px 이하일 경우 한 줄에 1개 */
    max-width: 100%;
  }
`;

const CardTitle = styled.h3`
  overflow: hidden;
  color: var(--Colors-GrayScale-G600, #1a1a23);
  text-overflow: ellipsis;

  /* Body/M600 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;
`;

const CardContent = styled.p`
  overflow: hidden;
  color: var(--Colors-GrayScale-G500, #4f5462);
  text-overflow: ellipsis;

  /* Body/S500 */
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%; /* 0.99rem */
  letter-spacing: -0.01875rem;
`;

const CardImage = styled.img`
  width: 17.5rem;
  height: 17.5rem;
  object-fit: cover;
  object-position: center;
  border-radius: var(--Shapes-Border-Round, 1rem);
  border: 1px solid rgba(18, 19, 24, 0.04);
  box-sizing: border-box;
  box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.32);
  margin: 0;
  padding: 0;
`;

const HashtagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.88rem;
`;

const Hashtag = styled.span`
  font-size: 0.875rem;
  border-radius: var(--Shapes-Border-Hard, 0.5rem);
  background: var(--Colors-Secondary-B200, #d6e4ff);

  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  color: var(--Colors-Primary-B500, #0051ff);

  /* Body/S500 */
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%; /* 0.99rem */
  letter-spacing: -0.01875rem;
`;

const PaginationContainer = styled.div`
  justify-content: center;
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  background: ${(props) => (props.isActive ? "#D6E4FF" : "none")};
  color: ${(props) => (props.isActive ? "#3d85ff" : "#949BAD")};

  border-radius: 1rem;

  cursor: pointer;

  &:hover {
    background: #3d85ff;
    color: #fff;
  }

  text-align: center;

  /* Body/R600 */
  font-family: "SUIT Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 168%; /* 1.47rem */
  letter-spacing: -0.02188rem;
`;

const ITEMS_PER_PAGE = 12;

// Main component
const SearchBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    지역: [],
    대학전공: [],
    산업분야: [],
  });
  const [selectedSort, setSelectedSort] = useState("추천순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[filterType].push(value);
      }
      return updatedFilters;
    });
  };

  const handleSortSelection = (sortOption) => {
    setSelectedSort(sortOption);
    setIsDropdownOpen(false);
  };

  const filteredCards = cardData.filter((card) => {
    const matchesCategory =
      selectedCategory === "All" || card.category === selectedCategory;
    const matchesSearchTerm =
      card.title.includes(searchTerm) || card.content.includes(searchTerm);
    return matchesCategory && matchesSearchTerm;
  });

  // 페이지 관련 계산
  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = filteredCards.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <PageContainer>
      <ButtonContainer>
        {["All", "기업", "학생"].map((category, index, array) => (
          <React.Fragment key={category}>
            <Button
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
            {index < array.length - 1 && (
              <img
                src={Line} // line.svg 경로를 지정
                alt="line separator"
              />
            )}
          </React.Fragment>
        ))}
      </ButtonContainer>

      {/* Search Bar */}
      <SearchBarContainer>
        <Input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton onClick={() => console.log("검색 버튼 클릭")}>
          <img src={Search} alt="Search Icon" />
        </SearchButton>
      </SearchBarContainer>

      <FilterSortContainer>
        <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <img src={Filter} alt="Filter icon" /> 필터
        </FilterButton>
        <DropdownContainer>
          <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedSort}
            <img src={ArrowDown} alt="Arrow Down icon" />
          </DropdownButton>
          {isDropdownOpen && (
            <DropdownMenu>
              {["추천순", "인기순"].map((sortOption) => (
                <DropdownItem
                  key={sortOption}
                  onClick={() => handleSortSelection(sortOption)}
                >
                  {sortOption}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </DropdownContainer>
      </FilterSortContainer>

      <FilterContainer isOpen={isFilterOpen}>
        {[
          { section: "지역", options: ["전체", "서울", "경기", "인천"] },
          {
            section: "대학전공",
            options: ["전체", "인문계열", "사회계열", "교육계열"],
          },
          { section: "산업분야", options: ["전체", "식품", "패션", "뷰티"] },
        ].map(({ section, options }) => (
          <FilterSection key={section}>
            <FilterTitle>{section}</FilterTitle>
            <CheckboxGroup>
              {options.map((option) => (
                <CheckboxLabel key={option}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedFilters[section]?.includes(option)}
                    onChange={() => handleCheckboxChange(section, option)}
                  />
                  {option}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </FilterSection>
        ))}
      </FilterContainer>
      <CardContainer>
        <CardListContainer>
          {currentCards.map((card) => (
            <Card key={card.id}>
              <CardImage src={card.image} alt={`${card.title} 이미지`} />
              <HashtagContainer>
                {card.hashtags.map((hashtag, index) => (
                  <Hashtag key={index}>{hashtag}</Hashtag>
                ))}
              </HashtagContainer>
              <CardContent>{card.content}</CardContent>
              <CardTitle>{card.title}</CardTitle>
            </Card>
          ))}
        </CardListContainer>

        {/* 페이지네이션 */}
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index + 1}
              isActive={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      </CardContainer>
    </PageContainer>
  );
};

export default SearchBar;
