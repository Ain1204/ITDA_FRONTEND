import styled from 'styled-components';
import SignupPageImage from '../assets/images/SignupPage.png';

// 배경 컨테이너
const BackgroundContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 52.08%;
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

const SignupBackground = () => {
  return (
    <BackgroundContainer>
      <ImageContainer>
        <img 
          src={SignupPageImage} 
          alt="Signup illustration" 
          draggable="false"
        />
      </ImageContainer>
    </BackgroundContainer>
  );
};

export default SignupBackground; 