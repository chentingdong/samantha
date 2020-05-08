const pad = require('pad')
const colors = require('colors')

const PADDING = 20
const r = (s) => colors.red(pad('' + s, PADDING))
const y = (s) => colors.yellow(pad('' + s, PADDING))
const g = (s) => colors.green(pad('' + s, PADDING))
const b = (s) => colors.blue(pad('' + s, PADDING))
const gr = (s) => colors.gray(pad('' + s, PADDING))

// state color
const sc = (state) => {
  switch (state) {
    case 'PENDING':
      return r(state)
    case 'ACTIVE':
      return g(state)
    case 'COMPLETE':
      return b(state)
    default:
      return gr(state)
  }
}

const dash = colors.gray('-'.repeat(80))

module.exports = { r, y, g, b, gr, sc, dash }
