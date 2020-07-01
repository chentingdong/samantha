const { r, y, g, b, gr, sc, d40 } = require('./style')

module.exports.getBlockLine = (block) => {
  const lines = [
    `ID: ${g(block.id)}`,
    `parent :${g(block.parent ? block.parent.id : 'null')}`,
    `name: ${g(block.name)}`,
    `type: ${g(block.type)}`,
  ]

  if (block.state) lines.push(`state: ${sc(block.state)}`)

  if (block.requestors)
    lines.push(
      `Requestors: ${y(block.requestors.map((user) => user.name).join(', '))}`,
    )

  if (block.responders)
    lines.push(
      `Responders: ${y(block.responders.map((user) => user.name).join(', '))}`,
    )

  lines.push(`parent :${g(block.parent ? block.parent.id : 'null')}`)

  return lines.join(' ')
}

module.exports.printBlockLine = (block) => {
  this.getBlockLine(block)
  console.log(this.getBlockLine(block))
}
