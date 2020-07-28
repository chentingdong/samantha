import logoDark from "../assets/img/bellhop-dark.svg"
import logoWhite from "../assets/img/brand-1.svg"

const setActiveMenu = (pathname: string, menuItem: string): string => {
  return pathname?.includes(menuItem) ? "active" : ""
}

const getLogoByTheme = (theme) => {
  return theme === "bell" ? logoWhite : logoDark
}

const blockColor = (block) => {
  switch (block.state) {
    case "Running":
      return "warning"
    case "Success":
      return "success"
    case "Failure":
      return "primary"
    case "Draft":
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
    case "ParallelAll":
      return "list"
    case "Sequence":
      return "list-ol"
    case "Form":
      return "order-form"
    case "API":
      return "gears2"
    default:
      return "peoples"
  }
}

const getIconClassByType = (type) => {
  return "rs-icon rs-icon-" + getIconByType(type)
}

const injectRsuiteStyle = (theme) => {
  const css = `/rsuite/theme-${theme}.min.css`
  const head = document.body.parentElement.firstElementChild
  const firstLink = head.getElementsByTagName("link")[0]
  const link =
    document.getElementById("rsuite") || document.createElement("link")

  link.setAttribute("href", css)
  link.setAttribute("rel", "stylesheet")
  link.setAttribute("type", "text/css")
  link.setAttribute("id", "rsuite")

  head.insertBefore(link, firstLink)
}

export {
  setActiveMenu,
  getLogoByTheme,
  getIconByType,
  getIconClassByType,
  blockBgColor,
  blockTextColor,
  injectRsuiteStyle,
}
