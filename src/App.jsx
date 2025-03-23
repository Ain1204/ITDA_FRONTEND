import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPages/SignupMain";
import TestTypographyPage from "./pages/TestTypographyPage";
import GlobalStyles from "./GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import TestColorPage from "./pages/TestColorPage";
import CooperationRegister from "./pages/RegisterPages/CooperationRegister";
import CooperationView from "./pages/ViewPages/CooperationView";
import MyPageMain from "./pages/MyPagePages/MyPageMain";
import { SignupProvider } from "./services/SignupContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import styled from "styled-components";

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background: var(--Colors-GrayScale-White, #fcfcff);
`;

const MainContent = styled.main`
	flex: 1;
	margin-top: 5rem; /* NavBar 높이와 일치 */
`;

const AuthContent = styled.main`
	flex: 1;
`;

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<SignupProvider>
				<AppContainer>
					<Routes>
						{/* 로그인과 회원가입 페이지는 NavBar와 Footer 없이 렌더링 */}
						<Route 
							path="/login" 
							element={<AuthContent><LoginPage /></AuthContent>} 
						/>
						<Route 
							path="/signup" 
							element={<AuthContent><SignupPage /></AuthContent>} 
						/>
						
						{/* 다른 모든 페이지는 NavBar와 Footer 포함하여 렌더링 */}
						<Route
							path="*"
							element={
								<>
									<NavBar />
									<MainContent>
										<Routes>
											<Route path="/" element={<MainPage />} />
											<Route path="/test-typography" element={<TestTypographyPage />} />
											<Route path="/test-color" element={<TestColorPage />} />
											<Route path="/register/:type" element={<CooperationRegister />} />
											<Route path="/view/:type" element={<CooperationView />} />
											<Route path="/mypage/*" element={<MyPageMain />} />
										</Routes>
									</MainContent>
									<Footer />
								</>
							}
						/>
					</Routes>
				</AppContainer>
			</SignupProvider>
		</ThemeProvider>
	);
}

export default App;
