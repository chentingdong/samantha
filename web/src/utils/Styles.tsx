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

const injectRsuiteStyle = (theme) => {
  // const file = theme === "dark" ? "rsuite-dark.less" : "rsuite-light.less"
  const cdn =
    theme === "dark"
      ? "http://cdnjs.cloudflare.com/ajax/libs/rsuite/4.7.2/styles/rsuite-dark.min.css"
      : "http://cdnjs.cloudflare.com/ajax/libs/rsuite/4.7.2/styles/rsuite-default.min.css"
  const head = document.body.parentElement.firstElementChild
  let link = document.getElementById("rsuite")
  if (!link) link = document.createElement("link")

  // link.setAttribute("href", "http://localhost:2000/styles/" + file)
  link.setAttribute("href", cdn)
  link.setAttribute("rel", "stylesheet")
  link.setAttribute("type", "text/css")
  link.setAttribute("id", "rsuite") // set id so we can remove it later
  head.appendChild(link)
}

export {
  getIconByType,
  getIconClassByType,
  blockBgColor,
  blockTextColor,
  injectRsuiteStyle,
}
