import {
  H1, H2, H3, H4, H5,
  L600, L500,
  M600, M500, M400,
  R600, R500, R400,
  S500, S400, S300
} from '../styles/Typography';

const TestTypographyPage = () => {
  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Header Styles</h2>
        <H1>H1 Header - 안녕하세요</H1>
        <H2>H2 Header - 안녕하세요</H2>
        <H3>H3 Header - 안녕하세요</H3>
        <H4>H4 Header - 안녕하세요</H4>
        <H5>H5 Header - 안녕하세요</H5>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Large Text Styles</h2>
        <L600>L600 - 안녕하세요 Large Text 600</L600>
        <L500>L500 - 안녕하세요 Large Text 500</L500>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Medium Text Styles</h2>
        <M600>M600 - 안녕하세요 Medium Text 600</M600>
        <M500>M500 - 안녕하세요 Medium Text 500</M500>
        <M400>M400 - 안녕하세요 Medium Text 400</M400>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Regular Text Styles</h2>
        <R600>R600 - 안녕하세요 Regular Text 600</R600>
        <R500>R500 - 안녕하세요 Regular Text 500</R500>
        <R400>R400 - 안녕하세요 Regular Text 400</R400>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Small Text Styles</h2>
        <S500>S500 - 안녕하세요 Small Text 500</S500>
        <S400>S400 - 안녕하세요 Small Text 400</S400>
        <S300>S300 - 안녕하세요 Small Text 300</S300>
      </div>
    </div>
  );
};

export default TestTypographyPage; 