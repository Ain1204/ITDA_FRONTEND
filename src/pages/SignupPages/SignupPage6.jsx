import React from 'react';
import styled from 'styled-components';
import ArrowWhiteButton from '../../components/ArrowWhiteButton';
import WhiteArrowIcon from '../../assets/loginIcon/signButtonArrow_white.svg';

// 버튼 래퍼 컴포넌트 - 호버 효과만 추가
const ButtonWrapper = styled.div`
	width: 400px;
	transition: all 0.2s ease-in-out;
	
	&:hover button {
		background: var(--Colors-Primary-B400, #3D85FF);
		box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.32);
	}
	
	&:hover span {
		color: var(--Colors-GrayScale-White, #FCFCFF);
	}
	
	&:hover img {
		content: url(${WhiteArrowIcon});
	}
`;

const SignupPage6 = ({ navigate }) => {
	return (
		<div>
			<ButtonWrapper>
				<ArrowWhiteButton 
					textBlue={true} 
					isArrowBlue={true} 
					onClick={() => navigate('/mypage')}
				>
					프로필 완성하기
				</ArrowWhiteButton>
			</ButtonWrapper>
		</div>
	);
};

export default SignupPage6;
