import { useState } from "react";
import styled from "styled-components";

import Logo from "../assets/images/Mainimg/Navimg/MainPageLogo.svg";
import Noti from "../assets/images/Mainimg/Navimg/Noti.svg";
import Chatting from "../assets/images/Mainimg/Navimg/chat.svg";

import UserProfile from "../assets/images/Mainimg/Navimg/UserProfile.png"; // 사용자 프로필 이미지

const Nav = styled.nav`
  display: flex;
  padding: 0rem 2rem;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  margin-top: 2rem;
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 4rem;
    left: 0;
    width: 100%;
    background: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const NavMenu_Left_Btns = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: flex-start;
  flex: 1;
  align-items: center;

  text-align: center;

  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;
`;

const NavMenu_Right_Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: flex-end;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavItem = styled.a`
  text-decoration: none;
  font-size: 1rem;
  border-radius: 0.5rem;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: var(--Colors-GrayScale-G400, #949bad);
  &:hover {
    color: #000000;
  }
`;

const LoginBtn = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: var(--Colors-Primary-B400, #3d85ff);
  border: none;
  cursor: pointer;

  color: var(--Colors-GrayScale-White, #fcfcff);
  text-align: center;

  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;

  &:hover {
    color: var(--Colors-Primary-B400, #3d85ff);
    background: var(--Colors-GrayScale-White, #fcfcff);
  }
`;

const ProfileImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
`;

const LogoImage = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 9rem;
`;

const NotiImage = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const ChattingImage = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const HamburgerButton = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  span {
    display: block;
    height: 0.25rem;
    width: 2rem;
    background: black;
    margin: 0.3rem 0;
    border-radius: 1rem;
  }
`;

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [menuOpen, setMenuOpen] = useState(false); // 햄버거 메뉴 상태 관리

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn); // 로그인/로그아웃 토글
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // 햄버거 메뉴 열고 닫기
  };

  return (
    <Nav>
      <LogoImage src={Logo} alt="Nav Logo" />
      <HamburgerButton onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </HamburgerButton>
      <NavMenu isOpen={menuOpen}>
        <NavMenu_Left_Btns>
          <NavItem href="#home">제휴/프로모션 맺기</NavItem>
          <NavItem href="#about">마이페이지</NavItem>
          <NavItem href="#services">서비스 소개</NavItem>
        </NavMenu_Left_Btns>
        <NavMenu_Right_Btns>
          <a href="/notifications">
            <NotiImage src={Noti} alt="noti icon" />
          </a>
          <a href="/chat">
            <ChattingImage src={Chatting} alt="chat icon" />
          </a>
          {isLoggedIn ? (
            <ProfileImage
              src={UserProfile}
              alt="User Profile"
              onClick={handleLogin} // 로그아웃 기능 (클릭 시 상태 변경)
            />
          ) : (
            <LoginBtn onClick={handleLogin}>로그인</LoginBtn> // 로그인 버튼
          )}
        </NavMenu_Right_Btns>
      </NavMenu>
    </Nav>
  );
};

export default NavBar;
