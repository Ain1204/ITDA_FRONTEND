// Firebase 초기화 설정
// 환경 변수를 사용하여 API 키와 설정 정보를 보호합니다.
// 실제 값은 .env 파일에 저장되며 깃허브에 업로드되지 않습니다.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Vite는 import.meta.env를 통해 .env 파일에 정의된 변수를 읽어옵니다.
  // .env 파일은 .gitignore에 포함되어 있어야 하며, 민감한 정보를 보호합니다.
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);