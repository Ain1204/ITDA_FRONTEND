// Firebase 인증 및 회원가입 서비스

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    fetchSignInMethodsForEmail,
    signInAnonymously,
    onAuthStateChanged
} from 'firebase/auth';
import { 
    doc, 
    setDoc, 
    getDoc, 
    serverTimestamp, 
    collection, 
    query, 
    where, 
    getDocs,
    updateDoc
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth, db } from '../firebase-config';
import logger from '../utils/logger';

// 사용자 아이디 중복 확인
export const checkUserIdExists = async (userId) => {
    try {
        logger.log("아이디 중복 확인 시작:", userId);
        
        // 개발 환경에서만 사용되는 테스트용 중복 아이디 목록
        // 프로덕션 환경에서는 이 코드가 실행되지 않음
        if (import.meta.env.DEV) {
            const duplicateIds = ["admin", "test", "user", "bizmo"];
            if (duplicateIds.includes(userId.toLowerCase())) {
                logger.log("테스트용 중복 아이디 목록에서 발견됨:", userId);
                return true;
            }
        }
        
        // Firestore에서 아이디로 사용자 확인
        try {
            logger.log("Firestore에서 아이디로 사용자 확인 시도");
            
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                logger.log("Firestore에서 이미 사용 중인 아이디 발견:", userId);
                return true;
            }
            logger.log("Firestore에서 아이디 중복 없음:", userId);
            return false;
        } catch (firestoreError) {
            logger.error("Firestore 아이디 확인 오류:", firestoreError);
            logger.error("Firestore 오류 코드:", firestoreError.code);
            logger.error("Firestore 오류 메시지:", firestoreError.message);
            
            // Firestore 오류는 상위로 전파
            throw firestoreError;
        }
    } catch (error) {
        logger.error("아이디 중복 확인 중 오류:", error);
        throw error; // 에러를 상위로 전파하여 UI에서 적절히 처리
    }
};

// 이메일 중복 확인
export const checkEmailExists = async (email) => {
    try {
        logger.log("이메일 중복 확인 시작:", email);
        
        // 테스트용 중복 이메일 목록 (개발 환경에서만 사용)
        if (import.meta.env.DEV) {
            const duplicateEmails = ["test@bizmo.com", "admin@bizmo.com", "user@bizmo.com"];
            if (duplicateEmails.includes(email.toLowerCase())) {
                logger.log("테스트용 중복 이메일 목록에서 발견됨:", email);
                return true;
            }
        }
        
        // 1. 먼저 Firestore에서 이메일로 사용자 확인
        try {
            logger.log("Firestore에서 이메일로 사용자 확인 시도");
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                logger.log("Firestore에서 이미 사용 중인 이메일 발견:", email);
                return true;
            }
            logger.log("Firestore에서 이메일 중복 없음:", email);
        } catch (firestoreError) {
            logger.error("Firestore 이메일 확인 오류:", firestoreError);
            // Firestore 오류 발생 시에도 계속 진행 (Firebase Auth 확인용)
            logger.warn("Firestore 오류가 발생했으나, Firebase Auth 확인을 계속 진행합니다");
        }
        
        // 2. Firebase Auth에서 직접 이메일 확인 (Cloud Function 사용)
        try {
            logger.log("Firebase Auth에서 이메일 확인 시도");
            
            // API 엔드포인트 URL (원본 함수 URL 사용)
            const functionUrl = 'https://us-central1-bizmo-8cbf1.cloudfunctions.net/checkEmailExistsHttp';
            
            // HTTP 요청 보내기
            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            if (!response.ok) {
                throw new Error(`Cloud Function 호출 오류: ${response.status}`);
            }
            
            const result = await response.json();
            logger.log("Firebase Auth 이메일 확인 결과:", result);
            
            if (result && result.exists) {
                logger.log("Firebase Authentication에 이미 사용 중인 이메일입니다:", email);
                return true;
            }
            
            // 3. 여기까지 왔다면 이메일 중복 없음
            logger.log("사용 가능한 이메일입니다");
            return false;
        } catch (error) {
            logger.error("Firebase Auth 이메일 확인 오류:", error);
            
            // 개발 환경에서는 오류 발생 시에도 진행 가능
            if (import.meta.env.DEV) {
                logger.warn("개발 환경: Firebase Auth 오류가 발생했으나, 계속 진행합니다");
                return false;
            }
            
            // 프로덕션 환경에서는 에러 전파
            throw new Error("이메일 중복 확인 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    } catch (error) {
        logger.error("이메일 중복 확인 중 예상치 못한 오류:", error);
        throw error;
    }
};

// 이메일로 회원가입 (기업용)
export const registerWithEmail = async (userData) => {
    try {
        logger.log("회원가입 시작 - 데이터:", userData);
        
        // 1. 이메일 중복 확인 (한번 더 체크)
        try {
            const isDuplicate = await checkEmailExists(userData.email);
            if (isDuplicate) {
                return {
                    success: false,
                    error: "이미 사용 중인 이메일입니다."
                };
            }
        } catch (error) {
            logger.error("이메일 중복 확인 중 오류:", error);
            return {
                success: false,
                error: error.message || "이메일 확인 중 오류가 발생했습니다."
            };
        }
        
        // 2. Firebase Authentication으로 사용자 생성
        let userCredential;
        let emailSent = false;
        let verificationResult = null;
        
        try {
            userCredential = await createUserWithEmailAndPassword(
                auth, 
                userData.email, 
                userData.password
            );
            logger.log("Firebase Authentication 사용자 생성 성공:", userCredential.user.uid);
            
            // 생성된 사용자에게 이메일 인증 메일 발송
            try {
                const sendResult = await sendEmailVerification(userCredential.user);
                logger.log("이메일 인증 요청 발송됨");
                logger.log("이메일 인증 응답 확인:", sendResult);
                emailSent = true;
                verificationResult = sendResult;
                
                // 이메일 인증 상태 모니터링 시작
                monitorEmailVerification(userCredential.user.uid, userData.email);
                logger.log("이메일 인증 상태 모니터링을 시작했습니다.");
            } catch (verifyError) {
                logger.error("이메일 인증 발송 중 오류:", verifyError);
                // 인증 이메일 발송에 실패해도 계정은 생성됨
                emailSent = false;
                verificationResult = verifyError;
            }
        } catch (authError) {
            logger.error("Firebase Authentication 사용자 생성 실패:", authError);
            
            if (authError.code === 'auth/email-already-in-use') {
                return {
                    success: false,
                    error: "이미 사용 중인 이메일입니다."
                };
            }
            
            throw authError;
        }
        
        // 3. 사용자 객체 정리 및 비밀번호 제거
        const userDataForFirestore = {
            uid: userCredential.user.uid,
            email: userData.email || '',
            userId: userData.userId || '',
            name: userData.name || '',
            phoneNumber: userData.phoneNumber || '',
            telecomProvider: userData.telecomProvider || '',
            birthInfo: userData.birthInfo || '',
            genderInfo: userData.genderInfo || '',
            termsAgreed: {
                service: userData.termsAgreed?.service === true,
                privacy: userData.termsAgreed?.privacy === true,
                marketing: userData.termsAgreed?.marketing === true
            },
            emailVerified: false, // 초기 상태: 이메일 확인 안됨
            createdAt: serverTimestamp(), // 생성 시간
            updatedAt: serverTimestamp() // 업데이트 시간
        };
        
        // 계정 유형 및 관련 정보 설정
        // userData 내용 디버깅 로그
        logger.log('회원가입 userData:', JSON.stringify({
            accountType: userData.accountType,
            industry: userData.industry,
            organization: userData.organization,
            major: userData.major
        }));
        
        // 기본적으로 enterprise로 설정 (명시적으로 university가 아니면 enterprise로)
        userDataForFirestore.userType = 'enterprise';
        
        // university인 경우에만 대학 단체 처리
        if (userData.accountType === 'university') {
            userDataForFirestore.userType = 'university';
            userDataForFirestore.organization = userData.organization || '';
            userDataForFirestore.major = userData.major || '';
        }
        
        // industry 값은 항상 포함 (기업 계정이 아니어도 필드는 포함, 필요 없으면 빈 문자열)
        userDataForFirestore.industry = userData.industry || '';

        // 4. Firestore에 사용자 데이터 저장
        try {
            const userDocRef = doc(db, "users", userCredential.user.uid);
            await setDoc(userDocRef, userDataForFirestore);
            logger.log("Firestore에 사용자 데이터 저장 성공:", userDataForFirestore);
            
            return {
                success: true,
                uid: userCredential.user.uid,
                emailSent: emailSent, // 이메일 발송 성공 여부
                verificationResult: verificationResult, // 인증 이메일 결과 (있다면)
                monitoringStarted: true, // 인증 상태 모니터링 시작 여부
                message: "회원가입이 완료되었으며, 이메일 인증 상태를 모니터링 중입니다. 이메일을 확인하여 인증을 완료해주세요."
            };
        } catch (firestoreError) {
            logger.error("Firestore 사용자 데이터 저장 실패:", firestoreError);
            
            // 사용자 데이터 저장 실패 시 생성한 Authentication 사용자도 삭제 시도
            try {
                await userCredential.user.delete();
                logger.log("인증 사용자 삭제 성공 (데이터 저장 실패로 인한 롤백)");
            } catch (deleteError) {
                logger.error("인증 사용자 삭제 실패 (불완전한 상태 발생):", deleteError);
            }
            
            throw firestoreError;
        }
    } catch (error) {
        logger.error("회원가입 중 예상치 못한 오류:", error);
        return {
            success: false,
            error: error.message || "회원가입 중 오류가 발생했습니다. 다시 시도해 주세요."
        };
    }
};

// 로그인
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        logger.error("로그인 중 오류:", error);
        throw error;
    }
};

// 로그아웃
export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        logger.error("로그아웃 중 오류:", error);
        throw error;
    }
};

// 휴대폰 번호 인증 관련 함수
// Firebase Phone Authentication을 사용하려면 별도의 설정이 필요합니다 

// 이메일 인증 상태 확인
export const checkEmailVerificationStatus = async (email) => {
    try {
        logger.log("이메일 인증 상태 확인 시작:", email);
        
        // Firestore에서 이메일로 사용자 찾기
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            // 사용자 찾음, 이메일 인증 상태 확인
            const userData = querySnapshot.docs[0].data();
            return {
                verified: userData.emailVerified === true,
                user: userData
            };
        }
        
        // 사용자를 찾지 못함
        return { verified: false, user: null };
    } catch (error) {
        logger.error("이메일 인증 상태 확인 중 오류:", error);
        return { verified: false, error: error.message };
    }
};

// Firebase의 이메일 인증 상태 확인
export const checkFirebaseEmailVerification = async (uid) => {
    try {
        logger.log("Firebase 이메일 인증 상태 확인 시작:", uid);
        
        // Firebase Auth로부터 사용자 정보 가져오기
        // 실제 프로덕션 환경에서는 서버 측 Firebase Admin SDK를 사용하여 수행해야 합니다.
        // 클라이언트 측에서는 현재 로그인한 사용자의 정보만 가져올 수 있습니다.
        
        // 현재 auth 상태에서 사용자 정보 새로고침 (최신 상태 가져오기)
        if (auth.currentUser && auth.currentUser.uid === uid) {
            await auth.currentUser.reload();
            return auth.currentUser.emailVerified;
        }
        
        // uid가 현재 로그인한 사용자와 다르거나 로그인 상태가 아니면
        // Firestore를 통해 간접적으로 확인
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            return userDoc.data().emailVerified === true;
        }
        
        return false;
    } catch (error) {
        logger.error("Firebase 이메일 인증 상태 확인 중 오류:", error);
        return false;
    }
};

// 이메일 인증 상태를 실시간으로 모니터링하는 함수
export const monitorEmailVerification = (userId, email) => {
    logger.log("이메일 인증 상태 모니터링 시작:", email);
    
    // 이미 타이머가 있는지 확인하기 위한 전역 변수
    if (window._emailVerificationTimer) {
        logger.log("기존 이메일 인증 타이머 해제");
        clearInterval(window._emailVerificationTimer);
        window._emailVerificationTimer = null;
    }
    
    // 리스너도 해제
    if (window._emailVerificationListener) {
        logger.log("기존 이메일 인증 리스너 해제");
        window._emailVerificationListener();
        window._emailVerificationListener = null;
    }
    
    // 인증 상태 변경을 감지하는 기본 리스너 설정 (로그인 상태 변경 감지용)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.uid === userId) {
            logger.log("사용자 인증 상태 감지:", user.uid);
        } else if (!user) {
            logger.log("사용자가 로그아웃 상태입니다.");
            // 로그아웃 시 타이머 정리
            if (window._emailVerificationTimer) {
                clearInterval(window._emailVerificationTimer);
                window._emailVerificationTimer = null;
            }
        }
    });
    
    // 주기적으로 사용자 정보를 새로고침하는 타이머 설정 (10초마다)
    const checkInterval = 10000; // 10초
    logger.log(`${checkInterval/1000}초마다 이메일 인증 상태를 확인합니다.`);
    
    const verificationTimer = setInterval(async () => {
        try {
            // 현재 로그인된 사용자 확인
            const currentUser = auth.currentUser;
            
            if (!currentUser || currentUser.uid !== userId) {
                logger.log("사용자가 로그인되어 있지 않거나 다른 사용자입니다. 타이머를 종료합니다.");
                clearInterval(verificationTimer);
                window._emailVerificationTimer = null;
                return;
            }
            
            // 사용자 정보 새로고침
            await currentUser.reload();
            logger.log("사용자 정보 새로고침 완료:", new Date().toLocaleTimeString());
            
            // 이메일 인증 상태 확인
            if (currentUser.emailVerified) {
                logger.log("🎉 이메일 인증 완료 확인! 사용자:", currentUser.email);
                alert(`축하합니다! 이메일 인증이 완료되었습니다: ${currentUser.email}`);
                
                // Firestore에 이메일 인증 상태 업데이트
                try {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    await updateDoc(userDocRef, {
                        emailVerified: true,
                        updatedAt: serverTimestamp()
                    });
                    logger.log("Firestore에 이메일 인증 상태 업데이트 완료");
                } catch (error) {
                    logger.error("Firestore 이메일 인증 상태 업데이트 실패:", error);
                }
                
                // 인증 확인 후 타이머 종료
                clearInterval(verificationTimer);
                window._emailVerificationTimer = null;
            } else {
                logger.log("이메일이 아직 인증되지 않았습니다:", currentUser.email);
            }
        } catch (error) {
            logger.error("이메일 인증 상태 확인 중 오류:", error);
        }
    }, checkInterval);
    
    // 초기 확인 즉시 한 번 실행 (대기 없이)
    (async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser && currentUser.uid === userId) {
                await currentUser.reload();
                logger.log("초기 사용자 정보 새로고침 완료");
                
                if (currentUser.emailVerified) {
                    logger.log("🎉 이메일 인증 이미 완료됨! 사용자:", currentUser.email);
                    alert(`이메일 인증이 완료되었습니다: ${currentUser.email}`);
                    
                    clearInterval(verificationTimer);
                    window._emailVerificationTimer = null;
                }
            }
        } catch (error) {
            logger.error("초기 인증 상태 확인 오류:", error);
        }
    })();
    
    // 나중에 타이머를 해제할 수 있도록 전역 변수에 저장
    window._emailVerificationTimer = verificationTimer;
    window._emailVerificationListener = unsubscribe;
    
    // 타이머 해제 함수 반환
    return () => {
        clearInterval(verificationTimer);
        unsubscribe();
        window._emailVerificationTimer = null;
        window._emailVerificationListener = null;
    };
}; 