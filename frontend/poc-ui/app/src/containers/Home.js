import React from 'react';
import { Router, Link } from 'react-router-dom'

function Home (props) {
  return (
    <div className="container-fluid">
      <Router>
        <h2>Home</h2>
        <p>Welcome to Astound Virtual agent, please <Link to="/signup"> Signup </Link> your free account and start your experiences with us. </p>
      </Router>
    </div>
  )
}

export default Home;