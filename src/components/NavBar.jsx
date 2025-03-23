import { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/MainIcon/Navimg/MainPageLogo.svg";
import Noti from "../assets/MainIcon/Navimg/Noti.svg";
import Chatting from "../assets/MainIcon/Navimg/chat.svg";
import UserProfile from "../assets/MainIcon/Navimg/UserProfile.png";

// 네비게이션 메뉴 항목
const NAV_ITEMS = [
  { label: "협업 시작하기", path: "/register/enterprise" },
  { label: "마이페이지", path: "/mypage" },
  { label: "서비스 소개", path: "/about" }
];

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
    navigate("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Nav>
      <LogoContainer onClick={goToHome}>
        <LogoImage src={Logo} alt="BIZMO 로고" />
      </LogoContainer>
      
      <HamburgerButton onClick={toggleMenu} aria-label="메뉴">
        <span />
        <span />
        <span />
      </HamburgerButton>
      
      <NavMenu isOpen={menuOpen}>
        <NavMenuLeft>
          {NAV_ITEMS.map((item, index) => (
            <NavItem 
              key={index} 
              to={item.path} 
              onClick={closeMenu}
              $isActive={location.pathname === item.path}
            >
              {item.label}
            </NavItem>
          ))}
        </NavMenuLeft>
        
        <NavMenuRight>
          <IconLink to="/chat" onClick={closeMenu}>
            <IconImage src={Chatting} alt="채팅" />
          </IconLink>
          <IconLink to="/notifications" onClick={closeMenu}>
            <IconImage src={Noti} alt="알림" />
          </IconLink>
          
          {isLoggedIn ? (
            <ProfileButton onClick={handleLogout}>
              <ProfileImage src={UserProfile} alt="사용자 프로필" />
            </ProfileButton>
          ) : (
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          )}
        </NavMenuRight>
      </NavMenu>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 5rem;
  top: 0;
  z-index: 1000;
  background: var(--Colors-GrayScale-White, #fcfcff);
`;

const LogoContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 9rem;
  margin-right: 1.5rem;
  transform: translateY(-0.1rem);

  @media (max-width: 768px) {
    width: 7rem;
  }
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
`;

const NavMenuLeft = styled.div`
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
    width: 100%;
  }
`;

const NavMenuRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: flex-end;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 0 1rem;
  }
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  font-size: 1rem;
  border-radius: 0.5rem;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.$isActive 
    ? 'var(--Colors-Primary-B500, #0051ff)' 
    : 'var(--Colors-GrayScale-G400, #949bad)'};
  background: ${(props) => props.$isActive 
    ? 'var(--Colors-Secondary-B100, #ebf2ff)' 
    : 'transparent'};
  &:hover {
    background: var(--Colors-Secondary-B100, #ebf2ff);
    color: var(--Colors-Primary-B500, #0051ff);
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    width: 100%;
  }
`;

const IconLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconImage = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const LoginButton = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--Colors-Primary-B400, #3d85ff);
  border: none;
  cursor: pointer;
  color: var(--Colors-GrayScale-White, #fcfcff);
  font-family: "SUIT Variable";
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  height: 2.25rem;

  &:hover {
    background: var(--Colors-Primary-B500, #0051ff);
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    width: 100%;
  }
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--Colors-Primary-B400, #3d85ff);
  }

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }

  span {
    display: block;
    height: 0.25rem;
    width: 2rem;
    background: var(--Colors-GrayScale-G600, #1a1a23);
    margin: 0.3rem 0;
    border-radius: 1rem;
    transition: transform 0.3s ease;
  }
`;

export default NavBar;
