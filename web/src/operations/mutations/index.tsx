import { useMutation } from "@apollo/client"
import { CREATE_ONE_BLOCK } from "./createOneBlock"
import { CREATE_ONE_BLOCK_DEF } from "./createOneBlockDef"
import { UPDATE_ONE_BLOCK } from "./updateOneBlock"
import { UPDATE_ONE_BLOCK_DEF } from "./updateOneBlockDef"
import { DELETE_ONE_BLOCK } from "./deleteOneBlock"
import { DELETE_ONE_BLOCK_DEF } from "./deleteOneBlockDef"
import { REQUEST_CATALOG } from "../queries/requestCatalog"
import { REQUESTS_MADE } from "../queries/requestsMade"
import { REQUESTS_RECEIVED } from "../queries/requestsReceived"

const useBlockMutations = (typename) => {
  const [createOneBlock] = useMutation(CREATE_ONE_BLOCK, {
    refetchQueries: [{ query: REQUESTS_MADE }, { query: REQUESTS_RECEIVED }],
  })
  const [createOneBlockDef] = useMutation(CREATE_ONE_BLOCK_DEF, {
    refetchQueries: [{ query: REQUEST_CATALOG }],
  })
  const [updateOneBlock] = useMutation(UPDATE_ONE_BLOCK)
  const [updateOneBlockDef] = useMutation(UPDATE_ONE_BLOCK_DEF)
  const [deleteOneBlock] = useMutation(DELETE_ONE_BLOCK, {
    refetchQueries: [{ query: REQUESTS_MADE }, { query: REQUESTS_RECEIVED }],
  })
  const [deleteOneBlockDef] = useMutation(DELETE_ONE_BLOCK_DEF, {
    refetchQueries: [{ query: REQUEST_CATALOG }],
  })

  return typename === "blocks"
    ? [createOneBlock, updateOneBlock, deleteOneBlock]
    : [createOneBlockDef, updateOneBlockDef, deleteOneBlockDef]
}

export { useBlockMutations }
