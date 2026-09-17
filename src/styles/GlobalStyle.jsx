// src/styles/GlobalStyle.jsx
import { Global, css } from '@emotion/react';
import { theme } from './variables';

const fontStyles = css`
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2')
      format('woff2-variations');
    font-weight: 400 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Wave';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/WavvePADO-Regular.woff2')
      format('woff2');
    font-weight: normal;
    font-display: swap;
  }
`;

const resetStyles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-gutter: stable;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', sans-serif;
    color: ${theme.colors.textPrimary};
    background-color: ${theme.colors.background};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }

  button {
    border: 0;
    padding: 0;
    background: none;
    cursor: pointer;
  }

  input,
  select,
  textarea {
    border: 0;
    outline: none;
    background: none;
  }

  textarea {
    resize: none;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  img {
    height: auto;
  }
`;

function GlobalStyle() {
  return <Global styles={[fontStyles, resetStyles]} />;
}

export default GlobalStyle;
