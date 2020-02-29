import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/loader-button";

function ChangePassword (props) {
  const [ oldPassword, setOldPassword ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ isLoading, setIsChanging ] = useState(false)

  return (
    <div className="change-password">
      <Form onSubmit={handleChangeClick}>
        <Form.Group controlId="oldPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            onChange={e => setOldPassword(e.target.value)}
            value={oldPassword}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </Form.Group>
        <LoaderButton block
          type="submit"
          loadingText="Changing…"
          disabled={!validateForm()}
          isLoading={isLoading}>Change Password</LoaderButton>
      </Form>
    </div>
  );

  function validateForm() {
    return (
      oldPassword.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  async function handleChangeClick (event) {
    event.preventDefault();

    setIsChanging(true);

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        oldPassword,
        password
      );

      props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      setIsChanging(false);
    }
  };
}

export default ChangePassword