import React from "react";
import "./loader-button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

function LoaderButton({
  isLoading,
  text = "OK",
  loadingText,
  loadingIcon,
  className = "",
  disabled = false,
  ...props
}) {
  loadingIcon = loadingIcon || <FontAwesomeIcon icon={faCircleNotch} className="spinning" />
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