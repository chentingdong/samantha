import React from 'react'
import { RequestDefsMenu } from './request-defs-menu'
import { EditRequestDef } from './edit-request-def'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

export default {
  title: 'Request',
  component: RequestDefsMenu,
}

export const requestDefsMenu = () => <RequestDefsMenu />

export const editRequestDef = () => (
  <DndProvider backend={Backend}>
    <EditRequestDef />
  </DndProvider>
)
