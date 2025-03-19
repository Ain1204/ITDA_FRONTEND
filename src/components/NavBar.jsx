import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ useNavigate 추가
import styled from "styled-components";

import Logo from "../assets/images/Mainimg/Navimg/MainPageLogo.svg";
import Noti from "../assets/images/Mainimg/Navimg/Noti.svg";
import Chatting from "../assets/images/Mainimg/Navimg/chat.svg";
import UserProfile from "../assets/images/Mainimg/Navimg/UserProfile.png"; // 사용자 프로필 이미지

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 상태 변경
    localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 저장
    navigate("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 상태 변경
    localStorage.removeItem("isLoggedIn"); // 로그인 상태 삭제
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
<<<<<<< HEAD
          <NavItem
            onClick={handleCollaboration}
            active={location.pathname === "/suggest"}
          >
            협업 시작하기
          </NavItem>
          <NavItem
            onClick={handleMypage}
            active={location.pathname === "/mypage"}
          >
            마이페이지
          </NavItem>
          <NavItem
            onClick={() => navigate("/services")}
            active={location.pathname === "/services"}
          >
            서비스 소개
          </NavItem>
=======
          <NavItem href="#home">협업 시작하기</NavItem>
          <NavItem href="#about">마이페이지</NavItem>
          <NavItem href="#services">서비스 소개</NavItem>
>>>>>>> main
        </NavMenu_Left_Btns>
        <NavMenu_Right_Btns>
          <a href="/chat">
            <ChattingImage src={Chatting} alt="chat icon" />
          </a>
          <a href="/notifications">
            <NotiImage src={Noti} alt="noti icon" />
          </a>
          {isLoggedIn ? (
            <ProfileImage
              src={UserProfile}
              alt="User Profile"
              onClick={handleLogout}
            />
          ) : (
            <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
          )}
        </NavMenu_Right_Btns>
      </NavMenu>
    </Nav>
  );
};
const Nav = styled.nav`
  display: flex;
  padding: 0rem 2rem;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 4rem;
  top: 0;
  z-index: 1000;
  background: var(--Colors-GrayScale-White, #fcfcff);
  border: 1px solid rgba(18, 19, 24, 0.04);
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 4rem;
    left: 0;
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
  color: var(--Colors-GrayScale-G400, #949bad);

  font-family: "SUIT Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.025rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const NavMenu_Right_Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: flex-end;
  flex: 1;
  white-space: nowrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NavItem = styled.a`
  background: none;
  border: none;
  font-size: 1rem;
  border-radius: 0.5rem;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
<<<<<<< HEAD
  color: ${({ active }) =>
    active ? "#0051ff" : "var(--Colors-GrayScale-G400, #949bad)"};
  background: ${({ active }) =>
    active ? "var(--Colors-Secondary-B100, #ebf2ff)" : "transparent"};
  cursor: pointer;
=======
  color: var(--Colors-GrayScale-G400, #949bad);
>>>>>>> main

  &:hover {
    border-radius: 0.5rem;
    background: var(--Colors-Secondary-B100, #ebf2ff);
    color: var(--Colors-Primary-B500, #0051ff);
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.5rem;
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
  white-space: nowrap;
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

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
`;

const ProfileImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
`;

const LogoImage = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 9rem;
  margin-right: 1.5rem;

  @media (max-width: 768px) {
    width: 7rem;
  }
`;

const NotiImage = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ChattingImage = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
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

export default NavBar;
