import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--Colors-GrayScale-G600);
`;

const MyPage = () => {
  return (
    <Container>
      <Title>마이페이지</Title>
      <p>마이페이지 내용이 여기에 표시됩니다.</p>
    </Container>
  );
};

export default MyPage; 