import React from 'react'
import { RequestDefsMenu } from './request-defs-menu'
import { EditRequestDef } from './edit-request-def'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { Store } from '../context/store'

export default {
  title: 'Request',
  component: RequestDefsMenu,
}

export const requestDefsMenu = () => (
  <Store>
    <div class="card shadow">
      <RequestDefsMenu />
    </div>
  </Store>
)

export const editRequestDef = () => (
  <Store>
    <DndProvider backend={Backend}>
      <div class="card shadow p-2">
        <EditRequestDef />
      </div>
    </DndProvider>
  </Store>
)
