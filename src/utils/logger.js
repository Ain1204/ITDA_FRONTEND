/**
 * 로깅 유틸리티
 * 개발 환경에서만 로그를 출력하고 프로덕션 환경에서는 출력하지 않도록 합니다.
 */

// 개발 환경 여부 확인
const isDev = () => import.meta.env.DEV === true;

/**
 * 로깅 유틸리티 객체
 * - log: 개발 환경에서만 일반 로그 출력 (console.log)
 * - warn: 개발 환경에서만 경고 로그 출력 (console.warn)
 * - error: 모든 환경에서 에러 로그 출력 (console.error) - 중요 오류는 항상 기록
 * - info: 개발 환경에서만 정보 로그 출력 (console.info)
 * - debug: 개발 환경에서만 디버그 로그 출력 (console.debug)
 */
const logger = {
  log: (message, ...args) => {
    if (isDev()) {
      console.log(message, ...args);
    }
  },
  
  warn: (message, ...args) => {
    if (isDev()) {
      console.warn(message, ...args);
    }
  },
  
  // 에러는 프로덕션에서도 출력 (중요한 오류 정보이므로)
  error: (message, ...args) => {
    console.error(message, ...args);
  },
  
  info: (message, ...args) => {
    if (isDev()) {
      console.info(message, ...args);
    }
  },
  
  debug: (message, ...args) => {
    if (isDev()) {
      console.debug(message, ...args);
    }
  },
  
  // 객체의 내용을 로그로 출력 (개발 환경에서만)
  dir: (obj, options) => {
    if (isDev()) {
      console.dir(obj, options);
    }
  },
  
  // 테이블 형태로 데이터 출력 (개발 환경에서만)
  table: (data, columns) => {
    if (isDev()) {
      console.table(data, columns);
    }
  }
};

export default logger; 