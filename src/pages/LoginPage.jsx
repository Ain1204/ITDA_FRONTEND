import { Link } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import LoginBackground from '../components/LoginBackground';

const Title = styled.h1`
	align-self: stretch;
	color: var(--Colors-GrayScale-G600, #1A1A23);
	font-family: "SUIT Variable";
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%;
	letter-spacing: -0.8px;
`;

const TabButton = styled.button`
	align-self: stretch;
	color: var(--Colors-Primary-B500, #0051FF);
	// text-align: center;
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: -0.4px;

	// 기본 상태 (선택되지 않은 상태)
	color: var(--Colors-GrayScale-G400, #949BAD);

	// active 클래스가 있을 때 (선택된 상태)
	&.active {
		color: var(--Colors-Primary-B500, #0051FF);
	}
`;

const TabContainer = styled.div`
	display: flex;
	padding: 4px 0px;
	justify-content: center;
	align-items: center;
	gap: 20px;
`;

const EmailContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const PwContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const InputLabel = styled.label`
	align-self: stretch;
	color: var(--Colors-GrayScale-G500, #4F5462);
	font-family: "SUIT Variable";
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 168%;
	letter-spacing: -0.35px;
`;

const StyledInput = styled.input`
	display: flex;
	height: 48px;
	padding: 12px 16px;
	align-items: center;
	gap: 8px;
	align-self: stretch;
	border-radius: 12px;
	background: var(--Colors-GrayScale-G200, #F3F5F8);
	box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
	border: none;

	&::placeholder {
		flex: 1 0 0;
		color: var(--Colors-GrayScale-G400, #949BAD);
		font-family: "SUIT Variable";
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 150%;
		letter-spacing: -0.4px;
	}
`;

const PasswordGuide = styled.p`
	align-self: stretch;
	color: var(--Colors-Colors-Style-Error, #EF5D58);
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 132%;
	letter-spacing: -0.3px;
	margin-top: 4px;
`;

const LoginButton = styled.button`
	display: flex;
	width: 400px;
	height: 48px;
	padding: 12px 16px;
	align-items: center;
	gap: 8px;
	justify-content: center;
	border-radius: 12px;
	background: var(--Colors-Primary-B400, #3D85FF);
	box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.32);
	border: none;
	cursor: pointer;

	/* 버튼 텍스트 스타일 */
	color: var(--Colors-GrayScale-White, #FCFCFF);
	text-align: center;
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;
	letter-spacing: -0.4px;
`;

const SnsLoginText = styled.span`
	color: var(--Colors-GrayScale-G500, #4F5462);
	text-align: center;
	font-family: "SUIT Variable";
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 168%;
	letter-spacing: -0.35px;
`;

const SnsButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 16px;
	justify-content: center;
	align-items: center;
`;

const SnsButton = styled.button`
	width: 40px;
	height: 40px;
	flex-shrink: 0;
	border-radius: 50%;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SignUpLink = styled(Link)`
	color: var(--Colors-Primary-B500, #0051FF);
	font-family: "SUIT Variable";
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 168%;
	letter-spacing: -0.35px;
	text-decoration: none;
`;

const SnsLoginDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
`;

const DividerLine = styled.div`
  width: 143px;
  height: 1px;
  background-color: var(--Colors-GrayScale-G300, #DDE1E7);
`;

const LoginPage = () => {
	const [loginType, setLoginType] = useState('personal'); // 'personal' 또는 'business'

	return (
		<div style={{ display: 'flex', minHeight: '100vh' }}>
			<LoginBackground />
			<div style={{ 
				flex: 1, 
				marginLeft: '52.08%',
			}}>
				<div className="login-container">
					<Title>로그인</Title>

					<TabContainer>
						<TabButton 
							className={loginType === 'personal' ? 'active' : ''}
							onClick={() => setLoginType('personal')}
							>
							일반 로그인
						</TabButton>
						<TabButton 
							className={loginType === 'business' ? 'active' : ''}
							onClick={() => setLoginType('business')}
						>
							비즈니스 로그인
						</TabButton>
					</TabContainer>

					<form className="login-form">
						<EmailContainer>
							<InputLabel>이메일 입력</InputLabel>
							<StyledInput
								type="email"
								placeholder={loginType === 'personal' ? "이메일을 입력해주세요" : "사업자 이메일을 입력해주세요"}/>
						</EmailContainer>
						<PwContainer>
							<InputLabel>비밀번호 입력</InputLabel>
							<StyledInput
								type="password"
								placeholder={loginType === 'personal' ? "비밀번호를 입력해주세요" : "사업자 비밀번호를 입력해주세요"}/>
								<PasswordGuide>
									영문 대소문자, 숫자, 특수문자 포함 최소 8글자 이상을 입력해 주세요.
								</PasswordGuide>
						</PwContainer>

						<div className="auto-login">
							<input type="checkbox" id="auto-login" />
							<label htmlFor="auto-login">자동 로그인</label>
						</div>
						<LoginButton type="submit">
							로그인
						</LoginButton>

						<SnsLoginDivider>
							<DividerLine />
							<SnsLoginText>SNS로 간편 로그인</SnsLoginText>
							<DividerLine />
						</SnsLoginDivider>

						<SnsButtonContainer>
							<SnsButton type="button">
								{/* 카카오 아이콘 */}
							</SnsButton>
							<SnsButton type="button">
								{/* 네이버 아이콘 */}
							</SnsButton>
							<SnsButton type="button">
								{/* 구글 아이콘 */}
							</SnsButton>
							<SnsButton type="button">
								{/* 애플 아이콘 */}
							</SnsButton>
						</SnsButtonContainer>

						<div className="signup-prompt">
							<SignUpLink to="/signup">처음이신가요? 회원가입</SignUpLink>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
