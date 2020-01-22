import React from 'react';
import { Link } from 'react-router-dom'

function Home (props) {
  return (
    <div className="container centered-panel">
      <h3>Astound Virtual Assistant</h3>
      <p>Welcome, please sign up <Link to="/signup"> here </Link> to initiate your personal assistant. If you already have
      an account, please login <Link to="/login"> here </Link>. </p>
    </div>
  );
}

export default Home;
