import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import councilThumbnail from "../../assets/viewIcon/councilThumbnail.jpg";
import enterpriseThumbnail from "../../assets/viewIcon/enterThumbnail.svg";
import dummyProfileCouncil from "../../assets/registerIcon/profile_council.svg";
import dummyProfileEnterprise from "../../assets/registerIcon/profile_enter.svg";
import arrowUp from "../../assets/viewIcon/arrow_up.svg";
import exitIcon from "../../assets/IRIcon/exit.svg";
import downloadIcon from "../../assets/IRIcon/download.svg";
import leftIcon from "../../assets/IRIcon/IR_Left.svg";
import rightIcon from "../../assets/IRIcon/IR_Right.svg";
import dummyIR from "../../assets/IRIcon/dummyIR.png";
import EnterpriseView from "../ViewPages/EnterpriseView";
import CouncilView from "../ViewPages/CouncilView";
import kakaoIcon from "../../assets/viewIcon/kakaoIcon.svg";
import mailIcon from "../../assets/viewIcon/mailIcon.svg";
import periodDevider from "../../assets/viewIcon/periodDevider.svg";
import fromToArrow from "../../assets/viewIcon/fromToArrow.svg";

const RegisterInputContainer = styled.div`
	max-width: 1440px;
	width: 100%;
	margin: 10px auto 28px;
	display: flex;
	padding: 0 32px;
	flex-direction: column;
	gap: 16px;
	align-items: flex-end;
`;

const RegisterContentWrapper = styled.div`
	display: flex;
	gap: 24px;
	align-items: flex-start;
	width: 100%;
	height: 300px;
`;

const RightContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	flex: 1;
	height: 90%;
	position: relative;
`;

const ImageContainer = styled.div`
	position: relative;
	width: 300px;
	height: 300px;
`;

const ThumbnailImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const AboutCooperation = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	justify-content: space-between;
	height: 100%;
`;

const CooperationInfoContainer = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-left: auto;
`;

const RegisterButton = styled.button`
	display: flex;
	padding: 8px 16px;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	border: none;
	background: var(--Colors-Primary-B400, #3d85ff);
	color: var(--Colors-GrayScale-White, #fcfcff);
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 132%;
	letter-spacing: -0.3px;
	cursor: pointer;
	
	&:hover {
		background: var(--Colors-Primary-Blue600, #2461d9);
	}
`;

const PeriodDevider = styled.img`
	margin: 0 16px;
	transform: translateY(2px);
`;
const FromToArrow = styled.img`
	margin: 0 8px;
	transform: translateY(1px);
`;

const PeriodSuggestNumber = styled.div`
	color: var(--Colors-GrayScale-G500, #4F5462);
	font-family: "SUIT Variable";
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 168%;
	letter-spacing: -0.35px;
	padding: 4px 16px;
	background-color: var(--Colors-Secondary-B100, #EBF2FF);
	border-radius: 8px;
`;

const CooperationContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	height: 100%;
	position: relative;
`;

const TitleKeywordContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 20px;
	position: absolute;
	top: 45%;
	transform: translateY(-50%);
	z-index: 2;
`;

const CooperationTitle = styled.h4`
	color: #17171B;
	font-family: "SUIT Variable";
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%;
	letter-spacing: -0.5px;
	margin: 0;
`;

const KeywordContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 8px;
`;

const Keyword = styled.div`
	color: var(--Colors-Primary-B500, #0051FF);
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 132%;
	letter-spacing: -0.3px;
	padding: 2px 8px;
	background-color: var(--Colors-Secondary-B100, #EBF2FF);
	border-radius: var(--Shapes-Border-Hard, 8px);
	align-items: center;
	justify-content: center;
`;

const ArrowUp = styled.img`
	margin-right: 4px;
	transform: translateY(1px);
`;

const CooperationDivider = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid var(--Colors-GrayScale-G300, #DDE1E6);
    position: relative;
    margin-top: 120px;
`;

const CooperationText = styled.div`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 4;
	overflow: hidden;
	color: #5F6E81;
	text-overflow: ellipsis;
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;
	letter-spacing: -0.4px;
	white-space: pre-line;
`;	

const ProfileContainer = styled.div`
	max-width: 1440px;
	width: 100%;
	margin: 36px auto 0;
	padding: 0 32px;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const ProfileTitle = styled.h5`
	color: var(--Colors-GrayScale-G600, #1a1a23);
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: -0.4px;
	margin: 0;
`;

const ProfileWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const ProfileImage = styled.img`
	width: 40px;
	height: 40px;
`;

const ProfileInformation = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const ProfileName = styled.div`
	overflow: hidden;
	color: var(--Colors-GrayScale-G600, #1a1a23);
	text-overflow: ellipsis;
	font-family: "SUIT Variable";
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 168%;
	letter-spacing: -0.35px;
	margin-bottom: -4px;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
`;

const ProfileURL = styled.div`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
	color: var(--Colors-Primary-B500, #0051ff);
	text-overflow: ellipsis;
	font-family: "SUIT Variable";
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 132%;
	letter-spacing: -0.3px;
`;

const URLContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 12px;
	margin-left: auto;
`;

const KakaoIcon = styled.img`
	width: 16px;
	height: 16px;
	transform: translateY(-1px);
`;

const MailIcon = styled.img`
	width: 16px;
	height: 16px;
	transform: translateY(-1px);
`;

const KakaoURL = styled.a`
	color: var(--Colors-GrayScale-G500, #4F5462);
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;
	letter-spacing: -0.4px;
	white-space: nowrap;
	padding: 4px 16px 4px 12px;
	background-color: var(--Colors-Secondary-B100, #EBF2FF);
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
`;

const EmailURL = styled.a`
	color: var(--Colors-GrayScale-G500, #4F5462);
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;
	letter-spacing: -0.4px;
	padding: 4px 16px 4px 12px;
	background-color: var(--Colors-Secondary-B100, #EBF2FF);
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
`;

// 모달 오버레이 스타일
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--Colors-Overlay-OD400, rgba(18, 19, 24, 0.95));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 50px 0 0;

    
    /* 애니메이션 효과 */
    opacity: 0;
    animation: ${props => props.isClosing ? 'fadeOut 0.3s ease-in-out forwards' : 'fadeIn 0.3s ease-in-out forwards'};
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

// IR 페이지 이미지 스타일
const IRPageImage = styled.img`
    display: ${props => props.active ? 'block' : 'none'};
    width: auto;
    height: auto;
    max-width: 95%;
    max-height: 90vh;
    object-fit: contain;
    transform: scale(1.05);
    
    /* 이미지 애니메이션 */
    opacity: 0;
    animation: ${props => props.isClosing 
        ? 'slideDown 0.3s ease-out forwards' 
        : 'slideUp 0.4s ease-out forwards'};
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px) scale(1.05);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1.05);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateY(0) scale(1.05);
        }
        to {
            opacity: 0;
            transform: translateY(20px) scale(1.05);
        }
    }
`;

// 제목 스타일
const DocumentTitle = styled.div`
    color: var(--Colors-GrayScale-White, #FCFCFF);
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.4px;
    margin-left: 16px;
	transform: translateY(1px);
`;

// 모달 헤더 스타일
const OverlayHeader = styled.div`
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 48px;
    z-index: 1001;
    
    /* 헤더 애니메이션 */
    opacity: 0;
    animation: ${props => props.isClosing 
        ? 'fadeUp 0.3s ease-out forwards' 
        : 'fadeDown 0.3s ease-out forwards'};
    
    @keyframes fadeDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;

// 모달 헤더 컨테이너 스타일
const IRTitle = styled.div`
    display: flex;
    align-items: center;
`;

// 페이지 정보 스타일
const IRInformation = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`;

// 페이지 카운터 스타일
const PageCounter = styled.div`
    color: white;
    font-size: 16px;
    font-family: "SUIT Variable";
    font-weight: 500;
`;

// 모달 닫기 버튼 스타일
const ExitButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        opacity: 0.8;
    }
`;

// 아이콘 스타일
const IRIcon = styled.img`
    width: 16px;
    height: 16px;
`;

// 원형 버튼 기본 스타일
const CircleButton = styled.button`
    display: flex;
    width: 32px;
    height: 32px;
    padding: 0;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border: none;
    cursor: pointer;
`;

// 다운로드 버튼 스타일
const DownloadButton = styled(CircleButton)`
    background: var(--Colors-Primary-B400, #3D85FF);
    
    &:hover {
        background: var(--Colors-Primary-Blue600, #2461d9);
    }
`;

// 네비게이션 버튼 스타일
const NavButton = styled(CircleButton)`
    background: ${props => props.disabled 
        ? 'var(--Colors-GrayScale-G400, #A2A9B0)' 
        : 'var(--Colors-GrayScale-G600, #1A1A23)'};
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1001;
    opacity: ${props => props.disabled ? '0.5' : '1'};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    
    &:hover {
        background: ${props => props.disabled 
            ? 'var(--Colors-GrayScale-G400, #A2A9B0)' 
            : 'var(--Colors-GrayScale-G500, #4F5462)'};
    }
    
    &.left {
        left: 48px;
        /* 왼쪽 버튼 애니메이션 */
        opacity: ${props => props.disabled ? '0.5' : '0'};
        animation: ${props => props.isClosing 
            ? 'slideOutLeft 0.3s ease-out forwards' 
            : 'slideInLeft 0.3s ease-out 0.2s forwards'};
    }
    
    &.right {
        right: 48px;
        /* 오른쪽 버튼 애니메이션 */
        opacity: ${props => props.disabled ? '0.5' : '0'};
        animation: ${props => props.isClosing 
            ? 'slideOutRight 0.3s ease-out forwards' 
            : 'slideInRight 0.3s ease-out 0.2s forwards'};
    }
    
    @keyframes slideInLeft {
        from {
            opacity: ${props => props.disabled ? '0.5' : '0'};
            transform: translate(-20px, -50%);
        }
        to {
            opacity: ${props => props.disabled ? '0.5' : '1'};
            transform: translate(0, -50%);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: ${props => props.disabled ? '0.5' : '0'};
            transform: translate(20px, -50%);
        }
        to {
            opacity: ${props => props.disabled ? '0.5' : '1'};
            transform: translate(0, -50%);
        }
    }
    
    @keyframes slideOutLeft {
        from {
            opacity: ${props => props.disabled ? '0.5' : '1'};
            transform: translate(0, -50%);
        }
        to {
            opacity: ${props => props.disabled ? '0.5' : '0'};
            transform: translate(-20px, -50%);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: ${props => props.disabled ? '0.5' : '1'};
            transform: translate(0, -50%);
        }
        to {
            opacity: ${props => props.disabled ? '0.5' : '0'};
            transform: translate(20px, -50%);
        }
    }
`;

const CooperationView = () => {
	const { type } = useParams();
	const navigate = useNavigate();
	const viewType = type || "enterprise";
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const totalPages = 3; // 총 페이지 수

	const handleOpenModal = () => {
		setIsModalOpen(true);
		setIsClosing(false);
		setCurrentPage(0); // 모달 열때 첫 페이지로 초기화
	};

	const handleCloseModal = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsModalOpen(false);
			setIsClosing(false);
		}, 400); // 애니메이션 지속 시간보다 약간 길게 설정
	};

	const handlePrevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<>
			<RegisterInputContainer>
				<RegisterContentWrapper>
					<ImageContainer>
						<ThumbnailImage src={viewType === "council" ? councilThumbnail : enterpriseThumbnail} alt="register illustration" />
					</ImageContainer>
					<RightContentWrapper>
						<AboutCooperation>
							<CooperationInfoContainer>
								<PeriodSuggestNumber>
									공고 기간 
									<PeriodDevider src={periodDevider} alt="기간 구분선" /> 
									2024.01.01 
									<FromToArrow src={fromToArrow} alt="기간 구분선" /> 
									2024.03.01
								</PeriodSuggestNumber>
								<PeriodSuggestNumber>
									제한 건수
									<PeriodDevider src={periodDevider} alt="건수 구분선" />
									16건
								</PeriodSuggestNumber>
								<ButtonContainer>
									<RegisterButton onClick={handleOpenModal}>제안서 열람하기</RegisterButton>
								</ButtonContainer>
							</CooperationInfoContainer>
							<CooperationContent>
								<TitleKeywordContainer>
									<CooperationTitle>
										{viewType === "council" 
											? "2024 청춘소란도란 한가위"
											: "UV 프로텍터 액티브 선 밤 SPF 50+ / PA++++ 10g"
										}
									</CooperationTitle>
									<KeywordContainer>
										{viewType === "council" ? (
											<>
												<Keyword>청춘소란도란</Keyword>
												<Keyword>한가위</Keyword>
												<Keyword>청춘소란도란</Keyword>
											</>
										) : (
											<>
												<Keyword>단기 프로모션</Keyword>
												<Keyword><ArrowUp src={arrowUp} alt="위로 화살표" />1500</Keyword>
												<Keyword>키워드</Keyword>
											</>
										)}
									</KeywordContainer>
								</TitleKeywordContainer>
								<CooperationDivider />
								<CooperationText>
									{viewType === "council" 
										? "2024년 한양대학교 ERICA 공학대학과 소프트웨어융합대학이 연합하여 갓 성인이 된 신입생들을 중심으로 하는 약 1.300명 규모의 대형 행사입니다. 다양한 레크레이션 활동과 다채로운 공연들이 준비되어 있으며, 이를 통한 학생들간의 관계 형성과 신입생의 학교 생활 적응을 목적으로 하고 있습니다.\n 2024년 한양대학교 ERICA 공학대학과 소프트웨어융합대학이 연합하여 갓 성인이 된 신입생들을 중심으로 하는 약 1.300명 규모의 대형 행사입니다. 다양한 레크레이션 활동과 다채로운 공연들이 준비되어 있으며, 이를 통한 학생들간의 관계 형성과 신입생의 학교 생활 적응을 목적으로 하고 있습니다."
										: "17년 연속 국내 선케어 1위 HERA \n 자외선 차단 / 주름 개선 / 미백 3중 기능성, 지속 내수성 테스트 완료 \n 365일 우리와 함께하는 자외선, 일상에서의 강력하고 세심한 선케어를 위한 헤라의 NEW럭셔리 #포켓자차 UV프로텍터 액티브 선 밤을 만나보세요."
									}
								</CooperationText>
							</CooperationContent>
						</AboutCooperation>
					</RightContentWrapper>
				</RegisterContentWrapper>
			</RegisterInputContainer>
			
			{isModalOpen && (
				<>
					<OverlayHeader isClosing={isClosing}>
						<IRTitle>
							<ExitButton onClick={handleCloseModal}>
								<IRIcon src={exitIcon} alt="닫기" />
							</ExitButton>
							<DocumentTitle>소란도란 한가위_2024 제휴 제안_IR 자료.pdf</DocumentTitle>
						</IRTitle>
						<IRInformation>
							<PageCounter>{currentPage + 1} / {totalPages}</PageCounter>
							<DownloadButton>
								<IRIcon src={downloadIcon} alt="다운로드" />
							</DownloadButton>
						</IRInformation>
					</OverlayHeader>
					<NavButton className="left" isClosing={isClosing} onClick={handlePrevPage} disabled={currentPage === 0}>
						<IRIcon src={leftIcon} alt="이전" />
					</NavButton>
					<NavButton className="right" isClosing={isClosing} onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
						<IRIcon src={rightIcon} alt="다음" />
					</NavButton>
					<Overlay isClosing={isClosing}>
						<IRPageImage src={dummyIR} alt="제안서 페이지 1" isClosing={isClosing} active={currentPage === 0} />
						<IRPageImage src={dummyIR} alt="제안서 페이지 2" isClosing={isClosing} active={currentPage === 1} />
						<IRPageImage src={dummyIR} alt="제안서 페이지 3" isClosing={isClosing} active={currentPage === 2} />
					</Overlay>
				</>
			)}
			
			{viewType === "council" && (
				<ProfileContainer>
					<ProfileTitle>프로필</ProfileTitle>
					<ProfileWrapper onClick={() => navigate('/profile/council')} style={{ cursor: 'pointer' }}>
						<ProfileImage src={dummyProfileCouncil} alt="프로필 이미지" />
						<ProfileInformation>
							<ProfileName>
								한양대학교 ERICA 소프트웨어융합대학 학생회 SW:ING
							</ProfileName>
							<ProfileURL>@hyu_computing</ProfileURL>
						</ProfileInformation>
						<URLContainer>
							<KakaoURL href="https://open.kakao.com/o/sE9nnIkh" target="_blank" rel="noopener noreferrer">
								<KakaoIcon src={kakaoIcon} alt="카카오 아이콘" />
								https://open.kakao.com/o/sE9nnIkh
							</KakaoURL>
							<EmailURL>
								<MailIcon src={mailIcon} alt="메일 아이콘" />
								Sample123@email.com
							</EmailURL>
						</URLContainer>
					</ProfileWrapper>
				</ProfileContainer>
			)}

			{viewType === "enterprise" && (
				<ProfileContainer>
					<ProfileTitle>프로필</ProfileTitle>
					<ProfileWrapper onClick={() => navigate('/profile/enterprise')} style={{ cursor: 'pointer' }}>
						<ProfileImage src={dummyProfileEnterprise} alt="프로필 이미지" />
						<ProfileInformation>
							<ProfileName>
								아모레퍼시픽 Amorepacific
							</ProfileName>
							<ProfileURL>https://www.apgroup.com/int/ko/</ProfileURL>
						</ProfileInformation>
						<URLContainer>
							<KakaoURL href="https://open.kakao.com/o/sE9nnIkh" target="_blank" rel="noopener noreferrer">
								<KakaoIcon src={kakaoIcon} alt="카카오 아이콘" />
								https://open.kakao.com/o/sE9nnIkh
							</KakaoURL>
							<EmailURL>
								<MailIcon src={mailIcon} alt="메일 아이콘" />
								Sample123@email.com
							</EmailURL>
						</URLContainer>
					</ProfileWrapper>
				</ProfileContainer>
			)}
			
			{viewType === "enterprise" ? (
				<EnterpriseView />
			) : (
				<CouncilView />
			)}
		</>
	);
};

export default CooperationView;