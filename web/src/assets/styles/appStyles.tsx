/* appStyle.tsx
 *
 * Bellhop M2 Figma Design
 * https://www.figma.com/file/Vi2o1sJNRvmCQQgyFnQvDa/UI-Design-System?node-id=24%3A77
 *
 */

import styled from "styled-components"
import tw from "tailwind.macro"
import theme from "tailwindcss"

const AppStyles = styled.div.attrs({
  className: "",
})`
  body {
    ${tw`font-body`}
    font-size: 16px;
    font-weight: 500;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${tw`font-serif my-2`};
    font-style: normal;
    font-weight: 800;
    align-items: center;
    line-height: 100%;
  }

  h1 {
    font-size: 61.04px;
    font-size: 3.815rem;
  }

  h2 {
    font-size: 48.33px;
    font-size: 3.02rem;
  }

  h3 {
    font-size: 39.06px;
    font-size: 2.48rem;
  }

  h4 {
    font-size: 31.25px;
    font-size: 1.95rem;
  }

  h5 {
    font-size: 25px;
    font-size: 1.56rem;
  }

  h6 {
    font-size: 20px;
    font-size: 1.25rem;
  }

  label {
    font-weight: 800;
  }

  .quote {
    ${tw`font-serif`};
    font-style: normal;
    font-weight: bold;
    font-size: 39.06px;
    font-size: 2.48rem;
    line-height: 133%;
  }

  * {
    transition: background-color 0.3s ease;
    transition: height width 0.3s ease;
  }

  /*
   * TODO: convert the following to bellhop theme
   */

  input[type="text"],
  input[type="number"],
  textarea {
    ${tw`rounded px-4 py-2 w-full my-2 bg-default text-default`}
    border: 1px solid var(--color-text-default);
  }
  foreignObject {
    overflow: visible;
  }
`
export default AppStyles
