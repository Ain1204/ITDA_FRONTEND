import styled from "styled-components";
import NavBar from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import ClosedIcon from "../../assets/registerIcon/wrong.svg"; // 닫기 아이콘
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuggestMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  // ESC 키로 닫기 기능 추가
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  // 파일 선택 핸들러
  const handleFileChange = () => {
    navigate("/register/:type");
  };

  return (
    <PageContainer>
      <NavBar />
      <IRUploadBtn onClick={() => setIsModalOpen(true)}>
        공고 올리기
      </IRUploadBtn>
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitleContainer>
              <p>등록된 제안서가 없어요.</p>
              <p>제안서를 먼저 등록해주세요!</p>
            </ModalTitleContainer>
            <ModalFileUploadContainer>
              <p>업로드할 파일 놓기</p>
              <p>또는</p>
              <FileInput id="file-upload" onClick={handleFileChange} />
              <FileUploadLabel htmlFor="file-upload">파일 선택</FileUploadLabel>
            </ModalFileUploadContainer>

            <CloseButton onClick={() => setIsModalOpen(false)}>
              <img src={ClosedIcon} alt="닫기 버튼" />
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
      <BottomContainer>
        <SearchBar />
        <Footer />
      </BottomContainer>
    </PageContainer>
  );
};

// Suggest Main Page Container
const PageContainer = styled.div`
  position: relative;
  height: auto;
  min-height: 146rem;
  padding-top: 5.5rem;
  //background: var(--Colors-GrayScale-White, #fcfcff);
`;
const IRUploadBtn = styled.button`
  position: absolute;
  right: 2rem;
  top: 5.5rem;
  border: none;
  display: inline-flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  height: 2.5rem;
  width: 6.5rem;
  border-radius: 0.5rem;
  background: var(--Colors-Primary-B400, #3d85ff);
  cursor: pointer;
  color: var(--Colors-GrayScale-White, #fcfcff);
  text-align: center;

  /* Header/H5 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  text-align: center;
  display: flex;
  width: 25rem;
  min-height: 21rem;
  gap: 2rem;
  padding: 1.25rem;
  flex-direction: column;
  border-radius: var(--Shapes-Border-Round, 1rem);
  background: var(--Colors-GrayScale-White, #fcfcff);

  /* DS400 */
  box-shadow: 0px 0px 20px 0px rgba(79, 84, 98, 0.32);
`;
const ModalTitleContainer = styled.div`
  width: 22.5rem;
  height: 3.38rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  margin-top: 4rem;

  :nth-child(1) {
    color: var(--Colors-GrayScale-G500, #4f5462);
    text-align: center;

    /* Body/R600 */
    font-family: "SUIT Variable";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 168%; /* 1.47rem */
    letter-spacing: -0.02188rem;
  }

  :nth-child(2) {
    color: var(--Colors-GrayScale-G600, #1a1a23);
    text-align: center;

    /* Body/L600 */
    font-family: "SUIT Variable";
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 1.875rem */
    letter-spacing: -0.03125rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  background: url(${ClosedIcon}) no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
  margin-left: 22rem;
`;
const ModalFileUploadContainer = styled.div`
  display: flex;
  padding: 2rem 0rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: var(--Shapes-Border-Hard, 0.5rem);
  background: var(--Colors-Secondary-B100, #ebf2ff);

  :nth-child(1) {
    color: var(--Colors-GrayScale-G600, #1a1a23);
    text-align: center;

    /* Body/L600 */
    font-family: "SUIT Variable";
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 1.875rem */
    letter-spacing: -0.03125rem;
  }
  :nth-child(2) {
    color: var(--Colors-GrayScale-G500, #4f5462);
    text-align: center;

    /* Body/R600 */
    font-family: "SUIT Variable";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 168%; /* 1.47rem */
    letter-spacing: -0.02188rem;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileUploadLabel = styled.label`
  cursor: pointer;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--Colors-Primary-B400, #3d85ff);

  color: var(--Colors-GrayScale-White, #fcfcff);
  text-align: center;

  /* Body/S500 */
  font-family: "SUIT Variable";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 132%; /* 0.99rem */
  letter-spacing: -0.01875rem;
`;
// SearchBar & Footer를 감싸는 컨테이너
const BottomContainer = styled.div`
  margin-top: 7rem; /* 아래로 내리는 효과 */
`;
export default SuggestMain;
