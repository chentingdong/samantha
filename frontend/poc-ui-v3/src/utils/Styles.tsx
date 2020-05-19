const blockColor = (block) => {
  switch (block.state) {
    case "PENDING":
      return "warning"
    case "ACTIVE":
      return "success"
    case "COMPLETE":
      return "primary"
    case "DRAFT":
      return "light"
    default:
      return "white"
  }
}

const blockBgColor = (block) => {
  return "bg-" + blockColor(block)
}

const blockTextColor = (block) => {
  return "text-" + blockColor(block)
}

export { blockBgColor, blockTextColor }
