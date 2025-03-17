import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  display: flex;
  padding: 2.25rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  align-self: stretch;
  border-radius: var(--Shapes-Border-Round, 1rem);
  background: var(--Colors-GrayScale-White, #FCFCFF);
  box-shadow: 0px 8px 24px 0px rgba(79, 84, 98, 0.24);
  position: fixed;
  left: 2rem;
  top: 4rem;
  width: 15rem;
  height: 52.75rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-self: stretch;
  padding-left: 1rem;
`;

const Title = styled.h2`
  align-self: stretch;
  color: var(--Colors-GrayScale-G500, #4F5462);
  font-family: "SUIT Variable";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.03125rem;
`;

const PointsDisplay = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  align-self: stretch;
  color: var(--Colors-Primary-B500, #0051FF);
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;
`;

const MenuItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-self: stretch;
`;

const MenuItem = styled(Link)`
  display: flex;
  padding: ${props => props.active ? '0.5rem 1rem' : '0.25rem 1rem'};
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  text-decoration: none;
  color: ${props => props.active ? 'var(--Colors-Primary-B500, #0051FF)' : 'var(--Colors-GrayScale-G400, #949BAD)'};
  background: ${props => props.active ? 'var(--Colors-Secondary-B100, #EBF2FF)' : 'transparent'};
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;
  cursor: pointer;
  
  &:hover {
    background: var(--Colors-Secondary-B100, #EBF2FF);
    color: var(--Colors-Primary-B500, #0051FF);
  }
`;

const MySidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  
  const menuItems = [
    { id: 'profile', label: '나의 프로필' },
    { id: 'collaboration', label: '협업 모아보기' },
    { id: 'proposal', label: '제안서 관리' },
    { id: 'mypost', label: '나의 공고 모아보기' },
    { id: 'sentproposal', label: '보낸 제안 현황' },
    { id: 'receivedproposal', label: '받은 제안 현황' },
  ];

  return (
    <SidebarContainer>
      <TitleContainer>
        <Title>마이페이지</Title>
        <PointsDisplay>나의 비즈: 50,000 P</PointsDisplay>
      </TitleContainer>
      
      <MenuItemsContainer>
        {menuItems.map((item) => (
          <MenuItem 
            key={item.id} 
            to={`/mypage/${item.id}`} 
            active={currentPath === item.id ? 1 : 0}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuItemsContainer>
    </SidebarContainer>
  );
};

export default MySidebar; 