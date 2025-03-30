import ProfileSidebar from "../../components/Sidebar/ProfileSidebar";
import styled from "styled-components";
import dummyBackground from "../../assets/ProfileIcon/dummyBackground.svg";
import dummyBackground2 from "../../assets/ProfileIcon/dummyBackground2.png";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { renderCouncilContent, renderEnterContent } from "./ProfileContent";

const PageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const ProfileBackground = styled.div`
    width: 100%;
    height: 344px;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    border-radius: 16px;
    margin-bottom: 32px;
`;

const SidebarContainer = styled.div`
    margin: 0 32px;
    margin-top: -160px;
    position: relative;
    z-index: 10;
    height: 100%;
`;

const ProfileContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0 32px;
    flex-direction: column;
    align-items: center;
`;

const ProfileContentWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
`;

const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    margin-bottom: 48px;
`;

const MainContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

const Profile = () => {
    const { type } = useParams();
    const [activeTab, setActiveTab] = useState(0);
    const [profileType, setProfileType] = useState("");

    useEffect(() => {
        // URL 파라미터의 type이 정확히 'council' 또는 'enterprise'인 경우에만 설정
        if (type === "council" || type === "enterprise") {
            setProfileType(type);
        } else {
            // 유효하지 않은 타입인 경우 빈 문자열로 설정
            setProfileType("");
        }
    }, [type]);

    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    // 프로필 타입에 따라 적절한 렌더링 함수 선택
    const renderContent = () => {
        if (profileType === "council") {
            return renderCouncilContent(activeTab);
        } else if (profileType === "enterprise") {
            return renderEnterContent(activeTab);
        } else {
            // type이 없거나 알 수 없는 경우 빈 컨텐츠 반환
            return <div></div>;
        }
    };

    // 프로필 타입에 따라 배경 이미지 선택
    const getBackgroundImage = () => {
        if (profileType === "enterprise") {
            return dummyBackground2;
        }
        return dummyBackground;
    };

    return (
        <PageWrapper>  
            <ProfileContainer>
                <ProfileBackground backgroundImage={getBackgroundImage()} />
                <ProfileContentWrapper>
                    <ContentWrapper>
                        <SidebarContainer>
                            <ProfileSidebar 
                                type={profileType}
                                onTabChange={handleTabChange}
                                activeTab={activeTab}
                            />
                        </SidebarContainer>
                        <MainContent>
                            {renderContent()}
                        </MainContent>
                    </ContentWrapper>
                </ProfileContentWrapper>
            </ProfileContainer>
        </PageWrapper>
    );
};

export default Profile;