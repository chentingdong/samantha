const btnBgColor = (block) => {
  switch (block.state) {
    case "PENDING":
      return "bg-warning"
    case "ACTIVE":
      return "bg-success"
    case "COMPLETE":
      return "bg-primary"
    case "DRAFT":
      return "bg-light"
    default:
      return "bg-secondary"
  }
}

export { btnBgColor }
