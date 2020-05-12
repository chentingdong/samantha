import React from 'react'
import { RequestDefsMenu } from './request-defs-menu'
import { EditRequestDef } from './edit-request-def'

export default {
  title: 'requests',
  component: RequestDefsMenu,
}

export const requestDefsMenu = () => <RequestDefsMenu />
export const editRequestDef = () => <EditRequestDef />
