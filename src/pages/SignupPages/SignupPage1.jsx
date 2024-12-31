import styled from 'styled-components';
import SignupLongButton from '../../components/SignupLongButton';


const SignupPage1 = ({ setStep }) => {
	const handleAccountTypeSelect = (type) => {
		setStep(2);
	};

	return (
		<div>
			<div>
				<SignupLongButton
					onClick={() => handleAccountTypeSelect('business')}
				>
					기업
				</SignupLongButton>
				<SignupLongButton
					onClick={() => handleAccountTypeSelect('university')}
				>
					대학생 단체
				</SignupLongButton>
			</div>
		</div>
	);
};

export default SignupPage1;
