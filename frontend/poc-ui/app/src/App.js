import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Amplify from 'aws-amplify'
import { createBrowserHistory } from 'history';
import './App.css'

import awsconfig from './aws-exports'

function App () {
  useEffect( () => {
    Amplify.configure(awsconfig)
  })

  return (
    <div className="app">
      <Header />
    </div>
  )
}

export default App;
