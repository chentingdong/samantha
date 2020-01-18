import React from 'react';
import { Link } from 'react-router-dom'

function Home () {
  return (
    <div className="container-fluid text-center home">
      <h3>Astound Virtual Assistant</h3>
      <p>Welcome, please sign up <Link to="/signup"> here </Link> to initiate your personal assistant. </p>
    </div>
  );
}

export default Home;
