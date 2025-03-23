import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Line from "../assets/MainIcon/line.svg";
import Search from "../assets/MainIcon/Icon_Search.svg";
import Filter from "../assets/MainIcon/filter.svg";
import Reset from "../assets/MainIcon/arrow_update.svg";
import Close from "../assets/MainIcon/closed.svg";
import LineRow from "../assets/MainIcon/line-row.svg";
import Check from "../assets/MainIcon/check.svg";

const ITEMS_PER_PAGE = 12;

// Main component
const SearchBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    지역: [],
    "단체 구분": [],
    "전공 계열": [],
    "산업 분야": [],
  });
  const [selectedDropdown, setSelectedDropdown] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [maxVisibleItems, setMaxVisibleItems] = useState(5); // 기본 5개

  // 화면 크기에 따라 maxVisibleItems 업데이트
  useEffect(() => {
    const updateMaxVisibleItems = () => {
      setMaxVisibleItems(window.innerWidth <= 768 ? 2 : 5);
    };

    updateMaxVisibleItems(); // 초기 실행
    window.addEventListener("resize", updateMaxVisibleItems);

    return () => window.removeEventListener("resize", updateMaxVisibleItems);
  }, []);
  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (!updatedFilters[filterType]) {
        updatedFilters[filterType] = []; // 🔹 undefined 방지
      }

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
        <SelectedTextContainer>
          {Object.entries(selectedFilters)
            .flatMap(([filterKey, values]) =>
              values.map((value, index) => ({
                key: `${filterKey}-${value}-${index}`, // React에서 key를 사용하기 위한 값
                value,
                filterKey,
              }))
            )
            .slice(0, showAll ? undefined : maxVisibleItems) // maxVisibleItems로 동적 조절
            .map(({ key, value, filterKey }) => (
              <SelectedText key={key}>
                {value}
                <img
                  src={Close}
                  alt="Close icon"
                  onClick={() => handleRemoveSelected(filterKey, value)}
                  style={{ cursor: "pointer" }}
                />
              </SelectedText>
            ))}

          {/* 더보기 버튼 */}
          {Object.entries(selectedFilters).flatMap(([filterKey, values]) =>
            values.map((value, index) => ({
              key: `${filterKey}-${value}-${index}`, // key 값을 지정하여 고유하게 만듦
              value,
              filterKey,
            }))
          ).length > maxVisibleItems && (
            <SelectedTextOverflow
              key="show-all-toggle" // 여기서도 key 추가
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
            필터 적용
          </ApplyButton>
        </ApplyResetContainer>
      </FilterSortContainer>

      <FilterContainer isOpen={isFilterOpen}>
        <FilterButtonContainer>
          {["지역", "단체 구분", "전공 계열", "산업 분야"].map((section) => (
            <FilterSortButton
              key={`filter-${section}`}
              isSelected={activeFilter === section}
              onClick={() =>
                setActiveFilter(activeFilter === section ? null : section)
              }
            >
              {section}
            </FilterSortButton>
          ))}
        </FilterButtonContainer>
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
            section: "단체 구분",
            options: [
              "전체",
              "총학생회",
              "단과대학 학생회",
              "과 학생회",
              "학회",
              "총동아리연합회",
              "동아리",
            ],
          },
          {
            section: "전공 계열",
            options: [
              "전체",
              "인문계열",
              "사회계열",
              "교육계열",
              "공학계열",
              "자연계열",
              "의약계열",
              "예체능계열",
              "전문대학",
            ],
          },
          {
            section: "산업 분야",
            options: [
              "전체",
              "식품",
              "패션",
              "뷰티",
              "라이프스타일",
              "스포츠",
              "엔터테인먼트",
              "의료·제약·복지",
              "출판·교육",
              "기타",
            ],
          },
        ].map(
          ({ section, options }) =>
            activeFilter === section && (
              <FilterSection key={section}>
                <CheckboxGroup>
                  {options.map((option) => {
                    const isChecked =
                      selectedFilters[section]?.includes(option);

                    return (
                      <CheckboxLabel key={option} checked={isChecked}>
                        <Checkbox
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(section, option)}
                        />
                        {option}
                      </CheckboxLabel>
                    );
                  })}
                </CheckboxGroup>
              </FilterSection>
            )
        )}
      </FilterContainer>
      <CardContainer>
        <CardListContainer isCentered={currentCards.length >= 4}>
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
  title: `2024 '청춘소락' ${i + 1}`,
  content: `한양대학교 ERICA 소프트웨어융합대학 ${i + 1}`,
  category: i % 2 === 0 ? "대학생 단체" : "기업", // 짝수는 "기업", 홀수는 "학생"
  image: `/src/assets/MainIcon/image3.png`, // 1~12번 이미지를 순환
  hashtags: [
    `단기 프로모션`,
    `#${i % 2 === 0 ? "기업" : "학생"}`,
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
  white-space: nowrap;
  /* Body/M600 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;
`;

const FilterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1 0 0;
  align-self: stretch;
`;

const FilterSortButton = styled.button`
  display: flex;
  padding: 0.75rem 0rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-bottom: 2px solid var(--Colors-GrayScale-G300, #e5eaf2);
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? "#4f5462" : "#949BAD")};
  text-align: center;
  background: var(--Colors-GrayScale-G200, #ffffff);

  /* Body/R600 */
  font-family: "SUIT Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 168%; /* 1.47rem */
  letter-spacing: -0.02188rem;
`;
const SearchBarContainer = styled.div`
  display: flex;
  width: 50rem;
  height: 3.5rem;
  padding: 0.5rem 1.5rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  border-radius: var(--Shapes-Border-Round, 1rem);
  background: var(--Colors-GrayScale-G200, #f3f5f8);

  /* IS100 */
  box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
  border: none;

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
  width: 50rem;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;
  justify-content: space-between;
  margin: 0rem auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 3.25rem;
  }
`;

const FilterButton = styled.button`
  flex-shrink: 0;
  display: flex;
  padding: 0.25rem 1rem 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  background: var(--Colors-Secondary-B100, #ebf2ff);
  border: none;
  white-space: nowrap;
  margin-right: 1.25rem;

  color: var(--Colors-Primary-B500, #0051ff);
  text-align: center;

  /* Body/M500 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;

  @media (max-width: 768px) {
    margin-right: 0.25rem;
  }
`;

const ApplyResetContainer = styled.div`
  display: ${(props) =>
    props.isOpen ? "flex" : "none"}; /* 필터가 열렸을 때만 보이게 */
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  flex-direction: row;

  /* Body/R500 */
  font-family: "SUIT Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 168%; /* 1.47rem */
  letter-spacing: -0.02188rem;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const SelectedTextContainer = styled.div`
  flex: 1; /* 자동으로 남은 공간을 채우게 조정 */
  font-size: 0.875rem;
  color: var(--Colors-GrayScale-G600, #1a1a23);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow: hidden;
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
  display: flex;
  padding: 0.25rem 1rem 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
  background: var(--Colors-Primary-B400, #3d85ff);
  color: var(--Colors-GrayScale-White, #fcfcff);
  border-radius: 0.5rem;
  white-space: nowrap;

  text-align: center;

  /* Body/M500 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;

  &:hover {
    background: var(--Colors-Primary-B500, #0051ff);
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const ResetButton = styled.button`
  display: flex;
  padding: 0.25rem 1rem 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
  background: var(--Colors-GrayScale-G200, #f3f5f8);
  border-radius: 0.5rem;

  color: var(--Colors-GrayScale-G400, #949bad);
  text-align: center;

  /* Body/M500 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;

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
  width: 50rem;
  margin: 0rem auto;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};

  color: var(--Colors-GrayScale-G500, #4f5462);
  background: var(--Colors-GrayScale-White, #fcfcff);

  /* Body/M500 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: 1rem 2.5rem;
  align-self: stretch;
  flex-wrap: wrap;
`;
const FilterSectionImg = styled.img`
  margin: 0.75rem 0;
  width: 100%;
  display: block;
  align-self: stretch;
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 1rem 2.5rem;
  align-self: stretch;
  flex-wrap: wrap;
`;
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: auto;
  min-width: 6.25rem;
  white-space: nowrap;

  color: ${(props) =>
    props.checked
      ? "var(--Colors-GrayScale-G600, #1a1a23)"
      : "var(--Colors-GrayScale-G500, #4f5462)"};

  /* Body/M500 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;
`;

const Checkbox = styled.input`
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  appearance: none;
  border: 2px solid #949bad;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  transition: all 0.3s ease;

  &:checked {
    appearance: auto;
    background-color: #3d85ff;
    border-color: #3d85ff;
  }
`;

/*Card*/
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 3.25rem;
`;

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 80rem;
  align-items: center;
  justify-content: ${(props) => (props.isCentered ? "center" : "flex-start")};
  gap: 3rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
const Card = styled.div`
  flex: 1 1 calc(25% - 3rem); /* ✅ 4개씩 정렬 (3rem 간격 포함) */
  max-width: calc(25% - 3rem);
  box-sizing: border-box;
  display: flex;
  min-width: 17.5rem;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1240px) {
    flex: 1 1 calc(33.33% - 3rem); /* ✅ 중간 크기 화면에서는 3개 */
    max-width: calc(33.33% - 3rem);
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 3rem); /* ✅ 태블릿 화면에서는 2개 */
    max-width: calc(50% - 3rem);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%; /* ✅ 모바일에서는 1개 */
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CardTitle = styled.h3`
  overflow: hidden;
  color: var(--Colors-GrayScale-G600, #1a1a23);
  text-overflow: ellipsis;
  white-space: nowrap;
  /* Body/M600 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;
`;

const CardContent = styled.p`
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
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
