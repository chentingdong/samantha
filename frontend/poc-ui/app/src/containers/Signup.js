import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useFormFields } from '../libs/custom-hooks'
import { Auth } from "aws-amplify";
import LoaderButton from '../components/loader-button';

function Signup (props) {
  const initialFields = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: ''
  }
  const [ fields, handleFieldChange ] = useFormFields(initialFields);
  const [ newUser, setNewUser ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  function renderForm () {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username (optional)</Form.Label>
          <Form.Control autoFocus type="username" value={fields.username} onChange={handleFieldChange} />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control autoFocus type="email" value={fields.email} onChange={handleFieldChange} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={fields.password} onChange={handleFieldChange} />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" onChange={handleFieldChange} value={fields.confirmPassword} />
        </Form.Group>
        <LoaderButton block type="submit" isLoading={isLoading} disabled={!validateForm()} >
          Signup
          </LoaderButton>
      </Form>
    );
  }

  function renderConfirmationForm () {
    return (
      <div class="centered-panel">
        <h3>Confirm sign up</h3>
        <p>Please check your email to verify to finish registration. Then click <Link to="/login">login</Link>.</p>
        <p>If not received email in a minute, try <button onClick={resendSignUp}>resend</button></p>
      </div>
    )
  }

  function validateForm () {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSubmit (event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.username || fields.email.split('@')[0],
        password: fields.password,
        attributes: {
          email: fields.email
        }
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function resendSignUp (event) {
    event.preventDefault();
    setIsLoading(true);

    await Auth.resendSignUp('tingdong').then(() => {
      alert('Link sent successfully')
    }).catch(e => {
      alert(e.message)
    }).then(() => {
      setIsLoading(false);
    })
  }

  return (
    <div className="centered-panel">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}

export default Signup;