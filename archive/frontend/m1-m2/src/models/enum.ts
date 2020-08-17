enum ItemOrigin {
  Catalog,
  Made,
  Received,
}

enum EditMode {
  Create = "Create",
  Edit = "Edit",
}

enum Typename {
  blocks = "blocks",
  blockDefs = "blockDefs",
}

enum MutationType {
  Create = "Create",
  Connect = "Connect",
  Delete = "Delete",
}

export { ItemOrigin, EditMode, Typename, MutationType }
