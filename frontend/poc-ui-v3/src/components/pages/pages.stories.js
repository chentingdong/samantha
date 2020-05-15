import React from 'react'
import { DndProvider } from 'react-dnd'
import VirtualAssistant from './virtual-assistant'
import Backend from 'react-dnd-html5-backend'
import NotFound from './not-found'
import Login from './login'
import { Store } from '../context/store'
import '../../assets/scss/app.scss'

export default {
  title: 'Pages',
  component: VirtualAssistant,
}

const virtualAssistant = () => (
  <article>
    <p>Full demo view of Bellhop app.</p>
    <div class="card shadow vh-100 overflow-auto">
      <Store>
        <DndProvider backend={Backend}>
          <VirtualAssistant />
        </DndProvider>
      </Store>
    </div>
  </article>
)
const pageNotFound = () => (
  <article>
    <p>
      This is what user will see when hit a 404 not found page under same
      baseurl.
    </p>
    <div class="card shadow vh-100">
      <NotFound />
    </div>
  </article>
)
const userLogin = () => (
  <article>
    <p>
      This is the current user login page. When click the button, it will bring
      up the hosted UI for AWS Cognito login. Actual login disabled here.
    </p>
    <div class="card shadow vh-100">
      <Login />
    </div>
  </article>
)

export { virtualAssistant, pageNotFound, userLogin }