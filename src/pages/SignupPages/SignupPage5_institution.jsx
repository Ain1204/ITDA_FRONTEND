import {
	Label,
	InputContainer,
	SignupInput,
	SignupVerifyButton,
	InputSection,
	InputWrapper,
	PasswordToggleButton,
	SignupButton,
	GuideText,
	useAuthState,
	usePasswordState,
	validators,
	TransitionWrapper
} from './SignupPage5Main';
import PasswordEyeIcon from '../../assets/loginIcon/passwordEye.svg';
import { useSignup } from '../../services/SignupContext';
import { useState, useEffect } from 'react';
import { registerWithEmail, checkUserIdExists } from '../../services/authService';
import logger from '../../utils/logger';

// 기관 코드 인증 컴포넌트
const SignupPage5_institution = ({ setStep }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { signupData, updateSignupData } = useSignup();
	
	// 기관 코드 관련 상태
	const [institutionCode, setInstitutionCode] = useState('');
	const [institutionVerified, setInstitutionVerified] = useState(false);
	const [institutionError, setInstitutionError] = useState(false);
	
	// 인증 관련 상태 및 함수
	const {
		userId,
		setUserId,
		userIdVerified,
		setUserIdVerified,
		userIdVerificationFailed,
		setUserIdVerificationFailed
	} = useAuthState();
	
	// 비밀번호 관련 상태 및 함수
	const {
		password,
		setPassword,
		passwordConfirm,
		setPasswordConfirm,
		passwordError,
		setPasswordError,
		passwordConfirmError,
		setPasswordConfirmError,
		showPassword,
		setShowPassword,
		showPasswordConfirm,
		setShowPasswordConfirm,
		showPasswordInput,
		setShowPasswordInput
	} = usePasswordState();

	// 기관 코드 변경 처리
	const handleInstitutionCodeChange = (e) => {
		setInstitutionCode(e.target.value);
		setInstitutionError(false);
		setInstitutionVerified(false);
	};

	// 기관 코드 검증 처리
	const handleVerifyInstitution = async () => {
		if (!institutionCode.trim()) {
			setInstitutionError(true);
			setErrorMsg('기관 코드를 입력해주세요.');
			return;
		}
		
		setIsLoading(true);
		setErrorMsg('');
		
		try {
			// TODO: 실제 기관 코드 검증 API 호출
			// 임시로 특정 코드는 성공으로 처리
			const isValid = institutionCode === '12345' || institutionCode === 'UNIV2023';
			
			if (isValid) {
				setInstitutionVerified(true);
				updateSignupData({ 
					institutionCode: institutionCode,
					institutionVerified: true
				});
			} else {
				setInstitutionError(true);
				setErrorMsg('유효하지 않은 기관 코드입니다. 다시 확인해주세요.');
			}
		} catch (error) {
			logger.error("기관 코드 검증 중 오류:", error);
			setInstitutionError(true);
			setErrorMsg('기관 코드 검증 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
		} finally {
			setIsLoading(false);
		}
	};

	// 아이디 중복 확인
	const handleCheckUserId = async () => {
		if (!validators.validateUserId(userId)) {
			setUserIdVerificationFailed(true);
			setUserIdVerified(false);
			return;
		}

		try {
			setIsLoading(true);
			
			// 아이디 중복 확인 API
			const isDuplicate = await checkUserIdExists(userId);
			
			if (isDuplicate) {
				setUserIdVerificationFailed(true);
				setUserIdVerified(false);
			} else {
				setShowPasswordInput(true);
				setUserIdVerificationFailed(false);
				setUserIdVerified(true);
				updateSignupData({ 
					userId, 
					userIdVerified: true 
				});
			}
		} catch (error) {
			logger.error("아이디 중복 확인 중 오류:", error);
			setUserIdVerificationFailed(true);
			setUserIdVerified(false);
		} finally {
			setIsLoading(false);
		}
	};

	// 회원가입 제출 처리
	const handleSignup = async () => {
		// 필수 확인 체크
		if (!institutionVerified) {
			setErrorMsg('기관 코드 인증이 완료되지 않았습니다.');
			return;
		}
		
		if (!userIdVerified) {
			setErrorMsg('아이디 중복 확인이 필요합니다.');
			return;
		}
		
		// 비밀번호 유효성 검증
		if (!validators.validatePassword(password)) {
			setPasswordError(true);
			setErrorMsg('비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.');
			return;
		}
		
		// 비밀번호 일치 여부 확인
		if (password !== passwordConfirm) {
			setPasswordConfirmError(true);
			setErrorMsg('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
			return;
		}

		setIsLoading(true);
		setErrorMsg('');

		try {
			// 회원가입 데이터 준비
			const userData = {
				...signupData,
				institutionCode,
				institutionVerified: true,
				userId,
				password,
				authMethod: 'institution'
			};

			// TODO: 기관 코드 기반 회원가입 API 호출
			// 현재는 임시로 이메일 회원가입 API 호출
			const result = await registerWithEmail(userData);
			
			if (result.success) {
				alert('회원가입이 완료되었습니다!');
				// 마지막 단계로 이동
				setStep(6);
			} else if (result.error) {
				setErrorMsg(result.error);
			}
		} catch (error) {
			logger.error("회원가입 중 오류:", error);
			setErrorMsg(error.message || '회원가입 중 오류가 발생했습니다.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<InputSection>
			{/* 기관 코드 입력 */}
			<Label>기관 코드</Label>
			<InputContainer>
				<SignupInput
					type="text"
					placeholder="소속 기관의 코드를 입력해주세요"
					value={institutionCode}
					onChange={handleInstitutionCodeChange}
					disabled={isLoading || institutionVerified}
				/>
				<SignupVerifyButton
					onClick={handleVerifyInstitution}
					$status={institutionVerified 
						? 'success' 
						: institutionError 
							? 'error'
							: 'default'
					}
					disabled={isLoading || institutionVerified}
				>
					{institutionVerified 
						? '인증 완료' 
						: institutionError
							? '인증 실패'
							: '코드 확인'
					}
				</SignupVerifyButton>
			</InputContainer>
			{errorMsg && (
				<GuideText $status="error">
					{errorMsg}
				</GuideText>
			)}
			{institutionVerified && (
				<GuideText $status="success">
					기관 코드가 성공적으로 인증되었습니다.
				</GuideText>
			)}

			{/* 아이디 입력 */}
			<TransitionWrapper show={institutionVerified}>
				<Label>아이디</Label>
				<InputContainer>
					<SignupInput
						type="text"
						placeholder="사용하실 아이디를 입력해주세요"
						value={userId}
						onChange={(e) => {
							setUserId(e.target.value);
							setUserIdVerificationFailed(false);
							setUserIdVerified(false);
						}}
						disabled={isLoading}
					/>
					<SignupVerifyButton
						onClick={handleCheckUserId}
						$status={userIdVerified ? 'success' : userIdVerificationFailed ? 'error' : 'default'}
						disabled={isLoading}
					>
						{userIdVerified 
							? '확인 완료' 
							: isLoading 
								? '확인 중...' 
								: '중복 확인'}
					</SignupVerifyButton>
				</InputContainer>
				<GuideText $status={userIdVerified ? 'success' : userIdVerificationFailed ? 'error' : 'default'}>
					{userIdVerificationFailed 
						? "사용할 수 없는 아이디에요" 
						: userIdVerified
							? "사용할 수 있는 아이디에요"
							: "학교/단체 명을 입력해주세요"}
				</GuideText>

				{/* 비밀번호 입력 */}
				<TransitionWrapper show={showPasswordInput}>
					<Label>비밀번호</Label>
					<InputContainer>
						<InputWrapper>
							<SignupInput
								type={showPassword ? "text" : "password"}
								placeholder="비밀번호를 입력해주세요"
								value={password}
								onChange={(e) => {
									const newPassword = e.target.value;
									setPassword(newPassword);
									// 비밀번호 유효성 검증
									const isValid = validators.validatePassword(newPassword);
									setPasswordError(!isValid);
									
									// 비밀번호가 변경되면 비밀번호 확인 필드와의 일치 여부 검증
									if (passwordConfirm) {
										setPasswordConfirmError(newPassword !== passwordConfirm);
									}
								}}
								disabled={isLoading}
							/>
							<PasswordToggleButton
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								disabled={isLoading}
							>
								<img src={PasswordEyeIcon} alt={showPassword ? '숨기기' : '보기'} />
							</PasswordToggleButton>
						</InputWrapper>
					</InputContainer>
					<GuideText $status={passwordError ? 'error' : 'default'}>
						영문 대소문자, 숫자, 특수문자 포함 최소 8글자 이상을 입력해주세요.
					</GuideText>

					<Label>비밀번호 확인</Label>
					<InputContainer>
						<InputWrapper>
							<SignupInput
								type={showPasswordConfirm ? "text" : "password"}
								placeholder="비밀번호를 다시 입력해주세요"
								value={passwordConfirm}
								onChange={(e) => {
									const newPasswordConfirm = e.target.value;
									setPasswordConfirm(newPasswordConfirm);
									// 비밀번호와 비밀번호 확인이 일치하는지만 검증
									setPasswordConfirmError(password !== newPasswordConfirm);
								}}
								disabled={isLoading}
							/>
							<PasswordToggleButton
								type="button"
								onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
								disabled={isLoading}
							>
								<img src={PasswordEyeIcon} alt={showPasswordConfirm ? '숨기기' : '보기'} />
							</PasswordToggleButton>
						</InputWrapper>
					</InputContainer>
					<GuideText $status={passwordConfirmError ? 'error' : password === passwordConfirm && passwordConfirm ? 'success' : 'default'}>
						{passwordConfirmError 
							? "패스워드가 일치하지 않아요." 
							: password === passwordConfirm && passwordConfirm
								? "패스워드가 일치합니다."
								: "패스워드 확인을 위해 다시 한번 입력해주세요."}
					</GuideText>

					{/* 회원가입 버튼 */}
					{institutionVerified && 
						userIdVerified && 
						password && 
						passwordConfirm && 
						!passwordError && 
						!passwordConfirmError && (
						<SignupButton
							onClick={handleSignup}
							$disabled={isLoading}
						>
							{isLoading ? '처리 중...' : '회원가입'}
						</SignupButton>
					)}
				</TransitionWrapper>
			</TransitionWrapper>
		</InputSection>
	);
};

export default SignupPage5_institution; 