// src/styles/GlobalStyle.jsx
import { Global, css } from "@emotion/react";
function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
        }

        body {
          font-family: "Pretendard", sans-serif;
          color: #26352b;
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
        }

        button {
          border: 0;
          background: none;
          cursor: pointer;
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

        img {
          display: block;
          max-width: 100%;
        }
      `}
    />
  );
}
export default GlobalStyle;
