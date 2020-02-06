import React from 'react';
import { Link } from 'react-router-dom'

function Home (props) {
  return (
    <div className="container centered-panel">
      <h3>Astound Virtual Assistant</h3>
      <p>Welcome to Astound.AI. You can <Link to="/user/signup"> sign up </Link> to initiate your personal assistant.</p>
      <p>If you already have an account, please <Link to="/user/login">login </Link>. </p>
    </div>
  )
}

export default Home;
