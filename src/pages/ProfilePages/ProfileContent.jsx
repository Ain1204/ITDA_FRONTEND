import styled from "styled-components";
import dummyIR from "../../assets/ProfileIcon/dummyIR.png";
import PropTypes from "prop-types";

const IRImage = styled.img`
    width: 100%;
    max-width: 100%;
    border-radius: 16px;
`;

const IntroText = styled.div`
    color: var(--Colors-GrayScale-G600, #1A1A23);
    font-family: "SUIT Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 168%; /* 23.52px */
    letter-spacing: -0.35px;
`;

const Paragraph = styled.p`
    margin-bottom: 16px;
`;

// 샘플 데이터 - 실제로는 API나 DB에서 가져올 데이터
const sampleData = {
    council: {
        intro: [
            "안녕하십니까, 한양대학교 ERICA 제8대 소프트웨어융합대학 학생회 스윙[SW: ING]입니다.",
            "한양대학교 ERICA, 소프트웨어융합대학은 4차 산업혁명을 선도할 우수한 소프트웨어 인력 양성을 위하여 컴퓨터학부, ICT융합학부, 인공지능학과를 운영하고 있습니다.",
            "소프트웨어융합대학은 입학정원 100명의 컴퓨터학부와 70명의 ICT융합학부, 그리고 36명의 인공지능학과로 구성되어 있습니다. 컴퓨터학부는 1985년 한양대 최초로 신설한 컴퓨터 관련 학과로서 지금껏 수많은 소프트웨어 관련 인재를 양성해 왔으며, 앞으로도 그 역사와 전통을 계승, 발전시켜 나갈 것입니다.",
            "소프트웨어융합대학의 제8대 학생회인 SW: ING은 낭만과 추억을 학우분들께 풀스윙으로 날려드리고자 함께 모이게 되었습니다. 학우분들의 인생에서 가장 빛나는 시기인 20대가 갑진년 푸른 용의 기백으로 더욱 빛나도록, 더 멋진 추억으로 남는 2024년이 되도록, 끊임없이 소통하고 개선하며 일하는 학생회가 될 것을 약속드립니다."
        ],
        portfolios: [
            { id: 1, image: dummyIR, description: "학생회 포트폴리오 1" },
            { id: 2, image: dummyIR, description: "학생회 포트폴리오 2" },
            { id: 3, image: dummyIR, description: "학생회 포트폴리오 3" },
            { id: 4, image: dummyIR, description: "학생회 포트폴리오 4" },
            { id: 5, image: dummyIR, description: "학생회 포트폴리오 5" }
        ]
    },
    enterprise: {
        intro: [
            "아모레퍼시픽은 '사람을 아름답게, 세상을 아름답게'라는 소명을 이루고자 미의 여정을 한 걸음 한 걸음 걸어왔습니다. 모든 구성원은 스스로 하는 일이 세상을 더 좋은 곳으로 만드는 데 기여한다는 신념과 자부심을 갖습니다.",
            "브랜드, 제품, 채널, 국가별로 일은 모두 다르지만, 고객 각자가 지닌 고유의 특성으로부터 시작해 개인의 자유로운 선택으로 완성하는 미래지향적인 아름다움의 모습을 세상에 선보이고자 하는 동일한 비전을 아로새깁니다.",
            "고객을 위해 최초·최고를 향한 도전을 쉬지 않습니다. 세상 모든 존재의 아름다움을 인정하고, 서로가 가진 다름을 긍정적으로 여기며 협업합니다. 고객을 중심으로 생각하며 당당히 일합니다. 반드시 지켜야 할 원칙을 정립하고 세상과의 약속을 지켜나갑니다.",
            "누구나 자신만의 아름다움을 발견하고 실현하는 삶, 아모레퍼시픽이 바라는 뉴 뷰티입니다.",
            "아모레퍼시픽은 고객 한 사람 한 사람이 뉴 뷰티로 영감받아 자신만의 아름다움을 발견하고, 건강하고 만족스러운 삶을 실현할 수 있도록 합니다. 고객의 삶으로 확장한 뷰티를 추구하며 몸과 마음의 아름다움을 위한 새로운 방법을 찾습니다. 디지털 기술을 바탕으로 개개인에게 최적의 솔루션을 제안합니다. 비즈니스 전반에 걸쳐 더 많은 이해관계자와 공감하며 아모레퍼시픽의 비전이 모두의 미래가 되는 기업 생태계를 만듭니다."
        ],
        portfolios: [
            { id: 1, image: dummyIR, description: "기업 포트폴리오 1" },
            { id: 2, image: dummyIR, description: "기업 포트폴리오 2" },
            { id: 3, image: dummyIR, description: "기업 포트폴리오 3" },
            { id: 4, image: dummyIR, description: "기업 포트폴리오 4" },
            { id: 5, image: dummyIR, description: "기업 포트폴리오 5" }
        ]
    }
};

// === 동적 컨텐츠 컴포넌트 ===
export const IntroContent = ({ paragraphs }) => (
    <div>
        <IntroText>
            {paragraphs.map((paragraph, index) => (
                <Paragraph key={index}>
                    {paragraph}
                </Paragraph>
            ))}
        </IntroText>
    </div>
);

IntroContent.propTypes = {
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired
};

export const PortfolioContent = ({ portfolio }) => (
    <IRImage src={portfolio.image} alt={portfolio.description} />
);

PortfolioContent.propTypes = {
    portfolio: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

// 학생회(Council) 탭 인덱스에 따라 컨텐츠를 렌더링하는 함수
export const renderCouncilContent = (activeTab) => {
    const data = sampleData.council;
    
    if (activeTab === 0) {
        return <IntroContent paragraphs={data.intro} />;
    } else if (activeTab >= 1 && activeTab <= 5) {
        const portfolioIndex = activeTab - 1;
        if (portfolioIndex < data.portfolios.length) {
            return <PortfolioContent portfolio={data.portfolios[portfolioIndex]} />;
        }
        return <div>포트폴리오 정보가 없습니다.</div>;
    } else {
        return <IntroContent paragraphs={data.intro} />;
    }
};

// 기업(Enterprise) 탭 인덱스에 따라 컨텐츠를 렌더링하는 함수
export const renderEnterContent = (activeTab) => {
    const data = sampleData.enterprise;
    
    if (activeTab === 0) {
        return <IntroContent paragraphs={data.intro} />;
    } else if (activeTab >= 1 && activeTab <= 5) {
        const portfolioIndex = activeTab - 1;
        if (portfolioIndex < data.portfolios.length) {
            return <PortfolioContent portfolio={data.portfolios[portfolioIndex]} />;
        }
        return <div>포트폴리오 정보가 없습니다.</div>;
    } else {
        return <IntroContent paragraphs={data.intro} />;
    }
};

// 타입에 따라 적절한 렌더링 함수를 선택
export const renderProfileContent = (activeTab, type) => {
    return type === 'council' 
        ? renderCouncilContent(activeTab) 
        : renderEnterContent(activeTab);
};

export default renderProfileContent;
