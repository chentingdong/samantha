const bgColor = (block) => {
  switch (block.state) {
    case "PENDING":
      return "bg-warning"
    case "ACTIVE":
      return "bg-success"
    case "COMPLETE":
      return "bg-primary"
    default:
      return "bg-secondary"
  }
}

export { bgColor }
