import * as React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import { Store } from './components/context/store'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const rootEl = document.getElementById('root')
render(
  <Store>
    <DndProvider backend={Backend}>
      <App />
    </DndProvider>
  </Store>,
  rootEl
)
