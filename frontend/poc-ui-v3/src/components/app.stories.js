import React from 'react'
import readmeMd from '../../README.md'
import Markdown from 'markdown-to-jsx'

export default {
  title: 'App',
}

export const installApp = () => <Markdown>{readmeMd}</Markdown>
