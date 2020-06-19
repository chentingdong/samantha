// This file is used for common HTML5 tags.
import styled from "styled-components"
import tw from "tailwind.macro"

// TODO: use tailwind variables to replace these hard coded numbers.
const AppStyles = styled.div.attrs({
  className: "",
})`
  h1,
  h2 {
    font-family: var(--font-display);
  }
  h1 {
    font-size: 2em;
    font-weight: 800;
  }

  h2 {
    font-size: 1.5em;
    font-weight: 700;
  }

  h3 {
    font-size: 1.17em;
    font-weight: 700;
  }

  h4 {
    font-size: 1.2em;
    font-weight: 500;
  }

  h5 {
    font-size: 0.83em;
    font-weight: 500;
  }

  h6 {
    font-weight: 500;
    font-size: 0.67em;
  }

  * {
    transition: background-color 0.3s ease;
    transition: height width 0.3s ease;
  }
`
export default AppStyles
