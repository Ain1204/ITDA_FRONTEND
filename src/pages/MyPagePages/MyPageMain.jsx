import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import MySidebar from "../../components/MyPageComponents/MySidebar";
import MyProfile from "./MyProfile/MyProfileMain";
import MyPageSuggest from "./MyPageSuggest";
import MyPageMyPost from "./MyPageMyPost";

import SuggestSent from "../SuggestSentPage/SuggestSent";
import MyPageIRManage from "./MyPageIRManage";
import Suggestreceived from "../SuggestreceivedPages/Suggestreceived";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fcfcff;
  padding-top: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: calc(
    100vh - 4rem - 20px
  ); // NavBar 높이(104px)와 상단 패딩(20px)을 제외한 전체 높이
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.div`
  flex: 1;
`;

const MyPageMain = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 마이페이지 접속 시 기본 경로 설정
    if (location.pathname === "/mypage" || location.pathname === "/mypage/") {
      navigate("/mypage/profile", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <PageContainer>
      <ContentWrapper>
        <MySidebar />
        <MainContent>
          <ContentArea>
            <Routes>
              {/* 프로필 관련 라우트 */}
              <Route path="/" element={<MyProfile />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/profile/:state" element={<MyProfile />} />

              {/* 다른 라우트들 */}
              <Route path="/collaboration" element={<MyPageSuggest />} />
              <Route path="/proposal" element={<MyPageIRManage />} />
              <Route path="/mypost" element={<MyPageMyPost />} />
              <Route path="/sentproposal" element={<SuggestSent />} />
              <Route path="/receivedproposal" element={<Suggestreceived />} />
            </Routes>
          </ContentArea>
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MyPageMain;
