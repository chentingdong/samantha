import React from 'react'
import readmeMd from '../../README.md'
import Markdown from 'markdown-to-jsx'

export default {
  title: 'App',
}

const readme = () => <Markdown>{readmeMd}</Markdown>

export { readme }