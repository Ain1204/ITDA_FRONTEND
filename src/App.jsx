import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TestTypographyPage from "./pages/TestTypographyPage";
import GlobalStyles from "./GlobalStyles";

function App() {
	return (
		<>
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/test-typography" element={<TestTypographyPage />} />
			</Routes>
		</>
	);
}

export default App;
