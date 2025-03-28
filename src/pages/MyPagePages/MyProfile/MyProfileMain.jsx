import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import MyProfileEmpty from './MyProfileEmpty';
import MyProfileEdit from './MyProfileEdit';
import MyProfileFilled from './MyProfileFilled';
import logger from '../../../utils/logger';

const MyProfileMain = () => {
  // 현재는 임시 상태 관리. 실제로는 API를 통해 사용자 정보를 가져와야 함
  const [userType, setUserType] = useState(''); // 'company' 또는 'student'
  const [profileState, setProfileState] = useState('empty'); // 'empty', 'edit', 'filled'
  const navigate = useNavigate();
  const { state } = useParams(); // URL 파라미터로 상태 관리
  const location = useLocation();

  useEffect(() => {
    // 실제 구현 시에는 API 요청으로 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        // 임시 데이터. 실제로는 API 호출 결과를 사용
        const mockUserData = {
          userType: 'company', // 또는 'student'
          hasProfile: false, // 프로필 작성 여부
        };

        setUserType(mockUserData.userType);
        
        // URL 파라미터에 따른 상태 설정
        if (state) {
          if (['empty', 'edit', 'filled'].includes(state)) {
            setProfileState(state);
          }
        } else {
          setProfileState(mockUserData.hasProfile ? 'filled' : 'empty');
        }
      } catch (error) {
        logger.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserInfo();
  }, [state]);

  // 프로필 상태 변경 핸들러
  const handleStateChange = (newState) => {
    setProfileState(newState);
    // URL 변경을 통한 상태 관리 (브라우저 히스토리에 추가)
    if (newState !== state) {
      navigate(`/mypage/profile/${newState}`, { replace: false });
    }
  };

  // 사용자 유형 변경 (테스트용)
  const toggleUserType = () => {
    setUserType(prevType => prevType === 'company' ? 'student' : 'company');
  };

  // 프로필 상태에 따른 컴포넌트 렌더링
  const renderProfileComponent = () => {
    switch (profileState) {
      case 'edit':
        return <MyProfileEdit userType={userType} onStateChange={handleStateChange} />;
      case 'filled':
        return <MyProfileFilled userType={userType} onStateChange={handleStateChange} />;
      case 'empty':
      default:
        return <MyProfileEmpty userType={userType} onStateChange={handleStateChange} />;
    }
  };

  return (
    <div>

      {/* 실제 프로필 컴포넌트 */}
      {renderProfileComponent()}
      {/* 개발 테스트용 UI (실제 사용 시 제거) */}
      <div style={{ margin: '1rem', padding: '0.5rem', background: '#f0f0f0', borderRadius: '0.5rem' }}>
        <p>현재 사용자 유형: {userType === 'company' ? '기업회원' : '학생회원'}</p>
        <p>프로필 상태: {profileState}</p>
        <p>현재 경로: {location.pathname}</p>
        <button onClick={toggleUserType} style={{ marginRight: '0.5rem' }}>
          사용자 유형 변경 (테스트용)
        </button>
        <button onClick={() => handleStateChange('empty')} style={{ marginRight: '0.5rem' }}>
          빈 프로필
        </button>
        <button onClick={() => handleStateChange('edit')} style={{ marginRight: '0.5rem' }}>
          프로필 수정
        </button>
        <button onClick={() => handleStateChange('filled')}>
          작성된 프로필
        </button>
      </div>
    </div>
  );
};

export default MyProfileMain; 