enum ItemOrigin{
  Catalog,
  Made,
  Received
}

enum EditMode{
  Create,
  Edit
}

enum MutationType {
  Create = "Create",
  Connect = "Connect",
  Delete = "Delete"
}

export { ItemOrigin, EditMode, MutationType }