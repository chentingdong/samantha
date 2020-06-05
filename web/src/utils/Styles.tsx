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

const getIconByType = (type) => {
  switch (type) {
    case "COMPOSITE_PARALLEL":
      return "list"
    case "COMPOSITE_SEQUENTIAL":
      return "list-ol"
    case "LEAF_FORM":
      return "order-form"
    case "LEAF_API":
      return "gears2"
    default:
      return "peoples"
  }
}

const getIconClassByType = (type) => {
  return "rs-icon rs-icon-" + getIconByType(type)
}

export { getIconByType, getIconClassByType, blockBgColor, blockTextColor }
