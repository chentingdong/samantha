import React from "react"
import styled from "styled-components"
import ReactSelect from "react-select"

const Select = styled(ReactSelect)`
  .react-select__control,
  .react-select__menu {
    background var(--color-bg-secondary);
  }
  .react-select__multi-value {
    background var(--color-bg-default);
  }
  .react-select__input,
  .react-select__multi-value__label {
    color var(--color-text-primary);
  }
  .react-select__option--is-focused {
    background var(--color-bg-default);
  }
  &:hover .react-select__multi-value__remove {
    background var(--color-bg-primary);
    color var(--color-text-primary);
  }
`
export { Select }
