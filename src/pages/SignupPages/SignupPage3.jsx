import styled from 'styled-components';
import NextButton from '../../components/ArrowBlueButton';
import ssnDash from '../../assets/loginIcon/ssn_dash.svg';
import passwordCircle from '../../assets/loginIcon/passwordCircle.svg';
import { useState } from 'react';
import { useSignup } from '../../services/SignupContext';

// 인증 기능 활성화 여부
const ENABLE_VERIFICATION = false; // true면 인증 기능 활성화, false면 인증 기능 비활성화

const InputLabel = styled.label`
	align-self: stretch;
	color: var(--Colors-GrayScale-G500, #4F5462);
	font-family: "SUIT Variable";
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 168%;
	letter-spacing: -0.35px;
	margin-top: 28px;
	display: block;
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
    margin-top: 8px;

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

export const SSNWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    img {
        margin: 0 8px;
    }
`;

const SSNStyledInput = styled(StyledInput)`
	width: 184px;
	letter-spacing: 3px;
`;

const SSNSecondInput = styled(SSNStyledInput)`
	position: relative;
	text-align: left;
	padding-left: 16px;
	letter-spacing: normal;
	
	&::placeholder {
		visibility: hidden;
	}
`;

const CirclesContainer = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	left: 30px;
	top: 58%;
	transform: translateY(-50%);
	pointer-events: none;
	
	img {
		width: 8px;
		height: 8px;
		margin-right: 8px;
	}
`;

const SSNSecondInputWrapper = styled.div`
	position: relative;
	width: 184px;
`;

const SelectAgency = styled.select`
	display: flex;
	width: 400px;
	height: 48px;
	padding: 12px 16px;
	align-items: center;
	gap: 8px;
	align-self: stretch;
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
	color: var(--Colors-GrayScale-G400, #949BAD);
	cursor: pointer;
	appearance: none;
	background-image: url('/src/assets/loginIcon/arrow_down.svg');
	background-repeat: no-repeat;
	background-position: right 16px center;
	background-size: 16px;

	&:not(:placeholder-shown) {
		color: var(--Colors-GrayScale-G900, #949BAD);
	}

	&:has(option[value]:checked:not([value=""])) {
		color: var(--Colors-GrayScale-G900, #1A1A23);
	}
`;

const SignupPage3 = ({ setStep }) => {
	const [name, setName] = useState('');
	const [ssn1, setSsn1] = useState('');
	const [ssn2, setSsn2] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [agency, setAgency] = useState('');
	const { updateSignupData } = useSignup();

	// 이름 변경 함수
	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	// 주민등록번호 앞 6자리 변경 함수
	const handleSsn1Change = (e) => {
		const value = e.target.value.replace(/[^\d]/g, '');
		setSsn1(value);
	};

	// 주민등록번호 뒤 첫 1자리 변경 함수
	const handleSsn2Change = (e) => {
		const value = e.target.value.replace(/[^\d]/g, '');
		if (value.length <= 1) {
			setSsn2(value);
		}
	};

	// 휴대폰 번호 변경 함수
	const handlePhoneNumberChange = (e) => {
		const value = e.target.value;
		const formattedValue = value
			.replace(/[^\d-]/g, '')
			.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		setPhoneNumber(formattedValue);
	};

	// 폼 유효성 검사 조건
	const isFormValid = ENABLE_VERIFICATION 
		? (name.length > 0 && 
			ssn1.length === 6 && 
			ssn2.length === 1 && 
			phoneNumber.length === 13 &&
			agency !== '')
		: true;  // 인증 비활성화 시 항상 true

	// 다음 버튼 클릭 핸들러
	const handleNextClick = () => {
		// 개인정보를 컨텍스트에 저장
		updateSignupData({
			name,
			birthInfo: ssn1,
			genderInfo: ssn2,
			telecomProvider: agency,
			phoneNumber
		});
		
		setStep(4);
	};

	return (
		<div>
			<form>
				{/* 이름 입력 컨테이너 */}
				<div>
					<InputLabel htmlFor="name">이름</InputLabel>
					<StyledInput 
						type="text" 
						id="name" 
						placeholder="이름(실명)을 입력해주세요"
						value={name}
						onChange={handleNameChange}
					/>
				</div>
				
				{/* 주민등록번호 입력 컨테이너 */}
				<div>
					<InputLabel htmlFor="ssn">주민등록번호</InputLabel>
					<SSNWrapper>
						<SSNStyledInput 
							type="text" 
							id="ssn1" 
							maxLength="6" 
							placeholder="앞 6자리"
							value={ssn1}
							onChange={handleSsn1Change}
						/>
						<img src={ssnDash} alt="ssn-dash" />
						<SSNSecondInputWrapper>
							<SSNSecondInput 
								type="text"
								id="ssn2" 
								maxLength="1" 
								placeholder=" "
								value={ssn2}
								onChange={handleSsn2Change}
							/>
							<CirclesContainer>
								{Array(6).fill().map((_, index) => (
									<img 
										key={index} 
										src={passwordCircle} 
										alt="password circle" 
									/>
								))}
							</CirclesContainer>
						</SSNSecondInputWrapper>
					</SSNWrapper>
				</div>

				{/* 통신사 선택 컨테이너 */}
				<div>
					<InputLabel>통신사</InputLabel>
					<SelectAgency 
						value={agency} 
						onChange={(e) => setAgency(e.target.value)}
						defaultValue=""
					>
						<option value="" disabled>통신사 선택</option>
						<option value="skt">SKT</option>
						<option value="kt">KT</option>
						<option value="lgu">LG U+</option>
						<option value="알뜰폰_skt">알뜰폰 SKT</option>
						<option value="알뜰폰_kt">알뜰폰 KT</option>
						<option value="알뜰폰_lgu">알뜰폰 LG U+</option>
					</SelectAgency>
				</div>

				{/* 휴대폰 번호 입력 컨테이너 */}
				<div>
					<InputLabel htmlFor="phone">휴대폰 번호</InputLabel>
					<StyledInput 
						type="tel" 
						id="phone" 
						placeholder="010-1234-5678" 
						maxLength="13"
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
					/>
				</div>
			</form>

			{/* 인증 버튼 */}
			<NextButton 
				onClick={handleNextClick} 
				disabled={!isFormValid}
			>
				인증하기
			</NextButton>
			
		</div>
	);
};

export default SignupPage3;
