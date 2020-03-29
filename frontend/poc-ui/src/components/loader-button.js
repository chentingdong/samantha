import React from "react";
import "../assets/loader-button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LoaderButton ( {
  isLoading = false,
  text = 'Ok',
  loadingText = 'loading',
  loadingIcon = <FontAwesomeIcon icon="circle-notch" className="spinning" />,
  variant = "",
  disabled = false,
  ...props
} ) {
  return (
    <button
      className={ `btn loader-button ${ variant }` }
      disabled={ disabled || isLoading }
      { ...props }
    >
      { isLoading ? <> { loadingIcon } { loadingText }</> : props.children }
    </button>
  );
}

export default LoaderButton;