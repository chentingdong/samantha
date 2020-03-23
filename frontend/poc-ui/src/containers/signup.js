import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormFields } from '../libs/custom-hooks';
import { Auth } from "aws-amplify";
import LoaderButton from '../components/loader-button';

function Signup ( props ) {
  const initialFields = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: ''
  };
  const [ fields, handleFieldChange ] = useFormFields( initialFields );
  const [ newUser, setNewUser ] = useState( null );
  const [ isLoading, setIsLoading ] = useState( false );

  function renderForm () {
    return (
      <form className="" onSubmit={ handleSubmit }>
        <div className="form-group">
          <label>Username (optional)</label>
          <input className="form-control" autoFocus type="username" value={ fields.username } onChange={ handleFieldChange } />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" autoFocus type="email" value={ fields.email } onChange={ handleFieldChange } />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" type="password" value={ fields.password } onChange={ handleFieldChange } />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input className="form-control" type="password" onChange={ handleFieldChange } value={ fields.confirmPassword } />
        </div>
        <LoaderButton className="btn btn-light col-12"
          type="submit" isLoading={ isLoading } disabled={ !validateForm() } text="Signup" >Sign Up</LoaderButton>
      </form>
    );
  }

  function renderConfirmationForm () {
    return (
      <div class="m-auto">
        <h3>Confirm sign up</h3>
        <p>Please check your email to verify to finish registration. Then click <Link to="/user/login">login</Link>.</p>
        <p>If not received email in a minute, try <button onClick={ resendSignUp }>resend</button></p>
      </div>
    );
  }

  function validateForm () {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSubmit ( event ) {
    event.preventDefault();
    setIsLoading( true );

    try {
      const newUser = await Auth.signUp( {
        username: fields.username || fields.email.split( '@' )[ 0 ],
        password: fields.password,
        attributes: {
          email: fields.email
        }
      } );
      setIsLoading( false );
      setNewUser( newUser );
    } catch ( e ) {
      alert( e.message );
      setIsLoading( false );
    }
  }

  async function resendSignUp ( event ) {
    event.preventDefault();
    setIsLoading( true );

    await Auth.resendSignUp( 'tingdong' ).then( () => {
      alert( 'Link sent successfully' );
    } ).catch( e => {
      alert( e.message );
    } ).then( () => {
      setIsLoading( false );
    } );
  }

  return (
    <div className="m-auto col-6">
      { newUser === null ? renderForm() : renderConfirmationForm() }
    </div>
  );
}

export default Signup;