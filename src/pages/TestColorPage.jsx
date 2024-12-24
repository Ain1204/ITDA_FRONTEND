import styled from 'styled-components';
import { statusColors } from '../styles/mixins';

// 색상 견본을 보여주는 컴포넌트
const ColorBox = styled.div`
  width: 200px;
  height: 100px;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 8px;
  color: ${props => props.textColor || '#000'};
`;

// 믹스인 테스트를 위한 버튼 컴포넌트
const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid currentColor;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  
  ${statusColors}
`;

const Section = styled.section`
  margin: 40px 0;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.G300};
  border-radius: 8px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const TestColorPage = () => {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Color System & Mixin Test Page</h1>

      <Section>
        <h2>Primary Colors</h2>
        <ColorGrid>
          <div>
            <ColorBox color={({ theme }) => theme.colors.B500}>
              B500<br/>#0051FF
            </ColorBox>
            <p>Primary Blue 500</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.B400}>
              B400<br/>#3D85FF
            </ColorBox>
            <p>Primary Blue 400</p>
          </div>
        </ColorGrid>
      </Section>

      <Section>
        <h2>Secondary Colors</h2>
        <ColorGrid>
          <div>
            <ColorBox color={({ theme }) => theme.colors.B300}>
              B300<br/>#99B9FF
            </ColorBox>
            <p>Secondary Blue 300</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.B200}>
              B200<br/>#E5EEFF
            </ColorBox>
            <p>Secondary Blue 200</p>
          </div>
        </ColorGrid>
      </Section>

      <Section>
        <h2>Gray Scale</h2>
        <ColorGrid>
          <div>
            <ColorBox color={({ theme }) => theme.colors.Black} textColor="#fff">
              Black<br/>#121318
            </ColorBox>
            <p>Black</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.G600} textColor="#fff">
              G600<br/>#1A1A23
            </ColorBox>
            <p>Gray 600</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.G500} textColor="#fff">
              G500<br/>#4F5462
            </ColorBox>
            <p>Gray 500</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.G400}>
              G400<br/>#949BAD
            </ColorBox>
            <p>Gray 400</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.G300}>
              G300<br/>#E5EAF2
            </ColorBox>
            <p>Gray 300</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.G200}>
              G200<br/>#F3F5F8
            </ColorBox>
            <p>Gray 200</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.G100}>
              G100<br/>#F8F9FC
            </ColorBox>
            <p>Gray 100</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.White}>
              White<br/>#FCFCFF
            </ColorBox>
            <p>White</p>
          </div>
        </ColorGrid>
      </Section>

      <Section>
        <h2>Status Colors</h2>
        <ColorGrid>
          <div>
            <ColorBox color={({ theme }) => theme.colors.error} textColor="#fff">
              Error<br/>#EF5D58
            </ColorBox>
            <p>Error</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.success} textColor="#fff">
              Success<br/>#01B777
            </ColorBox>
            <p>Success</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.active} textColor="#fff">
              Active<br/>#3D85FF
            </ColorBox>
            <p>Active</p>
          </div>
          <div>
            <ColorBox color={({ theme }) => theme.colors.default}>
              Default<br/>#949BAD
            </ColorBox>
            <p>Default</p>
          </div>
        </ColorGrid>
      </Section>

      <Section>
        <h2>Mixin Test (Status Colors)</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <StyledButton className="error">
            Error Button
          </StyledButton>
          <StyledButton className="success">
            Success Button
          </StyledButton>
          <StyledButton className="active">
            Active Button
          </StyledButton>
        </div>
      </Section>
    </div>
  );
};

export default TestColorPage; 