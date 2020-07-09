// theme.js
// This file is for storybook page theming, not rsuite theming
import { create } from "@storybook/theming/create"
import logo from "../src/assets/img/bellhop-1000x.png"

export default create({
  base: "light",

  colorPrimary: "#333",
  colorSecondary: "#999",

  // UI
  // appBg: 'grey',
  // appContentBg: 'grey',
  // appBorderColor: 'grey',
  // appBorderRadius: 4,

  // Typography
  fontBase: "helvetica, arial, sans-serif",
  // fontCode: 'monospace',

  // Text colors
  textColor: "grey",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  // barTextColor: 'white',
  // barSelectedColor: 'black',
  barBg: "colorSecondary",

  // Form colors
  // inputBg: 'white',
  // inputBorder: 'silver',
  // inputTextColor: 'black',
  // inputBorderRadius: 4,
  brandTitle: "Bellhop storybook",
  brandUrl: "https://localhost",
  brandImage: logo,
})
