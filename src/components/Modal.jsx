import { useState, useEffect } from "react";
import styled from "styled-components";
import ClosedIcon from "../assets/registerIcon/wrong.svg"; // 닫기 아이콘
import LabelClosedIcon from "../assets/registerIcon/lablewrong.svg"; // 닫기 아이콘
import Divider from "../assets/registerIcon/verticaldivider.svg";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 99999 !important;
`;

const ModalContent = styled.div`
  background: var(--Colors-GrayScale-White, #fcfcff);
  position: relative;
  display: flex;
  align-items: stretch;
  border-radius: 1rem;
  box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.32);
  text-align: left;
  width: 52.75rem;
  height: 33.5rem;
  overflow: hidden;
  margin: auto; /* 화면 중앙 정렬 */
`;

const ModalFrame = styled.div`
  background: var(--Colors-GrayScale-White, #fcfcff);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2.5rem;
  flex: 1;
  padding: 1.25rem;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 0.75rem;
  height: 0.75rem;
  background: url(${ClosedIcon}) no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
`;

const ModalFrameCheckbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  margin-top: 2.5rem;
`;

const CheckboxLabel = styled.div`
  display: flex;
  padding: 0.25rem 1rem 0.25rem 0.75rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  color: var(--Colors-GrayScale-G400, #949bad);
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.025rem;
`;

const Checkbox = styled.input`
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  appearance: none;
  border: 2px solid #949bad;
  border-radius: 4px;
  background-color: white;
  transition: all 0.3s ease;

  &:checked {
    background-color: #3d85ff;
    border-color: #3d85ff;
    appearance: auto;
  }
`;

const SelectedLabelFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  margin-top: auto;
`;

/* 선택된 체크박스 라벨 표시 */
const SelectedLabelsTitle = styled.p`
  align-self: stretch;
  color: var(--Colors-GrayScale-G500, #4f5462);

  /* Body/S500 */
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%; /* 0.99rem */
  letter-spacing: -0.01875rem;
`;

/* 선택된 체크박스 라벨 표시 */
const SelectedLabelsContainer = styled.div`
  display: flex;
  width: 41.75rem;
  padding: 0.75rem 1rem;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  min-height: 10rem;
  border-radius: var(--Shapes-Border-Soft, 0.75rem);
  background: var(--Colors-GrayScale-White, #fcfcff);
  flex-wrap: wrap;
  /* IS100 */
  box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
`;

const SelectedLabel = styled.div`
  display: flex;
  padding: 0.25rem 0.75rem 0.25rem 1rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--Colors-Secondary-B100, #ebf2ff);
  white-space: nowrap;
  color: var(--Colors-GrayScale-G500, #4f5462);

  /* Body/S400 */
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 132%; /* 0.99rem */
  letter-spacing: -0.01875rem;
`;
const SelectedLabelCloseButton = styled.button`
  border: none;
  width: 0.5rem;
  height: 0.5rem;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
`;

/* 기타 카테고리 입력 필드 */
const StyledInput = styled.input`
  width: 100%;
  height: 5rem;
  font-size: 1rem;
  outline: none;
  display: flex;
  padding: 0.5rem 0.75rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  align-self: stretch;
  border-radius: var(--Shapes-Border-Hard, 0.5rem);
  border: 1px solid var(--Colors-GrayScale-G200, #f3f5f8);
  background: var(--Colors-GrayScale-G100, #f8f9fc);

  /* IS050 */
  box-shadow: 0px 0px 4px 0px rgba(26, 26, 35, 0.16) inset;
  &::placeholder {
    height: 3rem;
    align-self: stretch;
    color: var(--Colors-GrayScale-G400, #949bad);

    /* Body/M500 */
    font-family: "SUIT Variable";
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 1.5rem */
    letter-spacing: -0.025rem;
  }
`;
const SelectedLabelRow = styled.div`
  display: flex;
  align-items: center; /* 높이 맞추기 */
  width: 100%;
  flex-wrap: wrap; /* 가로 정렬 유지 */
`;

const CategoryTitle = styled.strong`
  min-width: 2.75rem; /* 고정 너비 */
  display: flex;
  padding: 0.25rem 0rem;
  align-items: center;
  gap: 0.25rem;
  color: var(--Colors-GrayScale-G500, #4f5462);

  /* Body/S500 */
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%; /* 0.99rem */
  letter-spacing: -0.01875rem;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1; /* 카테고리와 같은 높이 */
`;

/* ------- Sidebar ------- */
const ModalSidebar = styled.div`
  background: var(--Colors-Secondary-B100, #ebf2ff);
  flex: 1;
  max-width: 8.5rem;
`;

const ModalTitle = styled.h1`
  position: absolute;
  left: 2rem;
  top: 2rem;
  color: var(--Colors-GrayScale-G500, #4f5462);
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;
`;

const ModalSidebarCategory = styled.div`
  display: flex;
  width: 6rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  position: absolute;
  left: 1.25rem;
  top: 4.5rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  background: none;
  color: ${({ isSelected }) => (isSelected ? "#0051ff" : "#949bad")};
  font-family: "SUIT Variable";
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 168%;
  letter-spacing: -0.02188rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background: ${({ isSelected }) => (isSelected ? "#d6e4ff" : "none")};
`;

const Modal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("인스타그램");
  const [otherText, setOtherText] = useState("");
  const [selectedLabels, setSelectedLabels] = useState({});

  const handleCheckboxChange = (category, label) => {
    setSelectedLabels((prev) => {
      const updatedLabels = { ...prev };

      if (!updatedLabels[category]) {
        updatedLabels[category] = []; // 카테고리 초기화
      }

      if (updatedLabels[category].includes(label)) {
        updatedLabels[category] = updatedLabels[category].filter(
          (item) => item !== label
        );
      } else {
        updatedLabels[category].push(label);
      }

      return { ...updatedLabels };
    });
  };

  const checkboxes = {
    인스타그램: [
      "스토리 업로드",
      "팔로우 유도",
      "카드뉴스 업로드",
      "릴스 제작",
    ],
    블로그: ["상세 후기 작성", "키워드 노출", "장문 콘텐츠"],
    유튜브: ["롱폼 제작", "숏폼 제작"],
    오프라인: ["기업 배너 노출", "부스 설치", "기업 로고 노출", "샘플링 행사"],
    기타: [],
  };

  const handleRemoveLabel = (category, labelToRemove) => {
    setSelectedLabels((prev) => ({
      ...prev,
      [category]: prev[category].filter((label) => label !== labelToRemove),
    }));
  };
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && otherText.trim() !== "") {
      setSelectedLabels((prev) => {
        const updatedLabels = { ...prev };

        if (!updatedLabels["기타"]) {
          updatedLabels["기타"] = []; // 기타 카테고리 초기화
        }

        if (!updatedLabels["기타"].includes(otherText.trim())) {
          updatedLabels["기타"].push(otherText.trim());
        }

        return { ...updatedLabels };
      });

      setOtherText(""); // 입력 필드 초기화
    }
  };
  useEffect(() => {
    if (isOpen) {
      //document.body.style.overflow = "hidden"; // 모달이 열릴 때 스크롤 방지
      document.body.style.position = "relative"; // 부모 요소의 z-index 영향을 막음
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <ModalBackground isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* Sidebar */}
        <ModalSidebar>
          <ModalTitle>홍보 방안</ModalTitle>
          <ModalSidebarCategory>
            {Object.keys(checkboxes).map((category) => (
              <CategoryContainer
                key={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CategoryContainer>
            ))}
          </ModalSidebarCategory>
        </ModalSidebar>

        {/* Main Content */}
        <ModalFrame>
          <CloseButton onClick={onClose}>
            <img src={ClosedIcon} alt="닫기 버튼" />
          </CloseButton>

          <ModalFrameCheckbox>
            {selectedCategory === "기타" ? (
              <StyledInput
                type="text"
                placeholder="기타 홍보 방안을 입력해주세요."
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                onKeyDown={handleInputKeyDown} // 엔터 키 이벤트 추가
              />
            ) : (
              checkboxes[selectedCategory].map((label) => (
                <CheckboxLabel key={label}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedLabels[selectedCategory]?.includes(label)}
                    onChange={() =>
                      handleCheckboxChange(selectedCategory, label)
                    }
                  />
                  {label}
                </CheckboxLabel>
              ))
            )}
          </ModalFrameCheckbox>

          {/* 선택한 라벨을 카테고리별로 표시 */}
          <SelectedLabelFrame>
            <SelectedLabelsTitle>선택한 홍보 방안</SelectedLabelsTitle>
            <SelectedLabelsContainer>
              {Object.keys(checkboxes).map((category) => (
                <SelectedLabelRow key={category}>
                  <CategoryTitle>
                    {category}
                    <img src={Divider} />
                  </CategoryTitle>
                  <LabelContainer>
                    {selectedLabels[category] &&
                      selectedLabels[category].map((label) => (
                        <SelectedLabel key={label}>
                          {label}{" "}
                          <SelectedLabelCloseButton
                            onClick={() => handleRemoveLabel(category, label)}
                          >
                            <img src={LabelClosedIcon} alt="닫기 버튼" />
                          </SelectedLabelCloseButton>
                        </SelectedLabel>
                      ))}
                  </LabelContainer>
                </SelectedLabelRow>
              ))}
            </SelectedLabelsContainer>
          </SelectedLabelFrame>
        </ModalFrame>
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
