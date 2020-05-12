import React from 'react'
import VirtualAssistant from './virtual-assistant'
import Login from './login'
import NotFound from './not-found'
import '../../assets/scss/app.scss'

export default {
  title: 'POC V2 pages',
  component: VirtualAssistant,
}

export const virtualAssistant = () => <VirtualAssistant />
export const login = () => <Login />
export const notFound = () => <NotFound />
