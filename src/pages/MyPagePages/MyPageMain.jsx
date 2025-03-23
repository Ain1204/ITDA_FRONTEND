import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MySidebar from '../../components/MyPageComponents/MySidebar';
import MyProfile from './MyProfile';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FCFCFF;
  padding-top: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 17rem; // Sidebar 너비(15rem) + 왼쪽 여백(2rem)
  overflow-y: auto;
  min-height: calc(100vh - 4rem - 20px); // NavBar 높이(104px)와 상단 패딩(20px)을 제외한 전체 높이
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
    if (location.pathname === '/mypage') {
      navigate('/mypage/profile');
    }
  }, [location.pathname, navigate]);

  return (
    <PageContainer>
      <ContentWrapper>
        <MySidebar />
        <MainContent>
          <ContentArea>
            <Routes>
              <Route path="/" element={<MyProfile />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/collaboration" element={<div>협업 모아보기 페이지</div>} />
              <Route path="/proposal" element={<div>제안서 관리 페이지</div>} />
              <Route path="/mypost" element={<div>나의 공고 모아보기 페이지</div>} />
              <Route path="/sentproposal" element={<div>보낸 제안 현황 페이지</div>} />
              <Route path="/receivedproposal" element={<div>받은 제안 현황 페이지</div>} />
            </Routes>
          </ContentArea>
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MyPageMain; 