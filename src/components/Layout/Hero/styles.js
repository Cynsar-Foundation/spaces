import styled, { css } from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  display: grid;
  padding: var(--globalPaddingTb) var(--globalPaddingLr);
  margin: auto;
  row-gap: var(--gapXL);
  max-width: var(--globalContainer);
  align-items: center;
  background: rgb(147,54,154);
  background: linear-gradient(90deg, rgba(147,54,154,0.8869922969187675) 0%, rgba(230,102,64,0.9009978991596639) 35%, rgba(0,212,255,1) 100%); 
  animation: gradient 15s ease infinite;
  background-size: 400% 400%;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  ${({ isFullViewport }) =>
    isFullViewport &&
    css`
      justify-content: center;
      height: 100vh;

      & > div {
        justify-items: center;
        text-align: center;
      }
    `};
`;

const TextBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: var(--gapRegular);
  width: 600px;
  height: max-content;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Caption = styled.h2`
  color: var(--primaryColor);
  font-size: var(--baseXL);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: var(--headingsLineHeight);
  font-weight: 400;
`;

const Title = styled.h1`
  font-size: var(--headingXXL);
  color: var(--headingsColor);
  line-height: var(--headingsLineHeight);

  @media (max-width: 768px) {
    font-size: var(--headingXL);
  }
`;

const Subtitle = styled.p`
  font-size: var(--baseXL);
  color: var(--baseTextColor);
  line-height: var(--bodyLineHeight);
`;

export { Wrapper, TextBox, Caption, Title, Subtitle };
