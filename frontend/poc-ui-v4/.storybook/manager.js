import { themes } from '@storybook/theming/create'
import { addons } from '@storybook/addons'
import theme from './theme'

addons.setConfig({
  theme: theme,
})
