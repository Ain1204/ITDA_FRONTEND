import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { 
	signInWithEmailAndPassword, 
	signInWithPopup,
	signInWithCustomToken,
	GoogleAuthProvider, 
	FacebookAuthProvider,
	OAuthProvider
} from "firebase/auth";
import { auth } from '../firebase-config'; // Firebase 설정 파일에서 가져오기
import LoginBackground from '../components/LoginBackground';
import NaverIcon from '../assets/loginIcon/naver.svg';
import KakaoIcon from '../assets/loginIcon/kakao.svg';
import GoogleIcon from '../assets/loginIcon/google.svg';
import AppleIcon from '../assets/loginIcon/apple.svg';
import FacebookIcon from '../assets/loginIcon/facebook.svg';
import LoginBlueButton from '../components/BlueButton';
import logger from '../utils/logger';

const PageContainer = styled.div`
	display: flex;
	min-height: 100vh;
`;

const LoginSection = styled.div`
	flex: 1;
	margin-left: 52.08%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoginContainer = styled.div`
	display: flex;
	width: 400px;
	flex-direction: column;
	align-items: flex-start;
`;

const Title = styled.h1`
	display: flex;
	width: 200px;
	align-self: stretch;
	color: var(--Colors-GrayScale-G600, #1A1A23);
	font-family: "SUIT Variable";
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%;
	letter-spacing: -0.8px;
	padding-bottom: 16px;
`;

const TabContainer = styled.div`
	display: flex;
	width: 200px;
	padding: 4px 0px;
	justify-content: center;
	align-items: center;
	gap: 20px;
	padding-bottom: 32px;
`;

const TabButton = styled.button`
	align-self: stretch;
	color: var(--Colors-Primary-B500, #0051FF);
	text-align: center;
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: -0.4px;
	position: relative;
	border: none;
	background: none;
	cursor: pointer;
	padding-bottom: 4px;

	// 기본 상태 (선택되지 않은 상태)
	color: var(--Colors-GrayScale-G400, #949BAD);

	// active 클래스가 있을 때 (선택된 상태)
	&.active {
		color: var(--Colors-Primary-B500, #0051FF);
		
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 2px;
			background-color: var(--Colors-Primary-B500, #0051FF);
		}
	}
`;

const EmailContainer = styled.div`
	display: flex;
	width: 400px;
	flex-direction: column;
	gap: 8px;
	padding-bottom: 20px;
`;

const PwContainer = styled.div`
	display: flex;
	width: 400px;
	flex-direction: column;
	gap: 8px;
	padding-bottom: 20px;
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
    width: 400px;
    height: 48px;
    padding: 12px 16px;
    align-items: center;
    gap: 8px;
    border-radius: 12px;
    background: var(--Colors-GrayScale-G200, #F3F5F8);
    box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
    border: none;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.4px;

    &::placeholder {
        color: var(--Colors-GrayScale-G400, #949BAD);
        font-family: "SUIT Variable";
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: -0.4px;
        vertical-align: middle;
		transform: translateY(1px);
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
`;

const AutoLoginContainer = styled.div`
	display: flex;
	width: 400px;
	align-items: center;
	gap: 8px;
	padding-bottom: 32px;
`;

const StyledCheckbox = styled.input`
	width: 14px;
	height: 14px;
	cursor: pointer;
	transform: translateY(-1px);
`;

const AutoLoginLabel = styled.label`
    color: var(--Colors-GrayScale-G600, #1A1A23);
    font-family: "SUIT Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 168%;
    letter-spacing: -0.35px;
	cursor: pointer;
`;

const HelpButton = styled.button`
    flex: 1 0 0;
    color: var(--Colors-Primary-B500, #0051FF);
    text-align: right;
    font-family: "SUIT Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 168%;
    letter-spacing: -0.35px;
    background: none;
    border: none;
    cursor: pointer;
`;

const SnsLoginDivider = styled.div`
	display: flex;
	width: 400px;
	align-items: center;
	gap: 4px;
	justify-content: center;
	padding-top: 52px;
	padding-bottom: 32px;
`;

const DividerLine = styled.div`
	width: 143px;
	height: 1px;
	background-color: var(--Colors-GrayScale-G300, #DDE1E7);
	transform: translateY(-1px);
`;

const SnsButtonContainer = styled.div`
	display: flex;
	width: 400px;
	flex-direction: row;
	gap: 24px;
	justify-content: center;
	align-items: center;
	padding-bottom: 52px;
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


const LoginPage = () => {
	const [loginType, setLoginType] = useState('personal'); // 'personal' 또는 'business'
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isNaverLoggingIn, setIsNaverLoggingIn] = useState(false);
	const naverLoginInProgressRef = useRef(false);

	// Firebase 이메일/비밀번호 로그인 함수
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			alert("로그인에 성공했습니다!");
		} catch (error) {
			alert(error.message);
		}
	};

	// 구글 로그인 핸들러
	const handleGoogleLogin = async () => {
		try {
			await signInWithPopup(auth, new GoogleAuthProvider());
			alert("구글 로그인에 성공했습니다!");
		} catch (error) {
			alert("구글 로그인 오류: " + error.message);
		}
	};

	// 페이스북 로그인 핸들러
	const handleFacebookLogin = async () => {
		try {
			await signInWithPopup(auth, new FacebookAuthProvider());
			alert("페이스북 로그인에 성공했습니다!");
		} catch (error) {
			alert("페이스북 로그인 오류: " + error.message);
		}
	};

	// 카카오 로그인 핸들러 추가
	const handleKakaoLogin = async () => {
		// Firebase 콘솔에서 OIDC 제공자로 등록한 Provider ID와 일치해야 합니다.
		const kakaoProvider = new OAuthProvider("oidc.kakao");
		try {
			const result = await signInWithPopup(auth, kakaoProvider);
			logger.log("카카오 로그인 성공:", result.user);
			alert("카카오 로그인에 성공했습니다!");
		} catch (error) {
			logger.error("카카오 로그인 오류:", error.message);
			alert("카카오 로그인 오류: " + error.message);
		}
	};

	// 네이버 로그인 핸들러 (프로미스 기반)
	const handleNaverLogin = async () => {
		if (naverLoginInProgressRef.current) {
			return;
		}
		naverLoginInProgressRef.current = true;
		setIsNaverLoggingIn(true);

		// 클라이언트용 정보는 import.meta.env 를 사용 (VITE_ 접두어)
		const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
		const redirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;
		const state = Math.random().toString(36).substring(2);
		const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
		const expectedOrigin = redirectUri;
		
		// 프로미스를 사용하여 메시지를 기다립니다.
		const customTokenPromise = new Promise((resolve, reject) => {
			// 타이머 ID 저장
			const timerId = setTimeout(() => {
				reject(new Error("커스텀 토큰을 기다리는 동안 타임아웃이 발생했습니다."));
			}, 30000);
			
			const messageHandler = (event) => {
				logger.log("Message received from:", event.origin, "data:", event.data);
				// 약간의 차이를 허용: expectedOrigin으로 시작하는지 확인
				if (!event.origin.startsWith(expectedOrigin)) {
					logger.warn("Unexpected message origin:", event.origin);
					return;
				}
				if (event.data && event.data.customToken) {
					clearTimeout(timerId);
					resolve(event.data.customToken);
					window.removeEventListener("message", messageHandler);
				}
			};
			// 이벤트 핸들러를 등록 (once 옵션 없이)
			window.addEventListener("message", messageHandler);
		});
		
		// 팝업 열기
		const width = 600, height = 600;
		const left = window.screen.width / 2 - width / 2;
		const top = window.screen.height / 2 - height / 2;
		window.open(naverAuthUrl, "NaverLogin", `width=${width},height=${height},top=${top},left=${left}`);
		
		try {
			const customToken = await customTokenPromise;
			await signInWithCustomToken(auth, customToken);
			alert("네이버 로그인에 성공했습니다!");
		} catch (error) {
			alert("네이버 로그인 오류: " + error.message);
		} finally {
			naverLoginInProgressRef.current = false;
			setIsNaverLoggingIn(false);
		}
	};

	return (
		<PageContainer>
			<LoginBackground />
			<LoginSection>
				<LoginContainer>
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

					<form onSubmit={handleLogin}>
						<EmailContainer>
							<InputLabel>이메일 입력</InputLabel>
							<StyledInput
								type="email"
								placeholder={loginType === 'personal' ? "이메일을 입력해주세요" : "사업자 이메일을 입력해주세요"}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</EmailContainer>
						<PwContainer>
							<InputLabel>비밀번호 입력</InputLabel>
							<StyledInput
								type="password"
								placeholder={loginType === 'personal' ? "비밀번호를 입력해주세요" : "사업자 비밀번호를 입력해주세요"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<PasswordGuide>
								영문 대소문자, 숫자, 특수문자 포함 최소 8글자 이상을 입력해 주세요.
							</PasswordGuide>
						</PwContainer>

						<AutoLoginContainer>
							<StyledCheckbox type="checkbox" id="auto-login" />
							<AutoLoginLabel htmlFor="auto-login">자동 로그인</AutoLoginLabel>
							<HelpButton type="button">문제가 있나요?</HelpButton>
						</AutoLoginContainer>

						<LoginBlueButton type="submit">
							로그인
						</LoginBlueButton>
					</form>

					<SnsLoginDivider>
						<DividerLine />
						<SnsLoginText>SNS로 간편 로그인</SnsLoginText>
						<DividerLine />
					</SnsLoginDivider>

					<SnsButtonContainer>
						<SnsButton type="button" onClick={handleKakaoLogin}>
							<img src={KakaoIcon} alt="카카오 로그인" />
						</SnsButton>
						<SnsButton
							type="button"
							onClick={handleNaverLogin}
							disabled={isNaverLoggingIn}
						>
							<img src={NaverIcon} alt="네이버 로그인" />
						</SnsButton>
						<SnsButton type="button" onClick={handleGoogleLogin}>
							<img src={GoogleIcon} alt="구글 로그인" />
						</SnsButton>
						<SnsButton type="button">
                            <img src={AppleIcon} alt="애플 로그인" />
                        </SnsButton>
						<SnsButton type="button" onClick={handleFacebookLogin}>
							<img src={FacebookIcon} alt="페이스북 로그인" />
						</SnsButton>
					</SnsButtonContainer>

					<div className="signup-prompt">
						<SignUpLink to="/signup">처음이신가요? 회원가입</SignUpLink>
					</div>
				</LoginContainer>
			</LoginSection>
		</PageContainer>
	);
};

export default LoginPage;