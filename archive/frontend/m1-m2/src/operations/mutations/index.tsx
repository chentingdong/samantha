import { useMutation } from "@apollo/client"
import { CREATE_ONE_BLOCK } from "./createOneBlock"
import { CREATE_ONE_BLOCK_DEF } from "./createOneBlockDef"
import { UPDATE_ONE_BLOCK_M1 } from "./updateOneBlock"
import { UPDATE_ONE_BLOCK_DEF } from "./updateOneBlockDef"
import { DELETE_ONE_BLOCK } from "./deleteOneBlock"
import { DELETE_ONE_BLOCK_DEF } from "./deleteOneBlockDef"

const useBlockMutations = (typename) => {
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK)
  const [createOneBlockDef] = useMutation(CREATE_ONE_BLOCK_DEF)
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK_M1)
  const [updateOneBlockDef] = useMutation(UPDATE_ONE_BLOCK_DEF)
  const [deleteOneBlock] = useMutation(DELETE_ONE_BLOCK)
  const [deleteOneBlockDef] = useMutation(DELETE_ONE_BLOCK_DEF)

  return typename === "blocks"
    ? [createOneBlock, updateOneBlock, deleteOneBlock]
    : [createOneBlockDef, updateOneBlockDef, deleteOneBlockDef]
}

export { useBlockMutations }
