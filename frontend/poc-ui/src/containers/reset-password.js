import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from '../config.js';
import LoaderButton from '../components/loader-button'

function ResetPassword (props) {
  let [ email, setEmail ] = useState('')
  let [ password, setPassword ] = useState('')
  let [ confirmPassword, setConfirmPassword ] = useState('')
  let [ confirmationCode, setConfirmationCode ] = useState('')
  let [ codeSent, setCodeSent ] = useState(false)
  let [ isConfirming, setIsConfirming] = useState(false)
  let [ confirmed, setConfirmed ] = useState(false)
  let [ isSendingCode, setIsSendingCode ] = useState(false)

  Amplify.configure(awsConfig);

  return buildContent();

  function buildContent () {
    let content = ''
    if (codeSent)
      if (confirmed)
        content = successMessage()
      else
        content = confirmationForm()
    else
      content = requestCodeForm()

    return (
      <div className="centered-panel"> {content} </div>
    )
  }

  // step 1. request code form
  function requestCodeForm () {
    return (
      <Form onSubmit={handleSendCodeClick}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control autoFocus
            type="email"
            value={email}
            placeholder="Your email used in Astound"
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <LoaderButton block
          type="submit"
          text="send confirmation"
          loadingText="Sending…"
          isLoading={isSendingCode}
          disabled={!validateCodeForm()} />
      </Form>
    )
  }

  // step 2. fillout confirmation form with code get from email.
  function confirmationForm () {
    return (
      <Form onSubmit={handleConfirmClick}>
        <Form.Group controlId="code">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control autoFocus
            type="tel"
            value={confirmationCode}
            onChange={e => setConfirmationCode(e.target.value)} />
          <Form.Text>
            Please check your email {email} for the confirmation code.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)} />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          text="Confirm"
          loadingText="Confirming..."
          isLoading={isConfirming}
          disabled={!validateResetForm()} />
      </Form>
    )
  }

  // step 3. show reset success message.
  function successMessage () {
    return (
      <div className="success">
        <p> Your password has been reset successfully. </p>
        <p>
          <Link to="/user/login">Click here to login with your new credentials.</Link>
        </p>
      </div>
    )
  }

  // util functions below.
  async function handleSendCodeClick (event) {
    event.preventDefault();
    setIsSendingCode(true)

    try {
      await Auth.forgotPassword(email);
      setCodeSent(true);
    } catch (e) {
      alert(e.message);
      setIsSendingCode(false);
    }
  }

  function validateCodeForm () {
    return email.length > 0;
  }

  async function handleConfirmClick (event) {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit( email, confirmationCode, password );
      setConfirmed(true);
    } catch (e) {
      alert(e.message);
      setIsConfirming(false);
    }
  }

  function validateResetForm () {
    return (
      confirmationCode.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    )
  }

}

export default ResetPassword;