import React from 'react';
import { Link } from 'react-router-dom'

function Home (props) {
  debugger
  if (props.isAuthenticated)
    props.history.push('/demo')
  return (
    <div className="container centered-panel">
      <h3>Astound Virtual Assistant</h3>
      <p>Welcome, please sign up <Link to="/signup"> here </Link> to initiate your personal assistant. </p>
    </div>
  );
}

export default Home;
