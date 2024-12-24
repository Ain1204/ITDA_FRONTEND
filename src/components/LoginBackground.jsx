import styled from 'styled-components';
import LoginPageImage from '../assets/images/LoginPage.png';

// 배경 컨테이너 (90rem 중 46.88rem)
const BackgroundContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 52.08%; // (46.88/90)*100
  height: 100vh;
  overflow: hidden;
`;

// 이미지 컨테이너
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
    user-select: none;
    pointer-events: none;
  }
`;


const LoginBackground = () => {
  return (
    <BackgroundContainer>
      <ImageContainer>
        <img 
          src={LoginPageImage} 
          alt="Login illustration" 
          draggable="false"
        />
      </ImageContainer>
    </BackgroundContainer>
  );
};

export default LoginBackground; 