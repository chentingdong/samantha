import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { AppContextInterface, AppContextProvider } from './utils/AppContext'
import Routes from './routes/routes'
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

const appProps = {}

export const App = () => {
  return (
    <AppContextProvider value={initialContext}>
      <Routes appProps={appProps} />
    </AppContextProvider>
  )
}

export default hot(App)
