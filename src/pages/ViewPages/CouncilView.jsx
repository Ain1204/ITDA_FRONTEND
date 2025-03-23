import styled from "styled-components";
import { useState } from "react";
import LocationIcon from "../../assets/viewIcon/locationIcon.svg";
import PromotionDropdown from "../../components/PromotionDropdown";

const BottomContainer = styled.div`
    max-width: 1440px;
    width: 100%;
    margin: 36px auto 36px;
    padding: 0 32px;
`;

const ViewBody = styled.div`
    margin-top: 36px;
`;

const ViewTitleContainer = styled.div`
    display: flex;
    gap: 24px;
`;

const ViewTitle = styled.button`
    color: ${(props) =>
        props.$active === "true"
        ? "var(--Colors-Primary-B500, #0051FF)"
        : "var(--Colors-GrayScale-G400, #949BAD)"};
    font-family: "SUIT Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 132%;
    letter-spacing: -0.3px;
    padding: 12px 0;
    border: none;
    background: none;
    cursor: pointer;
    transition: opacity 0.2s ease;
    text-align: left;
    width: fit-content;
    border-bottom: 2px solid
        ${(props) =>
        props.$active === "true"
            ? "var(--Colors-Primary-B500, #0051FF)"
            : "transparent"};
    margin-bottom: -2px;
    position: relative;
    z-index: 1;

    &:hover {
        opacity: 0.8;
    }
`;

const ViewDivider = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 24px;
    border-bottom: 2px solid var(--Colors-GrayScale-G300, #e5eaf2);
    position: relative;
`;

const ViewDetail = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    opacity: ${(props) => (props.$active === "true" ? 1 : 0)};
    transform: translateY(
        ${(props) => (props.$active === "true" ? "0" : "20px")}
    );
    transition: all 0.3s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    pointer-events: ${(props) => (props.$active === "true" ? "all" : "none")};
    visibility: ${(props) => (props.$active === "true" ? "visible" : "hidden")};
`;

const ViewDetailWrapper = styled.div`
    position: relative;
    height: ${(props) => (props.$activeTab === "행사 개요" ? "480px" : "500px")};
    transition: height 0.3s ease;
`;

const ViewDetailTitle = styled.div`
    color: var(--Colors-Primary-B500, #0051ff);
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 168%;
    letter-spacing: -0.35px;
    margin-bottom: 4px;
    display: flex;
`;

const TagContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-bottom: 40px;
    margin-top: 2px;
`;

const ViewContent = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    line-height: 150%;
    letter-spacing: -0.4px;
    color: var(--Colors-GrayScale-G600, #1A1A23);
`;

const LocationPoint = styled.img`
    transform: translateY(-1px);
    margin-right: 4px;
`;

const Tag = styled.div`
    background-color: var(--Colors-Secondary-B100, #EBF2FF);
    display: flex;
    padding: 4px 12px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    color: var(--Colors-GrayScale-G600, #1A1A23);
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.4px;
`;

const TagButton = styled.button`
    background-color: ${props => props.$isEmpty ? 'var(--Colors-GrayScale-G200, #F3F5F8)' : 'var(--Colors-Secondary-B100, #EBF2FF)'};
    display: flex;
    padding: 4px 12px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    color: ${props => props.$isEmpty ? 'var(--Colors-GrayScale-G400, #949BAD)' : 'var(--Colors-GrayScale-G600, #1A1A23)'};
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.4px;
    width: 160px;
    border: none;
    cursor: ${props => props.$isEmpty ? 'default' : 'pointer'};
    pointer-events: ${props => props.$isEmpty ? 'none' : 'all'};
    transition: opacity 0.2s ease;
    
    &:hover {
        opacity: ${props => props.$isEmpty ? '1' : '0.8'};
    }
`;

const instagramItems = [
    "스토리 업로드",
    "팔로우 유도",
    "카드뉴스 업로드",
    "릴스 제작"
];

const blogItems = [
    "상세 후기 작성",
    "키워드 노출",
    "장문 컨텐츠 제작"
];

const youtubeItems = [
    "롱폼 제작",
    "숏폼 제작",
];

const offlineItems = [
    "기업 배너 노출",
    "부스 설치",
    "기업 로고 노출",
    "장문 콘텐츠 제작"
];

const otherItems = [
];

const CouncilRegister = () => {
    const [activeTab, setActiveTab] = useState("행사 개요");

    const handlePromotionItemClick = (item) => {
        console.log('선택된 홍보 방안:', item);
    };

    return (
        <BottomContainer>
            <ViewBody>
                <ViewTitleContainer>
                    <ViewTitle
                        type="button"
                        onClick={() => setActiveTab("행사 개요")}
                        $active={(activeTab === "행사 개요").toString()}
                    >
                        행사 개요
                    </ViewTitle>
                    <ViewTitle
                        type="button"
                        onClick={() => setActiveTab("제안 사항")}
                        $active={(activeTab === "제안 사항").toString()}
                    >
                        제안 사항
                    </ViewTitle>
                </ViewTitleContainer>

                <ViewDivider />

                <ViewDetailWrapper $activeTab={activeTab}>
                    <ViewDetail $active={(activeTab === "행사 개요").toString()}>
                        <ViewDetailTitle>
                            행사명
                        </ViewDetailTitle>
                        <ViewContent>
                            2025 대학생 창업 경진대회   
                        </ViewContent>

                        <ViewDetailTitle>
                            행사 장소
                        </ViewDetailTitle>
                        <ViewContent>
                            <LocationPoint src={LocationIcon} alt="location" />
                            서울시 종로구 종로3가 123-45
                        </ViewContent>

                        <ViewDetailTitle>
                            행사 일정
                        </ViewDetailTitle>
                        <ViewContent>
                            2024.03.07 - 2024.03.09
                        </ViewContent>

                        <ViewDetailTitle>
                            예상 참여 인원
                        </ViewDetailTitle>
                        <ViewContent>
                            300명
                        </ViewContent>
                    </ViewDetail>

                    <ViewDetail $active={(activeTab === "제안 사항").toString()}>
                        <ViewDetailTitle>
                            제품군
                        </ViewDetailTitle>
                        <TagContent>
                            <Tag>식품/간식</Tag>
                            <Tag>음료</Tag>
                            <Tag>주류</Tag>
                            <Tag>뷰티</Tag>
                            <Tag>패션</Tag>
                            <Tag>의료/제약</Tag>
                        </TagContent>

                        <ViewDetailTitle>
                            홍보 방안
                        </ViewDetailTitle>
                        <TagContent>
                            <PromotionDropdown 
                                items={instagramItems}
                                onItemClick={handlePromotionItemClick}
                            >
                                <TagButton $isEmpty={instagramItems.length === 0}>
                                    인스타그램
                                </TagButton>
                            </PromotionDropdown>
                            <PromotionDropdown 
                                items={blogItems}
                                onItemClick={handlePromotionItemClick}
                            >
                                <TagButton $isEmpty={blogItems.length === 0}>블로그</TagButton>
                            </PromotionDropdown>
                            <PromotionDropdown 
                                items={youtubeItems}
                                onItemClick={handlePromotionItemClick}
                            >
                                <TagButton $isEmpty={youtubeItems.length === 0}>유튜브</TagButton>
                            </PromotionDropdown>
                            <PromotionDropdown 
                                items={offlineItems}
                                onItemClick={handlePromotionItemClick}
                            >
                                <TagButton $isEmpty={offlineItems.length === 0}>오프라인</TagButton>
                            </PromotionDropdown>
                            <PromotionDropdown 
                                items={otherItems}
                                onItemClick={handlePromotionItemClick}
                            >
                                <TagButton $isEmpty={otherItems.length === 0}>기타</TagButton>
                            </PromotionDropdown>
                        </TagContent>
                    </ViewDetail>
                </ViewDetailWrapper>
            </ViewBody>
        </BottomContainer>
    );
};

export default CouncilRegister;