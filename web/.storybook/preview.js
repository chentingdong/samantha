import { addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'
import { setConsoleOptions } from '@storybook/addon-console'
import '@storybook/addon-console'

const customViewports = {
  kindleFire2: {
    name: 'Kindle Fire 2',
    styles: {
      width: '600px',
      height: '963px',
    },
  },
  kindleFireHD: {
    name: 'Kindle Fire HD',
    styles: {
      width: '533px',
      height: '801px',
    },
  },
}

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...customViewports,
    },
  },
})

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
})
