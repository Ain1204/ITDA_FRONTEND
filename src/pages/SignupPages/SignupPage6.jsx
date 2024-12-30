import styled from 'styled-components';

const Subtitle = styled.h4`
	display: flex;
	align-self: stretch;
	color: #4F5462;
	text-align: center;
	font-family: "SUIT Variable";
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%;
	letter-spacing: -0.5px;
	margin-bottom: 60px;
`;

const SignupPage6 = ({ navigate }) => {
	return (
		<div>
			<Subtitle>회원가입을 완료했어요!</Subtitle>
			<div>
				<button onClick={() => navigate('/')}>
					메인 페이지로 이동
				</button>
			</div>
		</div>
	);
};

export default SignupPage6;
