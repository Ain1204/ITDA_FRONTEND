import { Link } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
	const [loginType, setLoginType] = useState('personal'); // 'personal' 또는 'business'

	return (
		<div className="login-container">
			<h2>로그인</h2>
			<div className="login-type-tabs">
				<button 
					className={`tab-button ${loginType === 'personal' ? 'active' : ''}`}
					onClick={() => setLoginType('personal')}
				>
					일반 로그인
				</button>
				<button 
					className={`tab-button ${loginType === 'business' ? 'active' : ''}`}
					onClick={() => setLoginType('business')}
				>
					비즈니스 로그인
				</button>
			</div>

			<form className="login-form">
				이메일 입력
				<input
					type="email"
					placeholder={loginType === 'personal' ? "이메일을 입력해주세요" : "사업자 이메일을 입력해주세요"}
					className="login-input"
				/>
				비밀번호 입력
				<input
					type="password"
					placeholder={loginType === 'personal' ? "비밀번호를 입력해주세요" : "사업자 비밀번호를 입력해주세요"}
					className="login-input"
				/>
				<div className="auto-login">
					<input type="checkbox" id="auto-login" />
					<label htmlFor="auto-login">자동 로그인</label>
				</div>
				<button type="submit" className="login-button">
					로그인
				</button>

				<div className="sns-login-divider">
					<span>SNS로 간편 로그인</span>
				</div>

				<div className="sns-login-buttons">
					<button type="button" className="sns-button kakao">
						카카오로 시작하기
					</button>
					<button type="button" className="sns-button naver">
						네이버로 시작하기
					</button>
					<button type="button" className="sns-button google">
						구글로 시작하기
					</button>
					<button type="button" className="sns-button apple">
						Apple로 시작하기
					</button>
					<button type="button" className="sns-button facebook">
						페이스북으로 시작하기
					</button>
				</div>

				<div className="signup-link">
					<Link to="/signup">처음이신가요? 회원가입</Link>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
