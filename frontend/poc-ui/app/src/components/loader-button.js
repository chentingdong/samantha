import React from "react";
import { Button } from "react-bootstrap";
import "./loader-button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`btn btn-default loader-button ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <FontAwesomeIcon icon={faCircleNotch} className="spinning" />}
      {props.children}
    </Button>
  );
}

export default LoaderButton