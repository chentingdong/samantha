import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { AppContextInterface, AppContextProvider } from './utils/AppContext'
import Routes from './routes/routes'

const reactLogo = require('./../assets/img/react_logo.svg')
import './../assets/scss/app.scss'

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
      <Routes appProps={{}} />
    </AppContextProvider>
  )
}

declare let module: object

export default hot(App)
