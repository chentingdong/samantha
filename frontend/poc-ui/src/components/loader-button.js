import React from "react";
import "./loader-button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function LoaderButton({
  isLoading,
  text = "OK",
  loadingText,
  loadingIcon,
  className = "",
  disabled = false,
  ...props
}) {
  loadingIcon = loadingIcon || <FontAwesomeIcon icon="circle-notch" className="spinning" />
  loadingText = loadingText || props.children || "Loading..."

  return (
    <div
      className={`btn loader-button ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <> {loadingIcon} {loadingText}</> : props.children}
    </div>
  );
}

export default LoaderButton