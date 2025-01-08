import React, { useState } from "react";
import styled from "styled-components";
import Line from "../assets/images/Mainimg/line.svg";
import Search from "../assets/images/Mainimg/Icon_Search.svg";
import Filter from "../assets/images/Mainimg/filter.svg";
import Reset from "../assets/images/Mainimg/arrow_update.svg";
import Close from "../assets/images/Mainimg/closed.svg";
import LineRow from "../assets/images/Mainimg/line-row.svg";
import Check from "../assets/images/Mainimg/check.svg";

const ITEMS_PER_PAGE = 15;

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
  const [selectedDropdown, setSelectedDropdown] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

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

  // 선택 항목 삭제 함수
  const handleRemoveSelected = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      updatedFilters[filterType] = updatedFilters[filterType].filter(
        (item) => item !== value
      );
      return updatedFilters;
    });
  };

  const filteredCards = cardData.filter((card) => {
    const matchesCategory =
      selectedCategory === "All" || card.category === selectedCategory;
    const matchesSearchTerm =
      card.title.includes(searchTerm) || card.content.includes(searchTerm);
    return matchesCategory && matchesSearchTerm;
  });
  const [activeFilter, setActiveFilter] = useState("지역"); // 기본값을 "지역"으로 설정

  const resetFilters = () => {
    setSelectedFilters({
      지역: [],
      대학전공: [],
      산업분야: [],
    });
    setSelectedDropdown([]);
  };

  const applyFilters = () => {
    console.log("Filters applied:", selectedFilters, selectedDropdown);
  };

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
        {["All", "대학생 단체", "기업"].map((category, index, array) => (
          <React.Fragment key={category}>
            <Button
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
            {index < array.length - 1 && (
              <img src={Line} alt="line separator" />
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
        {/* 선택된 체크박스 항목 */}
        <SelectedTextContainer>
          {Object.entries(selectedFilters)
            .flatMap(([key, values]) => values) // 키값을 제거하고 값만 추출
            .slice(0, showAll ? undefined : 5)
            .map((value, index) => (
              <SelectedText key={index}>
                {value}
                <img
                  src={Close}
                  alt="Close icon"
                  onClick={() => {
                    // 값이 어느 키에 속하는지 찾은 후 제거
                    const filterKey = Object.keys(selectedFilters).find((key) =>
                      selectedFilters[key].includes(value)
                    );
                    if (filterKey) handleRemoveSelected(filterKey, value);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </SelectedText>
            ))}

          {Object.entries(selectedFilters).flatMap(([key, values]) => values)
            .length > 5 && (
            <SelectedTextOverflow
              onClick={() => setShowAll(!showAll)}
              isHidden={showAll}
            >
              {showAll ? "접기" : "..."}
            </SelectedTextOverflow>
          )}
        </SelectedTextContainer>

        {/* 초기화 및 적용 버튼 */}
        <ApplyResetContainer isOpen={isFilterOpen}>
          <ResetButton onClick={resetFilters}>
            <img src={Reset} alt="Reset icon" />
            초기화
          </ResetButton>
          <ApplyButton onClick={applyFilters}>
            <img src={Check} alt="Check icon" />
            필터 적용하기
          </ApplyButton>
        </ApplyResetContainer>
      </FilterSortContainer>

      <FilterContainer isOpen={isFilterOpen}>
        <ButtonContainer>
          {["지역", "대학전공", "산업분야"].map((section) => (
            <Button
              key={section}
              isSelected={activeFilter === section}
              onClick={() =>
                setActiveFilter(activeFilter === section ? null : section)
              }
            >
              {section}
            </Button>
          ))}
        </ButtonContainer>
        <FilterSectionImg src={LineRow} alt="LineRow icon" />
        {/* 필터 섹션 */}
        {[
          {
            section: "지역",
            options: [
              "전체",
              "서울",
              "경기",
              "인천",
              "강원",
              "충북",
              "충남",
              "전북",
              "전남",
              "경북",
              "경남",
              "부산",
              "대구",
              "울산",
              "광주",
              "대전",
              "세종",
              "제주",
            ],
          },
          {
            section: "대학전공",
            options: [
              "전체",
              "인문계열",
              "사회계열",
              "교육계열",
              "공학계열",
              "자연과학계열",
              "의약계열",
              "예체능계열",
              "농수산계열",
              "IT계열",
              "법학계열",
              "경영계열",
              "언론계열",
            ],
          },
          {
            section: "산업분야",
            options: [
              "전체",
              "식품",
              "패션",
              "뷰티",
              "IT",
              "건설",
              "제조",
              "물류",
              "헬스케어",
              "엔터테인먼트",
              "미디어",
              "교육",
              "농업",
              "에너지",
              "금융",
              "법률",
              "환경",
              "스포츠",
              "자동차",
              "게임",
            ],
          },
        ].map(
          ({ section, options }) =>
            activeFilter === section && (
              <FilterSection key={section}>
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
            )
        )}
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

const cardData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `카드 ${i + 1}`,
  content: `내용 ${i + 1}`,
  category: i % 2 === 0 ? "대학생 단체" : "기ㅂ", // 짝수는 "기업", 홀수는 "학생"
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
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background: var(--Colors-GrayScale-White, #fcfcff);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? "#3d85ff" : "#949BAD")};
  text-align: center;

  /* Body/M600 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;
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

  @media (max-width: 768px) {
    width: 100%;
  }
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
  background: none;
  display: flex;
`;

const FilterSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 0rem auto;
  white-space: nowrap;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    width: 100%;
  }
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
  height: 100%;
  border: none;
  white-space: nowrap;

  border-radius: 0.5rem;
`;

const ApplyResetContainer = styled.div`
  display: ${(props) =>
    props.isOpen ? "flex" : "none"}; /* 필터가 열렸을 때만 보이게 */
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  /* Body/R500 */
  font-family: "SUIT Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 168%; /* 1.47rem */
  letter-spacing: -0.02188rem;

  @media (max-width: 768px) {
    flex-direction: row;
    margin-bottom: 1rem;
  }
`;

const SelectedTextContainer = styled.div`
  flex-grow: 1;
  font-size: 0.875rem;
  color: var(--Colors-GrayScale-G600, #1a1a23);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SelectedText = styled.span`
  background: var(--Colors-GrayScale-G200, #f3f5f8);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: var(--Colors-Primary-B500, #0051ff);

  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* Body/S500 */
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%;
  letter-spacing: -0.01875rem;
`;

const SelectedTextOverflow = styled.span`
  background: var(--Colors-GrayScale-G200, #f3f5f8);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: var(--Colors-Primary-B500, #0051ff);

  display: ${(props) => (props.isHidden ? "none" : "flex")};
  align-items: center;
  cursor: pointer;
`;

const ApplyButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  background: var(--Colors-Primary-B400, #3d85ff);
  color: var(--Colors-GrayScale-White, #fcfcff);
  border-radius: 0.5rem;
  white-space: nowrap;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background: var(--Colors-Primary-B500, #0051ff);
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const ResetButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  background: var(--Colors-GrayScale-G200, #f3f5f8);
  color: var(--Colors-GrayScale-G600, #1a1a23);
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: var(--Colors-GrayScale-G300, #e0e0e0);
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  margin: 0rem auto;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    width: 40rem;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.25rem;
    gap: 0.75rem;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
`;
const FilterSectionImg = styled.img`
  margin: 0.75rem 0;
  width: 100%;
  display: block;
  align-self: stretch;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: 1rem 2.5rem;
  align-self: stretch;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

/*Card*/
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;
`;

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  align-items: center;
`;

const Card = styled.div`
  flex: 1 1 calc(20% - 1rem);
  max-width: calc(20% - 1rem);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  @media (max-width: 1240px) {
    flex: 1 1 calc(33.33% - 1rem);
    max-width: calc(33.33% - 1rem);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
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
  line-height: 150%;
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
  line-height: 132%;
  letter-spacing: -0.01875rem;
`;

const CardImage = styled.img`
  width: 15.5rem;
  height: 15.5rem;
  object-fit: cover;
  object-position: center;
  border-radius: var(--Shapes-Border-Round, 1rem);
  border: 1px solid rgba(18, 19, 24, 0.04);
  box-sizing: border-box;
  box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.32);
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    width: 70%;
    height: auto;
  }
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
    background: var(--Colors-Secondary-B200, #d6e4ff);
    color: var(--Colors-Primary-B500, #0051ff);
  }

  text-align: center;

  /* Body/R600 */
  font-family: "SUIT Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 168%;
  letter-spacing: -0.02188rem;
`;
