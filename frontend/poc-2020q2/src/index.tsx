import * as React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import { Store } from './components/context/store'

const rootEl = document.getElementById('root')
render(
  <Store>
    <App />
  </Store>,
  rootEl
)
