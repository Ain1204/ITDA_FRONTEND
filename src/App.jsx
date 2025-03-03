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
import MyPage from "./pages/MyPage";
import { SignupProvider } from "./services/SignupContext";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<SignupProvider>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/test-typography" element={<TestTypographyPage />} />
					<Route path="/test-color" element={<TestColorPage />} />
					<Route path="/mypage" element={<MyPage />} />
				</Routes>
			</SignupProvider>
		</ThemeProvider>
	);
}

export default App;
