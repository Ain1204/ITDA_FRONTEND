import { useState } from "react";
import styled from "styled-components";
import IRExample1 from '../../assets/MyPageIcon/IR_Example_1.jpg';
import UploadIR from '../../components/MyPageComponents/UploadIR';
import ArrowLeft from '../../assets/MyPageIcon/arrow_left.svg';
import ArrowRight from '../../assets/MyPageIcon/arrow_right.svg';
import DownloadIR from '../../assets/MyPageIcon/downloadIR.svg';
import ChangeIR from '../../assets/MyPageIcon/changeIR.svg';

const Title = styled.h1`
    font-family: "SUIT Variable";
    font-size: 28px;
    font-weight: 700;
    line-height: 156%;
    letter-spacing: -0.7px;
    color: var(--Colors-GrayScale-G600, #1A1A23);
    flex: 1 0 0;
    padding: 28px 32px;
`;  

const PortfolioContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    padding: 0 32px;
    width: 100%;
`;

const PortfolioContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    height: 83vh;
    position: relative;
`;

const PortfolioImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px 0;
`;

const ToggleButton = styled.button`
    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: var(--Colors-Primary-B400, #3D85FF);
    color: white;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        background: var(--Colors-Primary-B500, #0051FF);
    }
`;

const ActionIcon = styled.img`
    width: 16px;
    height: 16px;
`;

const ActionButton = styled.button`
    position: relative;
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-radius: var(--Shapes-Border-Hard, 8px);
    background: rgba(18, 19, 24, 0.72);
    color: var(--Colors-GrayScale-White, #FCFCFF);
    font-family: "SUIT Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 168%;
    letter-spacing: -0.35px;
    border: none;
    cursor: pointer;
    overflow: hidden;
    width: 32px;
    transition: all 0.3s ease;
    white-space: nowrap;
    
    &:hover {
        width: auto;
        padding: 0 16px 0 8px;
        justify-content: flex-start;
    }
`;

const ActionIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s ease;
    
    ${ActionButton}:hover & {
        position: static;
        transform: none;
        left: auto;
        margin-left: 0;
        margin-right: 0;
    }
`;

const ButtonText = styled.span`
    opacity: 0;
    max-width: 0;
    transition: all 0.3s ease;
    margin-left: 0;
    
    ${ActionButton}:hover & {
        opacity: 1;
        max-width: 100px;
        margin-left: 4px;
    }
`;

const FileTitle = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    color: var(--Colors-GrayScale-White, #FCFCFF);
    font-family: "SUIT Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 168%;
    letter-spacing: -0.35px;
    background: rgba(18, 19, 24, 0.72);
    padding: 4px 16px;
    border-radius: 8px;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    ${PortfolioContent}:hover & {
        opacity: 1;
    }
`;

const TopRightButtons = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 12px;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    ${PortfolioContent}:hover & {
        opacity: 1;
    }
`;

const BottomRightNavigation = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    ${PortfolioContent}:hover & {
        opacity: 1;
    }
`;

const PageIndicator = styled.div`
    color: var(--Colors-GrayScale-White, #FCFCFF);
    font-family: "SUIT Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 168%;
    letter-spacing: -0.35px;
    background: rgba(18, 19, 24, 0.72);
    padding: 4px 16px;
    border-radius: 8px;
`;

const NavButton = styled.button`
    display: flex;
    height: 32px;
    padding: 4px 12px;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-radius: var(--Shapes-Border-Hard, 8px);
    background: rgba(18, 19, 24, 0.72);
    color: var(--Colors-GrayScale-White, #FCFCFF);
    font-family: "SUIT Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 168%;
    letter-spacing: -0.35px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background: rgba(59, 133, 255, 0.9);
    }
`;

const ArrowIcon = styled.img`
    width: 6px;
    height: 12px;
`;

const MyPageIRManage = () => {
    const [hasPortfolio, setHasPortfolio] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 15; // 예시: 전체 페이지 수

    const handleFilesChange = (files) => {
        if (files.length > 0) {
            setHasPortfolio(true);
        }
    };

    const togglePortfolioState = () => {
        setHasPortfolio(!hasPortfolio);
    };

    const handleDownload = () => {
        console.log("다운로드 기능");
    };

    const handleUpdate = () => {
        console.log("업데이트/교체 기능");
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <Title>제안서 관리</Title>

            <PortfolioContainer>
                
                
                {hasPortfolio ? (
                    <PortfolioContent>
                        <PortfolioImage src={IRExample1} alt="포트폴리오 예시" />
                        <FileTitle>BIZMO_협업.PDF</FileTitle>
                        
                        <TopRightButtons>
                            <ActionButton onClick={handleUpdate}>
                                <ActionIconWrapper>
                                    <ActionIcon src={ChangeIR} alt="교체" />
                                </ActionIconWrapper>
                                <ButtonText>제안서 교체</ButtonText>
                            </ActionButton>
                            <ActionButton onClick={handleDownload}>
                                <ActionIconWrapper>
                                    <ActionIcon src={DownloadIR} alt="다운로드" />
                                </ActionIconWrapper>
                                <ButtonText>다운로드</ButtonText>
                            </ActionButton>
                        </TopRightButtons>
                        
                        <BottomRightNavigation>
                            <NavButton onClick={goToPrevPage}>
                                <ArrowIcon src={ArrowLeft} alt="이전" />
                            </NavButton>
                            <PageIndicator>{String(currentPage).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</PageIndicator>
                            <NavButton onClick={goToNextPage}>
                                <ArrowIcon src={ArrowRight} alt="다음" />
                            </NavButton>
                        </BottomRightNavigation>
                    </PortfolioContent>
                ) : (
                    <PortfolioContent>
                            <UploadIR 
                                onFilesChange={handleFilesChange} 
                                className="portfolio-dropzone"
                            />
                    </PortfolioContent>
                )}
            </PortfolioContainer>
            <ButtonContainer>
                    <ToggleButton onClick={togglePortfolioState}>
                        {hasPortfolio ? "제안서 등록하기" : "등록된 제안서 보기"}
                    </ToggleButton>
                </ButtonContainer>
        </div>
    );
};

export default MyPageIRManage;
