const { r, y, g, b, gr, sc, d40 } = require('./style')

module.exports.getBlockLine = (block) => {
  const lines = [
    `ID: ${g(block.id)}`,
    `parent :${g(block.parent ? block.parent.id : 'null')}`,
    `name: ${g(block.name)}`,
    `state: ${sc(block.state)}`,
    `type: ${g(block.type)}`,
    `Requestors: ${y(block.requestors.map((user) => user.name).join(', '))}`,
    `Responders: ${y(block.responders.map((user) => user.name).join(', '))}`,
  ]

  if (!block.inCatalog) {
    lines.push(`parent :${g(block.parent ? block.parent.id : 'null')}`)
    lines.push(`state: ${sc(block.state)}`)
    lines.push(
      `Requestors: ${y(block.requestors.map((user) => user.name).join(', '))}`,
    )
    lines.push(
      `Responders: ${y(block.responders.map((user) => user.name).join(', '))}`,
    )
  }

  return lines.join(' ')
}

module.exports.printBlockLine = (block) => {
  this.getBlockLine(block)
  console.log(this.getBlockLine(block))
}
