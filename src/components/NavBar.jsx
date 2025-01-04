import styled from "styled-components";
import { useState } from "react";

import Logo from "../assets/images/Navimg/MainPageLogo.svg";
import Noti from "../assets/images/Navimg/Noti.svg";
import Chatting from "../assets/images/Navimg/chat.svg";

import UserProfile from "../assets/images/Navimg/UserProfile.png"; // 사용자 프로필 이미지

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
`;

const NavMenu_Left_Btns = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: flex-start;
  flex: 1; /* 가능한 모든 공간 차지 */
  align-items: center;

  text-align: center;

  /* Header/H5 */
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;
`;

const NavMenu_Right_Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: flex-end;
  flex: 1;
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

  /* Header/H5 */
  color: var(--Colors-GrayScale-White, #fcfcff);
  text-align: center;

  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 1.5rem */
  letter-spacing: -0.025rem;

  &:hover {
    color: var(--Colors-Primary-B400, #3d85ff);
    background: var(--Colors-GrayScale-White, #fcfcff);
  }

  button:focus {
    outline: none;
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

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn); // 로그인/로그아웃 토글
  };

  return (
    <Nav>
      <LogoImage src={Logo} alt="Nav Logo" />
      <NavMenu>
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
