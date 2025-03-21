import styled from "styled-components";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import councilThumbnail from "../../assets/viewIcon/councilThumbnail.jpg";
import enterpriseThumbnail from "../../assets/viewIcon/enterThumbnail.svg";
import dummyProfileCouncil from "../../assets/registerIcon/profile_council.svg";
import dummyProfileEnterprise from "../../assets/registerIcon/profile_enter.svg";
import arrowUp from "../../assets/viewIcon/arrow_up.svg";
import EnterpriseView from "../ViewPages/EnterpriseView";
import CouncilView from "../ViewPages/CouncilView";
import kakaoIcon from "../../assets/viewIcon/kakaoIcon.svg";
import mailIcon from "../../assets/viewIcon/mailIcon.svg";
import periodDevider from "../../assets/viewIcon/periodDevider.svg";
import fromToArrow from "../../assets/viewIcon/fromToArrow.svg";

const RegisterInputContainer = styled.div`
	max-width: 1440px;
	width: 100%;
	margin: calc(4rem + 28px) auto 28px;
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

const CooperationView = () => {
	const { type } = useParams();
	const viewType = type || "enterprise";

	return (
		<>
			<NavBar />
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
									<RegisterButton> 제안서 열람하기 </RegisterButton>
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
			
			{viewType === "council" && (
				<ProfileContainer>
					<ProfileTitle>프로필</ProfileTitle>
					<ProfileWrapper>
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
					<ProfileWrapper>
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
			<Footer />
		</>
	);
};

export default CooperationView;