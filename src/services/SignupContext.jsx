// 회원가입 과정에서 사용자 데이터를 관리하는 컨텍스트
import { createContext, useContext, useState } from 'react';

// 기본값 설정
const initialSignupData = {
    // 계정 타입 (기업/대학단체)
    accountType: '',
    
    // 기업 산업 분야
    industry: '',
    
    // 대학 단체 정보
    organization: '',  // 단체 구분
    major: '',        // 전공 계열
    
    // 약관 동의
    termsAgreed: {
        service: false,
        privacy: false,
        marketing: false
    },
    
    // 개인정보
    name: '',
    birthInfo: '',  // 주민번호 앞 6자리
    genderInfo: '', // 주민번호 뒤 1자리
    telecomProvider: '',
    phoneNumber: '',
    
    // 휴대폰 인증 상태
    phoneVerified: false,
    
    // 인증 방법 (기업메일/사업자등록번호)
    authMethod: '',
    
    // 기업 메일
    email: '',
    emailVerified: false,
    
    // 아이디 및 비밀번호
    userId: '',
    userIdVerified: false,
    password: '',
};

// 컨텍스트 생성
const SignupContext = createContext();

// 컨텍스트 프로바이더 컴포넌트
export const SignupProvider = ({ children }) => {
    const [signupData, setSignupData] = useState(initialSignupData);
    
    // 데이터 업데이트 함수
    const updateSignupData = (newData) => {
        setSignupData(prevData => ({
            ...prevData,
            ...newData
        }));
    };
    
    // 데이터 초기화 함수
    const resetSignupData = () => {
        setSignupData(initialSignupData);
    };
    
    return (
        <SignupContext.Provider 
            value={{ 
                signupData, 
                updateSignupData, 
                resetSignupData 
            }}
        >
            {children}
        </SignupContext.Provider>
    );
};

// 커스텀 훅 - 다른 컴포넌트에서 컨텍스트 사용 시 활용
export const useSignup = () => {
    const context = useContext(SignupContext);
    if (!context) {
        throw new Error('useSignup 훅은 SignupProvider 내부에서만 사용할 수 있습니다');
    }
    return context;
};

export default SignupContext; 