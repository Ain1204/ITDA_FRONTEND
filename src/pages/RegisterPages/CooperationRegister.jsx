import styled from "styled-components";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import RegisterPlaceholder from "../../components/RegisterPlaceholder";
import keywordDelete from "../../assets/registerIcon/keywordDelete.svg";
import registerImage from "../../assets/registerIcon/registerImage.png";
import dummyProfileCouncil from "../../assets/registerIcon/profile_council.svg";
import dummyProfileEnterprise from "../../assets/registerIcon/profile_enter.svg";
import EnterpriseRegister from "./EnterpriseRegister";
import CouncilRegister from "./CouncilRegister";

const Title = styled.h2`
	font-family: "SUIT Variable";
	font-weight: 700;
	font-size: 28px;
	line-height: 43.68px;
	letter-spacing: -2.5%;
`;

const TitleContainer = styled.div`
	max-width: 1440px;
	width: 100%;
	margin: calc(4rem + 8px) auto 24px;
	padding: 0 32px;
`;

const RegisterInputContainer = styled.div`
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
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
`;

const RightContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	flex: 1;
`;

const ImageContainer = styled.div`
	position: relative;
	width: 300px;
	height: 300px;
	cursor: pointer;

	&:hover {
		.hover-overlay {
			opacity: 1;
		}
	}
`;

const RegisterImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const HoverOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	transition: opacity 0.3s ease;
	background: linear-gradient(0deg, rgba(18, 19, 24, 0.32) 0%, rgba(18, 19, 24, 0.32) 100%);
	border-radius: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const UploadButton = styled.button`
	display: flex;
	width: 148px;
	padding: 8px 16px;
	justify-content: center;
	align-items: center;
	gap: 8px;
	border-radius: 8px;
	background: var(--Colors-Secondary-B100, #EBF2FF);
	border: none;
	cursor: pointer;
	
	/* 텍스트 스타일 */
	color: var(--Colors-Primary-B500, #0051FF);
	text-align: center;
	font-family: "SUIT Variable";
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: -0.4px;

	&:hover {
		background: var(--Colors-GrayScale-G50, #F8F9FB);
		color: var(--Colors-Primary-B500, #0051FF);
	}
`;

const KeywordContainer = styled.div`
	display: flex;
	gap: 12px;
	align-items: flex-start;
	width: 100%;
`;

const KeywordInputWrapper = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;
	margin-left: auto;
`;

const KeywordListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	flex: 1;
	justify-content: flex-start;
`;

const KeywordTag = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 12px;
	border-radius: 8px;
	background: var(--Colors-Secondary-B100, rgba(235, 242, 255, 1));
	color: var(--Colors-Primary-B500, rgba(0, 81, 255, 1));
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -0.4px;
`;

const DeleteIcon = styled.img`
	cursor: pointer;
	width: 12px;
	height: 12px;
`;

const KeywordInput = styled.input`
	width: 240px;
	height: 40px;
	border-radius: 8px;
	padding: 8px 16px;
	border-width: 1px;
	border-style: solid;
	border-color: var(--Colors-GrayScale-G200, rgba(243, 245, 248, 1));
	box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
	background: var(--Colors-GrayScale-G200, rgba(243, 245, 248, 1));
	color: var(--Colors-GrayScale-G500, rgba(79, 84, 98, 1));
	font-family: "SUIT Variable";
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -2.5%;

	&::placeholder {
		color: var(--Colors-GrayScale-G400, rgba(148, 155, 173, 1));
		font-family: "SUIT Variable";
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: -2.5%;
	}
`;

const AddButton = styled.button`
	width: 60px;
	height: 40px;
	padding: 8px 16px;
	border-radius: 8px;
	background: var(--Colors-Primary-B400, #3D85FF);
	color: var(--Colors-GrayScale-White, #FCFCFF);
	border: none;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -2.5%;
	cursor: pointer;

	&:hover {
		background: var(--Colors-Primary-Blue600, #2461D9);
	}

	&:disabled {
		background: var(--Colors-GrayScale-G200, rgba(243, 245, 248, 1));
		color: var(--Colors-GrayScale-G400, rgba(148, 155, 173, 1));
		cursor: default;
	}
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
`;

const ProfileName = styled.span`
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

const ProfileURL = styled.span`
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

const CooperationRegister = () => {
	const { type } = useParams();
	const [keywords, setKeywords] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const registerType = type || "enterprise";

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleAddKeyword = (newKeyword) => {
		setKeywords([...keywords, newKeyword]);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleAddKeyword(inputValue.trim());
			setInputValue("");  // 입력 필드 초기화
		}
	};

	const handleDeleteKeyword = (indexToDelete) => {
		setKeywords(keywords.filter((_, index) => index !== indexToDelete));
	};

	const handleImageUpload = () => {
		// 이미지 업로드 로직 구현
	};

	return (
		<>
			<NavBar />
			<TitleContainer>
				<Title>공고 등록하기</Title>
			</TitleContainer>
			<RegisterInputContainer>
				<RegisterContentWrapper>
					<ImageContainer onClick={handleImageUpload}>
						<RegisterImage src={registerImage} alt="register illustration" />
						<HoverOverlay className="hover-overlay">
							<UploadButton>이미지 등록</UploadButton>
						</HoverOverlay>
					</ImageContainer>
					<RightContentWrapper>
						<RegisterPlaceholder maxLength={380} />
						<KeywordContainer>
							<KeywordListContainer>
								{keywords.map((keyword, index) => (
									<KeywordTag key={index}>
										{keyword}
										<DeleteIcon 
											src={keywordDelete} 
											alt="delete" 
											onClick={() => handleDeleteKeyword(index)}
										/>
									</KeywordTag>
								))}
								<KeywordInputWrapper>
									<KeywordInput 
										placeholder="키워드를 입력해주세요" 
										value={inputValue}
										onChange={handleInputChange}
										onKeyPress={handleKeyPress}
									/>
									<AddButton 
										onClick={() => handleAddKeyword(inputValue.trim())}
										disabled={!inputValue.trim()}
									>
										추가
									</AddButton>
								</KeywordInputWrapper>
							</KeywordListContainer>
						</KeywordContainer>
					</RightContentWrapper>
				</RegisterContentWrapper>
			</RegisterInputContainer>
			
			{registerType === "council" && (
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
					</ProfileWrapper>
				</ProfileContainer>
			)}

			{registerType === "enterprise" && (
				<ProfileContainer>
					<ProfileTitle>프로필</ProfileTitle>
					<ProfileWrapper>
						<ProfileImage src={dummyProfileEnterprise} alt="프로필 이미지" />
						<ProfileInformation>
							<ProfileName>
								쿨티아 Cooltia
							</ProfileName>
							<ProfileURL>https://cooltia.com</ProfileURL>
						</ProfileInformation>
					</ProfileWrapper>
				</ProfileContainer>
			)}
			
			{registerType === "enterprise" ? (
				<EnterpriseRegister />
			) : (
				<CouncilRegister />
			)}
			<Footer />
		</>
	);
};

export default CooperationRegister;
