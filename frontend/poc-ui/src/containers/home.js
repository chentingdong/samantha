import React from 'react';
import { Link } from 'react-router-dom'

function Home (props) {
  return (
    <div className="container centered-panel">
      <h3>Bellhop Virtual Assistant</h3>
      <p>Welcome to Bellhop. Pleaes <Link to="/user/signup"> sign up </Link> and start talking to your personal assistant.</p>
      <p>If you already have an account, please <Link to="/user/login">login </Link>. </p>
    </div>
  )
}

export default Home;
