import StyledButton from '../../components/SignupWhiteButton';


const SignupPage6 = ({ navigate }) => {
	return (
			<div>
				<StyledButton textBlue={true} isArrowBlue={true} onClick={() => navigate('/')}>
					메인 페이지로 이동
				</StyledButton>
			</div>
	);
};

export default SignupPage6;
