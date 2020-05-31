enum ItemOrigin {
  Catalog,
  Made,
  Received,
}

enum EditMode {
  Create = "Create",
  Edit = "Edit",
}

enum ItemType {
  Block = "Block",
  BlockDef = "BlockDef",
}

enum MutationType {
  Create = "Create",
  Connect = "Connect",
  Delete = "Delete",
}

export { ItemOrigin, EditMode, ItemType, MutationType }
