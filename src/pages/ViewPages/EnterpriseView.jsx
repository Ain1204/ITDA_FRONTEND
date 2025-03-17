import styled from "styled-components";
import { useState } from "react";
import RegisterDetailButton from "../../components/RegisterButton";
import LocationIcon from "../../assets/viewIcon/locationIcon.svg";

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
height: ${(props) => (props.$activeTab === "행사 개요" ? "460px" : "600px")};
transition: height 0.3s ease;
`;

const ViewDetailTitle = styled.span`
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
    margin-right: 8px;
    transform: translateY(-1px);
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

const FooterDivider = styled.div`
    display: flex;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    align-items: center;
    gap: 24px;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        left: 32px;
        right: 32px;
        bottom: 0;
        height: 2px;
        background-color: var(--Colors-GrayScale-G300, #e5eaf2);
    }
`;

const EnterpriseRegister = () => {
const [activeTab, setActiveTab] = useState("행사 개요");


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
                    <ViewContent>
                        식품/간식, 음료, 주류, 뷰티, 패션, 의료/제약, 문구/소품, 쿠폰/바우처, 기타
                    </ViewContent>

                    <ViewDetailTitle>
                        홍보 방안
                    </ViewDetailTitle>
                    <ViewContent>
                        인스타그램, 블로그, 유튜브, 오프라인, 기타
                    </ViewContent>

                </ViewDetail>
            </ViewDetailWrapper>

            <ButtonContainer>
            <RegisterDetailButton>
                등록하기
            </RegisterDetailButton>
            </ButtonContainer>
        </ViewBody>
        <FooterDivider />
    </BottomContainer>
);
};

export default EnterpriseRegister;
