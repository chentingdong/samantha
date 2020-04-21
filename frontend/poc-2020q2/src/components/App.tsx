import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { AppContextInterface, AppContextProvider } from './utils/AppContext'

const reactLogo = require('./../assets/img/react_logo.svg')
import './../assets/scss/App.scss'

const initialContext: AppContextInterface = {
  user: {},
  users: [],
  currentBlock: {},
  blocks: [],
  blockDefinitions: [],
  messages: [],
  listUsers: () => [],
  listBlocks: () => [],
  listMessages: () => [],
}

export const App = () => {
  return (
    <AppContextProvider value={initialContext}>
      <h1>hello</h1>
    </AppContextProvider>
  )
}

declare let module: object

export default hot(App)
